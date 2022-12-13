import Fastify from "fastify";
import cors from "@fastify/cors";

import { todoRoutes } from "./routes/todo";

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  })

  await fastify.register(cors, {
    origin: true,
  })

  await fastify.register(todoRoutes)

  await fastify.listen({
    port: 3333,
  })
}

bootstrap();