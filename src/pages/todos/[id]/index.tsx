import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Header from "@/components/organisms/Header";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export async function getServerSideProps(context: any) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/signup",
        permanent: false,
      },
    };
  }

  const res = await fetch(
    `http://localhost:3000/api/todo/${session?.user?.id}`,
    {
      method: "GET",
    }
  );
  const todos = await res.json();
  return { props: { todos } };
}

const index = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  return (
    <>
      {/* 一覧へ戻るボタン追加 */}
      <Header />
    </>
  );
};

export default index;
