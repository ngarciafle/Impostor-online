<script lang="ts">
  import { io, type Socket } from "socket.io-client";
  import { onMount, onDestroy } from "svelte";

  interface CardProps {
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
    word: string;
    role: "impostor" | "crewmate";
  }

  let {
    socket,
    selection = $bindable(),
    word,
    role,
  }: CardProps = $props();

  let show: boolean = $state(false);
  // 9 because of delay 
  let total: number = 9;
  let remaining: number = $state(9);
  let pct = $derived((remaining / total) * 100);
  let color = $derived.by(() => {
    if (pct > 66) return "bg-green-500";
    if (pct > 33) return "bg-yellow-500";
    return "bg-red-500";
  });
  let intervalLine: ReturnType<typeof setInterval>;

  onMount(() => {
    socket.on("round-started", () => {
      selection = "words";
    });


    intervalLine = setInterval(() => {
      if (remaining <= 0) return;
      remaining--;
    }, 1000);
  });

  onDestroy(() => {
    socket.off("round-started");
    clearInterval(intervalLine);
  });
</script>

<div class="w-full">
  <div
    class={"h-2 transition-all duration-1000 ease-linear " + color}
    style={"width: " + pct + "%;"}
  ></div>
</div>

<h1 class="text-2xl md:text-3xl font-bold text-center mb-4 mt-10">{role}</h1>
<button
  class="aspect-9/16 bg-amber-100 w-30 md:w-40 xl-w-50 flex items-center justify-center rounded-2xl shadow shadow-blue-950"
  onclick={() => (show = !show)}
>
  {#if show}
    <h2 class="text-xl md:text-2xl font-semibold">{word}</h2>
  {:else}
    <p class="text-sm md:text-base text-gray-500">
      Haz click para ver tu palabra
    </p>
  {/if}
</button>
