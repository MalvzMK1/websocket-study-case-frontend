'use client'

import {useState} from "react";
import socket from "@/lib/socket";

export function ConnectionManager() {
	const [connected, setConnected] = useState<boolean>(false);

	function connect() {
		if (!connected) {
			socket.connect()
			setConnected(true)
		}
	}

	function disconnect() {
		if (connected) {
			socket.disconnect()
			setConnected(false)
		}
	}

	return (
		<div className='w-1/2 h-1/3 bg-zinc-700 rounded'>
			<button onClick={connect}>Conectar</button>
			<button onClick={disconnect}>Deconectar</button>
		</div>
	);
}