const express = require("express");
const app = express();
//Menggunakan view engine ejs
app.set("view engine", "ejs");

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//middlewarenya
app.use(express.static("public"));
//routes
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/control", (req, res) => {
    res.render("control");
  });

  

//Listen menggunakan port 3000
server = app.listen(3000);

//instantitation atau pembuatan object spesifik socket.io
const io = require("socket.io")(server, { origins: '*:*'});

//listen on untuk semua koneksi
io.on("connection",  socket => {
  // console.log('New user connected')

  // //pemberian nama awal
  // socket.username = "Anonymous"

  // //listen ketika nama diganti
  // socket.on('change_username', (data) => {
  //     socket.username = data.username
  // })

  //listen on Pesan baru coek
  socket.on("message", data => {
      console.log(data)
    // //broadcast the new message
    // io.sockets.emit('new_message', {message : data.message, username : socket.username});
    if (data === "mulai") {
        var target = 8000
        var lama = 4000
        var interval = 200

        var start = new Date();
        var angkaInterval = setInterval(() => {
          var skrg = new Date();
          var selisihWaktu = skrg - start;
          var persentase = selisihWaktu / lama;
          var hasil = lerp(0, target, persentase);
          console.log(hasil)
          io.emit("berat",hasil.toFixed(2));
          if (persentase > 1) clearInterval(angkaInterval); // batalkan interval kalau sudah lebih capai 100 persen
        }, interval);

    }
  });

  // //listen ketika melakukan typing
  // socket.on('typing', (data) => {
  // 	socket.broadcast.emit('typing', {username : socket.username})
  // })

  // server olah data
});

var lerp = function(dari, ke, n) {
  // n diisi dengan nilai 0 s/d 1
  if (n > 1) return ke;
  else if (n < 0) return dari;
  return dari + (ke - dari) * n;
};
