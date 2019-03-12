
$(function(){
    //make connection
    var socket = io.connect('http://localhost:3000')
	var send_message = $("#send_message")
	//Emit message
	send_message.click(function(){
        console.log("s")
		socket.emit("message", 'mulai')
    })

    //Emit message
    socket.on('berat',data=>{
		console.log(data)
    })
});
