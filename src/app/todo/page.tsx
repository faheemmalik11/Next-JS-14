import axios from "axios";
import { revalidateTag } from "next/cache";
export type toDo = {
    email: string;
    username: string;
    password: string;
  };
export const addTodo = async (data: FormData) => {
    'use server';
    // Logic to mutate form data...
    const email = data.get("email")?.toString();
    const username = data.get("username")?.toString();
    const password = data.get("password")?.toString();
    const newTodoBody = {
      email: email,
      username: username,
      password: password
    };
    // // Post new Todo to our mock database
    await axios.post("http://localhost:3000/api/todos", newTodoBody);
    revalidateTag("ToDo");
    // // Redirect them back to the Homepage
    // redirect("/todo");


   
  };
export default async function TodoList() {
    const todos = await fetch("http://localhost:3000/api/todos", {
        next: { tags: ["ToDo"] },
      });
      // Parse response to JSON
      const { data } = await todos.json();
    return (
      <>
       <h2>Server Actions Demo</h2>
          <div>
            <form action={addTodo} method="POST">
              <div>
                <label htmlFor="email">Email</label>
                <div>
                  <input id="email" name="email" type="text"
                    placeholder="Email"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="username">Username</label>
                <div>
                  <input id="username" name="username" type="text"
                    placeholder="Username"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <div>
                  <input id="pasword" name="password" type="password"
                    placeholder="Password"
                    required
                  />
                </div>
              </div>
              <br />
              <div>
                <button type="submit" className="bg-amber-500"> Add Todo</button>
              </div>
            </form>
          </div>
          <div className="max-w-xl mx-auto pt-10">
      <h1 className="text-4xl font-bold mb-5">To-Do List</h1>
      <ul>
        {data.map((todo: toDo) => (
          <li
            key={todo.username}
            className=" p-4 rounded-lg mb-2 flex justify-between"
          >
            <div>{todo.email}</div>
            <div>{todo.username}</div>
            <div>{todo.password}</div>
            <div className="bg-blue-600 px-2 py-1 rounded text-sm">
              
            </div>
          </li>
        ))}
      </ul>
    </div>
      </>
    );
  }