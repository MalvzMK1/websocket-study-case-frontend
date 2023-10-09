'use client'

import {useEffect, useState} from "react";
import socket from "@/lib/socket";

interface IChatSlug {
	slug: string
}

interface IMessage {
	socket_id: string;
	message: string;
	sentAt: string;
}

export default function Chat({ params }: {params: {slug: string}}) {
	const [socketId, setSocketId] = useState<string>();
	const [message, setMessage] = useState<string>('');
	const [receivedMessages, setReceivedMessages] = useState<Array<IMessage>>([]);

	function sendMessage() {
		socket.emit('send-message', message, (response: Array<IMessage>) => setReceivedMessages(response))
	}

	useEffect(() => {
		if (socket.connected) setSocketId(socket.id);
		else {
			socket.connect()
			setSocketId(socket.id)
		}
	}, [params])

	// socket.on('send-message', (message) => {
	// 	setReceivedMessages((prevMessages) => [...prevMessages, message]);
	// });
	//
	// socket.on('messages', (messages) => {
	// 	console.log(messages)
	// 	setReceivedMessages(messages)
	// })

	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-24">
			<p>Hello, {params.slug}! Welcome to the chat</p>
			<div className={'w-1/2 flex-1 bg-purple-900 flex flex-col items-center'}>
				<div className={'flex-1'}>
					{receivedMessages.map((message) => (
						<p key={message.sentAt}>{message.socket_id}: {message.message}</p>
					))}
				</div>
				<input
					type={'text'}
					value={message}
					onChange={({target: {value}}) => setMessage(value)}
					className={'text-black'}
					onKeyDown={(event) => {
						if (event.key === 'Enter') {
							sendMessage()
						}
					}}
				/>
			</div>
		</main>
		);
}