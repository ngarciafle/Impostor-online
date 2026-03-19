<script lang="ts">
  import { io, type Socket } from "socket.io-client";
  import { onMount, onDestroy } from 'svelte';

  import Initial from './menu/Initial.svelte';
  import Create from './menu/Create.svelte';
  import Join from './menu/Join.svelte';
  import Wait from './menu/Wait.svelte';
  import Card from "./game/Card.svelte";
  import Words from "./game/Words.svelte";
  import Voting from "./game/Voting.svelte";
  import End from "./game/End.svelte";

  import OnWaitSeeImpostors from "./general/onWaitSeeImpostors.svelte";
  import Chat from "./general/Chat.svelte";

  
  let role: 'impostor' | 'crewmate' = 'crewmate';
  let leader: boolean;
  let word: string;
  let socket: Socket;
  let socketId: string | undefined;
  let name: string;
  let gameId: string;
  let selection: 'initial' | 'create' | 'join' | 'wait' | 'card' | 'words' | 'votes' | 'end' = 'initial';
  let words: string[] = [];
  let messages: any[] = [];
  let players: string[] = [];


  onMount(() => {
    socket = io("http://localhost:3000");
    socket.on("connect", () => {
      socketId = socket.id;
    })

    socket.on("new-leader", (newLeader) => {
      leader = true;
    });

    socket.on("new-word", (data: any) => {
      words = [...words, data];
    });

    socket.on("player-joined", (newPlayers) => {
        players = newPlayers;
    });

    socket.on("players-left", (newPlayers) => {
        players = newPlayers;
    });

  });

  onDestroy(() => {
    if (socket) {
      socket.disconnect();
    }
  })


</script>

{#if selection === 'initial'}
  <Initial bind:selection/>
{:else if selection === 'create'}
  <Create bind:selection bind:name bind:gameId bind:socketId/>
{:else if selection === 'join'}
  <Join bind:selection bind:name bind:gameId bind:socketId/>
{:else if selection === 'card'}
  <Card word={word} role={role} socket={socket} bind:selection={selection}/>
{/if}

<div class="mt-20 md:mt-30 xl:mt-40 md:grid md:grid-cols-3 gap-4">
  {#if selection === 'wait'}
  <OnWaitSeeImpostors players={players} />
  <Wait bind:selection name={name} bind:gameId bind:word bind:role socket={socket} bind:leader={leader} bind:words={words} players={players}/>
  <Chat socket={socket} gameId={gameId} name={name} messages={messages} />
  {:else if selection === 'words'}
    <div></div>
    <Words socket={socket} bind:selection={selection} bind:words={words} gameId={gameId} name={name} />
    <Chat socket={socket} gameId={gameId} name={name} messages={messages} />
  {:else if selection === 'votes'}
    <div></div>
    <Voting socket={socket} bind:selection={selection} gameId={gameId} name={name}/>
    <Chat socket={socket} gameId={gameId} name={name} messages={messages} />
  {:else if selection === 'end'}
    <div></div>
    <End socket={socket} bind:selection={selection} gameId={gameId}/>
    <Chat socket={socket} gameId={gameId} name={name} messages={messages} />
  {/if}
</div>

