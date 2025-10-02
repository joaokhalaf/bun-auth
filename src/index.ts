import openapi from "@elysiajs/openapi";
import { Elysia } from "elysia";
import { z } from 'zod';
import { betterAuthPlugin, OpenAPI } from "./database/http/plugins/better-auth";
import cors from "@elysiajs/cors";

const app = new Elysia()
.use(cors({
            origin: '*',
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            credentials: true,
            allowedHeaders: ['Content-Type', 'Authorization']
        }))
.use(openapi({
        documentation: {
            components: await OpenAPI.components,
            paths: await OpenAPI.getPaths()
        }
    }))
.use(betterAuthPlugin)
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
