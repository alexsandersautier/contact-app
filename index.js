import express from 'express'
import cors from 'cors'
import { router } from './routes.js'

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/v1', router)

app.listen(8000, () => console.log('API running at localhost:8000'))