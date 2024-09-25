const express = require("express")
const app = express()




const port = process.env.PORT || 3000

app.use(express.static('public'))

const server = app.listen(port, () => {
    console.log(`listening on port  ${port}`)
})

let io = require("socket.io")(server)

io.on('connection', (socket) => {

   //console.log(`new connection :${socket.id}`)

   //recive event
    socket.on("comment", (data) => {

     //console.log("comment", data)

      //{ username: 'altaf', comment: 'hey i am',time:Date()}
       data.time=Date()
      socket.broadcast.emit("comment",data)

    })
    
})
