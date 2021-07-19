import React from "react";
import { Link } from "react-router-dom";

const Paginate = ({
  currentPage,
  handleNextPage,
  handlePreviousPage,
  onPageChange,
  pages,
  totalPages,
}) => {
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li className={currentPage === 1 ? "page-item disabled" : "page-item"}>
          <Link className="page-link" onClick={() => handlePreviousPage()}>
            Previous
          </Link>
        </li>
        {pages.map((page) => (
          <li
            className={page === currentPage ? "page-item active" : "page-item"}
            key={page}
          >
            <Link className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </Link>
          </li>
        ))}
        <li
          className={
            currentPage === totalPages ? "page-item disabled" : "page-item"
          }
        >
          <Link className="page-link" onClick={handleNextPage}>
            Next
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Paginate;
