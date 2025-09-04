import Image from "next/image";
import React from "react";
import AccBg from "@/assets/account_boy_text.png";
import Title from "@/components/ui/Title";
function GettingStarted() {
  return (
    <section>
      <div className="relative">
        <Title>Let Me Go ! ! !</Title>
        <Image alt="" width={300} height={300} src={AccBg} className=""/>
      </div>
    </section>
  );
}

export default GettingStarted;
