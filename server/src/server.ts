import Fastify from 'fastify'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
    log: ['query'],
})

async function bootstrap() {
    const fastify = Fastify({
        logger: true, //gerar logs
    })

    // CONTAGEM DE BOLÕES
    fastify.get('/pools/count', async () => {
        const count = await prisma.pool.count()

        // const pools = await prisma.pool.findMany({
        //     where: {
        //         code: {
        //             startsWith: 'B'
        //         }
        //     }
        // })

        return { count }
    })

    await fastify.listen({ port: 3333 })
}

bootstrap()