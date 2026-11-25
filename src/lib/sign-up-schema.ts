import { z } from "zod";

export const signUpSchema = z.object({
    name: z.string("O nome é obrigatório").trim().
    min(1, "O nome é obrigatório").max(100, "O nome não pode ter mais de 100 caracteres"),
    email: z.email("O email é inválido").trim().max(254, "Email muito longo"),
    password: z.string("Senha inválida").min(10, "A senha deve ter no minímo 10 caracteres").
    max(20, "A senha deve ter no máximo 128 caracteres."),
});