import React from "react";
import Image from "next/image";

function loading() {
  return (
    <div className="relative flex justify-center items-center mt-32 align-middle">
      <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500"></div>
      {/* <Image
        src="https://www.svgrepo.com/show/509001/avatar-thinking-9.svg"
        alt="Loading Spinner"
        className="rounded-full h-28 w-28"
        height={28}
        width={28}
      /> */}
    </div>
  );
}

export default loading;
