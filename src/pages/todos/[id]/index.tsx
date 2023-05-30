import React from "react";
import Header from "@/components/organisms/Header";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { TODO } from "@/types/type";

type Props = {
  todo: TODO;
  queryParam: string;
};

export async function getServerSideProps(context: any) {
  const session = await getServerSession(context.req, context.res, authOptions);
  const queryParam = (await context.query.id) ?? null;

  if (!session) {
    return {
      redirect: {
        destination: "/signup",
        permanent: false,
      },
    };
  }

  const res = await fetch(`http://localhost:3000/api/todo/${queryParam}`, {
    method: "GET",
  });
  const todo = await res.json();
  return { props: { todo, queryParam } };
}

const index: React.FC<Props> = ({ todo, queryParam }) => {
  console.log(todo);
  console.log(queryParam);

  return (
    <>
      {/* 一覧へ戻るボタン追加 */}
      <Header />
    </>
  );
};

export default index;
