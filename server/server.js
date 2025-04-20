import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const app = express()
const PORT = process.env.PORT || 5000

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
console.log("**********************************")
// API routes
app.use('/api', (req, res) => {
  res.json({ message: 'Hello from API' })
})

// Serve Vite-built frontend
const clientDistPath = path.join(__dirname, '../client/dist')
app.use(express.static(clientDistPath))

// Fallback to index.html for React SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(clientDistPath, 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
