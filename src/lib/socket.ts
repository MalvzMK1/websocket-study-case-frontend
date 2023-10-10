import {io} from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_HOST_API!, {
	autoConnect: true,
})

export default socket;