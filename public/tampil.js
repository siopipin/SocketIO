
$(function () {
	//make connection
	var socket = io.connect('http://localhost:3000')
	var display = $("#display")
	// var myList = $("#myList")

	//Emit message
	socket.on('berat', data => {
		display.html(data)
	})

	socket.on('ViewSimpan', data => {
		var node = document.createElement("LI");
	})
});

function myFunction() {
	var node = document.createElement("LI");
	node.className = "list-group-item";
	var data = document.getElementById("display").textContent;
	var textnode = document.createTextNode(data);
	node.appendChild(textnode);
	document.getElementById("myList").appendChild(node);

}
