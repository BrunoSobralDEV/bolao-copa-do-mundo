import { FastifyInstance } from "fastify"
import { z } from "zod"
import { prisma } from "../lib/prisma"


export async function authRoutes(fastify: FastifyInstance) {
  const createUserBody = z.object({
    access_token: z.string(),
  })
  
  fastify.post('/users', async (request, reply) => {
    const { access_token } = createUserBody.parse(request.body)

    const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`,
      }
    })

    const userData = await userResponse.json()

    const userInfoSchema = z.object({
      id: z.string(),
      email: z.string().email(),
      name: z.string(),
      picture: z.string().url(),
    })

    const userInfo = userInfoSchema.parse(userData)

    // Verificar se o usuário já existe no banco
    let user = await prisma.user.findUnique({
      where: {
        googleId: userInfo.id,
      }
    })

    // Senão tiver é porque é um usuário novo, então devemos criá-lo
    if (!user) {
      user == await prisma.user.create({
        data: {
          googleId: userInfo.id,
          name: userInfo.name,
          email: userInfo.email,
          avatarUrl: userInfo.picture,
        }
      })
    }

    
    
    return { userInfo }
  })
}


