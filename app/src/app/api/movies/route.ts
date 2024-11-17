import prisma from '@/lib/db/init';
import { v2 as cloudinary } from 'cloudinary';
import { NextRequest, NextResponse } from 'next/server';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const file = formData.get('banner') as File;
  const title = formData.get('title') as string;
  const publishYear = formData.get('publishYear') as string;

  if (!file) {
    return NextResponse.json(
      { error: 'No file provided' },
      {
        status: 400,
      }
    );
  }

  if (!title || !publishYear) {
    return NextResponse.json(
      { error: 'All fields are required' },
      {
        status: 400,
      }
    );
  }

  try {
    const fileBuffer = await file.arrayBuffer();

    const mimeType = file.type;
    const encoding = 'base64';
    const base64Data = Buffer.from(fileBuffer).toString('base64');

    const fileUri = 'data:' + mimeType + ';' + encoding + ',' + base64Data;

    const uploadResponse = await cloudinary.uploader.upload(fileUri, {
      folder: 'movie-test',
    });

    const movie = await prisma.movie.create({
      data: {
        title,
        publish_year: parseInt(publishYear),
        poster: uploadResponse.secure_url,
      },
    });

    return NextResponse.json(
      {
        message: 'Movie created successfully',
        data: movie,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error('Error uploading file:', error);
  }
}

export async function GET(req: Request) {
  // Get page number and items per page from query
  try {
    const url = req.url;

    const urlParts = url.split('?');

    let queries: {
      [key: string]: string;
    } = [];

    if (urlParts.length > 1) {
      queries = urlParts[1].split('&').map((query) => query.split('='));
    }

    let page = 1;

    let itemsPerPage = 10;

    queries.forEach((query) => {
      if (query[0] === 'page') {
        page = parseInt(query[1]);
      }

      if (query[0] === 'itemsPerPage') {
        itemsPerPage = parseInt(query[1]);
      }
    });

    const movies = await prisma.movie.findMany({
      skip: (page - 1) * itemsPerPage,
      take: itemsPerPage,
    });

    const totalMovies = await prisma.movie.count();

    return NextResponse.json({
      data: movies,
      page: page,
      itemsPerPage: itemsPerPage,
      totalMovies: totalMovies,
    });
  } catch (error) {
    console.error('Error getting movies:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      {
        status: 500,
      }
    );
  }
}
