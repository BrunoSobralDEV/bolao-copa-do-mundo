import Fastify from 'fastify'

async function bootstrap() {
    const fastify = Fastify({
        logger: true, //gerar logs
    })

    fastify.get('/pools/count', () => {
        return { count: 5616551 }
    })

    await fastify.listen({ port: 3333 })
}

bootstrap()