<script lang="ts">
    import { io, type Socket } from "socket.io-client";
    import { onMount } from 'svelte';
    export let socket: Socket;
    export let gameId: string;
    export let selection: 'initial' | 'create' | 'join' | 'wait' | 'card' | 'words' | 'votes';
    let turn: boolean = false;
    export let words: any[];
    export let name: string;


    onMount(() => {
        socket.on("init-turn", (data) => {
            turn = true;
        }) 

        socket.on("turn-result", (data: any) => {
            if (data.success) {
                turn = false;
            } else {
                alert("Error: " + data.message);
            }
        })

        socket.on("round-ended", () => {
            selection = 'votes';
        })

        socket.on("new-word", (data: any) => {
            words = [...words, data];
        })
    })

    function sendMessage(event: Event) {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);
        const word = formData.get("word") as string;
        socket.emit('send-word', { gameId: gameId, senderName: name, word: word });
    }
</script>


<div class="aspect-9/16 ">
    <div class="flex flex-col gap-2">
        <div class="flex flex-col overflow-x-auto scrollbar-thin">
            {#each words as content}
                <p>{content.sender}: {content.word}</p>
            {/each}
        </div>
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