import {z} from 'zod'

export const passwordSchema = z.string("Senha inválida").
min(8, "A senha deve ter no minímo 8 caracteres").
max(128, "A senha deve ter no máximo 128 caracteres.").
regex(/\p{Lu}/u, "A senha deve ter no minímo uma letra maiúscula").
regex(/\p{N}/u,"A senha deve ter no minímo um número ").
regex(/[^\p{L}\p{N}\s]/u, "A senha deve ter pelo menos um caractere especial")