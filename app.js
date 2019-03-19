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

app.get('/timbang/data', (req,res) => {
  res.status(200).send({
    success: 'true',
    hasil: "90"
  })
})


app.get("/socket", (req, res, next) => {
  res.render("socket");
});

//Listen menggunakan port 3000
server = app.listen(3000);

//instantitation atau pembuatan object spesifik socket.io

var idInterval
var mConnected = 0;
//listen on untuk semua koneksi
// io.on("connection", socket => {
  
//   var mIp = ip.address();
//   var mSocketId = socket.id;
//   var mClientIp = socket.request.connection.remoteAddress;
  

//   console.log(mConnected +' New client connected from IP Address : ' + mClientIp + ' dengan ID Socket: ' + mSocketId);
//   console.log(mIp);

//   // Menerima request dari client
//   socket.on('ip', data => {
//     var mIp = ip.address();

//     // Kirim ip
//     socket.emit("hasil", mIp);
//   });

//   //terima data dari client
//   socket.on("mAuto", data => {
//     console.log(data.mHitung)
//     if (data.mHitung === "Start") {
//       console.log(data.mMin)
//       createSimulasi(data.mMin, data.mMax)
//     }
//   });
//   // server olah data
//   mConnected++
// });

var lerp = function (dari, ke, n) {
  // n diisi dengan nilai 0 s/d 1
  if (n > 1) return ke;
  else if (n < 0) return dari;
  return dari + (ke - dari) * n;
};


function createSimulasi (min,max) {
  clearInterval(idInterval) // protection
  var start = new Date();
  console.log("Min Value = " + min)
  var mMaximal = max - min;
  console.log("Nilai Maksimal = " +  mMaximal)


  min = Math.ceil(min);
  max = Math.floor(max);
  var target = Math.floor(Math.random() * (max-min + 1)) + min;
  
  console.log("Target = " + target)
  var lama = Math.floor((Math.random() * 4000) + 2000)
  var interval = 100

  var idInterval = setInterval(() => {
    var skrg = new Date();
    var selisihWaktu = skrg - start;
    var persentase = selisihWaktu / lama;
    var hasil = lerp(0, target, persentase);

    var alamat = ip.address();

  
    console.log(hasil)

    io.emit("mAuto", { hasil: hasil.toFixed(2), satuan: "KG", ip: alamat });

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
              idInterval = createSimulasi(min, max)
            }, durasiTahan)
          }
        })
      }, durasiTahan)
    }
  }, interval)

  return idInterval
}