'use client'

import {useEffect, useState} from "react";
import socket from "@/lib/socket";

export default function Home() {
  const [isConnected, setIsConnected] = useState<boolean>(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);
  const [text, setText] = useState<string>('');

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onFooEvent(value) {
      setFooEvents(previous => [...previous, value]);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('foo', onFooEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.on('disconnect', onDisconnect);
      socket.on('foo', onFooEvent);
    };
  }, [])

  function enterChat(): void {
    if (!isConnected) {
      socket.connect()
    }
    if (text.length < 4) alert('Insira um nome de usuário')
    else location.href = `/chat/${text}`
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <input
        type={'text'}
        value={text}
        onChange={({target: {value}}) => setText(value)}
        className={'text-black'}
      />
      <button
        type={'button'}
        className={'bg-purple-900 px-4 py-2 rounded transition duration-300 hover:bg-purple-500 hover:scale-110'}
        onClick={enterChat}
      >
        Entrar
      </button>
    </main>
  )
}
