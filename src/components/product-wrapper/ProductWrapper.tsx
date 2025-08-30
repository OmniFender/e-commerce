"use client";

import { Suspense, useEffect, useState } from "react";

import { client } from "@/sanity/lib/client";
import { PRODUCTSResult } from "@/sanity/types";
import { PRODUCTS } from "@/sanity/lib/queries";

import classes from "./product-wrapper.module.scss";
import ProductsGrid from "../products-grid/ProductsGrid";
import ProductsSorting from "./products-sorting/ProductsSorting";
import FilterPriceModal from "./filter-price-modal/FilterPriceModal";

const options = { next: { revalidate: 60 } };

function ProductWrapper() {
  const [products, setProducts] = useState<PRODUCTSResult>([]);
  const [query, setQuery] = useState<string>(PRODUCTS);

  // function handleSortingChange(sortTerm: string) {
  //   if (sortTerm) {
  //     setQuery(`${PRODUCTS} | order(${sortTerm})`);
  //   } else {
  //     setQuery(PRODUCTS);
  //   }
  // }
  function handleProductsChange(
    sortTerm: string,
    priceRange: [number, number]
  ) {
    if (priceRange || sortTerm) {
      setQuery(
        `*[_type == "products" && price >= ${priceRange[0]} && price <= ${priceRange[1]}]{
            _id,
            _createdAt,
            title,
            tags[],
            price,
            "slug": productSlug.current,
            productImage{
              asset->{
                _id,
                url,
                metadata {
                  dimensions {
                    width,
                    height
                  },
                  lqip
                }
              },
              caption,
          }
        } ${sortTerm ? `| order(${sortTerm})` : ""}`
      );
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
        <FilterPriceModal onChange={handleProductsChange} max={160} />
        <ProductsSorting onChange={handleProductsChange} />
      </div>
      {/** Suspense is not gonna work here as it is a client component now! */}
      <Suspense fallback={<div className={classes.loading}>Loading...</div>}>
        <ProductsGrid products={products} />
      </Suspense>
    </>
  );
}

export default ProductWrapper;
