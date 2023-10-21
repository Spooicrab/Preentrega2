import { chat } from "../models/Chat.model.js";

class ChatManager {

    async GetAll() {
        const response = await chat.find().lean();
        return response;
    }
    // 
    async GetById(id) {
        const response = await chat.findById(id);
        return response;
    }
    // 
    async Add(obj) {
        const response = await chat.create(obj)
        return response;
    }
    // 
    async Delete(id) {
        const response = await chat.findByIdAndDelete(id)
        return response;
    }

}

export const Chat = new ChatManager;