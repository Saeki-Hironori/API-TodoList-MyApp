import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import prisma from "../../../prisma/prisma";
import Header from "@/components/organisms/Header";

const index = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") router.push("/signup");
    console.log(session);
  }, [status]);

  return (
    <>
      <div>
        <Header />
      </div>
    </>
  );
};

export default index;
