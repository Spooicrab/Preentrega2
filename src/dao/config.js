import mongoose from "mongoose";

const URI = "mongodb+srv://Coder:House@midatabasecoder.ehu4trq.mongodb.net/EcommerceCoder?retryWrites=true&w=majority"

mongoose.connect(URI).then(() => console.log("Conectado")).catch((error) => console.log(error))
