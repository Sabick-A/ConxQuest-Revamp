import React from "react";

function Alert({setVisible}) {
  return (
    <div className="z-50 h-screen w-full flex items-center justify-center bg-whitesmoke opacity-90">
      <div
        id="alert-additional-content-2"
        class="p-4 mb-4 mx-10 text-red-800 border border-red-300 rounded-lg bg-red-100 dark:bg-gray-800 dark:text-red-400 dark:border-red-800 z-200"
        role="alert"
      >
        <div class="flex items-center">
          <svg
            class="flex-shrink-0 w-4 h-4 me-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span class="sr-only">Info</span>
          <h3 class="text-lg font-medium">
            Thank you for trying our game! 🎮{" "}
          </h3>
        </div>
        <div class="mt-2 mb-4 text-sm font-bold">
          Unfortunately, we’re not supported on mobile yet, but we’re eagerly
          working on it. In the meantime, please give it a try on desktop. We
          appreciate your patience! 😊
        </div>
        <div class="flex">
          <button
            onClick={() => setVisible(false)}
            type="button"
            class="text-red-800 bg-transparent border border-red-800 hover:bg-red-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-red-600 dark:border-red-600 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800"
            data-dismiss-target="#alert-additional-content-2"
            aria-label="Close"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}

export default Alert;
