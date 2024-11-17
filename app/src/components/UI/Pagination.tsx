import React from 'react';

export default function Pagination({
  page,
  onPageChange,
  totalPages,
}: {
  page: number;
  onPageChange: (page: number) => void;
  totalPages: number;
}) {
  return (
    <nav aria-label="Page navigation example">
      <ul className="list-style-none flex gap-2">
        <li>
          <button
            className={`cursor-pointer relative block rounded bg-transparent px-3 py-1.5 text-xs transition-all duration-300 ${page === 1 ? 'cursor-not-allowed text-neutral-400' : 'hover:bg-primary-500/30 hover:text-white text-white'}`}
            disabled={page === 1}
            onClick={() => onPageChange(page - 1)}
          >
            Prev
          </button>
        </li>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((item) => (
          <li key={item}>
            <button
              className={`relative block rounded bg-transparent px-3 py-1.5 text-xs transition-all duration-300 hover:bg-primary-500/30 text-white ${page == item ? '!bg-primary-500 text-white' : ''}`}
              onClick={() => onPageChange(item)}
            >
              {item}
            </button>
          </li>
        ))}

        <li>
          <button
            className={`cursor-pointer relative block rounded bg-transparent px-3 py-1.5 text-xs transition-all duration-300 ${page === totalPages ? 'cursor-not-allowed text-neutral-400' : 'hover:bg-primary-500/30 hover:text-white text-white'}`}
            disabled={page === totalPages}
            onClick={() => onPageChange(page + 1)}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}
