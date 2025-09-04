import Button from "@/components/ui/Button";
import Title from "@/components/ui/Title";
import Image from "next/image";
function Hero() {
  return (
    <>
      <div className="flex pt-4 justify-center items-center flex-col space-y-4 min-h-screen">
        <Title>Track Your Brew</Title>
        <Button variant="filled" className="mt-5">Get Started</Button>
        <Image alt="" width={700} height={700} src={"/bg.png"} />
      </div>
    </>
  );
}

export default Hero;
