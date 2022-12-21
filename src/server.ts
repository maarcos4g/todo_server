import Fastify from "fastify";
import cors from "@fastify/cors";

import { todoRoutes } from "./routes/todo";

async function bootstrap() {
  const PORT = process.env.PORT || 3333;

  const fastify = Fastify({
    logger: true,
  })

  await fastify.register(cors, {
    origin: true,
  })

  await fastify.register(todoRoutes)

  await fastify.listen(PORT)
}

bootstrap();