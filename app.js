const express = require('express')
const app = express()


//Menggunakan view engine ejs
app.set('view engine', 'ejs')

//middlewarenya
app.use(express.static('public'))


//routes
app.get('/', (req, res) => {
	res.render('index')
})

//Listen menggunakan port 3000
server = app.listen(3000)



//instantitation atau pembuatan object spesifik socket.io 
const io = require("socket.io")(server)


//listen on untuk semua koneksi
io.on('connection', (socket) => {
	console.log('New user connected')

	//pemberian nama awal
	socket.username = "Anonymous"

    //listen ketika nama diganti
    socket.on('change_username', (data) => {
        socket.username = data.username
    })

    //listen on Pesan baru coek
    socket.on('new_message', (data) => {
        //broadcast the new message
        io.sockets.emit('new_message', {message : data.message, username : socket.username});
    })

    //listen ketika melakukan typing
    socket.on('typing', (data) => {
    	socket.broadcast.emit('typing', {username : socket.username})
    })
})
