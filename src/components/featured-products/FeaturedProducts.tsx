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
          description: "This is a fallback product description.",
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
          description: "This is a fallback product description.",
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
          description: "This is a fallback product description.",
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
          description: "This is a fallback product description.",
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
    }
  }
  console.log(featuredProducts);
  return (
    <section className={classes["featured-products"]}>
      <h2 className={classes["featured-products__header"]}>
        Featured Products
      </h2>
      <div className={classes["featured-products__container"]}>
        {featuredProducts.map((product) => (
          <div
            key={product._id}
            className={classes["featured-products__container-item"]}
          >
            <Image
              src={
                product.productImage
                  ? urlFor(product.productImage)
                      .width(200)
                      .height(300)
                      .quality(100)
                      .auto("format")
                      .url()
                  : product.productImage?.asset.url
              }
              alt={
                product?.productImage?.caption || product.productImage?.caption
              }
              className={classes["featured-products__container-item-image"]}
              width={120}
              height={220}
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
              + Quick Add
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
