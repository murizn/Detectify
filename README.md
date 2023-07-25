# Anti Chifre 🐂 - Discord Selfbot & Webhook

Este repositório contém um código incrível que combina um Discord Selfbot com Webhooks para criar uma poderosa ferramenta anti chifre! 🚫🐂

## Visão Geral 📜

O código é construído usando a biblioteca discord.js-selfbot e discord-webhook-node para rastrear atividades específicas de um usuário do Discord com base em seu ID. O bot Self verifica as mensagens, mensagens editadas, atualizações de perfil, atividades de voz, banimentos, desbanimentos e atualizações de canais relacionados ao usuário monitorado.

Sempre que uma atividade é detectada, o bot envia informações detalhadas sobre a atividade para um Webhook específico, permitindo que você monitore as ações do usuário em tempo real! 🕐

## Como usar 🚀

Certifique-se de ter o Node.js instalado em seu computador. Você pode baixá-lo em 🌐 https://nodejs.org/.

Clone este repositório em sua máquina local ou baixe-o como arquivo ZIP.

Abra um terminal ou prompt de comando e navegue até o diretório onde o código está localizado.

Instale as dependências necessárias executando o seguinte comando: 💻

npm install
Configure o token de uma conta aqui com o token de uma conta do Discord válida no código. Certifique-se de usar uma conta secundária para evitar violações dos Termos de Serviço do Discord.

Execute o bot Self com o seguinte comando: 🤖

node app.js
O bot Self estará em execução e pronto para monitorar a atividade do usuário especificado!

## Monitorando um Usuário
Para começar a monitorar a atividade de um usuário específico, acesse a rota /monitorar no navegador ou usando qualquer ferramenta de API.

Abra o navegador e acesse http://localhost:3000/monitorar?id=ID_DO_USUÁRIO&webhookUrl=SUA_WEBHOOK_URL.

Substitua ID_DO_USUÁRIO pelo ID do usuário que deseja monitorar.

Substitua SUA_WEBHOOK_URL pela URL do webhook onde as atividades serão enviadas.

Após acessar a rota com os parâmetros corretos, o bot Self começará a monitorar as atividades do usuário especificado. Todas as atividades serão enviadas para o webhook fornecido em formato de mensagem embutida.

## Personalização 🎨
Você pode definir o usuário a ser monitorado alterando o valor da variável currentUserId no código.

Os tipos de atividade a serem rastreados podem ser personalizados adicionando ou removendo eventos do cliente client.on. Atualmente, o bot rastreia mensagens, mensagens editadas, atualizações de perfil, atividades de voz, banimentos, desbanimentos e atualizações de canais.

## Aviso ⚠️
O uso de selfbots pode violar os Termos de Serviço do Discord. Use este código com responsabilidade e apenas em contas secundárias.

Certifique-se de ter permissão para usar os webhooks fornecidos nas URLs antes de executar a funcionalidade de envio de atividades.

# Créditos 💖
Feito por murizada. Deixe os créditos no código para ajudar a comunidade a crescer!

Divirta-se monitorando e mantendo seus servidores livres de chifres indesejados! 🚫🐂
