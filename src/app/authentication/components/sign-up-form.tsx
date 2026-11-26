"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { signUpSchema } from "@/lib/sign-up-schema";

const formSchema = signUpSchema
  .extend({
    confirmPassword: z.string("Confirme sua senha"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof formSchema>;

interface SignUpField {
  name: keyof FormValues;
  label: string;
  placeholder: string;
  type: "text" | "email" | "password";
  autoComplete: string;
}

const signUpFields: SignUpField[] = [
  {
    name: "name",
    label: "Nome",
    placeholder: "Digite seu nome",
    type: "text",
    autoComplete: "name",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Digite seu email",
    type: "email",
    autoComplete: "email",
  },
  {
    name: "password",
    label: "Senha",
    placeholder: "Digite sua senha",
    type: "password",
    autoComplete: "new-password",
  },
  {
    name: "confirmPassword",
    label: "Confirmar senha",
    placeholder: "Confirme sua senha",
    type: "password",
    autoComplete: "new-password",
  },
];

const SignUpForm = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    await authClient.signUp.email({
      name: values.name,
      email: values.email,
      password: values.password,
      callbackURL: "/",
      fetchOptions: {
        onSuccess: () => {
          toast.success(
            "Enviamos um link de confirmação para o seu e-mail. Confirme para entrar.",
          );
          form.reset();
        },
        onError: ({ error }) => {
          toast.error(
            error.message || "Não foi possível criar a conta. Tente novamente.",
          );
        },
      },
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Criar conta</CardTitle>
        <CardDescription>Preencha os dados para se cadastrar</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CardContent className="grid gap-6">
            {signUpFields.map(
              ({ name, label, placeholder, type, autoComplete }) => (
                <FormField
                  key={name}
                  control={form.control}
                  name={name}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{label}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={placeholder}
                          type={type}
                          autoComplete={autoComplete}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ),
            )}
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Criando conta..." : "Criar conta"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default SignUpForm;
