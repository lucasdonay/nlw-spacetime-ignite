import fastisy from 'fastify'
import { memoriesRoutes } from './routes/memories'
import cors from '@fastify/cors'

const app = fastisy()

app.register(cors, {
  origin: true,
})

app.register(memoriesRoutes)

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP server running on http://localhost:3333')
  })
