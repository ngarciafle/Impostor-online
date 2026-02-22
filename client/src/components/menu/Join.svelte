<script lang="ts">
  import { io, type Socket } from "socket.io-client";
  export let name: string = "";
  export let idRoom: string = "";
  export let selection: 'initial' | 'create' | 'join' | 'wait';
  export let socketId: string | undefined;



  async function joinGame(event: Event) {
    event.preventDefault();
    const response = await fetch("http://localhost:3000/api/join-game", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name: name, idSala: idRoom, socketId }),
    });
  }

  // import { onMount } from 'svelte';
  // import { io, Socket } from "socket.io-client";

  // export let selection: 'initial' | 'create' | 'join';

  // let nombreJugador = "";
  // let idSala = "";
  // let unido = false;
  // let socket: Socket;


  // function unirseSala(evento: Event) {
  //   evento.preventDefault(); 

  //   if (!nombreJugador || !idSala) {
  //       alert("Por favor, rellena todos los campos.");
  //       return;
  //   }

  //   if (socket) {
  //       socket.emit('join-game', idSala);
  //   }
  // }
</script>

<h1 class="text-2xl">Unirse a una partida🕹</h1>
<form on:submit={joinGame} class="flex gap-2 xl:gap-6 xl:mt-16 md:mt-10 mt-8 flex-col md:flex-row md:items-center">
  <div class="grid grid-cols-[1fr_2fr] grid-rows-2 gap-2">
    <label for="name">Nombre</label>
    <input type="text" bind:value={name} class="border border-foreground rounded-lg py-1 px-2" id="name">

    <label for="id">ID del juego</label>
    <input type="text" bind:value={idRoom} class="border border-foreground rounded-lg py-1 px-2" placeholder="Ej: 1234" id="id">
  </div>

  <button type="submit" class="mt-4 md:mt-0 bg-green-100/40 shadow shadow-foreground py-2 px-4 rounded-2xl hover:scale-105 transition-transform duration-300">Unirse</button>
</form>
<button on:click={() => selection = 'initial'} class="mt-6 md:mt-8 bg-background-secondary shadow shadow-foreground py-2 px-4 rounded-2xl hover:scale-105 transition-transform duration-300">Volver</button>
