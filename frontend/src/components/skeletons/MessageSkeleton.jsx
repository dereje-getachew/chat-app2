import React from "react";

const MessageSkeleton = () => {
  return (
    <div className="h-screen flex flex-col">
      {/* Header skeleton */}
      <div className="p-3 border-b border-base-300 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-base-300 animate-pulse" />
          <div className="flex flex-col gap-2">
            <div className="w-24 h-4 bg-base-300 rounded-md animate-pulse" />
            <div className="w-16 h-3 bg-base-200 rounded-md animate-pulse" />
          </div>
        </div>
        <div className="w-8 h-8 rounded-full bg-base-200 animate-pulse" />
      </div>

      {/* Messages skeleton */}
      <div className="flex-1 overflow-y-auto p-4">
        {Array(8)
          .fill(null)
          .map((_, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <div
                key={idx}
                className={`flex items-start gap-3 mb-4 ${
                  isLeft ? "justify-start" : "justify-end"
                }`}
              >
                {/* Avatar (left side) */}
                {isLeft && (
                  <div className="w-10 h-10 rounded-full bg-base-300 animate-pulse" />
                )}

                {/* Message bubble */}
                <div className="flex flex-col gap-2 max-w-[70%]">
                  <div
                    className={`h-4 rounded-md animate-pulse ${
                      isLeft ? "bg-base-300" : "bg-base-200"
                    } w-40`}
                  />
                  <div
                    className={`h-4 rounded-md animate-pulse ${
                      isLeft ? "bg-base-300" : "bg-base-200"
                    } w-28`}
                  />
                </div>

                {/* Avatar (right side) */}
                {!isLeft && (
                  <div className="w-10 h-10 rounded-full bg-base-300 animate-pulse" />
                )}
              </div>
            );
          })}
      </div>

      {/* Input skeleton */}
      <div className="p-3 border-t border-base-300 flex items-center gap-3">
        <div className="flex-1 h-10 bg-base-200 rounded-lg animate-pulse" />
        <div className="w-10 h-10 bg-base-300 rounded-full animate-pulse" />
      </div>
    </div>
  );
};

export default MessageSkeleton;
