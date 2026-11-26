import { z } from "zod";
import { passwordSchema } from "./password-schema";

export const signUpSchema = z.object({
    name: z.string("O nome é obrigatório").trim().
    min(1, "O nome é obrigatório").max(100, "O nome não pode ter mais de 100 caracteres"),
    email: z.email("O email é inválido").trim().max(254, "Email muito longo"),
    password: passwordSchema,
});