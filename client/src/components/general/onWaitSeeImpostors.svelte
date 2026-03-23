<script lang="ts">
    import { Socket } from 'socket.io-client';
    import { onMount } from 'svelte';

    let { players = $bindable() }: { players: string[] } = $props();

    onMount(async () => {
        
    });
</script>


<div>
    <h3>Impostors: {Math.floor(players.length / 4) + 1}</h3>
    <div class="relative flex justify-center items-center">
        <div class="bg-green-300 w-20 aspect-square rounded-full absolute "></div>
        <div class="bg-white w-10 aspect-square rounded-full absolute "></div>
    </div>
</div>
