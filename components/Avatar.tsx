import Image from "next/image";
import React from "react";

interface Avatar {
  src: string | null | undefined;
}

const Avatar: React.FC<Avatar> = ({ src }) => {
  return (
    <Image
      className="rounded-full"
      height="30"
      width="30"
      alt="Airbnb Avatar"
      src={src || "/images/placeholder.jpg"}
    />
  );
};

export default Avatar;
