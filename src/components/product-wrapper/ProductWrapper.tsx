"use client";

import { useEffect, useState } from "react";

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
  const [loading, setLoading] = useState<boolean>(false);

  function handleFilterChange(priceRange: [number, number]) {
    if (priceRange) {
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
          }`
      );
    } else {
      setQuery(PRODUCTS);
    }
  }

  function handleSortingChange(sortTerm: string) {
    if (sortTerm) {
      setQuery((prev) => `${prev} | order(${sortTerm})`);
    } else {
      setQuery(PRODUCTS);
    }
  }
  useEffect(() => {
    (async function fetchProducts() {
      try {
        setLoading(true);
        const productsData = await client.fetch(query, {}, options);
        if (productsData) {
          setProducts(productsData);
        }
      } catch (error) {
        console.error("Error fetching products: ", error);
      } finally {
        setLoading(false);
        if (!products) {
          setProducts([]);
        }
      }
    })();
  }, [query]);

  return (
    <>
      <div className={classes.filters}>
        <FilterPriceModal
          onChange={([min, max]) =>
            handleFilterChange([Number(min), Number(max)])
          }
        />
        <ProductsSorting
          onChange={(sortTerm) => handleSortingChange(sortTerm)}
        />
      </div>
      {loading ? (
        <div className={classes.loading}>Loading...</div>
      ) : (
        <ProductsGrid products={products} />
      )}
    </>
  );
}

export default ProductWrapper;
