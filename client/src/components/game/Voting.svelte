<script lang="ts">
  import { io, type Socket } from "socket.io-client";
  import { onMount, onDestroy } from "svelte";
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

  onMount(() => {
    socket.on("get-players", (data: any) => {
      players = data.players;
    });

    socket.on("round-ended", () => {
      selection = "words";
    });

    socket.on("add-vote", (name: string) => {
      const player = players.find((p) => p.name === name);
      if (player) {
        player.votes += 1;
      }
    })

    socket.on("end-game", () => {
      selection = "end";
    });

    socket.on("vote-info", (data: string) => {
      result = data;
    });
  });
  
  onDestroy(() => {
    socket.off("get-players");
    socket.off("round-ended");
    socket.off("end-game");
    socket.off("vote-info");
  });

  function sendVote(name: string | null) {
    socket.emit("send-vote", { gameId: gameId, playerName: name });
  }
</script>

{#if result}
  <h2>{result}</h2>
{:else}
  <h1>voting phase</h1>
  <div
    class="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
  >
    {#each players as player}
      <button
        class="aspect-4/3 bg-amber-100 shadow shadow-blue-700 w-7"
        disabled={voted}
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
      class="aspect-4/3 bg-blue-300 shadow shadow-orange-950 w-7"
      disabled={voted}
      on:click={() => {
        voted = true;
        sendVote(null);
      }}>Saltar</button
    >
  </div>
{/if}
