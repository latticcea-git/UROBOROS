"use client";

import { useEffect, useState } from "react";
import styles from "./blog.module.css";

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const root = document.documentElement;
      const available = root.scrollHeight - window.innerHeight;
      setProgress(available > 0 ? Math.min(1, Math.max(0, window.scrollY / available)) : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return <div className={styles.readingProgress} aria-hidden="true"><i style={{ transform: `scaleX(${progress})` }} /></div>;
}
