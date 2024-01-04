"use client";

import { useState, useEffect } from "react";
import { addTodo, incrementLike, incrementViews } from "../actions";
import { toDo } from "../todo/page";

export default function ViewCount() {
  const [views, setViews] = useState<number>(0);
  const [data, setData] = useState([]);
  const [likes, setLikes] = useState(0)
  console.log("pakistan");
  useEffect(() => {
    const updateViews = async () => {
      const updatedViews = await incrementViews();
      setViews(updatedViews);
    };

    updateViews();
    fetchData();
  }, []);
  const fetchData = async () => {
    const todos = await fetch("http://localhost:3000/api/todos", {
      next: { tags: ["ToDo"] },
    });
    // Parse response to JSON
    const { data } = await todos.json();
    setData(data);
  };

  return (
    <>
      <p>Total Views: {views}</p>
      <br />
      <br />
      <p>Total Likes: {likes}</p>
      <button
        onClick={async () => {
          const updatedLikes = await incrementLike();
          setLikes(updatedLikes)
        }}
      >
        Like
      </button>
      <br />
      <br />
      <h2>Server Actions Demo</h2>
      <div>
        <form action={addTodo} method="POST">
          <div>
            <label htmlFor="email">Email</label>
            <div>
              <input
                id="email"
                name="email"
                type="text"
                placeholder="Email"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="username">Username</label>
            <div>
              <input
                id="username"
                name="username"
                type="text"
                placeholder="Username"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <div>
              <input
                id="pasword"
                name="password"
                type="password"
                placeholder="Password"
                required
              />
            </div>
          </div>
          <br />
          <div>
            <button type="submit" className="bg-amber-500">
              {" "}
              Add Todo
            </button>
          </div>
        </form>
      </div>
      <div className="max-w-xl mx-auto pt-10">
        <h1 className="text-4xl font-bold mb-5">To-Do List</h1>
        <ul>
          {data.map((todo: toDo, index) => (
            <li
              key={index}
              className=" p-4 rounded-lg mb-2 flex justify-between"
            >
              <div>{todo.email}</div>
              <div>{todo.username}</div>
              <div>{todo.password}</div>
              <div className="bg-blue-600 px-2 py-1 rounded text-sm"></div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
