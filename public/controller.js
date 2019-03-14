
$(function () {
	//make connection
	var socket = io.connect('/')
	var display = $("#display")
	var simulasi = $("#simulasi")
	var satuan = $("#satuan")
	var address = $("#vaddress")
	var cAuto = $("#vAuto")
	
	var cMin=document.getElementById("vMin").value;  
	var cMax=document.getElementById("vMax").value;
	
	//var data = document.getElementById("display").textContent;
	
	//Simulasi Emit
	simulasi.click(function() {
		socket.emit("berat", {start: "start"})

	})

	//Tampilkan message
	socket.on('berat', data => {
		display.html(data.hasil),
		satuan.html(data.satuan),
		address.html(data.ipaddress)
	})

	//Tampilkan list
	socket.on('ViewSimpan', data => {
		var node = document.createElement("LI");
	})


	cAuto.click(function() {
		alert(cMin)
		socket.emit("mAuto", {mHitung: 'Start', mMin: cMin, mMax:cMax })
	})

	//Tampilkan message
	socket.on('mAuto', data => {
		display.html(data.hasil),
		satuan.html(data.satuan),
		address.html(data.ipaddress)
		cAuto.removeClass("btn-danger");
		cAuto.addClass("btn-primary")
	});


	// Pemicu
	socket.emit("ip");

	// Menerima data dari server
	socket.on('hasil', data => {
		address.html(data)
	})
});


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
