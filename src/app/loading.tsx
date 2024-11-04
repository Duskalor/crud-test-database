import React from "react";

export default function Loading() {
  return (
    <div className="flex w-full items-center justify-center">
      <svg
        className="icon icon-tabler icons-tabler-outline icon-tabler-loader-2 animate-spin"
        fill="none"
        height="24"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 0h24v24H0z" fill="none" stroke="none" />
        <path d="M12 3a9 9 0 1 0 9 9" />
      </svg>
    </div>
  );
}
