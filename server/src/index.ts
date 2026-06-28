import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from './routes/auth.route.ts'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const port = process.env.PORT || 4000;

app.use('/auth', authRoutes)

app.get("/api/health", (req, res) => {
    res.json({ success: true, data: "server running" })
})

app.listen(port, () => console.log(`App running on ${port}`))