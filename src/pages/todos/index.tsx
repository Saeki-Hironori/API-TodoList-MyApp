import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Header from "@/components/organisms/Header";
import { Box, Button, TextField } from "@mui/material";
import { TODO } from "@/types/type";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";

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
    `http://localhost:3000/api/todos/${session?.user?.id}`,
    {
      method: "GET",
    }
  );
  const todos = await res.json();
  return { props: { todos } };
}

const index = (data: any) => {
  const [todosSortByCreatedAt, setTodosSortByCreatedAt] = useState<TODO[]>(
    data.todos.todos
  );
  const [title, setTitle] = useState("");
  const [effect, setEffect] = useState(true);
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {}, [status, effect]);

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTitle(e.target.value);
  };

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Enterのみ通す⇒KeyboardEvent実行中（キー押下中）は動作キャンセル⇒（キー離したら）handleSubmit実行
    if (e.key !== "Enter") return;
    e.preventDefault();
    handleCreateOnClick();
  };

  const handleCreateOnClick = async () => {
    if (title !== "") {
      await fetch(`http://localhost:3000/api/todos/${session?.user?.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session?.user?.id,
          title: title,
        }),
      });
      setTitle("");
    } else {
      alert("何か入力せえ");
    }
  };

  const handleDeleteOnClick = async (todo: TODO) => {
    await fetch(`http://localhost:3000/api/todos/${todo.id}`, {
      method: "DELETE",
    });
  };

  return (
    <>
      <div>
        <Header />
        <ul>
          {todosSortByCreatedAt.map((todo: TODO) => (
            <li key={todo.id} style={{ marginBottom: "10px" }}>
              {todo.title}
              <Button
                variant="contained"
                color="success"
                onClick={() => router.push(`/todos/${todo.id}`)}
              >
                詳細
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => handleDeleteOnClick(todo)}
              >
                削除
              </Button>
            </li>
          ))}
        </ul>
        <Box>
          <TextField
            label="新しいTodo"
            variant="standard"
            value={title}
            onChange={handleOnChange}
            onKeyDown={handleOnKeyDown}
          />
          <Button variant="contained" onClick={handleCreateOnClick}>
            作成
          </Button>
        </Box>
      </div>
    </>
  );
};

export default index;
