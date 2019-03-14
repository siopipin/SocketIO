const express = require("express");
const cors = require('cors');
const app = express();
var ip = require("ip");
console.dir(ip.address());
app.use(cors())
//Menggunakan view engine ejs
app.set("view engine", "ejs");


//middlewarenya
app.use(express.static("public"));
//routes
app.get("/", (req, res, next) => {
  res.render("index");
});

app.get("/control", (req, res, next) => {
  res.render("control");
});


//Listen menggunakan port 3000
server = app.listen(3000);

//instantitation atau pembuatan object spesifik socket.io
const io = require("socket.io")(server);

//listen on untuk semua koneksi
io.on("connection", socket => {
  console.log('New client connected')

  //listen on Pesan baru coek
  socket.on("berat", data => {
    console.log(data)
    // //broadcast the new message
    // io.sockets.emit('new_message', {message : data.message, username : socket.username});
    if (data === "hitung") {
      var target = Math.floor((Math.random() * 100) + 1)
      var lama = Math.floor((Math.random() * 4000) + 1)
      var interval = 10

      var start = new Date();
      var angkaInterval = setInterval(() => {
        var skrg = new Date();
        var selisihWaktu = skrg - start;
        var persentase = selisihWaktu / lama;
        var hasil = lerp(0, target, persentase);
        var addr = ip.address();
        console.log(hasil)
        io.emit("berat", { hasil: hasil.toFixed(2), satuan: "KG", ipaddress: addr });
        if (persentase > 1) clearInterval(angkaInterval); // batalkan interval kalau sudah lebih capai 100 persen
      }, interval);

    }
  });


  socket.on("mAuto", data => {
    console.log(data)
    // //broadcast the new message
    // io.sockets.emit('new_message', {message : data.message, username : socket.username});
    if (data === "hitung") {

      var i = 1;
      var waktuTunggu = Math.floor((Math.random() * 5500)+1)

      function myLoop() {
        setTimeout(function () {
          var target = Math.floor((Math.random() * 100) + 1)
          var lama = Math.floor((Math.random() * 4000) + 1)
          var interval = 10


          var start = new Date();
          var angkaInterval = setInterval(() => {
            var skrg = new Date();
            var selisihWaktu = skrg - start;
            var persentase = selisihWaktu / lama;
            var hasil = lerp(0, target, persentase);
            var addr = ip.address();
            console.log(hasil)
            io.emit("mAuto", { hasil: hasil.toFixed(2), satuan: "KG", ipaddress: addr });
            if (persentase > 1) clearInterval(angkaInterval); // batalkan interval kalau sudah lebih capai 100 persen
          }, interval);

          i++;

          if (i < 20){
            myLoop()
          }
        }, waktuTunggu)
      }

      myLoop();


    }
  });

  //catatan
  socket.on("AppSimpan", data => {
    if (data === "simpan") {
      var pesan = "Truk"
      console.log(pesan)
      io.emit("ViewSimpan", pesan)
    }
  });

  // server olah data
});

var lerp = function (dari, ke, n) {
  // n diisi dengan nilai 0 s/d 1
  if (n > 1) return ke;
  else if (n < 0) return dari;
  return dari + (ke - dari) * n;
};
