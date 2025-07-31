"use client";
import { FaArrowUp } from "react-icons/fa";

export default function ScrollTopBtn({ className }: { className?: string }) {
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  return (
    <button onClick={scrollToTop} className={className}>
      <FaArrowUp /> Back To Top
    </button>
  );
}
