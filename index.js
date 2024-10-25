import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv"
import cors from "cors";
import authRoutes from './routes/auth.js'
import professorRoutes from './routes/professor.js'
import ratingRoutes from './routes/rating.js'

dotenv.config()
const app = express()

try {
    mongoose.connect(process.env.MONGODB_URI)
    console.log('connected to db')
} catch (error) {
    console.log(error)
}

const PORT =  5000;

//middleware
app.use(express.json())
app.use(cors());



//=======routes========
app.get('/', (req,res) => {
    res.send("Rate my page app")
})
app.use('/api/auth', authRoutes);
app.use('/api/professors', professorRoutes);
app.use('/api/ratings', ratingRoutes);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})