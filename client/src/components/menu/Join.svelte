<script lang="ts">
  import { onMount } from 'svelte';
  import { io, Socket } from "socket.io-client";

  export let selection: 'initial' | 'create' | 'join';

  let nombreJugador = "";
  let idSala = "";
  let unido = false;
  let socket: Socket;

  onMount(() => {
    socket = io("http://localhost:3000");

    socket.on("join-response", (respuesta) => {
        if (respuesta.success) {
            unido = true;
        } else {
            alert(respuesta.message);
        }
    });
  });

  function unirseSala(evento: Event) {
    evento.preventDefault(); 

    if (!nombreJugador || !idSala) {
        alert("Por favor, rellena todos los campos.");
        return;
    }

    if (socket) {
        socket.emit('join-game', idSala);
    }
  }
</script>

{#if !unido}
  <h1 class="text-2xl">Unirse a una partida🕹</h1>
  <form on:submit={unirseSala} class="flex gap-2 xl:gap-6 xl:mt-16 md:mt-10 mt-8 flex-col md:flex-row md:items-center">
    <div class="grid grid-cols-[1fr_2fr] grid-rows-2 gap-2">
      <label for="name">Nombre</label>
      <input type="text" bind:value={nombreJugador} class="border border-foreground rounded-lg py-1 px-2" id="name">

      <label for="id">ID del juego</label>
      <input type="text" bind:value={idSala} class="border border-foreground rounded-lg py-1 px-2" placeholder="Ej: 1234" id="id">
    </div>

    <button type="submit" class="mt-4 md:mt-0 bg-green-100/40 shadow shadow-foreground py-2 px-4 rounded-2xl hover:scale-105 transition-transform duration-300">Unirse</button>
  </form>
  <button on:click={() => selection = 'initial'} class="mt-6 md:mt-8 bg-background-secondary shadow shadow-foreground py-2 px-4 rounded-2xl hover:scale-105 transition-transform duration-300">Volver</button>
{:else}
  <div class="flex flex-col items-center mt-10">
    <h1 class="text-3xl font-bold text-green-600 mb-4">¡Conectado! ✅</h1>
    <p class="text-xl">Has entrado a la sala: <strong class="text-blue-500">{idSala}</strong></p>
    <p class="text-lg mt-2">Jugador: <strong>{nombreJugador}</strong></p>
    
    <div class="mt-8 p-4 border border-dashed border-gray-400 rounded-xl">
      <p class="opacity-70 animate-pulse">Esperando a que el líder inicie la partida...</p>
    </div>
  </div>
{/if}