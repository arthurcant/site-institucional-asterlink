# Integração do formulário com Zoho Mail

O backend usa Nodemailer para enviar os contatos por SMTP autenticado da Zoho.

## 1. Dados necessários na Zoho

1. Entre na conta que será usada para enviar os contatos.
2. No Zoho Mail, abra **Settings > Mail Accounts** e consulte **Server Configuration Details**.
3. Anote o servidor SMTP indicado para a conta e o datacenter.
4. Confirme o endereço completo da caixa postal que fará o envio.
5. Em Zoho Accounts, abra **Security** e crie uma senha específica de aplicativo para o site. Se a autenticação em dois fatores estiver ativa, não use a senha normal da conta.

Configurações comuns documentadas pela Zoho:

- Conta pessoal ou organização gratuita: `smtp.zoho.com`.
- Organização paga com domínio próprio: `smtppro.zoho.com`.
- SSL: porta `465` e `ZOHO_SMTP_SECURE=true`.
- TLS: porta `587` e `ZOHO_SMTP_SECURE=false`.

Sempre prefira os dados exibidos dentro da própria conta, pois o host pode variar conforme o datacenter.

## 2. Configurar o projeto

Na raiz do projeto, copie `.env.example` para `.env` e substitua os valores:

```env
PORT=3000
CORS_ORIGIN=*
ZOHO_SMTP_HOST=smtp.zoho.com
ZOHO_SMTP_PORT=465
ZOHO_SMTP_SECURE=true
ZOHO_MAIL_USER=contato@seudominio.com.br
ZOHO_MAIL_PASSWORD=sua_senha_de_aplicativo
ZOHO_MAIL_FROM=contato@seudominio.com.br
ZOHO_MAIL_TO=contato@seudominio.com.br
```

`ZOHO_MAIL_FROM` deve ser a conta autenticada ou um alias autorizado nela. `ZOHO_MAIL_TO` é a caixa que receberá os formulários e pode ser diferente.

Não publique nem envie o arquivo `.env`. Ele já está ignorado pelo Git.

## 3. Executar

Dentro de `backend-contato`:

```powershell
npm install
npm run check
npm start
```

O formulário continuará enviando para `http://localhost:3000/api/contato`. Para confirmar que o backend está ativo, acesse `http://localhost:3000/api/saude`.

## 4. Solução de problemas

- `EAUTH`: e-mail, senha de aplicativo ou servidor SMTP incorreto.
- `Relaying disallowed`: `ZOHO_MAIL_FROM` não corresponde à conta autenticada nem a um alias permitido.
- Timeout/conexão: confira host, porta e se SSL/TLS está coerente.
- Em produção, troque `CORS_ORIGIN=*` pela origem real do site.

Documentação oficial: https://www.zoho.com/mail/help/zoho-smtp.html
