import { ChangeEvent } from "react";

import classes from "./products-sorting.module.scss";

function ProductsSorting({
  onChange,
}: {
  onChange: (sortTerm: string) => void;
}) {
  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  };

  return (
    <form>
      <select
        onChange={handleSelectChange}
        name="sorting"
        className={classes.select}
      >
        <option value="">Sort By:</option>
        <option value="title asc">Alphabetically A-Z</option>
        <option value="title desc">Alphabetically Z-A</option>
        <option value="price asc">Lowest Price</option>
        <option value="price desc">Heighest Price</option>
        <option value="_createdAt asc">Formerly Added</option>
        <option value="_createdAt desc">Recently Added</option>
      </select>
    </form>
  );
}

export default ProductsSorting;
