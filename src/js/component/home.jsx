import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

//create your first component
const Home = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  const handleClick = () => {
    setTodos((prev) => [...prev, todo]);
    setTodo("");
  };

  useEffect(() => {
    if (todos.length > 0) {
      fetch("https://playground.4geeks.com/apis/fake/todos/user/httpscammy", {
        method: "PUT",
        body: JSON.stringify(
          todos.map((todo) => ({ label: todo, done: false }))
        ),
        headers: {
          "Content-Type": "application/json",
        },
      }).catch((error) => {
        //error handling
        console.log(error);
      });
    } else if (isLoaded) {
      fetch("https://playground.4geeks.com/apis/fake/todos/user/httpscammy", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((resp) => {
        if (resp.ok) {
          fetch(
            "https://playground.4geeks.com/apis/fake/todos/user/httpscammy",
            {
              method: "POST",
              body: JSON.stringify([]),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
        }
      });
    }
  }, [todos]);

  window.onload = function () {
    fetch("https://playground.4geeks.com/apis/fake/todos/user/httpscammy", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        if (!resp.ok) {
          fetch(
            "https://playground.4geeks.com/apis/fake/todos/user/httpscammy",
            {
              method: "POST",
              body: JSON.stringify([]),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
        }
        return resp.json();
      })
      .then((data) => {
        setTodos(
          data
            .filter((obj) => !obj.label === "example task")
            .map((obj) => obj.label)
        );
        setLoaded(true);
      });
  };

  return (
    <div className="text-center">
      <h1 className="header">My Todos</h1>
      <input
        type="text"
        onChange={(evt) => setTodo(evt.target.value)}
        value={todo}
        onKeyDown={(evt) => {
          if (evt.key === "Enter") {
            setTodos((prev) => [...prev, todo]);
            setTodo("");
          }
        }}
        placeholder="What do you need to do?"
      />

      <button onClick={() => setTodos((prev) => [...prev, todo])}>Send</button>
      <ul>
        {todos.map((data, index) => (
          <li key={`${data}-${index}`}>
            {data}
            <FontAwesomeIcon
              icon={faTrashCan}
              onClick={() => {
                setTodos(
                  todos.filter((data, currentIndex) => index != currentIndex)
                );
              }}
            />
          </li>
        ))}
      </ul>
      <div>{todos.length} tasks</div>
      <button className="task-button" onClick={() => setTodos([])}>
        Clean All Tasks
      </button>
    </div>
  );
};

export default Home;
