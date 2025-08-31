"use client";
import { useState, useRef, useEffect } from "react";
import useClickOutside from "@/hooks/use-click-outside/useClickOutside";

import { client } from "@/sanity/lib/client";
import { MAX_PRICE } from "@/sanity/lib/queries";

import { MdKeyboardArrowDown } from "react-icons/md";
import { FaX } from "react-icons/fa6";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import classes from "./filter-price-modal.module.scss";

export default function FilterPriceModal({
  onChange,
}: {
  onChange: (priceRange: [number, number]) => void;
}) {
  const [showModal, setShowModal] = useState(false);
  const [maxprice, setMaxPrice] = useState(0);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, maxprice]);

  const filterRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const showResult = priceRange[0] !== 0 || priceRange[1] !== maxprice;

  const handleShowFilter = () => {
    setShowModal((prev) => !prev);
  };

  const handleSliderChange = (value: number | number[]) => {
    if (Array.isArray(value) && value.length === 2) {
      setPriceRange([value[0], value[1]]);
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        onChange([value[0], value[1]]);
      }, 300);
    }
  };

  useClickOutside(filterRef, () => {
    setShowModal(false);
  });

  const handleClearFilter = () => {
    setPriceRange([0, maxprice]);
    onChange([0, maxprice]);
  };

  useEffect(() => {
    (async function fetchMaxPrice() {
      try {
        const result = await client.fetch(MAX_PRICE);
        setMaxPrice(result?.price ?? 0);
        setPriceRange([0, result?.price ?? 0]);
      } catch (err) {
        console.error("Error fetching max price:", err);
      }
    })();
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  return (
    <div className={classes.FilterPriceModal} ref={filterRef}>
      <div className={classes.FilterPriceModal__container}>
        <div
          className={classes.FilterPriceModal__button}
          role="button"
          tabIndex={0}
          aria-haspopup="dialog"
          aria-expanded={showModal}
          onClick={handleShowFilter}
        >
          <span className={classes["FilterPriceModal__button-text"]}>
            Price
          </span>
          <span
            className={`${classes["FilterPriceModal__button-arrow"]} ${showModal ? classes["FilterPriceModal__button-arrow--active"] : ""}`}
          >
            <MdKeyboardArrowDown />
          </span>
        </div>
        {showModal && (
          <div>
            <div
              className={classes["FilterPriceModal__modal"]}
              role="dialog"
              aria-modal="true"
            >
              <span> $ {priceRange[0]}</span>
              <Slider
                styles={{
                  track: {
                    backgroundColor: "var(--accent-color)",
                    height: 4,
                  },
                  rail: {
                    backgroundColor: "var(--bg-secondary-color)",
                    height: 6,
                  },
                  handle: {
                    backgroundColor: "var(--accent-color)",
                    border: "2px solid var(--bg-primary-color)",
                    boxShadow: "none",
                  },
                }}
                range
                min={0}
                max={maxprice}
                value={priceRange}
                onChange={handleSliderChange}
                className={classes["FilterPriceModal__slider"]}
              />
              <span> $ {priceRange[1]}</span>
            </div>
          </div>
        )}
      </div>
      {showResult && (
        <div className={classes["FilterPriceModal__result"]}>
          <span>
            ${priceRange[0]} - ${priceRange[1]}
          </span>
          <span
            className={classes["FilterPriceModal__result-clear"]}
            onClick={handleClearFilter}
          >
            <FaX />
          </span>
        </div>
      )}
    </div>
  );
}