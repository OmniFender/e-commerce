"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function Modal({
  openModal,
  children,
  onCloseModal,
  className,
}: {
  openModal: boolean;
  children: React.ReactNode;
  onCloseModal: () => void;
  className?: string;
}) {
  const modal = useRef<HTMLDialogElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!modal.current) return;
    if (openModal && !modal.current.open) {
      modal.current.showModal();
    } else if (!openModal && modal.current.open) {
      modal.current.close();
    }
  }, [openModal]);

  useEffect(() => {
    const dialog = modal.current;
    if (!dialog) return;
    const handleClose = () => onCloseModal();
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [onCloseModal]);

  if (!mounted) return null;
  return createPortal(
    <dialog
      className={className}
      ref={modal}
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-info"
    >
      {openModal ? children : null}
    </dialog>,
    document.getElementById("modal") || document.body
  );
}
