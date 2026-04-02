<script lang="ts">
  import { io, type Socket } from "socket.io-client";
  import { onMount, onDestroy } from "svelte";
  import clsx from "clsx";
  import { fly } from "svelte/transition";

  interface VotingProps {
    socket: Socket;
    selection:
      | "initial"
      | "create"
      | "join"
      | "wait"
      | "card"
      | "words"
      | "votes"
      | "end";
    gameId: string;
    name: string;
  }

  let { socket, selection = $bindable(), gameId, name }: VotingProps = $props();

  let players: any[] = $state([]);
  let selectedPlayer: string | null = $state(null);
  let voted: boolean = $state(false);
  let result: string = $state("");
  let impostorOut: boolean = $state(false);

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
      players = players.map((player) =>
        player.name === name ? { ...player, votes: player.votes + 1 } : player,
      );
    });

    socket.on("end-game", () => {
      selection = "end";
    });

    socket.on("vote-info", (data: any) => {
      result = data.vote;
      impostorOut = data.impostorOut;
    });

    // vote to yourself changing html -> reset the vote on backend
    socket.on("bad-vote", () => {
      voted = false;
      selectedPlayer = null;
      alert("No puedes votar por ti mismo, tu voto ha sido anulado");
    });
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
    <h2 in:fly|global={{ duration: 2000, y: 50 }}>
      {result == "tie" ? "¡Empate!" : `¡${result} ha sido votado fuera!`}
    </h2>
    <h4 in:fly|global={{ duration: 4000, y: 50 }} class={clsx(impostorOut ? "text-red-500" : "text-green-500")}>
      {impostorOut
        ? "¡El impostor ha sido votado fuera!"
        : "No se ha votado a un impostor"}
    </h4>
  {:else}
    <h1 class="text-2xl font-bold text-center mb-16 md:mb-20 xl:mb-24">
      Voting phase🗳
    </h1>
    <div
      class="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
    >
      {#each players as player}
        <button
          class={clsx(
            "aspect-square bg-amber-100 shadow shadow-blue-700 w-10 md:w-12 rounded-xl",
            voted && " bg-blue-800/40",
            player.name === selectedPlayer && " bg-green-200",
            player.name === name && " bg-amber-500/50 opacity-40",
            voted && selectedPlayer !== player.name && "opacity-40",
          )}
          disabled={voted || player.name === name}
          onclick={() => {
            selectedPlayer = player.name;
            voted = true;
            sendVote(player.name);
          }}
        >
          <p in:fly|global={{ duration: 600, y: 10 }}>{player.votes}</p>
          {player.name}
        </button>
      {/each}

      <button
        class={clsx(
          "aspect-square bg-blue-800/40 shadow shadow-orange-950 w-10 md:w-12 rounded-xl",
          selectedPlayer === null && voted && " bg-green-200",
          voted && selectedPlayer !== null && "opacity-40",
        )}
        disabled={voted}
        onclick={() => {
          voted = true;
          sendVote(null);
        }}
      >
        <p class="">Saltar</p>
      </button>
    </div>
  {/if}
</div>
