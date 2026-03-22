import { z } from 'zod';

export const joinSchema = z.object({
    name: z.string().min(1, 'Name is required').regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/, 'Nombre debe contener solo letras'),
    gameId: z.string().regex(/^\d+$/, 'ID del juego debe ser un número'),
})

export const createSchema = z.object({
    name: z.string().min(1, 'Name is required').regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/, 'Nombre debe contener solo letras'),
})

export const wordSchema = z.object({
    word: z.string().min(1, 'Word is required').regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/, 'Palabra debe contener solo letras'),
})

