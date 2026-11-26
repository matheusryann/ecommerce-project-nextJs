import { renderActionEmail } from "./action-email";

interface AuthEmailProps {
  name: string;
  url: string;
}

export const renderVerificationEmail = ({ name, url }: AuthEmailProps) =>
  renderActionEmail({
    heading: "Confirme seu e-mail",
    message: `Olá, ${name}! Falta só um passo para ativar sua conta na Bewear.`,
    buttonLabel: "Confirmar e-mail",
    hint: "O link expira em 1 hora. Se você não criou esta conta, ignore este e-mail.",
    url,
  });

export const renderResetPasswordEmail = ({ name, url }: AuthEmailProps) =>
  renderActionEmail({
    heading: "Redefina sua senha",
    message: `Olá, ${name}! Recebemos um pedido para redefinir a senha da sua conta na Bewear.`,
    buttonLabel: "Redefinir senha",
    hint: "O link expira em 1 hora. Se você não fez este pedido, ignore este e-mail: sua senha continua a mesma.",
    url,
  });