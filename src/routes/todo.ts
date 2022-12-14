import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";

interface IRequestParams {
    id: string;
  }

export async function todoRoutes(fastify: FastifyInstance) {

  // list todos
  fastify.get('/todos', async () => {
    const todos = await prisma.todo.findMany();

    return { todos }
  })

  //create new todos
  fastify.post('/todo/new', async (request, reply) => {
    const createTodoBody = z.object({
      title: z.string(),
      category: z.string(),
      endDate: z.coerce.date({
        invalid_type_error: "The expected type is a Date",
      }),
      description: z.string(),
    })

    const { title, category, endDate, description } = createTodoBody.parse(request.body);

    const todo = await prisma.todo.create({
      data: {
        title,
        category,
        endDate,
        description,
      }
    })

    if (!todo) {
      return reply.status(400).send({
        message: 'Todo not found.'
      })
    }

    return reply.status(201).send({ todo });
  })

  // change task to completed
  fastify.put<{Params: IRequestParams}>('/todo/:id', async (request, reply) => {
    const { id } = request.params;

    const todo = await prisma.todo.update({
      where: {
        id,
      },
      data: {
        isFinished: true,
      }
    })

    reply.send({ todo })
  })

  // delete todo by id
  fastify.delete<{Params: IRequestParams}>('/todo/:id', async (request, reply) => {
    const { id } = request.params;

    await prisma.todo.delete({
      where: {
        id,
      }
    })

    reply.send({
      "message": "Your todo was deleted",
    })
  })
}
