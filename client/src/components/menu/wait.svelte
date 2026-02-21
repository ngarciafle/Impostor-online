<script lang="ts">
    import { io, Socket } from "socket.io-client";  import { onMount } from "svelte";

    export let name: string;
    export let idRoom: string;
    export let selection: 'initial' | 'create' | 'join' | 'wait';

    onMount(() => {
        const socket: Socket = io("http://localhost:3000");
        socket.on("wait", (data) => {
            console.log("Esperando a que el líder inicie la partida...", data);
        })
    });
</script>


<div class="flex flex-col items-center mt-10">
    <h1 class="text-3xl font-bold text-green-600 mb-4">¡Conectado! ✅</h1>
    <p class="text-xl">Has entrado a la sala: <strong class="text-blue-500">{idRoom}</strong></p>
    <p class="text-lg mt-2">Jugador: <strong>{name}</strong></p>

    <div class="mt-8 p-4 border border-dashed border-gray-400 rounded-xl">
        <p class="opacity-70 animate-pulse">Esperando a que el líder inicie la partida...</p>
    </div>

    <button on:click={() => selection = 'initial'} class="mt-6 md:mt-8 bg-background-secondary shadow shadow-foreground py-2 px-4 rounded-2xl hover:scale-105 transition-transform duration-300">Volver</button>
</div>
