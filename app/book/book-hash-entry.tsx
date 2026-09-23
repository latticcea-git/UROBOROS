"use client";

import { useEffect } from "react";

export default function BookHashEntry() {
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;

    const align = () => {
      const target = document.getElementById(id);
      if (!target) return;
      const headerOffset = window.innerWidth <= 760 ? 154 : 170;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - headerOffset, behavior: "auto" });
    };

    align();
    const first = window.setTimeout(align, 180);
    const settled = window.setTimeout(align, 900);
    return () => {
      window.clearTimeout(first);
      window.clearTimeout(settled);
    };
  }, []);

  return null;
}
