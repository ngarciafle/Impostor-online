import { Server, Socket } from "socket.io";
import { roundWordSchema } from "../utils/zod";

export const roundWordUpdateSocket = (io: any, socket: any) => {
    socket.on("update-actual-word", async ({ word } : { word: string }) => {
        const gameId = socket.data.gameId;
        if (!gameId) return;

        const validatedData = roundWordSchema.safeParse({ word });

        if (!validatedData.success) {
            // socket.emit("error", { message: validatedData.error.flatten().fieldErrors });
            return;
        }

        io.to(gameId).emit("update-actual-word", { word });
    });
}