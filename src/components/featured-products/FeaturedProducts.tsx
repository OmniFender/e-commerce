import Link from "next/link";

import Slider from "./slider-container/SliderContainer";

import { sanityFetch } from "@/sanity/lib/live";
import { FEATURED_PRODUCTS_CARDS } from "@/sanity/lib/queries";
import { FEATURED_PRODUCTS_CARDSResult } from "@/sanity/types";

import classes from "./featured-products.module.scss";

const FALLBACK_PRODUCTS: FEATURED_PRODUCTS_CARDSResult = [
  {
    _id: "Fallback-1",
    title: "Fallback Product 1",

    productImage: {
      caption: "Fallback Product Image",
      asset: {
        _id: "fallback-image-id",
        url: "/images/fallback-product.jpg",
      },
    },
    price: 123,
    tags: ["Sale", "New Arrival", "Popular"],
  },
  {
    _id: "Fallback-2",
    title: "Fallback Product 2",
    productImage: {
      caption: "Fallback Product Image",
      asset: {
        _id: "fallback-image-id-2",
        url: "/images/fallback-product-2.jpg",
      },
    },
    price: 0,
    tags: ["Sale", "New Arrival", "Popular"],
  },
  {
    _id: "Fallback-3",
    title: "Fallback Product 3",
    productImage: {
      caption: "Fallback Product Image",
      asset: {
        _id: "fallback-image-id-3",
        url: "/images/fallback-product-3.jpg",
      },
    },
    price: 0,
    tags: ["Sale"],
  },
  {
    _id: "Fallback-4",
    title: "Fallback Product 4",
    productImage: {
      caption: "Fallback Product Image",
      asset: {
        _id: "fallback-image-id-4",
        url: "/images/fallback-product-4.jpg",
      },
    },
    price: 0,
    tags: ["Sale"],
  },
  {
    _id: "Fallback-5",
    title: "Fallback Product 5",
    productImage: {
      caption: "Fallback Product Image",
      asset: {
        _id: "fallback-image-id-5",
        url: "/images/fallback-product-5.jpg",
      },
    },
    price: 0,
    tags: ["New"],
  },
];

export default async function FeaturedProducts() {
  let featuredProducts: FEATURED_PRODUCTS_CARDSResult | null = null;
  try {
    const { data: fetchedFeaturedProducts } = await sanityFetch({
      query: FEATURED_PRODUCTS_CARDS,
    });
    if (fetchedFeaturedProducts) {
      featuredProducts = fetchedFeaturedProducts;
    }
  } catch (error) {
    console.error("Error fetching featured products data:", error);
  } finally {
    if (!featuredProducts) {
      featuredProducts = FALLBACK_PRODUCTS;
    }
  }
  return (
    <section className={classes["featured-products"]} aria-label="Featured Products">
      <div className={classes["featured-products__header-container"]}>
        <header>
          <h2
            className={classes["featured-products__header"]}
            aria-label="Featured Collection"
          >
            Featured Collection
          </h2>
          <p>Heat up your wardrobe.</p>
        </header>
        <span className={classes["featured-products__link"]}>
          <Link href="/shop">
            View All <span> &#8594;</span>
          </Link>
        </span>
      </div>
      <Slider featuredProducts={featuredProducts} />
    </section>
  );
}
