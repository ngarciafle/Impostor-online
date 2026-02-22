<script lang="ts">
  export let selection: 'initial' | 'create' | 'join' | 'wait';

  export let name: string = "";
  export let idRoom: string = "";
  export let socketId: string | undefined;

  async function crearSala(evento: Event) {
    evento.preventDefault();

    if (!name) {
        alert("Por favor, escribe tu nombre.");
        return;
    }

   if (!socketId) {
        alert("Error de conexión. Intenta de nuevo.");
        return;
    } 

    const response = await fetch("http://localhost:3000/api/create-game", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, socketId }),
    });

    const data = await response.json();
    if (data.success) {
      selection = 'wait';
      idRoom = data.idRoom;
    } else {
      alert("Error al crear la sala.");
    }
  }
</script>

<h1 class="text-2xl">Crea una partida🕹</h1>
<form on:submit={crearSala} class="flex gap-4 xl:gap-6 xl:mt-16 md:mt-10 mt-8 flex-col md:flex-row md:items-center">
  <div class="flex md:flex-row flex-col gap-2">
    <label for="name">Nombre</label>
    <input type="text" bind:value={name} class="border border-foreground rounded-lg py-1 px-2" id="name">
  </div>

  <button type="submit" class="mt-4 md:mt-0 bg-green-100/50 shadow shadow-foreground py-2 px-4 rounded-2xl hover:scale-105 transition-transform duration-300">Crear</button>
</form>
<button on:click={() => selection = 'initial'} class="mt-6 md:mt-8 bg-background-secondary shadow shadow-foreground py-2 px-4 rounded-2xl hover:scale-105 transition-transform duration-300">Volver</button>
