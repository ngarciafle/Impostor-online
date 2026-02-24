<script lang="ts">
    import { io, type Socket } from "socket.io-client";
    import { onMount } from 'svelte';
    export let socket: Socket;
    export let selection: 'initial' | 'create' | 'join' | 'wait' | 'card' | 'words' | 'votes';

    onMount(() => {})
</script>


<p>voting phase</p>