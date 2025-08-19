"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";

import { FEATURED_PRODUCTS_CARDSResult } from "@/sanity/types";
import classes from "../featured-products.module.scss";
import ProductCard from "../product-card/ProductCard";

export default function Slider({
  featuredProducts,
}: {
  featuredProducts: FEATURED_PRODUCTS_CARDSResult;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function updateItemsPerView() {
      const width = window.innerWidth;
      if (width < 640) {
        setItemsPerView(1);
      } else if (width < 1024) {
        setItemsPerView(3);
      } else {
        setItemsPerView(4);
      }
    }

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  const cardWidth = containerRef.current
    ? containerRef.current.offsetWidth / itemsPerView
    : 0;

  const maxIndex = Math.max(0, featuredProducts.length - itemsPerView);

  return (
    <div ref={containerRef}>
      <motion.div
        className={classes["featured-products__container"]}
        animate={{ x: -activeIndex * cardWidth }}
        transition={{ type: "spring", stiffness: 200, damping: 30 }}
        drag="x"
        dragConstraints={{
          left: -(cardWidth * maxIndex),
          right: 0,
        }}
        onDragEnd={(event, info) => {
          const offset = info.offset.x;
          if (Math.abs(offset) > 50 && cardWidth > 0) {
            const direction = offset < 0 ? 1 : -1;
            setActiveIndex((active) =>
              Math.max(0, Math.min(active + direction, maxIndex))
            );
          }
        }}
      >
        {featuredProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </motion.div>
    </div>
  );
}
