<script lang="ts">
    import { io, type Socket } from "socket.io-client";
    import { onMount, onDestroy } from 'svelte';
    import { ChevronDown, ChevronUp } from "lucide-svelte";
    
    
    let { socket = $bindable(), gameId = $bindable(), name = $bindable(), messages = $bindable() }: { socket: Socket, gameId: string, name: string, messages: any[] } = $props();
    let messageInput: string = $state("");
    let isExpanded: boolean = $state(true);
    
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

<div>
    <ChevronDown onclick={() => { isExpanded = true; }} class={"md:hidden " + (isExpanded ? 'hidden' : 'block')}/>
    <ChevronUp onclick={() => { isExpanded = false; }} class={"md:hidden " + (isExpanded ? 'block' : 'hidden')}/>
    
    <div class={"transition-max-height duration-300 overflow-hidden " + (isExpanded ? 'max-h-screen' : 'max-h-0 md:max-h-screen')}>
        <div class="h-64 shadow rounded-2xl p-2 mb-4 flex flex-col">
            <div class="overflow-y-auto flex-1">
                {#each messages as content}
                <div class="flex flex-row gap-2 md:gap-3">
                    <p>{content.sender}:</p>
                    <p>{content.message}</p>
                </div>
                {/each}
            </div>
            
            <form onsubmit={sendMessage} class="flex bg-white mt-1">
                <input type="text" bind:value={messageInput} placeholder="Type your message..." class="flex-1 border rounded px-2 py-1" />
                <button type="submit" class="ml-2 bg-blue-500 text-white px-4 py-1 rounded">Mandar</button>
            </form>
        </div>
    </div>
</div>