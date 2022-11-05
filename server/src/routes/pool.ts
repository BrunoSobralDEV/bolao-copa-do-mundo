import { FastifyInstance } from "fastify"
import ShortUniqueId from "short-unique-id"
import { z } from "zod"
import { prisma } from "../lib/prisma"

export async function poolRoutes(fastify: FastifyInstance) {
  fastify.get('/pools/count', async () => {
    const count = await prisma.pool.count()

    return { count }
  })

  fastify.post('/pools', async (request, reply) => {
    const createPoolBody = z.object({
      title: z.string()
    })

    const { title } = createPoolBody.parse(request.body)

    const generate = new ShortUniqueId({ length: 6 })
    const code = String(generate()).toUpperCase()
   
    try {
      await request.jwtVerify()

      // código chegar aqui, tenho usuário autenticado
      await prisma.pool.create({
        data: {
          title,
          code,
          ownerId: request.user.sub,

          participants: {
            create: {
              userId: request.user.sub,
            }
          }
        }
      })
    } catch (error) {
      // aqui é porque não tenho um usuário autenticado
      // isso porque a criação do bolão pela web não tem login
      await prisma.pool.create({
        data: {
          title,
          code
        }
      })
    }

    

    return reply.status(201).send({ code })
  })
}


