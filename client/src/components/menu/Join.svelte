<script lang="ts">
  interface JoinGameProps {
    name: string;
    gameId: string;
    selection: 'initial' | 'create' | 'join' | 'wait' | 'card' | 'words' | 'votes' | 'end';
    socketId: string | undefined;
  }


  let { name = $bindable(), gameId = $bindable(), selection = $bindable(), socketId = $bindable() }: JoinGameProps = $props();
  let error: any = $state({message: "", name: "", gameId: ""});



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
        error.message = data.message || "Error al unirse a la sala.";
        error.name = data.errors?.name ? data.errors.name[0] : "";
        error.gameId = data.errors?.gameId ? data.errors.gameId[0] : "";
    }
  } catch (err) {
    console.error("Error joining game:", err);
    error.message = err instanceof Error ? err.message : "Error de conexión. Intenta de nuevo.";
  }
} 

</script>

<h1 class="text-2xl mt-10 md:mt-16 xl:mt-20">Unirse a una partida🕹</h1>
<form onsubmit={joinGame} class="flex gap-2 xl:gap-6 mt-20 sm:mt-[8%] md:mt-[12%] flex-col md:flex-row md:items-center">
  <div class="grid grid-cols-[1fr_2fr] grid-rows-2 gap-2">
    <label for="name">Nombre</label>
    <input type="text" bind:value={name} class="border border-foreground rounded-lg py-1 px-2" id="name">
    {#if error.name}
      <p class="text-red-400 col-span-2 text-sm">{error.name}</p>
    {/if}
    
    <label for="id">ID del juego</label>
    <input type="text" bind:value={gameId} class="border border-foreground rounded-lg py-1 px-2" placeholder="Ej: 1234" id="id">
    {#if error.gameId}
      <p class="text-red-400 col-span-2 text-sm">{error.gameId}</p>
    {/if}
  </div>

  <button type="submit" class="mt-4 md:mt-0 bg-green-100/40 shadow shadow-foreground py-2 px-4 rounded-2xl hover:scale-105 transition-transform duration-300">Unirse</button>
</form>
{#if error && !error.gameId}
  <p class="text-red-400 mt-4">{error.message}</p>
{/if}
<button onclick={() => selection = 'initial'} class="mt-6 md:mt-8 bg-background-secondary shadow shadow-foreground py-2 px-4 rounded-2xl hover:scale-105 transition-transform duration-300">Volver</button>
