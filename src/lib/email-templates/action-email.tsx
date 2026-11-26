import { render } from "@react-email/render";
import type { CSSProperties } from "react";

interface ActionEmailProps {
  heading: string;
  message: string;
  buttonLabel: string;
  hint: string;
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

const ActionEmail = ({ heading, message, buttonLabel, hint, url }: ActionEmailProps) => (
  <html lang="pt-BR">
    <body style={styles.body}>
      <table role="presentation" width="100%" cellPadding={0} cellSpacing={0}>
        <tbody>
          <tr>
            <td align="center">
              <table role="presentation" cellPadding={0} cellSpacing={0} style={styles.card}>
                <tbody>
                  <tr>
                    <td>
                      <h1 style={styles.heading}>{heading}</h1>
                      <p style={styles.text}>{message}</p>
                      <a href={url} style={styles.button}>{buttonLabel}</a>
                      <p style={styles.hint}>{hint}</p>
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
export const renderActionEmail = (props: ActionEmailProps) =>
  render(<ActionEmail {...props} />);
