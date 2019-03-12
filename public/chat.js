
$(function(){
   	//make connection
	var socket = io.connect('http://localhost:3000')

	//buttons and inputs
	// var message = $("#message")
	// var username = $("#username")
	// var send_message = $("#send_message")
	// var send_username = $("#send_username")
	// var chatroom = $("#chatroom")
	// var feedback = $("#feedback")

	// //Emit message
	// send_message.click(function(){
	// 	socket.emit('new_message', {message : message.val()})
	// })

	// //Listen on new_message
	// socket.on("new_message", (data) => {
	// 	feedback.html('');
	// 	message.val('');
	// 	chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>")
	// })

	// //Emit a username
	// send_username.click(function(){
	// 	socket.emit('change_username', {username : username.val()})
	// })

	// //Emit typing
	// message.bind("keypress", () => {
	// 	socket.emit('typing')
	// })

	// //Listen on typing
	// socket.on('typing', (data) => {
	// 	feedback.html("<p><i>" + data.username + " sedang mengetik pesan..." + "</i></p>")
	// })

	

	//Timbang
	// var message = $("#message")
	// var send_message = $("#send_message")
	// var chatroom = $("#chatroom")
	// var feedback = $("#feedback")

	// //Emit message
	// send_message.click(function(){
	// 	socket.emit('new_message', {message : message.val()})
	// })

	// //Listen on new_message
	// socket.on("new_message", (data) => {
	// 	feedback.html('');
	// 	message.val('');
	// 	chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>")
	// })

	// //Emit a username
	// send_username.click(function(){
	// 	socket.emit('change_username', {username : username.val()})
	// })

	//timbang 2
	var message = 8000
	var lama = 4
	var interval = 200
	var send_message = $("#send_message")
	var chatroom = $("#chatroom")
	var feedback = $("#feedback")
	var display = $("#display")


	
	//Emit message
	send_message.click(function(){
		socket.emit("message", 'mulai')
	})

	socket.on('berat',data=>{
		console.log(data)
	})
});


