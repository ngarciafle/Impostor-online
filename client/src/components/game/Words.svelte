<script lang="ts">
    import { io, type Socket } from "socket.io-client";
    export let socket: Socket;
    export let selection: 'initial' | 'create' | 'join' | 'wait' | 'card' | 'words' | 'votes';

</script>


<div class="aspect-9/16 ">
    <div class="flex flex-col gap-2">
        <strong></strong>
        <p></p>
    </div>
</div>