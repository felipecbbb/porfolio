"use client";

import Image from "next/image";

interface BrowserFrameProps {
  src: string;
  alt: string;
  url: string;
  chromeBg?: string;
  chromeFg?: string;
  chromeBorder?: string;
  widthPx?: number;
  heightPx?: number;
  className?: string;
  priority?: boolean;
}

export function BrowserFrame({
  src,
  alt,
  url,
  chromeBg = "#ffffff",
  chromeFg = "rgba(0,0,0,0.4)",
  chromeBorder = "rgba(0,0,0,0.1)",
  widthPx = 1440,
  heightPx = 900,
  className,
  priority = false,
}: BrowserFrameProps) {
  return (
    <div
      className={className}
      style={{
        borderRadius: 10,
        overflow: "hidden",
        boxShadow:
          "0 40px 90px -20px rgba(0,0,0,0.28), 0 0 0 1px rgba(0,0,0,0.06)",
        background: chromeBg,
      }}
    >
      <div
        className="flex items-center gap-2 px-4 py-3"
        style={{
          background: chromeBg,
          borderBottom: `1px solid ${chromeBorder}`,
        }}
      >
        <span
          className="w-2.5 h-2.5 rounded-full"
          style={{ background: "#ff5f57" }}
        />
        <span
          className="w-2.5 h-2.5 rounded-full"
          style={{ background: "#febc2e" }}
        />
        <span
          className="w-2.5 h-2.5 rounded-full"
          style={{ background: "#28c840" }}
        />
        <div
          className="mx-3 flex-1 max-w-md text-center px-3 py-1 rounded-md truncate text-[11px]"
          style={{
            background: chromeBorder,
            color: chromeFg,
            fontFamily: "var(--font-mono), monospace",
          }}
        >
          {url}
        </div>
        <span style={{ width: 30 }} />
      </div>
      <div style={{ position: "relative", aspectRatio: `${widthPx} / ${heightPx}` }}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 80vw"
          className="object-cover object-top"
          priority={priority}
        />
      </div>
    </div>
  );
}

interface PhoneFrameProps {
  src: string;
  alt: string;
  bezel?: string;
  className?: string;
}

export function PhoneFrame({
  src,
  alt,
  bezel = "#0b0f1a",
  className,
}: PhoneFrameProps) {
  return (
    <div
      className={className}
      style={{
        background: bezel,
        borderRadius: 36,
        padding: 10,
        boxShadow:
          "0 30px 60px -15px rgba(0,0,0,0.4), 0 0 0 1px rgba(0,0,0,0.1)",
      }}
    >
      <div
        style={{
          position: "relative",
          aspectRatio: "390 / 844",
          borderRadius: 26,
          overflow: "hidden",
          background: "#000",
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 60vw, 280px"
          className="object-cover object-top"
        />
        {/* notch */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: 8,
            left: "50%",
            transform: "translateX(-50%)",
            width: 100,
            height: 22,
            borderRadius: 20,
            background: bezel,
            zIndex: 10,
          }}
        />
      </div>
    </div>
  );
}
