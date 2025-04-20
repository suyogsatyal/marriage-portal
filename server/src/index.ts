import express from 'express'
import path from 'path'
import cors from 'cors'
import dotenv from 'dotenv'
import { Request, Response } from 'express'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// Serve API routes
import authRouter from './routes/auth'
import applicationRouter from './routes/marriageApplication.route'
app.use('/api/auth', authRouter)
app.use('/api', applicationRouter)

// Serve Vite frontend
const clientDistPath = path.resolve(__dirname, '../../client/dist')
app.use(express.static(clientDistPath))

// ✅ React route fallback (non-API)
app.get(/^\/(?!api).*/, (req: Request, res: Response) => {
  res.sendFile(path.join(clientDistPath, 'index.html'))
})

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`)
})
