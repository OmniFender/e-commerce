import Image from "next/image";

import ZoomContainer from "./zoomContainer";

import { urlFor } from "@/sanity/lib/image";
import { PRODUCT_BY_SLUGResult } from "@/sanity/types";

import { formattedPrice } from "../../utils/utils";

import classes from "./product-information.module.scss";

function formattedDescription(description: string) {
  return description.split("\n").map((line) => `${line}`);
}
export default function ProductInfo({
  product,
}: {
  product: PRODUCT_BY_SLUGResult;
}) {
  return (
    <div className={classes["product-information"]}>
      <div
        className={classes["product-information__image"]}
        aria-label={product?.productImage?.caption || "Product Image"}
      >
        {product?.productImage && (
          <ZoomContainer
            productImage={product?.productImage}
            className={classes["product-information__image-zoom"]}
          />
        )}
      </div>
      <div className={classes["product-information__details"]}>
        <h1 className={classes["product-information__details-title"]}>
          {product?.title}
        </h1>
        <span className={classes["product-information__details-price"]}>
          {formattedPrice(product?.price ?? 0)}
        </span>
        {Array.isArray(product?.tags) && (
          <ul className={classes["product-information__details-tags"]}>
            {product.tags.map((tag) => (
              <li
                key={tag}
                className={classes["product-information__details-tags-tag"]}
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
        {Array.isArray(product?.badges) && (
          <div className={classes["product-information__details-badges"]}>
            {product.badges.map((badge, index) => (
              <Image
                key={index}
                src={urlFor(badge)
                  .width(100)
                  .height(100)
                  .quality(90)
                  .auto("format")
                  .url()}
                alt={badge?.caption || "Badge Image"}
                width={100}
                height={100}
              />
            ))}
          </div>
        )}
        {product?.description && (
          <ul className={classes["product-information__details-description"]}>
            {formattedDescription(product?.description).map((line, index) => (
              <li key={index}>{line}</li>
            ))}
          </ul>
        )}
        {product?.sizeGuide && (
          <div className={classes["product-information__details-size-guide"]}>
            <Image
              src={urlFor(product.sizeGuide)
                .width(400)
                .height(450)
                .quality(90)
                .auto("format")
                .url()}
              alt={product?.sizeGuide?.caption || "Size Guide for the product"}
              width={400}
              height={450}
            />
          </div>
        )}
      </div>
    </div>
  );
}
