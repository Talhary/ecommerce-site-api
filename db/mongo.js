import { connect } from "mongoose"
import 'dotenv/config'

export default async()=>{
   try {
     await connect(process.env.MONGO_URI)
   } catch (error) {
     throw new Error(error)
   }
}