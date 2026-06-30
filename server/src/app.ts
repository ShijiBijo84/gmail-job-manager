import express from "express";
import cors from "cors";
import authRoutes from './routes/auth.route.js'
import emailRoutes from './routes/gmail.route.js'

const app = express()
app.use(cors())
app.use(express.json())



app.use('/auth', authRoutes)
app.use('/emails', emailRoutes)

app.get("/api/health", (req, res) => {
    res.json({ success: true, data: "server running" })
})

export default app;