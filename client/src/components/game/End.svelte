<script lang="ts">
    import { io, type Socket } from "socket.io-client";
    import { onMount } from 'svelte';
    export let socket: Socket;
    export let selection: 'initial' | 'create' | 'join' | 'wait' | 'card' | 'words' | 'votes' | 'end';
    export let gameId: string;
    export let leader: boolean = false;
    let winner: boolean = false;
    let role: string = '';
    let whoWon: string = '';

    onMount(() => {
        socket.emit("get-game-info", { gameId: gameId });
        socket.on("game-info", (gameResults: any) => {
            winner = gameResults.winner === gameResults.role;
            role = gameResults.role;
            whoWon = gameResults.winner;
        })
        socket.on("game-reset", (data) => {
            selection = 'wait';
        })
    })

    function returnToMenu() {
        socket.emit("leave-game");
        selection = 'initial';
    }

    function resetGame() {
        socket.emit("reset-game", { gameId: gameId });
    }
</script>

<div class="flex flex-col gap-4 items-center h-full">
    <h1 class={winner ? 'text-green-500' : 'text-red-300' + " text-2xl md:text-4xl xl:text-5xl mt-10 md:mt-16 xl:mt-20"}>
        {role === 'impostor' ? 'Impostor' : 'Ciudadano'}
    </h1>
    <h3 class={winner ? 'text-green-500' : 'text-red-300' + " text-lg md:text-2xl xl:text-3xl"}>
        {whoWon == 'impostors' ? 'Ganan los impostores!🙉' : 'Ganan los ciudadanos!🎉'}
    </h3>
    
    
    
    <button on:click={returnToMenu} class="mt-6 md:mt-10 xl:mt-14 bg-background-secondary shadow shadow-foreground py-2 px-4 rounded-xl hover:scale-105 transition-transform duration-300">
        Volver al menu
    </button>
    
    {#if leader}
        <button on:click={resetGame} class="mt-4 md:mt-4 bg-green-200 shadow shadow-foreground py-2 px-4 rounded-xl hover:scale-105 transition-transform duration-300">
            Reiniciar juego
        </button>
    {/if}
</div>