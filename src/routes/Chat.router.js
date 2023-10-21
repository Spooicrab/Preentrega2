import { Router } from "express";
import { Chat } from "../dao/mongo/Chatmanager.js";

const ChatRouter = Router()

ChatRouter.get("/", async (req, res) => {
    const Mensajes = await Chat.GetAll();
    res.render('Chat', ({ Mensajes }))

})



export default ChatRouter;
