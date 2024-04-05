import Image from "next/image";

type Props = {};

function Avatar({}: Props) {
  return (
    <Image
      className="rounded-full"
      height="30"
      width="30"
      alt="Airbnb Avatar"
      src="/images/placeholder.jpg"
    />
  );
}

export default Avatar;
