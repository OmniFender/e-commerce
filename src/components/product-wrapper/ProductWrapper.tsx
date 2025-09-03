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

  const [filter, setFilter] = useState<[number, number] | null>(null);
  const [sort, setSort] = useState<string | null>(null);

  const [query, setQuery] = useState<string>(PRODUCTS);
  const [loading, setLoading] = useState<boolean>(false);

  function handleFilterChange(priceRange: [number, number]) {
    if (priceRange) {
      setFilter(priceRange);
    } else {
      setFilter(null);
    }
  }

  function handleSortingChange(sortTerm: string) {
    if (sortTerm) {
      setSort(sortTerm);
    } else {
      setSort(null);
    }
  }

  useEffect(() => {
    let filterQuery = "";
    if (filter) {
      filterQuery = `price >= ${filter[0]} && price <= ${filter[1]}`;
    }
    const baseQuery = `*[_type == "products"${filterQuery ? ` && ${filterQuery}` : ""}]`;
    const projection = `{
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
    }`;
    const sortQuery = sort ? `| order(${sort})` : "";
    setQuery(`${baseQuery}${projection} ${sortQuery}`);
  }, [filter, sort]);
  useEffect(() => {
    (async function fetchProducts() {
      try {
        setLoading(true);
        const productsData = await client.fetch(query, {}, options);
        setProducts(productsData || []);
      } catch (error) {
        console.error("Error fetching products: ", error);
        setProducts([]);
      } finally {
        setLoading(false);
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
