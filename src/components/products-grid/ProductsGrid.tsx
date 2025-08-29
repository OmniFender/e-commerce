import { PRODUCTSResult } from "@/sanity/types";

import classes from "./products-grid.module.scss";
import ProductCard from "../featured-products/product-card/ProductCard";

export default function ProductsGrid({
  products,
}: {
  products: PRODUCTSResult;
}) {
  return (
    <div className={classes["products-grid"]}>
      {products.map((product: PRODUCTSResult[number]) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
