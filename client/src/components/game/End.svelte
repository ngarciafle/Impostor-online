<script lang="ts">
    import { io, type Socket } from "socket.io-client";
    import { onMount } from 'svelte';
    export let socket: Socket;
    export let selection: 'initial' | 'create' | 'join' | 'wait' | 'card' | 'words' | 'votes' | 'end';

    onMount(() => {
        socket.on("game-info", (data) => {
            
        })
    })

</script>

<p>game ended</p>

<button on:click={() => selection = 'initial'} class="mt-6 md:mt-6">
    Volver al menu
</button>