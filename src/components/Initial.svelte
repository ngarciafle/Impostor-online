<script lang="ts">
  import { CirclePlay, CirclePlus } from 'lucide-svelte';
</script>

<div class="mt-[25%] xl:mt-[15%] flex flex-col items-center">
  <h1 class="text-2xl">Impostor Online🕵️‍♂️</h1>
  <div class="flex gap-4 xl:gap-6 xl:mt-8 md:mt-6 mt-4 flex-col md:flex-row">
    <button class="flex gap-1 bg-background-secondary shadow shadow-foreground py-2 px-1.5 rounded-2xl hover:scale-105 transition-transform duration-300">
      <CirclePlus />
      <p class="text-md">Start a game</p>
    </button>
    <button class="flex gap-1 bg-background-secondary shadow shadow-foreground py-2 rounded-2xl hover:scale-105 transition-transform duration-300">
      <CirclePlay />
      <p class="text-md">Join a game</p>
    </button>
  </div>
</div>
