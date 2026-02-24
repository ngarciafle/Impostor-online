<script lang="ts">
    import { io, type Socket } from "socket.io-client";
    import { onMount } from 'svelte';
    export let socket: Socket;
    export let selection: 'initial' | 'create' | 'join' | 'wait' | 'card' | 'words' | 'votes';
    let turn: boolean = false;


    onMount(() => {
        socket.on("my-turn", () => {
            turn = true;
        }) 

        socket.on("stop-turn", () => {
            turn = false;
        })

        socket.on("round-ended", () => {
            selection = 'votes';
        })
    })

    function sendMessage(event: Event) {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);
        const word = formData.get("word") as string;
        socket.emit('send-message', { gameId: 'some-game-id', senderName: 'Player1', word: word });
    }
</script>


<div class="aspect-9/16 ">
    <div class="flex flex-col gap-2">
        {#if turn}
            <form on:submit={sendMessage}>
                <input type="text" name="word" placeholder="Enter a word" />
                <button type="submit">Send</button>
            </form>
        {:else}
            <p class="text-center text-gray-500">Esperando tu turno...</p>
            <p>Actual word</p> <!-- IDEA SHARE ACTUAL INPUT THROUGH SOCKETS-->
        {/if}
    </div>
</div>