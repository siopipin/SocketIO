
//Fungsi simpan berat di list
function myFunction() {
	var node = document.createElement("LI");
	// node.className = "list-group-item";
	node.classList.add('list-group-item')
	var data = document.getElementById("display").textContent;
	var textnode = document.createTextNode(data);
	node.appendChild(textnode);
	document.getElementById("myList").appendChild(node);
}



// Enable pusher logging - don't include this in production
Pusher.logToConsole = true;
var address = $("#vaddress");

var pusher = new Pusher('428b5fc4e48a2f8e0131', {
	cluster: 'ap1',
	forceTLS: true,
	authEndpoint: '/auth-pusher'
});

var channel = pusher.subscribe('my-channel');
channel.bind('my-event', function (data) {
	address.html(data.ip);
});

var pesan = pusher.subscribe('anu');
channel.bind('message', function (data) {
	alert(data.message);
});

var simulasi = $("#simulasi")
var satuan = $("#satuan")
var cAuto = $("#vAuto")
var cLive = $("#vLive")


//Kirim Data
cAuto.click(function (event) {
	event.preventDefault()
	var cMin = document.getElementById('vMin').value;
	var cMax = document.getElementById('vMax').value;
	if (cMin == "" || cMax == "") {
		alert("Tidak Boleh Kosong")
		return false
	}
	else if (cMin >= cMax || cMax <= cMin) {
		alert("Periksa Masukkan")
	}
	else if (cMin < 1) {
		alert("Tidak boleh lebih kecil dari 1")
	}
	else {
		$.ajax({
			url: '/start-simulasi',
			method: 'POST',
			data: { min: cMin, max: cMax }
		})
	}
});

var display = $("#display");
var address = $("#vaddress");


var channel2 = pusher.subscribe('timbang3');
channel2.bind('mAuto', function (data) {
	display.html(data.hasil),
	satuan.html(data.satuan),
	address.html(data.ipaddress)
});