import {io} from "socket.io-client";

const socket = io('http://192.168.0.10:8080', {
	autoConnect: true,
})

export default socket;