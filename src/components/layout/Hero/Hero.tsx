import Title from "@/components/ui/Title";
import Image from "next/image";
import BgImage from "@/assets/bg.png";
import GetStarted_btn from "./GetStarted_btn";
function Hero() {
  return (
    <>
      <div className="flex pt-4 justify-center items-center flex-col space-y-4 min-h-screen">
        <Title>Track Your Brew</Title>
        <GetStarted_btn />
        <Image alt="brewer_image" width={500} height={500} src={BgImage} />
      </div>
    </>
  );
}

export default Hero;
