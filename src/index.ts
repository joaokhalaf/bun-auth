import openapi from "@elysiajs/openapi";
import { Elysia } from "elysia";
import { z } from 'zod';

const app = new Elysia()
.use(openapi())
.get("/", () => "Hello Elysia")
.get('/users/:id', ({params}) => {
  const userId = params.id
  return { id: userId, name: '..' }
}, {
  detail: {
    summary: '..',
    tags: ['', '']
  },
  params : z.object ({
    id: z.string(),
  }), 
  response : {
    200: z.object({
      id: z.string(),
      name: z.string()
    })
  }
})
.listen(3333);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
