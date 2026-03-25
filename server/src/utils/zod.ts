import { z } from "zod";

export const joinSchema = z.object({
  name: z
    .string()
    .min(1, "Nombre es requerido")
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/, "Nombre debe contener solo letras")
    .max(20, "Nombre no puede exceder los 20 caracteres"),
  gameId: z
    .string()
    .regex(/^\d+$/, "ID del juego debe ser un número")
    .max(5, "ID del juego no puede exceder los 5 caracteres"),
});

export const createSchema = z.object({
  name: z
    .string()
    .min(1, "Nombre es requerido")
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/, "Nombre debe contener solo letras")
    .max(20, "Nombre no puede exceder los 20 caracteres"),
});

export const wordSchema = z.object({
  word: z
    .string()
    .min(1, "Palabra es requerida")
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/, "Palabra debe contener solo letras")
    .max(50, "Palabra no puede exceder los 50 caracteres"),
});

export const messageSchema = z.object({
  senderName: z
    .string()
    .min(1, "Nombre del remitente es requerido")
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/, "Nombre debe contener solo letras")
    .max(20, "Nombre no puede exceder los 20 caracteres"),
  message: z
    .string()
    .min(1, "Mensaje es requerido")
    .max(200, "Mensaje no puede exceder los 200 caracteres"),
});

export const voteSchema = z.object({
  playerName: z.union([
    z
      .string()
      .min(1, "Nombre del jugador es requerido")
      .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/, "Nombre debe contener solo letras")
      .max(20, "Nombre no puede exceder los 20 caracteres"),
    z.null(),
  ]),
});
