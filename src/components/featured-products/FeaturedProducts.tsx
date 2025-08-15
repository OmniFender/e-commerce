import Image from "next/image";

import { sanityFetch } from "@/sanity/lib/live";
import { FEATURED_PRODUCTS_CARDS } from "@/sanity/lib/queries";
import { FEATURED_PRODUCTS_CARDSResult } from "@/sanity/types";

import { urlFor } from "@/sanity/lib/image";

import classes from "./featured-products.module.scss";

export default async function FeaturedProducts() {
  let featuredProducts = null;
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
      featuredProducts = [
        {
          _id: Math.random().toString(36).substring(2, 15),
          title: "Fallback Product 1",
          description: "This is a fallback product description.",
          imageUrl: "/images/fallback-product.jpg",
          price: 0,
        },
        {
          _id: Math.random().toString(36).substring(2, 15),
          title: "Fallback Product 2",
          description: "This is a fallback product description.",
          imageUrl: "/images/fallback-product.jpg",
          price: 0,
        },
        {
          _id: Math.random().toString(36).substring(2, 15),
          title: "Fallback Product 3",
          description: "This is a fallback product description.",
          imageUrl: "/images/fallback-product.jpg",
          price: 0,
        },
        {
          _id: Math.random().toString(36).substring(2, 15),
          title: "Fallback Product 4",
          description: "This is a fallback product description.",
          imageUrl: "/images/fallback-product.jpg",
          price: 0,
        },
        {
          _id: Math.random().toString(36).substring(2, 15),
          title: "Fallback Product 5",
          description: "This is a fallback product description.",
          imageUrl: "/images/fallback-product.jpg",
          price: 0,
        },
      ];
    }
  }
  console.log(featuredProducts);
  return (
    <section className={classes["featured-products"]}>
      <h2 className={classes["featured-products__header"]}>Featured Products</h2>
      <div className={classes["featured-products__container"]}>
        {featuredProducts.map((product) => (
          <div
            key={product._id}
            className={classes["featured-products__container-item"]}
          >
            <Image
              src={urlFor(product.productImage)
                .width(300)
                .height(400)
                .quality(80)
                .auto("format")
                .url()}
              alt={product?.productImage?.caption}
              className={classes["featured-products__container-item-image"]}
              width={250}
              height={350}
            />
            <div className={classes["featured-products__container-item-info"]}>
              <h3>{product.title}</h3>
              {product.tags && (
                <div
                  className={
                    classes["featured-products__container-item-info-tags"]
                  }
                >
                  {product.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              )}
              <span
                className={
                  classes["featured-products__container-item-info-price"]
                }
              >
                ${product.price.toFixed(2)}
              </span>
            </div>
            <button
              className={classes["featured-products__container-item-cta"]}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
