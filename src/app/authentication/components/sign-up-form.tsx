"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {z} from "zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object ({
    name: z.string("Nome é obrigatório").trim().min(1, "Nome é obrigatório"),
    email: z.email("Email inválido"),
    password: z.string("Senha inválida").min(8),
    confirmPassword: z.string("Senha inválida").min(8, "Senha inválida")
,})
.refine((data) => {
    return data.password === data.confirmPassword
}, {
    error: "As senhas não coincidem",
    path: ["confirmPassword"],
},  
);

type FormValues = z.infer<typeof formSchema>;

const SignUpForm = () => { 
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    function onSubmit(values: FormValues) {
        console.log(values);
    }

return (
        <>
        <Card>
            <CardHeader>
              <CardTitle>Entrar</CardTitle>
              <CardDescription>
                Faça login para continuar
              </CardDescription>
            </CardHeader>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <CardContent className="grid gap-6">
                <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite seu nome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite seu email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite sua senha" {...field} type="password'" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField 
            control={form.control}
            name="confirmPassword"
            render={({field}) => (
                <FormItem>
                    <FormLabel>Confirmar Senha</FormLabel>
                    <FormControl>
                        <Input placeholder="Confirme sua senha" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}           
            />
            </CardContent>
            <CardFooter>
            <Button type="submit">Entrar</Button>
            </CardFooter>
            </form>
            </Form>
          </Card>
        </>
);
};

export default SignUpForm;