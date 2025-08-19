import { sanityFetch } from "@/sanity/lib/live";
import { FEATURED_PRODUCTS_CARDS } from "@/sanity/lib/queries";
import { FEATURED_PRODUCTS_CARDSResult } from "@/sanity/types";

import Slider from "./slider-container/SliderContainer";
import Link from "next/link";

import classes from "./featured-products.module.scss";

const FALLBACK_PRODUCTS: FEATURED_PRODUCTS_CARDSResult = [
  {
    _id: Math.random().toString(36).substring(2, 15),
    title: "Fallback Product 1",

    productImage: {
      caption: "Fallback Product Image",
      asset: {
        _id: "fallback-image-id",
        url: "/images/fallback-product.jpg",
      },
    },
    price: 0,
    tags: ["Sale", "New Arrival", "Popular"],
  },
  {
    _id: Math.random().toString(36).substring(2, 15),
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
    _id: Math.random().toString(36).substring(2, 15),
    title: "Fallback Product 3",
    productImage: {
      caption: "Fallback Product Image",
      asset: {
        _id: "fallback-image-id-2",
        url: "/images/fallback-product-2.jpg",
      },
    },
    price: 0,
    tags: ["Sale"],
  },
  {
    _id: Math.random().toString(36).substring(2, 15),
    title: "Fallback Product 4",
    productImage: {
      caption: "Fallback Product Image",
      asset: {
        _id: "fallback-image-id-2",
        url: "/images/fallback-product-2.jpg",
      },
    },
    price: 0,
    tags: ["Sale"],
  },
  {
    _id: Math.random().toString(36).substring(2, 15),
    title: "Fallback Product 5",
    productImage: {
      caption: "Fallback Product Image",
      asset: {
        _id: "fallback-image-id-2",
        url: "/images/fallback-product-2.jpg",
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
    <section className={classes["featured-products"]}>
      <h2 className={classes["featured-products__header"]}>
        Featured Products
      </h2>
      <Slider featuredProducts={featuredProducts} />
      <span className={classes["featured-products__link"]}>
        <Link href="/shop">
          View All <span> &#8594;</span>
        </Link>
      </span>
    </section>
  );
}
