<script lang="ts">


  export let selection: 'initial' | 'create' | 'join';
</script>


<div class="mt-20 md:mt-30 xl:mt-40 flex flex-col items-center gap-4">
  <h1 class="text-2xl">Crea una partida🕹</h1>
  <form class="flex gap-4 xl:gap-6 xl:mt-16 md:mt-10 mt-8 flex-col md:flex-row md:items-center">
    <div class="flex md:flex-row flex-col gap-2">
      <label for="name">Nombre</label>
      <input type="text" class="border border-foreground rounded-lg py-1 px-2">
    </div>

    <button class="mt-4 md:mt-0 bg-green-100/50 shadow shadow-foreground py-2 px-4 rounded-2xl hover:scale-105 transition-transform duration-300">Crear</button>

  </form>
  <button on:click={() => selection = 'initial'} class="mt-6 md:mt-8 bg-background-secondary shadow shadow-foreground py-2 px-4 rounded-2xl hover:scale-105 transition-transform duration-300">Volver</button>
</div>