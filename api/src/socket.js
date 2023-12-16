const { Server } = require('socket.io')
const connectCollection = require('../db/mongodb')


const io = new Server({
    cors:"*"
})

const main = async () => {
    
    io.listen(3002)

io.on("connection", async (socket) => {
    
    // console.log("new user connected")
    socket.on("disconnect", () => console.log("disconected"))


    socket.on("identify", (user) => {
        socket.join(user.toString())
    })
    socket.on("message", (message) => {
        // console.log(message)
        io.sockets.in(message.user.toString()).emit("msg", { user: message.user, msg: message.msg, recepient: message.recepient })

        io.sockets.in(message.recepient.toString()).emit("msg", { user: message.user, msg: message.msg, recepient: message.recepient })
    })
})

}

main()
