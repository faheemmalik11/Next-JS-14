import fs from 'fs';
import { NextRequest } from 'next/server';
import path from 'path';
export type toDo = {
    email: string;
    username: string;
    password: string;
  };
  
export async function GET(request: Request) {
  const filePath = path.join(process.cwd(), 'public', 'data.json');

  const fileContents = fs.readFileSync(filePath, 'utf8');

  const data = JSON.parse(fileContents);

  return Response.json({data})
}
export async function POST(request: NextRequest) {
  const filePath = path.join(process.cwd(), 'public', 'data.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const currentData = JSON.parse(fileContents);
  const data : toDo = await request.json()
  const newTask = {
    email: data.email,
    username: data.username,
    password: data.password
  };
  currentData.push(newTask);
  fs.writeFileSync(filePath, JSON.stringify(currentData, null, 2));
  return Response.json({"status":201,message: 'Task added successfully!'})
}