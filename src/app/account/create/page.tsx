import SignUpForm from "@/components/layout/account/Forms/SignUpForm";
import React from "react";

function CreateAccountPage() {
  return (
    <section className="min-h-screen w-full flex flex-col justify-center items-center gap-10 p-6">
      <SignUpForm />
    </section>
  );
}

export default CreateAccountPage;
