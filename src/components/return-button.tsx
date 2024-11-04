"use client";
import React from "react";

import {buttonVariants} from "./ui/button";

export function ReturnButton() {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <p className="text-lg text-gray-600 dark:text-gray-300">No bodas found.</p>
      <button
        className={buttonVariants({variant: "default"})}
        type="button"
        onClick={() => window.location.reload()}
      >
        Reload Page
      </button>
    </div>
  );
}
