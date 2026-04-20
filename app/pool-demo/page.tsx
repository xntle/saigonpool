"use client";

import { useEffect } from "react";
import WaterCanvas from "../water";

export default function PoolDemo() {
  useEffect(() => {
    const prev = document.body.style.background;
    document.body.style.background = "transparent";
    return () => { document.body.style.background = prev; };
  }, []);

  return (
    <div style={{ position: "fixed", inset: 0 }}>
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: "url('/photos/tilebg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }} />
      <WaterCanvas />
    </div>
  );
}
