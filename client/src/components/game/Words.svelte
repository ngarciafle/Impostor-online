<script lang="ts">
    import { io, type Socket } from "socket.io-client";
    import { onMount, onDestroy } from 'svelte';
    let { socket, gameId, selection = $bindable(), words = $bindable(), name } = $props<{
        socket: Socket;
        gameId: string;
        selection: 'initial' | 'create' | 'join' | 'wait' | 'card' | 'words' | 'votes' | 'end';
        words: any[];
        name: string;
    }>();
    let turn: boolean = $state(false);
    let error: string = $state("");


    onMount(() => {
        socket.on("init-turn", (data: any) => {
            if (!data.success) return alert("Error: " + data.message);
            turn = true;
        }) 
        
        socket.on("turn-result", (data: any) => {
            if (data.success) {
                turn = false;
            } else {
                console.error("Error in turn result:", data.message);
                error = data.message;
            }
        })
        
        socket.on("round-ended", () => {
            selection = 'votes';
        })
        
        socket.emit('words-ready', { gameId }); // Notify server that the client is ready to receive the init-turn event

    })
    
    onDestroy(() => {
        socket.off("init-turn");
        socket.off("turn-result");
        socket.off("round-ended");
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
            <form onsubmit={sendMessage} class="flex gap-2">
                <input type="text" name="word" placeholder="Introduce una palabra" class="focus:outline-[.5px] rounded-xl"/>
                {#if error}
                    <p class="text-red-500 text-sm">{error}</p>
                {/if}
                <button type="submit" class="flex gap-1 bg-background-secondary shadow shadow-foreground py-2 rounded-xl hover:scale-105 transition-transform duration-300 aspect-4/3 ">Mandar</button>
            </form>
        {:else}
            <p class="text-center text-gray-500">Esperando tu turno...</p>
            <!-- <p>Actual word</p> IDEA SHARE ACTUAL INPUT THROUGH SOCKETS -->
        {/if}
    </div>
</div>