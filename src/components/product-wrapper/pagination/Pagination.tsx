import classes from "./pagination.module.scss";

function Pagination({
  onClickNext,
  onClickPrevious,
  lastId,
  firstId,
}: {
  onClickNext: (lastId: string) => void;
  onClickPrevious: (firstId: string) => void;
  lastId: string;
  firstId: string;
}) {
  function handlePaginationNext() {
    console.log(lastId);
    console.log(firstId);
    onClickNext(lastId);
  }

  function handlePaginationPrevious() {
    onClickPrevious(firstId);
  }

  return (
    <div className={classes.pagination}>
      <button
        className={`${classes["pagination__previous-button"]} ${classes["pagination__button"]}`}
        onClick={handlePaginationPrevious}
      >
        Previous
      </button>
      <button
        className={`${classes["pagination__next-button"]} ${classes["pagination__button"]}`}
        onClick={handlePaginationNext}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
