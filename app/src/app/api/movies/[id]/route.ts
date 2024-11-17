import prisma from '@/lib/db/init';
import { v2 as cloudinary } from 'cloudinary';
import { NextRequest, NextResponse } from 'next/server';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const formData = await req.formData();

  // Get Movie id from params
  const movieId = params.id;

  // Get the file but check if it's a url string or a file
  const file = formData.get('banner') as File | string;

  const title = formData.get('title') as string;
  const publishYear = formData.get('publishYear') as string;

  if (!title || !publishYear) {
    return NextResponse.json(
      { error: 'All fields are required' },
      {
        status: 400,
      }
    );
  }

  try {
    let poster = '';

    if (file) {
      let fileBuffer: ArrayBuffer;
      if (typeof file === 'string') {
        // If it's a string, it's a URL
        poster = file;
      } else {
        // If it's a file, get the file buffer
        fileBuffer = await file.arrayBuffer();

        const mimeType = file.type;
        const encoding = 'base64';
        const base64Data = Buffer.from(fileBuffer).toString('base64');

        // this will be used to upload the file
        const fileUri = 'data:' + mimeType + ';' + encoding + ',' + base64Data;

        const uploadResponse = await cloudinary.uploader.upload(fileUri, {
          folder: 'movie-test',
        });

        poster = uploadResponse.secure_url;
      }
    }

    // Save the movie details in the database
    const movie = await prisma.movie.update({
      where: {
        id: parseInt(movieId),
      },
      data: {
        title,
        publish_year: parseInt(publishYear),
        poster,
      },
    });

    return NextResponse.json(
      {
        message: 'Movie updated successfully',
        data: movie,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error updating movie:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const movieId = params.id;

  try {
    await prisma.movie.delete({
      where: {
        id: parseInt(movieId),
      },
    });

    return NextResponse.json(
      {
        message: 'Movie deleted successfully',
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error deleting movie:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      {
        status: 500,
      }
    );
  }
}

// Get the movie by id
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const movieId = params.id;

  try {
    const movie = await prisma.movie.findUnique({
      where: {
        id: parseInt(movieId),
      },
    });

    return NextResponse.json(
      {
        data: movie,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error fetching movie:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      {
        status: 500,
      }
    );
  }
}
