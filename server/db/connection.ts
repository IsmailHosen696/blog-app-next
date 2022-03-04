import dotenv from 'dotenv'
dotenv.config();
import mongoose from 'mongoose'

export default async function connectToDB() {
    const database_url = process.env.DATABASE_URL as string
    try {
        const con = await mongoose.connect(database_url)
        return con;
    } catch (error) {
        return error
    }
}