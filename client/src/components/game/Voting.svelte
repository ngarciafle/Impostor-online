<script lang="ts">
  import { io, type Socket } from "socket.io-client";
  import { onMount, onDestroy } from "svelte";
  import clsx from "clsx";
  export let socket: Socket;
  export let selection:
    | "initial"
    | "create"
    | "join"
    | "wait"
    | "card"
    | "words"
    | "votes"
    | "end";
  let players: any[] = [];
  let selectedPlayer: string | null = null;
  let voted: boolean = false;
  export let gameId: string;
  let result: string;
  export let name: string;

  onMount(() => {
    socket.on("get-players", (data: any) => {
      players = data;
    });

    socket.on("round-ended", () => {
      voted = false;
      selectedPlayer = null;
      players = [];
      selection = "words";
    });

    socket.on("add-vote", (name: string) => {
      // Update the votes for the player
      players = players.map((player) => player.name === name ? {...player, votes: player.votes + 1} : player);
    })

    socket.on("end-game", () => {
      selection = "end";
    });

    socket.on("vote-info", (data: string) => {
      result = data;
    });

    // vote to yourself changing html -> reset the vote on backend
    socket.on("bad-vote", () => {
      voted = false;
      selectedPlayer = null;
    })
  });
  
  onDestroy(() => {
    socket.off("get-players");
    socket.off("round-ended");
    socket.off("end-game");
    socket.off("vote-info");
    socket.off("bad-vote");
  });

  function sendVote(name: string | null) {
    socket.emit("send-vote", { gameId: gameId, playerName: name });
  }
</script>

<div class="flex flex-col">

  {#if result}
  <h2>{result}</h2>
  {:else}
  <h1 class="text-2xl font-bold text-center mb-16 md:mb-20 xl:mb-24">Voting phase🗳</h1>
  <div
    class="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
  >
  {#each players as player}
  <button
      class={clsx("aspect-square bg-amber-100 shadow shadow-blue-700 w-10 md:w-12 rounded-xl", voted && " bg-blue-800/40", player.name === selectedPlayer && " bg-green-200", player.name === name && " bg-amber-500/50 opacity-40", voted && selectedPlayer !== player.name && "opacity-40")}
      disabled={voted || player.name === name}
      on:click={() => {
        selectedPlayer = player.name;
        voted = true;
        sendVote(player.name);
      }}>
        <p>{player.votes}</p>
        {player.name}
        </button
        >
        {/each}
        
        <button
    class={clsx("aspect-square bg-blue-800/40 shadow shadow-orange-950 w-10 md:w-12 rounded-xl", selectedPlayer === null && voted && " bg-green-200", voted && selectedPlayer !== null && "opacity-40")}
    disabled={voted}
    on:click={() => {
      voted = true;
      sendVote(null);
    }}>
      <p class="">
        Saltar
      </p>
      </button
      >
    </div>
  {/if}
      
</div>