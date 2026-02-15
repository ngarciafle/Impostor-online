<script lang="ts">
  
  export let selection: 'initial' | 'create' | 'join';
</script>


<div>
  <h1 class="text-2xl">Unirse a una partida🕹</h1>
  <div>
    <label for="name">Nombre</label>
    <input type="text" id="name">

    <label for="id">ID del juego</label>
    <input type="text" placeholder="Ej: 1234" id="id">

    <button>Unirse</button>


    <button on:click={() => selection = 'initial'}>Volver</button>
  </div>
</div>