
$(function () {
  //make connection
  var socket = io.connect('http://localhost:3000')

  //Deklarasi
  var send_message = $("#send_message")
  var simpan = $("#simpan")

  //Emit message
  send_message.click(function () {
    socket.emit("message", 'mulai')
  })

  //Emit message
  socket.on('berat', data => {
    console.log(data)
  })

   //emit simpan
   simpan.click(function () {
    socket.emit("AppSimpan", 'simpan')
  })

  socket.on('ViewSimpan', data => {
    console.log(data)
  })
});
