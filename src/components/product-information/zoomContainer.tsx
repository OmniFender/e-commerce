"use client";

import { urlFor } from "@/sanity/lib/image";
import { PRODUCT_BY_SLUGResult } from "@/sanity/types";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/styles.min.css";

export default function ZoomContainer({
  productImage,
  className,
}: {
  productImage: NonNullable<NonNullable<PRODUCT_BY_SLUGResult>["productImage"]>;
  className?: string;
}) {
  if (!productImage || !productImage.asset) {
    return (
      <div
        className={className}
        style={{ textAlign: "center", padding: "2rem" }}
      >
        <span>No image available</span>
      </div>
    );
  }

  const src = urlFor(productImage)
    .width(600)
    .height(750)
    .quality(90)
    .auto("format")
    .url();
  const zoomSrc = urlFor(productImage)
    .width(1200)
    .height(1500)
    .quality(100)
    .auto("format")
    .url();

  if (!src || !zoomSrc) {
    return (
      <div
        className={className}
        style={{ textAlign: "center", padding: "2rem" }}
      >
        <span>Image not found</span>
      </div>
    );
  }

  return (
    <InnerImageZoom
      src={src}
      zoomSrc={zoomSrc}
      zoomType="click"
      zoomPreload={true}
      hasSpacer={true}
      fadeDuration={200}
      className={className}
    />
  );
}
