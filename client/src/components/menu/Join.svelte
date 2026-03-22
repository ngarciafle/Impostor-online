<script lang="ts">
  interface JoinGameProps {
    name: string;
    gameId: string;
    selection: 'initial' | 'create' | 'join' | 'wait' | 'card' | 'words' | 'votes' | 'end';
    socketId: string | undefined;
  }


  let { name = $bindable(), gameId = $bindable(), selection = $bindable(), socketId = $bindable() }: JoinGameProps = $props();
  let error: any = $state("");



async function joinGame(event: Event) {
  event.preventDefault();
  try {
    const response = await fetch("http://localhost:3000/api/join-game", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name: name, gameId: gameId, socketId }),
    });
    const data = await response.json();
    if (data.success) {
        gameId = data.gameId;
        selection = 'wait';
    } else {
        error = data.message || "Error al unirse a la sala.";
    }
  } catch (err) {
    console.error("Error joining game:", err);
    error = err instanceof Error ? err.message : "Error de conexión. Intenta de nuevo.";
  }
} 

</script>

<h1 class="text-2xl mt-10 md:mt-16 xl:mt-20">Unirse a una partida🕹</h1>
<form onsubmit={joinGame} class="flex gap-2 xl:gap-6 mt-20 sm:mt-[8%] md:mt-[12%] flex-col md:flex-row md:items-center">
  <div class="grid grid-cols-[1fr_2fr] grid-rows-2 gap-2">
    <label for="name">Nombre</label>
    <input type="text" bind:value={name} class="border border-foreground rounded-lg py-1 px-2" id="name">

    <label for="id">ID del juego</label>
    <input type="text" bind:value={gameId} class="border border-foreground rounded-lg py-1 px-2" placeholder="Ej: 1234" id="id">
  </div>

  <button type="submit" class="mt-4 md:mt-0 bg-green-100/40 shadow shadow-foreground py-2 px-4 rounded-2xl hover:scale-105 transition-transform duration-300">Unirse</button>
</form>
{#if error}
  <p class="text-red-500 mt-4">{error}</p>
{/if}
<button onclick={() => selection = 'initial'} class="mt-6 md:mt-8 bg-background-secondary shadow shadow-foreground py-2 px-4 rounded-2xl hover:scale-105 transition-transform duration-300">Volver</button>
