import * as dotenv from 'dotenv';
import express from "express";
import mongoose from "mongoose"
dotenv.config();

const app = express();
app.use(express.json());

const URI_MONGO: string | undefined = process.env.URI_MONGO;

if (!URI_MONGO) {
  throw new Error('El URI de MongoDB no está definido en las variables de entorno');
}

mongoose.connect(URI_MONGO)
.then(() => {
  console.log("✅ Data base connect");
}).catch(() => {
    console.log("✖ Error Data base");
})

import userRegisterRouter from './controllers/userRegister';
import loginRouter from './controllers/userLogin';

app.use("/user/register", userRegisterRouter)
app.use("/user/login", loginRouter)


export default app;