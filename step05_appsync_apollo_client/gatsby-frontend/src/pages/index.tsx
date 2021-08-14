import React, { useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import shortid from "shortid";

const GET_TODOS = gql`
  query {
    getTodos {
      id
      title
      done
    }
  }
`;
const CREATE_TODO = gql`
  mutation createTodo($todo: TodoInput!) {
    addTodo(todo: $todo) {
      id
      title
      done
    }
  }
`;
export default function Home() {
  const [title, setTitle] = useState("");
  const { data, loading } = useQuery(GET_TODOS);
  console.log(data);
  const [createNote] = useMutation(CREATE_TODO);

  const handleSubmit = async () => {
    const todo = {
      id: shortid.generate(),
      title,
      done: false,
    };
    console.log("Creating Todo:", todo);
    setTitle("");
    await createNote({
      variables: {
        todo,
      },
    });
  };

  return (
    <div>
      {loading && <h1>Loading ...</h1>}
      <label>
        Todo:
        <input
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </label>
      <button onClick={() => handleSubmit()}>Create Todo</button>
      {!loading &&
        data &&
        data.getTodos.map((item: any) => (
          <div style={{ marginLeft: "1rem", marginTop: "2rem" }} key={item.id}>
            {item.title} {item.done ? "DONE" : "NOT COMPLETED"}
          </div>
        ))}
    </div>
  );
}
