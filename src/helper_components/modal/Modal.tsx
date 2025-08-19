"use client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function CheckoutModal({
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
    if (openModal) {
      modal.current?.showModal();
    } else {
      modal.current?.close();
    }
  }, [openModal]);

  if (!mounted) return null;
  return createPortal(
    <dialog className={className} ref={modal} onClose={onCloseModal}>
      {openModal ? children : null}
    </dialog>,
    document.getElementById("modal") || document.body
  );
}
