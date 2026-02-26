<script lang="ts">
    import { io, type Socket } from "socket.io-client";
    import { onMount } from 'svelte';
    export let socket: Socket;
    export let selection: 'initial' | 'create' | 'join' | 'wait' | 'card' | 'words' | 'votes' | 'end';
    let players: any[] = [];
    let selectedPlayer: string | null = null;
    let voted: boolean = false;
    export let gameId: string;

    onMount(() => {
        socket.on("get-players", (data) => {
            players = data.players;
        })

        socket.on("round-ended", () => {
            selection = 'words';
        })

        socket.on("end-game", () => {
            selection = 'end';
        })
    })

    function sendVote() {
        socket.emit('send-vote', { gameId: gameId, selectedPlayer });
    }
</script>


<h1>voting phase</h1>
<div class="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
    {#each players as player}
        <button class="aspect-4/3 bg-amber-100 shadow shadow-blue-700 w-7" disabled={voted} on:click={() => { selectedPlayer = player.name; voted = true; }}>{player.name}</button>
        {/each}
        
    <button class="aspect-4/3 bg-blue-300 shadow shadow-orange-950 w-7" disabled={voted} on:click={() => voted = true }>Saltar</button>

</div>