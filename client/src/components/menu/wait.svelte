<script lang="ts">
    export let name: string;
    export let idRoom: string;

</script>


<div class="flex flex-col items-center mt-10">
    <h1 class="text-3xl font-bold text-green-600 mb-4">¡Conectado! ✅</h1>
    <p class="text-xl">Has entrado a la sala: <strong class="text-blue-500">{idRoom}</strong></p>
    <p class="text-lg mt-2">Jugador: <strong>{name}</strong></p>

    <div class="mt-8 p-4 border border-dashed border-gray-400 rounded-xl">
        <p class="opacity-70 animate-pulse">Esperando a que el líder inicie la partida...</p>
    </div>
</div>
