import React from 'react';
import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
  queryParam?: string;
  /** Extra query params to preserve in page URLs (e.g. { search: 'keyword' }) */
  queryParams?: Record<string, string>;
}

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
  queryParam = 'page',
  queryParams = {}
}: PaginationProps) {
  // Don't render pagination if there's only one page
  if (totalPages <= 1) {
    return null;
  }

  // Calculate the range of pages to show
  const getPageRange = () => {
    const range = [];
    const maxVisible = 5; // Maximum number of page links to show
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    const endPage = Math.min(totalPages, startPage + maxVisible - 1);
    
    // Adjust start page if end page is maxVisible away
    startPage = Math.max(1, endPage - maxVisible + 1);
    
    for (let i = startPage; i <= endPage; i++) {
      range.push(i);
    }
    
    return range;
  };

  // Build query string from extra params + page
  const buildQueryString = (page: number) => {
    const params = new URLSearchParams();
    Object.entries(queryParams).forEach(([k, v]) => {
      if (v != null && v !== '') params.set(k, v);
    });
    if (page > 1) params.set(queryParam, String(page));
    const qs = params.toString();
    return qs ? `?${qs}` : '';
  };

  // Helper to generate page URLs (preserves search and other query params)
  const getPageUrl = (page: number) => {
    return `${basePath}${buildQueryString(page)}`;
  };

  const pageRange = getPageRange();

  return (
    <nav aria-label="Pagination" className="flex justify-center">
      <ul className="inline-flex space-x-1">
        {/* Previous Page Button */}
        {currentPage > 1 && (
          <li>
            <Link
              href={getPageUrl(currentPage - 1)}
              className="px-4 py-2 text-sm rounded-md border border-gray-200 bg-white hover:bg-gray-50 text-text-secondary"
              aria-label="Go to previous page"
            >
              <span aria-hidden="true">&laquo;</span> Prev
            </Link>
          </li>
        )}
        
        {/* First Page (if not in range) */}
        {pageRange[0] > 1 && (
          <>
            <li>
              <Link
                href={getPageUrl(1)}
                className="px-4 py-2 text-sm rounded-md border border-gray-200 bg-white hover:bg-gray-50 text-text-secondary"
                aria-label="Go to page 1"
              >
                1
              </Link>
            </li>
            {pageRange[0] > 2 && (
              <li>
                <span className="px-4 py-2 text-sm text-gray-500">...</span>
              </li>
            )}
          </>
        )}
        
        {/* Page Numbers */}
        {pageRange.map((page) => (
          <li key={page}>
            <Link
              href={getPageUrl(page)}
              className={`px-4 py-2 text-sm rounded-md border ${
                currentPage === page
                  ? 'border-primary-main bg-primary-main text-white font-medium'
                  : 'border-gray-200 bg-white hover:bg-gray-50 text-text-secondary'
              }`}
              aria-label={`Go to page ${page}`}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {page}
            </Link>
          </li>
        ))}
        
        {/* Last Page (if not in range) */}
        {pageRange[pageRange.length - 1] < totalPages && (
          <>
            {pageRange[pageRange.length - 1] < totalPages - 1 && (
              <li>
                <span className="px-4 py-2 text-sm text-gray-500">...</span>
              </li>
            )}
            <li>
              <Link
                href={getPageUrl(totalPages)}
                className="px-4 py-2 text-sm rounded-md border border-gray-200 bg-white hover:bg-gray-50 text-text-secondary"
                aria-label={`Go to page ${totalPages}`}
              >
                {totalPages}
              </Link>
            </li>
          </>
        )}
        
        {/* Next Page Button */}
        {currentPage < totalPages && (
          <li>
            <Link
              href={getPageUrl(currentPage + 1)}
              className="px-4 py-2 text-sm rounded-md border border-gray-200 bg-white hover:bg-gray-50 text-text-secondary"
              aria-label="Go to next page"
            >
              Next <span aria-hidden="true">&raquo;</span>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}