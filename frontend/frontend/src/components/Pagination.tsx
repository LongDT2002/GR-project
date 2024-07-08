import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }: { currentPage: number, totalPages: number, onPageChange: Function }) => {
    const pageNumbers = [];

    if (totalPages <= 7) {
        // If there are 7 or fewer pages, display all page numbers
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }
    } else if (currentPage <= 4) {
        // Display the first 5 page numbers
        for (let i = 1; i <= 5; i++) {
            pageNumbers.push(i);
        }

        // Add an ellipsis and the last page number
        pageNumbers.push('...', totalPages);
    } else if (currentPage >= totalPages - 3) {
        // Display the last 5 page numbers
        pageNumbers.push(1, '...');

        for (let i = totalPages - 4; i <= totalPages; i++) {
            pageNumbers.push(i);
        }
    } else {
        // Display the current page, two pages before, two pages after, and the ellipses
        pageNumbers.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
    }

    return (
        <div>
            <ol className="flex justify-center gap-1 text-xs font-medium">
                {/* Previous Page Button */}
                <li>
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        className={`bg-gray-200 inline-flex h-8 w-8 items-center justify-center rounded border ${currentPage === 1 ? 'border-gray-300' : 'border-gray-100'
                            } bg-gray-200 text-gray-900 rtl:rotate-180`}
                        disabled={currentPage === 1}
                    >
                        <span className="sr-only">Prev Page</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3 w-3"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </li>

                {/* Page Numbers */}
                {pageNumbers.map((pageNumber, index) => (
                    <li key={index}>
                        {pageNumber === '...' ? (
                            <span className="block h-8 w-8 text-center leading-8 ">...</span>
                        ) : (
                            <button
                                onClick={() => onPageChange(pageNumber)}
                                className={`block h-8 w-8 rounded border ${pageNumber === currentPage ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-100 bg-gray-200 text-gray-900'
                                    } text-center leading-8`}
                            >
                                {pageNumber}
                            </button>
                        )}
                    </li>
                ))}

                {/* Next Page Button */}
                <li>
                    <button
                        onClick={() => onPageChange(currentPage + 1)}
                        className={`bg-gray-200 inline-flex h-8 w-8 items-center justify-center rounded border ${currentPage === pageNumbers.length ? 'border-gray-300' : 'border-gray-100'
                            } bg-gray-200 text-gray-900 rtl:rotate-180`}
                        disabled={currentPage === pageNumbers.length}
                    >
                        <span className="sr-only">Next Page</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3 w-3"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </li>
            </ol>
        </div>
    );
};

export default Pagination;
