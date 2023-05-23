import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";

const index = () => {
  return <div></div>;
};

export default index;

export const getStaticPaths: GetStaticPaths = async () => {
  // 可能なユーザーIDのリストを取得するためのAPIリクエストを実行する
  //   const response = await fetch("/api/auth/[...nextauth]");
  // APIリクエストのレスポンスからユーザーIDのリストを抽出する
  //   const users = await response.json();
  //   const userIds = users.map((user) => user.id);

  // userIdsを使って動的なパスの一覧を作成する
  //   const paths = userIds.map((id) => ({ params: { id: id.toString() } }));

  // pathsを返す
  return {
    paths: [
      {
        params: { id: "1" },
      },
    ],
    fallback: false, // すべての可能なパスが静的に生成されることを保証する
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // ユーザーIDに基づいてデータを取得するためのAPIリクエストを実行する
  const response = await fetch(`/todos/${params?.id}`);
  // APIリクエストのレスポンスからデータを抽出する
  const data = await response.json();

  // 取得したデータをpropsオブジェクトに追加する
  return {
    props: {
      data,
    },
  };
};

// next.js url パスパラメータ で検索！！！！！！
