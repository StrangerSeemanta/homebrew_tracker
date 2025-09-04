import Image from "next/image";
import React from "react";
import AccBg from "@/assets/account_boy_text.png";
import SignInForm from "@/components/layout/account/Forms/SignInForm";
function AccountLogInPage() {
  return (
    <section className="min-h-screen w-full flex flex-col justify-center items-center gap-10 px-5">
      <div className="grid place-items-center grid-cols-1 lg:grid-cols-2 gap-10 px-5">
        <SignInForm />
        <Image
          alt=""
          width={500}
          height={500}
          src={AccBg}
          className="select-none not-lg:hidden"
        />
      </div>
    </section>
  );
}

export default AccountLogInPage;
