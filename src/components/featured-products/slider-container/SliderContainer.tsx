"use client";

import ProductCard from "../product-card/ProductCard";

import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import { FEATURED_PRODUCTS_CARDSResult } from "@/sanity/types";

import classes from "../featured-products.module.scss";

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
        setItemsPerView(2);
      } else if (width < 1440) {
        setItemsPerView(3);
      } else {
        setItemsPerView(4);
      }
    }
    updateItemsPerView();
    const resizeObserver = new ResizeObserver(updateItemsPerView);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const containerWidth = containerRef.current?.offsetWidth;
  const cardWidth =
    containerWidth && itemsPerView ? containerWidth / itemsPerView : 0;
  const maxIndex = Math.max(0, featuredProducts.length - itemsPerView);

  useEffect(() => {
    setActiveIndex((prev) => Math.min(prev, maxIndex));
  }, [itemsPerView, featuredProducts.length, maxIndex]);

  return (
    <div ref={containerRef} role="region" aria-label="Featured Products slider">
      <motion.div
        className={classes["featured-products__container"]}
        style={{ display: "flex" }}
        animate={{ x: -activeIndex * cardWidth }}
        transition={{ type: "spring", stiffness: 200, damping: 30 }}
        layout
      >
        {featuredProducts.map((product, index) => (
          <motion.div
            key={product._id}
            layout
            style={{
              minWidth: cardWidth || undefined,
              maxWidth: cardWidth || undefined,
            }}
            animate={{
              opacity:
                index >= activeIndex && index < activeIndex + itemsPerView
                  ? 1
                  : 0.5,
            }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </motion.div>
      <div className={classes["featured-products__navigation"]}>
        <button
          className={classes["featured-products__navigation-prev"]}
          onClick={() => setActiveIndex((active) => Math.max(0, active - 1))}
          disabled={activeIndex === 0}
          aria-label="Previous Slide"
        >
          <FaArrowLeft />
        </button>
        <button
          className={classes["featured-products__navigation-next"]}
          onClick={() =>
            setActiveIndex((active) => Math.min(maxIndex, active + 1))
          }
          disabled={
            activeIndex >= maxIndex || featuredProducts.length <= itemsPerView
          }
          aria-label="Next Slide"
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
}
