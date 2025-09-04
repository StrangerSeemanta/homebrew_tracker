"use client";

import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";

function GetStarted_btn() {
  const router = useRouter();
  return (
    <Button
      onClick={() => router.push("/dashboard")}
      variant="filled"
      className="mt-5"
    >
      Get Started
    </Button>
  );
}

export default GetStarted_btn;
