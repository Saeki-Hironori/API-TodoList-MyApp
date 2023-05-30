import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Header from "@/components/organisms/Header";
import { Box, Button, Select, TextField } from "@mui/material";
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
  const data = await res.json();
  return { props: { data } };
}

const index = ({ data }: any) => {
  const serverTodos = data.todos;
  const [filteredTodos, setFilteredTodos] = useState<TODO[]>(serverTodos);
  const [title, setTitle] = useState("");
  const [effect, setEffect] = useState(true);
  const [filter, setFilter] = useState("all");

  const router = useRouter();
  const { data: session, status } = useSession();

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

  const handleDetailOnClick = (todo: TODO) => {
    router.push({
      pathname: `/todos/${todo.id}`,
      query: { id: `${todo.id}` },
    });
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
              <option value="notStarted">新規</option>
              <option value="doing">進行中</option>
              <option value="done">完了</option>
            </select>
          </div>
        </div>
        <ul>
          {filteredTodos.map((todo: TODO) => (
            <div key={todo.id} style={{ display: "flex" }}>
              <div style={{ flex: "1" }}> </div>
              <li style={{ flex: "4", marginBottom: "10px" }}>
                <Box sx={{}}>
                  <p>{todo.title}</p>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleDetailOnClick(todo)}
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
                </Box>
              </li>
              <div style={{ flex: "1" }}> </div>
            </div>
          ))}
        </ul>
        <Box sx={{ textAlign: "center" }}>
          <TextField
            label="新しいTodo"
            variant="standard"
            value={title}
            onChange={handleOnChange}
            onKeyDown={handleOnKeyDown}
            sx={{ width: "500px" }}
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
