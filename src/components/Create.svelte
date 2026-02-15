<script lang="ts">


  export let selection: 'initial' | 'create' | 'join';
</script>


<div>
  <h1 class="text-2xl">Crea una partida🕹</h1>
  <div>
    <label for="name">Nombre</label>
    <input type="text">

    <button>Crear</button>

    <button on:click={() => selection = 'initial'}>Volver</button>
  </div>
</div>