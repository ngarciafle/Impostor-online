<script lang="ts">
    import { io, type Socket } from "socket.io-client";
    import { onMount } from 'svelte';
    export let socket: Socket;
    export let selection: 'initial' | 'create' | 'join' | 'wait' | 'card' | 'words' | 'votes' | 'end';
    export let gameId: string;
    let winner: boolean = false;
    let role: string = '';
    let whoWon: string = '';
    let data: any;

    onMount(() => {
        socket.emit("get-game-info", { gameId: gameId });
        socket.on("game-info", (data) => {
            data = data;
            winner = data.winner === data.role;
            role = data.role;
            whoWon = data.winner;
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


<h1 class={winner ? 'text-green-500' : 'text-red-500'}>
    {role}
</h1>
<h3 class={winner ? 'text-green-500' : 'text-red-500'}>
    {whoWon == 'impostors' ? 'Ganan los impostores!🙉' : 'Ganan los ciudadanos!🎉'}
</h3>

<p>game ended</p>

<button on:click={returnToMenu} class="mt-6 md:mt-6">
    Volver al menu
</button>

<button on:click={resetGame} class="">
    Reiniciar juego
</button>