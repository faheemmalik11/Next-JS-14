'use server'

import axios from "axios";
import { revalidateTag } from "next/cache";

 
export async function incrementViews(prevState?: any, formData?: FormData) {
  // ...
  return 22
}

export const addTodo = async (data: FormData) => {
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

  export async function incrementLike() {
    // Mutate database
    // Return updated data
    return 32;
  }