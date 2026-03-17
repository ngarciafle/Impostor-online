<script lang="ts">
    import { Socket } from 'socket.io-client';
    import { onMount } from 'svelte';

    export let players: string[] = [];

    onMount(async () => {
        
    });
</script>


<div>
    <h3>Impostors: {(players.length % 4) + 1}</h3>
</div>
