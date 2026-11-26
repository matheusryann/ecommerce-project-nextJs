import { render } from "@react-email/render";
import type { CSSProperties } from "react";

interface VerificationEmailProps {
  name: string;
  url: string;
}

const styles = {
  body: {
    margin: 0,
    padding: "24px",
    backgroundColor: "#f4f4f5",
    fontFamily: "Arial, Helvetica, sans-serif",
    color: "#18181b",
  },
  card: {
    width: "100%",
    maxWidth: "480px",
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    padding: "32px",
  },
  heading: {
    margin: "0 0 16px",
    fontSize: "22px",
  },
  text: {
    margin: "0 0 24px",
    fontSize: "15px",
    lineHeight: "1.5",
  },
  button: {
    display: "inline-block",
    padding: "12px 24px",
    backgroundColor: "#18181b",
    color: "#ffffff",
    textDecoration: "none",
    borderRadius: "999px",
    fontSize: "15px",
  },
  hint: {
    margin: "24px 0 0",
    fontSize: "13px",
    lineHeight: "1.5",
    color: "#71717a",
  },
} satisfies Record<string, CSSProperties>;

const VerificationEmail = ({ name, url }: VerificationEmailProps) => (
  <html lang="pt-BR">
    <body style={styles.body}>
      <table role="presentation" width="100%" cellPadding={0} cellSpacing={0}>
        <tbody>
          <tr>
            <td align="center">
              <table
                role="presentation"
                cellPadding={0}
                cellSpacing={0}
                style={styles.card}
              >
                <tbody>
                  <tr>
                    <td>
                      <h1 style={styles.heading}>Confirme seu e-mail</h1>
                      <p style={styles.text}>
                        Olá, {name}! Falta só um passo para ativar sua conta na
                        Bewear.
                      </p>
                      <a href={url} style={styles.button}>
                        Confirmar e-mail
                      </a>
                      <p style={styles.hint}>
                        O link expira em 1 hora. Se você não criou esta conta,
                        ignore este e-mail.
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </body>
  </html>
);

export const renderVerificationEmail = (props: VerificationEmailProps) =>
  render(<VerificationEmail {...props} />);
