import * as dotenv from 'dotenv';
import express from "express";
import mongoose from "mongoose"
import { tokenExtractor } from './utils/middleware';
import cors from "cors"
dotenv.config();

const URI_MONGO: string | undefined = process.env.URI_MONGO;

if (!URI_MONGO) {
  throw new Error('El URI de MongoDB no está definido en las variables de entorno');
}

mongoose.connect(URI_MONGO)
.then(() => {
  console.log("✅ Data base connect");
}).catch((error) => {
    console.log("✖ Error Data base", error.message);
})

import userRegisterRouter from './controllers/userRegister';
import loginRouter from './controllers/userLogin';
import postRouter from './controllers/post';

const app = express();
app.use(express.json());
app.use(tokenExtractor)
app.use(cors())

app.use("/user/register", userRegisterRouter)
app.use("/user/login", loginRouter)
app.use("/user/post", postRouter)
app.use("/user/delete", postRouter)
app.use("/user/edit", postRouter)
export default app;