import express from "express";
import cors from "cors";
import authRoutes from './routes/auth.route.js'
import emailRoutes from './routes/gmail.route.js'
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
app.use(cors())
app.use(express.json())

app.use('/auth', authRoutes)
app.use('/emails', emailRoutes)

// Statis frontend files
app.use(express.static(path.join(__dirname, "../../client/dist")))


app.get('{*splat}', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
});

export default app;