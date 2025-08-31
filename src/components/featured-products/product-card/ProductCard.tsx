"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { FEATURED_PRODUCTS_CARDSResult } from "@/sanity/types";
import { urlFor } from "@/sanity/lib/image";

import Modal from "@/helper_components/modal/Modal";
import { formattedPrice } from "@/utils/utils";

import classes from "./product-card.module.scss";

export default function ProductCard({
  product,
}: {
  product: FEATURED_PRODUCTS_CARDSResult[number];
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className={`${classes["featured-products__container-item"]}`}
        aria-label="Featured Product"
      >
        <Link href={`/shop/${product.slug}`} key={product._id}>
          {product.productImage ? (
            <Image
              src={urlFor(product.productImage)
                .width(300)
                .height(450)
                .quality(100)
                .auto("format")
                .url()}
              alt={product?.productImage?.caption || "Product Image"}
              className={classes["featured-products__container-item-image"]}
              width={200}
              height={250}
            />
          ) : (
            <div className={classes["image-placeholder"]}>No image</div>
          )}
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
              {formattedPrice(product.price ?? 0)}
            </span>
          </div>
        </Link>
        <button
          className={classes["featured-products__container-item-cta"]}
          onClick={() => setIsOpen(true)}
        >
          + <span>Quick add</span>
        </button>
      </div>
      <Modal
        className={classes["modal"]}
        openModal={isOpen}
        onCloseModal={() => setIsOpen(false)}
      >
        <div className={classes["modal__container"]}>
          <span
            onClick={() => setIsOpen(false)}
            className={classes["modal--close"]}
          >
            &#215;
          </span>
          <div className={classes["modal-info"]}>
            {product.productImage ? (
              <Image
                src={urlFor(product.productImage)
                  .width(600)
                  .height(800)
                  .quality(100)
                  .auto("format")
                  .url()}
                alt={product?.productImage?.caption || "Product Image"}
                className={classes["modal-info-image"]}
                width={400}
                height={440}
              />
            ) : (
              <div className={classes["image-placeholder"]}>No image</div>
            )}
            <div className={classes["modal-info__description"]}>
              <h2>{product.title}</h2>
              <span className={classes["modal-info__description-price"]}>
                {formattedPrice(product.price ?? 0)}
              </span>
            </div>
          </div>
          <div className={classes["modal-actions"]}>
            <button className={classes["modal-actions--primary"]}>
              Buy it now
            </button>
            <button className={classes["modal-actions--secondary"]}>
              Add to cart
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
