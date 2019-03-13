
$(function () {
	//make connection
	var socket = io.connect('http://localhost:3000')
	var display = $("#display")
	var simulasi = $("#simulasi")
	var satuan = $("#satuan")
	var address = $("#vaddress")
	// var myList = $("#myList")

	//Simulasi Emit
	simulasi.click(function() {
		socket.emit("berat", 'hitung')
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

	

});


//Fungsi simpan berat di list
function myFunction() {
	var node = document.createElement("LI");
	node.className = "list-group-item";
	var data = document.getElementById("display").textContent;
	var textnode = document.createTextNode(data);
	node.appendChild(textnode);
	document.getElementById("myList").appendChild(node);
}
