"use client";

import { motion, useScroll, useTransform } from "motion/react";

import classes from "./background.module.scss";

function Background() {
  const { scrollYProgress } = useScroll();
  const background = useTransform(
    scrollYProgress,
    [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6],
    [
      "transparent",
      "rgba(255,56,92,0.1)",
      "rgba(255,56,92,0.2)",
      "rgba(255,56,92,0.3)",
      "rgba(255,56,92,0.4)",
      "rgba(255,56,92,0.5)",
      "rgba(255,56,92,0.6)",
    ]
  );
  return (
    <motion.div
      style={{ background }}
      className={classes.background}
    ></motion.div>
  );
}

export default Background;
