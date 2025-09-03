"use client";

import { useEffect, useState } from "react";

import { client } from "@/sanity/lib/client";
import { PRODUCTSResult } from "@/sanity/types";
import { PRODUCTS } from "@/sanity/lib/queries";

import Pagination from "./pagination/Pagination";
import classes from "./product-wrapper.module.scss";
import ProductsGrid from "../products-grid/ProductsGrid";
import ProductsSorting from "./products-sorting/ProductsSorting";
import FilterPriceModal from "./filter-price-modal/FilterPriceModal";

const options = { next: { revalidate: 60 } };
const ITEMS_PER_PAGE = 6;

function ProductWrapper() {
  const [products, setProducts] = useState<PRODUCTSResult>([]);

  const [filter, setFilter] = useState<[number, number] | null>(null);
  const [sort, setSort] = useState<string | null>(null);

  const [query, setQuery] = useState<string>(PRODUCTS);
  const [loading, setLoading] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  function handleFilterChange(priceRange: [number, number]) {
    if (priceRange) {
      setFilter(priceRange);
    } else {
      setFilter(null);
    }
    setCurrentPage(0);
  }

  function handleSortingChange(sortTerm: string) {
    if (sortTerm) {
      setSort(sortTerm);
    } else {
      setSort(null);
    }
    setCurrentPage(0);
  }

  function handleNextPage() {
    setCurrentPage((prev) => prev + ITEMS_PER_PAGE);
  }

  function handlePrevPage() {
    setCurrentPage((prev) => Math.max(0, prev - ITEMS_PER_PAGE));
  }

  useEffect(() => {
    let filterQuery = "";
    if (filter) {
      filterQuery = `price >= ${filter[0]} && price <= ${filter[1]}`;
    }
    const baseQuery = `_type == "products"${filterQuery ? ` && ${filterQuery}` : ""}`;
    const sortQuery = sort ? `| order(${sort})` : "";

    const query = `{
      "items": *[${baseQuery}]${sortQuery}[${currentPage}...${currentPage + ITEMS_PER_PAGE}]{
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
    },
    "total": count(*[${baseQuery}])
  }`;
    setQuery(query);
  }, [currentPage, filter, sort]);

  useEffect(() => {
    (async function fetchProducts() {
      try {
        setLoading(true);
        const productsData = await client.fetch(query, {}, options);
        setProducts(productsData.items || []);
        setTotalCount(productsData.total);
        setHasMore(currentPage + ITEMS_PER_PAGE < productsData.total);
      } catch (error) {
        console.error("Error fetching products: ", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [currentPage, query]);

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
      <Pagination
        currentPage={Math.floor(currentPage / ITEMS_PER_PAGE) + 1}
        totalPages={Math.ceil(totalCount / ITEMS_PER_PAGE)}
        hasNext={hasMore}
        hasPrev={currentPage > 0}
        handleNextButton={handleNextPage}
        handlePreviousButton={handlePrevPage}
        totalItems={totalCount}
      />
    </>
  );
}

export default ProductWrapper;
