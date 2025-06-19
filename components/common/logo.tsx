import Image from "next/image";
import image from "../../public/images/logo.png";

const Logo = () => {
  return (
    <div>
      <div className="flex items-center gap-4">
        <Image src={image} alt="logo picture" width={48} height={48} />
        <h1 className=" text-3xl font-bold ">TegaBus</h1>
      </div>
    </div>
  );
};

export default Logo;
