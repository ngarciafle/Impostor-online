<script lang="ts">
  import { io, type Socket } from "socket.io-client";
  import { onMount } from 'svelte';

  import Initial from './menu/Initial.svelte';
  import Create from './menu/Create.svelte';
  import Join from './menu/Join.svelte';
  import Wait from './menu/Wait.svelte';
  import Card from "./game/Card.svelte";
  import Words from "./game/Words.svelte";
  import Voting from "./game/Voting.svelte";

  
  let role: 'impostor' | 'crewmate' = 'crewmate';
  let leader: boolean;
  let word: string;
  let socket: Socket;
  let socketId: string | undefined;
  let name: string;
  let gameId: string;
  let selection: 'initial' | 'create' | 'join' | 'wait' | 'card' | 'words' | 'votes' = 'initial';
  let words: string[] = [];


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
  <Create bind:selection bind:name bind:gameId bind:socketId/>
{:else if selection === 'join'}
  <Join bind:selection bind:name bind:gameId bind:socketId/>
{:else if selection === 'wait'}
  <Wait bind:selection name={name} bind:gameId bind:word bind:role socket={socket} bind:leader={leader} />
{:else if selection === 'card'}
  <Card word={word} role={role} socket={socket} bind:selection={selection}/>
{:else if selection === 'words'}
  <Words socket={socket} bind:selection={selection} bind:words={words} gameId={gameId} name={name} />
{:else if selection === 'votes'}
  <Voting socket={socket} bind:selection={selection}/>
{/if}


