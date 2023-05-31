import React, { useState } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { useRouter } from "next/router";

import { Button, TextField } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { TODO } from "@/types/type";
import Header from "@/components/organisms/Header";

type Props = {
  data: {
    getTodo: TODO;
    message: string;
  };
};

export async function getServerSideProps(context: any) {
  const session = await getServerSession(context.req, context.res, authOptions);
  const pathParam = context.params.id;

  if (!session) {
    return {
      redirect: {
        destination: "/signup",
        permanent: false,
      },
    };
  }

  const res = await fetch(`http://localhost:3000/api/todo/${pathParam}`, {
    method: "GET",
  });
  const data = await res.json();
  return { props: { data } };
}

const Index = ({ data }: any) => {
  const todo = data.getTodo;
  const [status, setStatus] = useState(todo.status);
  const [title, setTitle] = useState(todo.title);
  const [detail, setDetail] = useState(todo.detail);
  const [createdAt, setCreatedAt] = useState(new Date(todo.createdAt));
  const [updatedAt, setUpdatedAt] = useState(new Date(todo.updatedAt!));

  const router = useRouter();
  const createdAtToLocale = createdAt.toLocaleString();
  const updatedAtToLocale = updatedAt.toLocaleString();

  const handleBackButtonClick = () => {
    router.push("/todos");
  };

  const handleUpdateButtonClick = async () => {
    await fetch(`http://localhost:3000/api/todo/${todo.id}`, {
      method: "PUT",
      body: JSON.stringify({ status, title, detail, createdAt }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <>
      <Header />
      <br />
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={handleBackButtonClick}
      >
        一覧へ戻る
      </Button>
      <ul>
        <li>
          <div>
            status :
            <select
              value={status}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setStatus(e.target.value)
              }
            >
              <option value="new">新規</option>
              <option value="doing">進行中</option>
              <option value="done">完了</option>
            </select>
          </div>
        </li>
        <li>
          title :
          <TextField
            id="standard-basic"
            variant="standard"
            defaultValue={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </li>
        <li>
          detail :
          <TextField
            id="standard-basic"
            variant="standard"
            defaultValue={detail}
            onChange={(e) => {
              setDetail(e.target.value);
            }}
          />
        </li>
        <li>createdAt : {createdAtToLocale}</li>
        <li>updatedAt : {updatedAtToLocale}</li>
      </ul>
      <Button variant="outlined" onClick={handleUpdateButtonClick}>
        更新する
      </Button>
    </>
  );
};

export default Index;
