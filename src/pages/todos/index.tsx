import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";

import Header from "@/components/organisms/Header";
import { Avatar, Box, Button, TextField } from "@mui/material";
import { TODO } from "@/types/type";

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
    `https://api-todolist-myapp.vercel.app/api/todos/${session?.user?.id}`,
    {
      method: "GET",
    }
  );
  const data = await res.json();
  return { props: { data } };
}

const Index = ({ data }: any) => {
  const serverTodos = data.todos;
  const [filteredTodos, setFilteredTodos] = useState<TODO[]>(serverTodos);
  const [title, setTitle] = useState("");
  const [effect, setEffect] = useState(true);
  const [filter, setFilter] = useState("all");

  const router = useRouter();
  const { data: session, status } = useSession();

  console.log("動いた");
  console.log(serverTodos);

  useEffect(() => {
    filterTodos();
  }, [status, effect, filter]);

  const filterTodos = useCallback(() => {
    switch (filter) {
      case "new":
        setFilteredTodos(
          serverTodos.filter((todo: TODO) => todo.status === "new")
        );
        break;
      case "doing":
        setFilteredTodos(
          serverTodos.filter((todo: TODO) => todo.status === "doing")
        );
        break;
      case "done":
        setFilteredTodos(
          serverTodos.filter((todo: TODO) => todo.status === "done")
        );
        break;
      default:
        setFilteredTodos(serverTodos);
    }
  }, [filter]);

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    setTitle(e.target.value);
  };

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Enterのみ通す⇒KeyboardEvent実行中（キー押下中）は動作キャンセル⇒（キー離したら）handleSubmit実行
    if (e.key !== "Enter") return;
    e.preventDefault();
    handleCreateButtonClick();
  };

  const handleCreateButtonClick = async () => {
    if (title !== "") {
      await fetch(
        `https://api-todolist-myapp.vercel.app/api/todos/${session?.user?.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: session?.user?.id,
            title: title,
          }),
        }
      );
      setTitle("");
    } else {
      alert("何か入力せえ");
    }
  };

  const handleDeleteButtonClick = async (todo: TODO) => {
    await fetch(`https://api-todolist-myapp.vercel.app/api/todos/${todo.id}`, {
      method: "DELETE",
    });
  };

  const handleDetailButtonClick = (todo: TODO) => {
    router.push(`/todos/${todo.id}`);
  };

  const statusDisplay = (todo: TODO) => {
    switch (todo.status) {
      case "new":
        return (
          <Avatar sx={{ color: "black", fontSize: "12px", bgcolor: "yellow" }}>
            新規
          </Avatar>
        );
      case "doing":
        return (
          <Avatar sx={{ color: "white", fontSize: "12px", bgcolor: "blue" }}>
            進行中
          </Avatar>
        );
      case "done":
        return (
          <Avatar sx={{ color: "white", fontSize: "12px", bgcolor: "green" }}>
            完了
          </Avatar>
        );
    }
  };

  return (
    <>
      <div>
        <Header />
        <div className="filter">
          <div style={{ textAlign: "center" }}>
            <label>Pick Up : </label>
            <select
              value={filter}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setFilter(e.target.value)
              }
            >
              <option value="all">すべて</option>
              <option value="new">新規</option>
              <option value="doing">進行中</option>
              <option value="done">完了</option>
            </select>
          </div>
        </div>
        <ul>
          {filteredTodos.map((todo: TODO) => (
            <div key={todo.id} style={{ padding: "0 20%" }}>
              <li>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    margin: "5px 0",
                  }}
                >
                  {statusDisplay(todo)}
                  <div
                    style={{ flex: "1", display: "flex", alignItems: "center" }}
                  >
                    <p style={{ flex: "1", margin: "0 20px" }}>{todo.title}</p>
                  </div>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleDetailButtonClick(todo)}
                  >
                    詳細
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDeleteButtonClick(todo)}
                  >
                    削除
                  </Button>
                </Box>
              </li>
            </div>
          ))}
        </ul>
        <Box sx={{ textAlign: "center", padding: "0 20%" }}>
          <TextField
            label="新しいTodo"
            variant="standard"
            value={title}
            onChange={handleOnChange}
            onKeyDown={handleOnKeyDown}
            sx={{ width: "50%" }}
          />
          <Button variant="contained" onClick={handleCreateButtonClick}>
            作成
          </Button>
        </Box>
      </div>
    </>
  );
};

export default Index;
