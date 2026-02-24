<script lang="ts">
    import { io, type Socket } from "socket.io-client";
    import { onMount } from 'svelte';
    export let socket: Socket;
    export let word: string;
    export let role: 'impostor' | 'crewmate';
    export let selection: 'initial' | 'create' | 'join' | 'wait' | 'card' | 'words';
    let show: boolean = false;

    onMount(() => {
        socket.on("round-started", () => {
            selection = 'words';
        })
    })
</script>


<h1 class="text-2xl md:text-3xl font-bold text-center mb-4">{role}</h1>
<button class="aspect-9/16 bg-amber-100 w-30 md:w-40 xl-w-50 flex items-center justify-center rounded-2xl" on:click={() => show = !show}>
    {#if show}
        <h2 class="text-xl md:text-2xl font-semibold">{word}</h2>
    {:else}
        <p class="text-sm md:text-base text-gray-500">Haz click para ver tu palabra</p>
    {/if}
</button>
