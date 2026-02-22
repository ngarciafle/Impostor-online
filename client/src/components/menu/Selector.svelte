<script lang="ts">
  import { io, type Socket } from "socket.io-client";
  import { onMount } from 'svelte';

  import Initial from './Initial.svelte';
  import Create from './Create.svelte';
  import Join from './Join.svelte';
  import Wait from './Wait.svelte';

  let socket: Socket;
  let socketId: string | undefined;
  let name: string;
  let idRoom: string;
  let selection: 'initial' | 'create' | 'join' | 'wait' = 'initial';

  onMount(() => {
    socket = io("http://localhost:3000");
    socket.on("connect", () => {
      socketId = socket.id;
    })
  });
</script>

{#if selection === 'initial'}
  <Initial bind:selection/>
{:else if selection === 'create'}
  <Create bind:selection bind:name bind:idRoom bind:socketId/>
{:else if selection === 'join'}
  <Join bind:selection bind:name bind:idRoom bind:socketId/>
{:else if selection === 'wait'}
  <Wait bind:selection bind:name bind:idRoom socket={socket} />
{/if}


