import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import classes from "./pagination.module.scss";

function Pagination({
  currentPage,
  totalPages,
  hasNext,
  hasPrev,
  handleNextButton,
  handlePreviousButton,
  totalItems,
}: {
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
  handleNextButton: () => void;
  handlePreviousButton: () => void;
  totalItems: number;
}) {
  return (
    <div className={classes.pagination}>
      <button
        className={classes["pagination__button"]}
        onClick={handlePreviousButton}
        disabled={!hasPrev}
      >
        <span className={classes["pagination__button-icon"]}>
          <FaChevronLeft />
        </span>
        <span className={classes["pagination__button-text"]}>Previous</span>
      </button>
      <div className={classes["pagination__page-number"]}>
        Page {currentPage} of {totalPages} ({totalItems} items)
      </div>
      <button
        className={classes["pagination__button"]}
        onClick={handleNextButton}
        disabled={!hasNext}
      >
        <span className={classes["pagination__button-text"]}>Next</span>
        <span className={classes["pagination__button-icon"]}>
          <FaChevronRight />
        </span>
      </button>
    </div>
  );
}

export default Pagination;
