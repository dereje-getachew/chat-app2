// AuthImagePattern.jsx
import React from "react";

export const AuthImagePattern = ({
  title = "Create Account",
  subtitle = "Get started with your account",
}) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
      <div className="max-w-md text-center">
        {/* 3x3 Diamond Squares */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className={[
                "size-20", // big squares
                "rounded-md", // slight border radius
                "border border-primary/40", // outline only
                "bg-white",
                "animate-pulse",
                // staggered animation delays
                [1, 3, 5, 7].includes(i) ? "anim-delay-200" : "",
                i === 4 ? "anim-delay-400" : "",
                // fade corners to emphasize diamond shape
                [0, 2, 6, 8].includes(i) ? "opacity-40" : "opacity-100",
              ].join(" ")}
            ></div>
          ))}
        </div>

        <h2 className="text-lg font-semibold text-base-content">{title}</h2>
        <p className="text-sm text-base-content/70">{subtitle}</p>
      </div>
    </div>
  );
};
