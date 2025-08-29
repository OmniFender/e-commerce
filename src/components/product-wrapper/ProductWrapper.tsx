"use client";

import { Suspense, useEffect, useState } from "react";

import { client } from "@/sanity/lib/client";
import { PRODUCTSResult } from "@/sanity/types";
import { PRODUCTS } from "@/sanity/lib/queries";

import classes from "./product-wrapper.module.scss";
import ProductsGrid from "../products-grid/ProductsGrid";
import ProductsSorting from "./products-sorting/ProductsSorting";

const options = { next: { revalidate: 60 } };

function ProductWrapper() {
  const [products, setProducts] = useState<PRODUCTSResult>([]);
  const [query, setQuery] = useState<string>(PRODUCTS);

  function handleSortingChange(sortTerm: string) {
    if (sortTerm) {
      setQuery(`${PRODUCTS} | order(${sortTerm})`);
    } else {
      setQuery(PRODUCTS);
    }
  }

  useEffect(() => {
    (async function fetchProducts() {
      try {
        const productsData = await client.fetch(query, {}, options);
        if (productsData) {
          setProducts(productsData);
        }
      } catch (error) {
        console.error("Error fetching products: ", error);
      } finally {
        if (!products) {
          setProducts([]);
        }
      }
    })();
  }, [products, query]);

  return (
    <>
      <div className={classes.filters}>
        <>TODO: Add Filters Here!</>
        <ProductsSorting onChange={handleSortingChange} />
      </div>
      {/** Suspense is not gonna work here as it is a client component now! */}
      <Suspense fallback={<div className={classes.loading}>Loading...</div>}>
        <ProductsGrid products={products} />
      </Suspense>
    </>
  );
}

export default ProductWrapper;
