<script lang="ts">
  import { CirclePlay, CirclePlus } from 'lucide-svelte';

  export let selection: 'initial' | 'create' | 'join';
</script>

<div class="mt-20 md:mt-30 xl:mt-40 flex flex-col items-center">
  <h1 class="text-2xl">Impostor Online🕵️‍♂️</h1>
  <div class="flex gap-4 xl:gap-6 xl:mt-16 md:mt-10 mt-8 flex-col md:flex-row">
    <button on:click={() => selection = 'create'} class="flex gap-1 bg-background-secondary shadow shadow-foreground py-2 px-1.5 rounded-2xl hover:scale-105 transition-transform duration-300">
      <CirclePlus />
      <p class="text-md">Crear sala</p>
    </button>
    <button on:click={() => selection = 'join'} class="flex gap-1 bg-background-secondary shadow shadow-foreground py-2 rounded-2xl hover:scale-105 transition-transform duration-300">
      <CirclePlay />
      <p class="text-md">Unirse</p>
    </button>
  </div>
</div>
