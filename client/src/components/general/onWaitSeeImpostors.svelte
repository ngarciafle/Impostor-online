<script lang="ts">
  import { Socket } from "socket.io-client";
  import { onMount } from "svelte";
  import clsx from "clsx";

  let { players }: { players: string[] } = $props();
  const r = 30;
  const circumference = 2 * Math.PI * r;

  let fraction: number = $derived((players.length % 4) / 4);
  let offset = $derived(circumference * (1 - fraction))
  let frontColor = $derived.by(() => {
    if (players.length < 4) return "green";
    if (players.length < 8) return "yellow";
    return "red";
  })
  let backColor = $derived.by(() => {
    if (players.length < 4) return "gray";
    if (players.length < 8) return "green";
    return "yellow";
  })

  $effect(() => {
    const nOfPlayers = players.length;
    if (nOfPlayers < 4) {
        frontColor = "green"
        backColor = "gray"
    } else if (nOfPlayers < 8) {
        frontColor = "yellow"
        backColor = "green"
    } else {
        frontColor = "red"
        backColor = "yellow"
    }
  })

  onMount(async () => {});
</script>

<div>
  <h3>Impostors: {Math.floor(players.length / 4) + 1}</h3>
  <!-- <div class="relative flex justify-center items-center">
        <div class={clsx("bg-green-300 w-20 aspect-square rounded-full absolute ")}></div>
        <div class={clsx("bg-green-300 w-20 aspect-square rounded-full absolute ")}></div>
        <div class={clsx("bg-white w-10 aspect-square rounded-full absolute ")}></div>
    </div> -->
  <svg width="120px" height="120px" viewBox="0 0 120 120">
    <circle
      class={clsx("")}
      cx="60"
      cy="60"
      r={r}
      fill="none"
      stroke-width="13"
      stroke={backColor}
    />
    <circle
      class={clsx("")}
      cx="60"
      cy="60"
      r={r}
      fill="none"
      stroke={frontColor}
      stroke-width="13"
      stroke-linecap="round"
      stroke-dashoffset={offset}
      stroke-dasharray={circumference}
      transform="rotate(-90 60 60)"
      style="transition: stroke-dashoffset 0.5s ease, stroke 0.5s ease"
    />
  </svg>
</div>
