import Image from "next/image";
import Modal from "@/helper_components/modal/Modal";

import { FEATURED_PRODUCTS_CARDSResult } from "@/sanity/types";
import { urlFor } from "@/sanity/lib/image";

import classes from "./product-card.module.scss";
import { useState } from "react";
import Link from "next/link";

export default function ProductCard({
  product,
}: {
  product: FEATURED_PRODUCTS_CARDSResult[number];
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Link
        href={`/`}
        key={product._id}
        className={`${classes["featured-products__container-item"]} `}
      >
        <Image
          src={
            product.productImage
              ? urlFor(product.productImage)
                  .width(300)
                  .height(400)
                  .quality(100)
                  .auto("format")
                  .url()
              : "/images/fallback-product.jpg"
          }
          alt={product?.productImage?.caption || "Product Image"}
          className={classes["featured-products__container-item-image"]}
          width={200}
          height={220}
        />
        <div className={classes["featured-products__container-item-info"]}>
          <h3>{product.title}</h3>
          {product.tags && (
            <div
              className={classes["featured-products__container-item-info-tags"]}
            >
              {product.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          )}
          <span
            className={classes["featured-products__container-item-info-price"]}
          >
            ${product.price?.toFixed(2)}
          </span>
        </div>
        <button
          className={classes["featured-products__container-item-cta"]}
          onClick={() => setIsOpen(true)}
        >
          + Quick Add
        </button>
      </Link>
      <Modal
        className={classes["modal"]}
        openModal={isOpen}
        onCloseModal={() => setIsOpen(false)}
      >
        <span
          onClick={() => setIsOpen(false)}
          className={classes["modal--close"]}
        >
          &#215;
        </span>
        <div className={classes["modal-info"]}>
          <Image
            src={
              product.productImage
                ? urlFor(product.productImage)
                    .width(600)
                    .height(800)
                    .quality(100)
                    .auto("format")
                    .url()
                : "/images/fallback-product.jpg"
            }
            alt={product?.productImage?.caption || "Product Image"}
            className={classes["modal-info-image"]}
            width={400}
            height={440}
          />
          <div className={classes["modal-info__description"]}>
            <h3>{product.title}</h3>
            <span className={classes["modal-info__description-price"]}>
              ${product.price?.toFixed(2)}
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
      </Modal>
    </>
  );
}
