<script lang="ts">
    import { io, Socket } from "socket.io-client";
    import { onMount, onDestroy } from 'svelte';

    interface WaitProps {
        name: string;
        gameId: string;
        leader: boolean;
        role: 'impostor' | 'crewmate';
        word: string;
        selection: 'initial' | 'create' | 'join' | 'wait' | 'card' | 'words' | 'votes' | 'end';
        socket: Socket;
        players: string[];
        words: string[];
        messages: any[];
    }

    let { name = $bindable(), gameId = $bindable(), leader = $bindable(), role = $bindable(), word = $bindable(), selection = $bindable(), socket, players, words = $bindable(), messages = $bindable() }: WaitProps = $props();
    let started: boolean = $state(false);

    onMount(() => {
        words = [];
        socket.emit("join-game", { name, gameId });
        socket.emit("get-chat");

        socket.on("leader-role", (data) => {
            leader = data.leader;
        })

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

    onDestroy(() => {
        socket.off("game-started");
    });

    async function startGame() {
        started = true;
        await fetch(`http://localhost:3000/api/start-game`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ gameId, socketId: socket.id })
        });
    }

    function returnToMenu() {
        socket.emit("leave-game");
        selection = 'initial';
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
        <button onclick={startGame} class="{started ? 'opacity-40' : ''} mt-6 md:mt-8 bg-green-200 shadow shadow-foreground py-2 px-4 rounded-2xl hover:scale-105 transition-transform duration-300" disabled={started}>
            Empezar partida
        </button>
    {:else}
        <div class="mt-8 p-4 border border-dashed border-gray-400 rounded-xl">
            <p class="opacity-70 animate-pulse">Esperando a que el líder inicie la partida...</p>
        </div>
    {/if}

    <button onclick={returnToMenu} class="mt-6 md:mt-8 bg-background-secondary shadow shadow-foreground py-2 px-4 rounded-2xl hover:scale-105 transition-transform duration-300">Volver</button>
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
