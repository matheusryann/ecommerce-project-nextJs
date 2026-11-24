import "dotenv/config";

import { sendEmail } from "../src/lib/email";

const main = async () => {
  const result = await sendEmail({
    to: "teste@exemplo.com",
    subject: "Teste do Mailpit",
    html: "<h1>Funcionou</h1><p>E-mail capturado pelo Mailpit.</p>",
  });
  console.log(result);
};

main();