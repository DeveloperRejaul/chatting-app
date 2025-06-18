import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
  text: string;
};

export default function Button({ isLoading, text,  ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition flex items-center justify-center ${props.className || ""} ${isLoading || props.disabled ? "opacity-60 cursor-not-allowed" : ""}`}
      disabled={isLoading || props.disabled}
    >
      {isLoading ? (
        <span className="flex items-center">
          <svg
            className="animate-spin h-5 w-5 mr-2 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
          Loading...
        </span>
      ) : text}
    </button>
  );
}