<script lang="ts">
    import { io, type Socket } from "socket.io-client";
    import { onMount, onDestroy } from 'svelte';
    let { socket, selection = $bindable(), word, role } = $props<{
        socket: Socket;
        selection: 'initial' | 'create' | 'join' | 'wait' | 'card' | 'words' | 'votes' | 'end';
        word: string;
        role: 'impostor' | 'crewmate';
    }>();

    let show: boolean = $state(false);
    let total: number = 10;
    let remaining: number = $state(10);
    let pct = $derived(remaining / total * 100);
    let color = $state('bg-green-500');

    onMount(() => {
        socket.on("round-started", () => {
            selection = 'words';
        })
                
        function tick() {
            if (remaining <= 0) {

            }
            remaining--;
            $: pct = (remaining / total) * 100;
            color = pct > 50 ? 'bg-green-500' : pct > 20 ? 'bg-amber-400' : 'bg-red-500';
        }
    
        setInterval(tick, 1000)
    })

    onDestroy(() => {
        socket.off("round-started");
    })
</script>


<div class="w-full">
    <div class={"h-2 transition-transform " + color} style={"width: " + pct + "%;"}></div>
</div>

<h1 class="text-2xl md:text-3xl font-bold text-center mb-4">{role}</h1>
<button class="aspect-9/16 bg-amber-100 w-30 md:w-40 xl-w-50 flex items-center justify-center rounded-2xl shadow shadow-blue-950" onclick={() => show = !show}>
    {#if show}
        <h2 class="text-xl md:text-2xl font-semibold">{word}</h2>
    {:else}
        <p class="text-sm md:text-base text-gray-500">Haz click para ver tu palabra</p>
    {/if}
</button>
