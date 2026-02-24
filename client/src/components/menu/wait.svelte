<script lang="ts">
    import { io, Socket } from "socket.io-client";
    import { onMount } from 'svelte';

    export let name: string;
    export let gameId: string;
    export let leader: boolean;
    export let role: 'impostor' | 'crewmate';
    export let word: string;
    export let selection: 'initial' | 'create' | 'join' | 'wait' | 'card' | 'words' | 'votes';
    export let socket: Socket;
    let players: string[] = [];

    onMount(() => {
        socket.emit("join-game", { name, gameId });

        socket.on("player-joined", (newPlayers) => {
            players = newPlayers;
        });

        socket.on("game-started", (data) => {
            if (data.impostor) {
                role = 'impostor';
            } else {
                role = 'crewmate';
            }
            word = data.word;
            selection = 'card';
        });
    });

    async function startGame() {
        await fetch(`http://localhost:3000/api/start-game`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ gameId, socketId: socket.id })
        });
    }

</script>


<div class="flex flex-col items-center mt-10">
    <h1 class="text-3xl font-bold text-green-600 mb-4">¡Conectado! ✅</h1>
    <p class="text-xl">Has entrado a la sala: <strong class="text-blue-500">{gameId}</strong></p>
    <p class="text-lg mt-2">Jugador: <strong>{name}</strong></p>
    <p class="text-lg mt-2">Jugadores en la sala:</p>
    <ul class="list-disc list-inside mt-2">
        {#each players as player}
            <li>{player}</li>
        {/each}
    </ul>


    {#if leader}
    <div class="mt-8 p-4 border border-dashed border-gray-400 rounded-xl">
        <p class="opacity-70 animate-pulse">Esperando a que el líder inicie la partida...</p>
    </div>
    {:else}
        <button on:click={startGame}>
            Empezar partida
        </button>

    {/if}

    <button on:click={() => selection = 'initial'} class="mt-6 md:mt-8 bg-background-secondary shadow shadow-foreground py-2 px-4 rounded-2xl hover:scale-105 transition-transform duration-300">Volver</button>
</div>

<!-- {:else}
  <div class="flex flex-col items-center mt-10">
    <h1 class="text-3xl font-bold text-green-600 mb-4">¡Sala Creada! 👑</h1>
    <p class="text-xl">Código para tus amigos: <strong class="text-blue-500 text-3xl ml-2">{gameId}</strong></p>
    <p class="text-lg mt-2">Líder: <strong>{name}</strong></p>
    
    <div class="mt-8 p-4 border border-dashed border-gray-400 rounded-xl">
      <p class="opacity-70 animate-pulse">Esperando a que se unan los demás...</p>
    </div>
  </div>
{/if} -->