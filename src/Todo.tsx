import styled from "@emotion/styled";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

const TodoWrapper = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 1em;
`;

interface ITodos {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}

const Todo = () => {
  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const [todos, setTodos] = useState<ITodos[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [editing, setEditing] = useState(false);
  const [editTodoId, setEditTodoId] = useState<number | null>(null);

  useEffect(() => {
    axios
      .get("https://www.pre-onboarding-selection-task.shop/todos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setTodos(res.data))
      .catch((err) => console.log(err));
  }, []);

  const addHandle = async () => {
    await axios
      .post(
        "https://www.pre-onboarding-selection-task.shop/todos",
        {
          todo: newTodo,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setTodos((prev) => [res.data, ...prev]);
        setNewTodo("");
      })
      .catch((err) => console.log(err));
  };

  const handleComplete = (todo: string, id: number) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        const updatedTodo = { ...todo, isCompleted: !todo.isCompleted };
        axios
          .put(
            `https://www.pre-onboarding-selection-task.shop/todos/${id}`,
            {
              todo: updatedTodo.todo,
              isCompleted: updatedTodo.isCompleted,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          )
          .then((res) => console.log(res.data))
          .catch((err) => console.log(err));
        return updatedTodo;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const editToggle = (id: number) => {
    setEditing(true);
    setEditTodoId(id);
  };

  const submitHandle = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.currentTarget;
    const data = new FormData(target);
    const editTodo = data.get("editTodo");
    const todoObj = { ...todos.filter((todo) => todo.id === editTodoId)[0] };
    axios
      .put(
        `https://www.pre-onboarding-selection-task.shop/todos/${editTodoId}`,
        {
          todo: editTodo,
          isCompleted: todoObj.isCompleted,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        const updatedTodo = res.data;
        setTodos((prevTodos) => {
          const updatedTodoIndex = prevTodos.findIndex(
            (todo) => todo.id === updatedTodo.id
          );
          const updatedTodos = [
            ...prevTodos.slice(0, updatedTodoIndex),
            updatedTodo,
            ...prevTodos.slice(updatedTodoIndex + 1),
          ];
          return updatedTodos;
        });
      })
      .catch((err) => console.log(err));

    setEditing(false);
  };

  const handleDelete = async (id: number) => {
    await axios
      .delete(`https://www.pre-onboarding-selection-task.shop/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 204) {
          setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          component="form"
          noValidate
          onSubmit={submitHandle}
          sx={{ mt: 4, width: "100%" }}
        >
          <div style={{ display: "flex", gap: "10px", marginBottom: "1em" }}>
            <input
              style={{ width: "100%", padding: "1em", fontSize: "18px" }}
              placeholder="Write To do"
              data-testid="new-todo-input"
              name="newTodo"
              value={newTodo}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setNewTodo(e.currentTarget.value);
              }}
            />
            <Button
              data-testid="new-todo-add-button"
              onClick={addHandle}
              variant="contained"
            >
              추가
            </Button>
          </div>
          {todos &&
            todos.map((todo) => (
              <TodoWrapper key={todo.id}>
                <Checkbox
                  checked={todo.isCompleted}
                  onChange={() => handleComplete(todo.todo, todo.id)}
                />
                {editing && editTodoId === todo.id ? (
                  <div style={{ display: "flex", width: "100%" }}>
                    <input
                      data-testid="modify-input"
                      name="editTodo"
                      defaultValue={todo.todo}
                      style={{
                        width: "100%",
                        padding: "1em",
                        fontSize: "18px",
                      }}
                    />
                    <div
                      style={{
                        display: "flex",
                        gap: "4px",
                        alignItems: "center",
                        marginLeft: "1em",
                      }}
                    >
                      <Button
                        data-testid="submit-button"
                        type="submit"
                        variant="contained"
                      >
                        제출
                      </Button>
                      <Button
                        data-testid="cancel-button"
                        variant="contained"
                        onClick={() => setEditing(false)}
                      >
                        취소
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <Typography variant="subtitle2">{todo.todo}</Typography>
                    <div>
                      <Button
                        sx={{ mr: 1 }}
                        data-testid="modify-button"
                        size="small"
                        variant="contained"
                        onClick={() => editToggle(todo.id)}
                      >
                        수정
                      </Button>
                      <Button
                        data-testid="delete-button"
                        size="small"
                        variant="contained"
                        onClick={() => handleDelete(todo.id)}
                      >
                        삭제
                      </Button>
                    </div>
                  </>
                )}
              </TodoWrapper>
            ))}
        </Box>
      </Box>
    </Container>
  );
};
export default Todo;
