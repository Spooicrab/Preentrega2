const Mensajes = document.getElementById("Mensajes")
const Nombre = document.getElementById("name")
const Mensaje = document.getElementById("message")
const Chatdiv = document.getElementById("Chat")
const socketclient = io();


console.log("test1")
Mensajes.onsubmit = (e) => {
    e.preventDefault()
    console.log("test2")
    const obj = {
        user: Nombre.value,
        message: Mensaje.value
    }
    socketclient.emit("Mensaje", obj)
}

socketclient.on("OK", (Chats) => {
    console.log("test3")
    Chatdiv.innerHTML = ""
    Chats.forEach((Chat) => {
        const chatMessage = document.createElement("div");
        chatMessage.innerHTML = `<strong>${Chat.user}:</strong> ${Chat.message}`;
        Chatdiv.appendChild(chatMessage)
    })
})