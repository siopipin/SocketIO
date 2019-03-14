const express = require("express");
const cors = require('cors');
const app = express();
var ip = require("ip");

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

var idInterval

//listen on untuk semua koneksi
io.on("connection", socket => {
  console.log('New client connected')
  var mIp = ip.address();
  console.log(mIp)

  // Menerima request dari client
  socket.on('ip', data => {
    var mIp = ip.address();

    // Kirim ip
    socket.emit("hasil", mIp);
  });

  //listen on simulasi awal
  socket.on("berat", data => {


    // //broadcast the new message
    // io.sockets.emit('new_message', {message : data.message, username : socket.username});
    if (data.start === "start") {
      var target = Math.floor((Math.random() * 1500) + 1)
      var lama = Math.floor((Math.random() * 3000) + 3000)
      var interval = 10
      var start = new Date();
      var angkaInterval = setInterval(() => {
        var skrg = new Date();
        var selisihWaktu = skrg - start;
        var persentase = selisihWaktu / lama;
        var hasil = lerp(0, target, persentase);
        var addr = ip.address();
        console.log(hasil)

        io.emit("berat", { hasil: hasil.toFixed(2), satuan: "KG" });
        if (persentase > 1) {
          clearInterval(angkaInterval); // batalkan interval kalau sudah lebih capai 100 persen

          var durasiTahan = Math.floor((Math.random() * 3000) + 3000)
          setTimeout(() => {
            var start2 = new Date();
            var lama2 = lama
            var angkaInterval2 = setInterval(() => {
              var skrg2 = new Date();
              var selisihWaktu2 = skrg2 - start2;
              var persentase2 = selisihWaktu2 / lama2;
              var hasil2 = lerp(target, 0, persentase2); // target ke nol (dibalik)
              console.log(hasil2)

              io.emit("berat", { hasil: hasil2.toFixed(2), satuan: "KG" });
              if (persentase2 > 1) clearInterval(angkaInterval2)
            })
          }, durasiTahan)
        }
      }, interval);



    }
  });

  //terima data dari client
  socket.on("mAuto", data => {
    console.log(data.mHitung)
    

    if (data.mHitung === "Start") {
      createSimulasi(data.mMin, data.mMax)
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


function createSimulasi (min,max) {
  clearInterval(idInterval) // protection
  var start = new Date();
  var target = Math.floor((Math.random() * (max-min)) + min)
  var lama = Math.floor((Math.random() * 4000) + 2000)
  var interval = 100

  var idInterval = setInterval(() => {
    var skrg = new Date();
    var selisihWaktu = skrg - start;
    var persentase = selisihWaktu / lama;
    var hasil = lerp(0, target, persentase);
    var addr = ip.address();
    console.log(hasil)
    io.emit("mAuto", { hasil: hasil.toFixed(2), satuan: "KG", ipaddress: addr });

    if (persentase > 1) {
      clearInterval(idInterval); // batalkan interval kalau sudah lebih capai 100 persen

      var durasiTahan = Math.floor((Math.random() * 3000) + 1000)
      idInterval = setTimeout(() => {
        var start3 = new Date();
        var lama3 = lama
        var idInterval = setInterval(() => {
          var skrg3 = new Date();
          var selisihWaktu3 = skrg3 - start3;
          var persentase3 = selisihWaktu3 / lama3;
          var hasil3 = lerp(target, 0, persentase3); // target ke nol (dibalik)
          console.log(hasil3)

          io.emit("mAuto", { hasil: hasil3.toFixed(2), satuan: "KG" });
          if (persentase3 > 1) {
            clearInterval(idInterval)
            var durasiTahan = Math.floor((Math.random() * 3000) + 1000)
            idInterval = setTimeout(() => {
              idInterval = createSimulasi()
            }, durasiTahan)
          }
        })
      }, durasiTahan)
    }
  }, interval)

  return idInterval
}