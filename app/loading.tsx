import Image from "next/image";
import React from "react";
import styles from "./loading.module.css";
// Let's experiment with creating beautiful loading animations using Daisy UI and Tailwind CSS
const LoadingUI = () => {
  return (
    // <div className="btn bg-indigo-400 items-center text-white animate-ping">
    //   Loading...
    // </div>
    // Lading Ui Animation using Tailwind CSS
    // <div className="flex flex-row justify-center">
    //   <span className="absolute flex h-3 w-3">
    //     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
    //     <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
    //     <span className="btn btn-primarty btn-outline">Loading...</span>
    //   </span>
    // </div>
    // Loading UI animation using Daisy UI -->
    // <div className="flex flex-col items-center">
    //   <span className="loading loading-ball loading-lg text-cyan-400 bg-gradient-to-br from-rose-600 to-black"></span>
    //   <span>Loading</span>
    // </div>

    // Water splashing animation red-black
    <div className="flex items-center justify-center h-screen">
      <div className="relative">
        <div
          className={`absolute top-0 left-0 w-16 h-16 bg-red-400 rounded-full ${styles.animateSplash}`}
        ></div>
        <div
          className={`absolute top-0 left-0 w-12 h-12 bg-red-900 rounded-full ${styles.animateSplash}`}
        ></div>
        <div
          className={`absolute top-0 left-0 w-8 h-8 bg-black rounded-full ${styles.animateSplash}`}
        ></div>
      </div>
    </div>
    //Onion Peeling aniumation red-black gradient
    // <div className="flex items-center justify-center h-screen">
    //   <div className="relative">
    //     <div
    //       className={`absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-red-400 to-black rounded-full ${styles.animateOnionPeeling}`}
    //     ></div>
    //     <div
    //       className={`absolute top-0 left-0 w-12 h-12 bg-gradient-to-br from-red-600 to-black rounded-full ${styles.animateOnionPeeling}`}
    //     ></div>
    //     <div
    //       className={`absolute top-0 left-0 w-8 h-8 bg-gradient-to-br from-red-800 to-black rounded-full ${styles.animateOnionPeeling}`}
    //     ></div>
    //   </div>
    // </div>

    // Water droplets squirting from a bottle animation using Tailwind CSS

    // <div className="flex items-center justify-center h-screen">
    //   <div className="relative">
    //     <div
    //       className={`absolute top-0 left-0 w-6 h-6 bg-blue-400 rounded-full ${styles.animateSquirt}`}
    //     ></div>
    //     <div
    //       className={`absolute top-0 left-0 w-4 h-4 bg-blue-500 rounded-full ${styles.animateSquirt}`}
    //     ></div>
    //     <div
    //       className={`absolute top-0 left-0 w-3 h-3 bg-blue-600 rounded-full ${styles.animateSquirt}`}
    //     ></div>
    //   </div>
    // </div>
  );
};

export default LoadingUI;
