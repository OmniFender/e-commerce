import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { PRODUCT_BY_SLUGResult } from "@/sanity/types";

import { formattedPrice } from "../../utils/utils";

import classes from "./product-information.module.scss";

export default function ProductInfo({
  product,
}: {
  product: PRODUCT_BY_SLUGResult;
}) {
  const formattedDescription = product?.description
    ?.split("\n")
    .map((line) => `${line}`);

  console.log(formattedDescription);
  return (
    <div className={classes["product-information"]}>
      <div className={classes["product-information__image"]}>
        {product?.productImage ? (
          <Image
            src={urlFor(product.productImage)
              .width(600)
              .height(750)
              .quality(90)
              .auto("format")
              .url()}
            alt={product?.productImage?.caption || "Product Image"}
            width={600}
            height={750}
          />
        ) : null}
      </div>
      <div className={classes["product-information__details"]}>
        <h1 className={classes["product-information__details-title"]}>
          {product?.title}
        </h1>
        <span className={classes["product-information__details-price"]}>
          {formattedPrice(product?.price ?? 0)}
        </span>
        {product?.tags && (
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
        {product?.badges && (
          <div className={classes["product-information__details-badges"]}>
            {product?.badges.map((badge, index) => (
              <Image
                key={index}
                src={urlFor(badge)
                  .width(100)
                  .height(100)
                  .quality(90)
                  .auto("format")
                  .url()}
                alt={product?.productImage?.caption || "Badge Image"}
                width={100}
                height={100}
              />
            ))}
          </div>
        )}
        {product?.description && (
          <div className={classes["product-information__details-description"]}>
            {formattedDescription?.map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
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
              alt={product?.sizeGuide?.caption || "Size Guide"}
              width={400}
              height={450}
            />
          </div>
        )}
      </div>
    </div>
  );
}
