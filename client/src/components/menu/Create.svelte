<script lang="ts">
  import { onMount } from 'svelte';
  import { io, Socket } from "socket.io-client";

  export let selection: 'initial' | 'create' | 'join' | 'wait';

  let nombreJugador = "";
  let idSala = "";
  let salaCreada = false;
  let socket: Socket;

  onMount(() => {
    socket = io("http://localhost:3000");
  });

  function crearSala(evento: Event) {
    evento.preventDefault();

    if (!nombreJugador) {
        alert("Por favor, escribe tu nombre.");
        return;
    }

    idSala = Math.floor(1000 + Math.random() * 9000).toString();

    if (socket) {
        socket.emit('create-game', idSala);
        
        salaCreada = true;
    }
  }
</script>

{#if !salaCreada}
  <h1 class="text-2xl">Crea una partida🕹</h1>
  <form on:submit={crearSala} class="flex gap-4 xl:gap-6 xl:mt-16 md:mt-10 mt-8 flex-col md:flex-row md:items-center">
    <div class="flex md:flex-row flex-col gap-2">
      <label for="name">Nombre</label>
      <input type="text" bind:value={nombreJugador} class="border border-foreground rounded-lg py-1 px-2" id="name">
    </div>

    <button type="submit" class="mt-4 md:mt-0 bg-green-100/50 shadow shadow-foreground py-2 px-4 rounded-2xl hover:scale-105 transition-transform duration-300">Crear</button>
  </form>
  <button on:click={() => selection = 'initial'} class="mt-6 md:mt-8 bg-background-secondary shadow shadow-foreground py-2 px-4 rounded-2xl hover:scale-105 transition-transform duration-300">Volver</button>

{:else}
  <div class="flex flex-col items-center mt-10">
    <h1 class="text-3xl font-bold text-green-600 mb-4">¡Sala Creada! 👑</h1>
    <p class="text-xl">Código para tus amigos: <strong class="text-blue-500 text-3xl ml-2">{idSala}</strong></p>
    <p class="text-lg mt-2">Líder: <strong>{nombreJugador}</strong></p>
    
    <div class="mt-8 p-4 border border-dashed border-gray-400 rounded-xl">
      <p class="opacity-70 animate-pulse">Esperando a que se unan los demás...</p>
    </div>
  </div>
{/if}