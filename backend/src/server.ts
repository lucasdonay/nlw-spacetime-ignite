import 'dotenv/config'

import fastisy from 'fastify'
import { memoriesRoutes } from './routes/memories'
import { authRoutes } from './routes/auth'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import multipart from '@fastify/multipart'
import { uploadRoutes } from './routes/upload'
import { resolve } from 'path'

const app = fastisy()

app.register(require('@fastify/static'), {
  root: resolve(__dirname, '../uploads'),
  prefix: '/uploads',
})

app.register(jwt, {
  secret: 'spacetime',
})

app.register(cors, {
  origin: true,
})

app.register(multipart)

app.register(authRoutes)
app.register(uploadRoutes)

app.register(memoriesRoutes)

app
  .listen({
    port: 3333,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log('HTTP server running on http://localhost:3333')
  })
