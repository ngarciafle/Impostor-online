<script lang="ts">
    import { io, type Socket } from "socket.io-client";
    import { onMount, onDestroy } from 'svelte';
    export let socket: Socket;
    export let gameId: string;
    export let name: string;
    let messages: any[] = [];
    let messageInput: string = "";

    onMount(() => {
        socket.on("new-message", (data) => {
            messages = [...messages, data];
        })
    })

    onDestroy(() => {
        socket.off("new-message");
    })

    function sendMessage(event: Event) {
        event.preventDefault();
        if (messageInput.trim() === "") return; // Don't send empty messages
        socket.emit('send-message', { gameId: gameId, senderName: name, message: messageInput });
        messageInput = ""; // Clear the input after sending
    }

</script>


<div class="">
    {#each messages as content}
        <div class="flex flex-row gap-2 md:gap-3">
        <p>{content.sender}:</p>
        <p>{content.message}</p>
        </div>
    {/each}

    <form on:submit={sendMessage} class="flex">
        <input type="text" bind:value={messageInput} placeholder="Type your message..." class="flex-1 border rounded px-2 py-1" />
        <button type="submit" class="ml-2 bg-blue-500 text-white px-4 py-1 rounded">Mandar</button>
    </form>
</div>