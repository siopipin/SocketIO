
$(function(){
    //make connection
    var socket = io.connect('http://localhost:3000')
	var display = $("#display")
	//Emit message
    socket.on('berat',data=>{
		display.html(data)
	})
});
