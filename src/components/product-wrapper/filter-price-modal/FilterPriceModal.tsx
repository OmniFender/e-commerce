"use client";
import { useState } from "react";

import { MdKeyboardArrowDown } from "react-icons/md";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import classes from "./filter-price-modal.module.scss";

export default function FilterPriceModal({
  onChange,
  max,
}: {
  onChange: (sortTerm: string, priceRange: [number, number]) => void;
  max: number;
}) {
  const [showModal, setShowModal] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, max]);

  const handleShowFilter = () => {
    setShowModal((prev) => !prev);
  };

  const handleSliderChange = (value: number | number[]) => {
    if (Array.isArray(value) && value.length === 2) {
      setPriceRange([value[0], value[1]]);
      onChange("", [value[0], value[1]]);
    }
  };

  return (
    <div className={classes.FilterPriceModal}>
      <div
        className={classes.FilterPriceModal__button}
        role="button"
        tabIndex={0}
        aria-haspopup="dialog"
        aria-expanded={showModal}
        onClick={handleShowFilter}
      >
        <span className={classes["FilterPriceModal__text"]}>Price</span>
        <MdKeyboardArrowDown className={classes["FilterPriceModal__arrow"]} />
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
                },
                rail: {
                  backgroundColor: "var(--bg-secondary-color)",
                },
                handle: {
                  backgroundColor: "var(--accent-color)",
                  border: "2px solid var(--bg-primary-color)",
                  boxShadow: "none",
                },
              }}
              range
              min={0}
              max={max}
              value={priceRange}
              onChange={handleSliderChange}
              className={classes["FilterPriceModal__slider"]}
            />
            <span> $ {priceRange[1]}</span>
          </div>
        </div>
      )}
    </div>
  );
}
