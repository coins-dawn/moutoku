'use client'

import { useLoading } from "@/context/LoadingContext"

export const LoadingOverlay = () => {
  const isLoading = useLoading()
  const size = 100
  const color = "#ffffff"
  const segments = 8
  return (<>
    {isLoading &&
      <div className="fixed top-0 left-0 w-full h-full bg-black opacity-20 z-[9999] flex justify-center items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 50 50"
          width={size}
          height={size}
          fill={color}
          aria-label="読み込み中"
          role="img"
        >
          {Array.from({ length: segments }).map((_, i) => (
            <circle
              key={i}
              cx="25"
              cy="4"
              r="4"
              transform={`rotate(${i * (360 / segments)} 25 25)`}
            >
              <animate
                attributeName="opacity"
                from="1"
                to="0.1"
                dur="1s"
                repeatCount="indefinite"
                begin={`${i * (1.00 / segments)}s`}
                restart="whenNotActive"
              />
            </circle>
          ))}
        </svg>
      </div>
    }
  </>)
}