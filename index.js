const Discord = require("discord.js-selfbot");
const client = new Discord.Client();
const { Webhook, MessageBuilder } = require('discord-webhook-node');

let trackedUsers = new Map();
let currentUserId = null;

client.login("token de uma conta aqui");

client.on("message", msg => {
  if (msg.author.id !== currentUserId) return;

  const trackedUser = trackedUsers.get(msg.author.id);

  if (trackedUser) {
    if (trackedUser.lastMessageId === null || trackedUser.lastMessageId !== msg.id) {
      const embed = new MessageBuilder()
        .setTitle("anti chifre 🐂")
        .setColor("#babfc2")
        .addField("Nome:", msg.author.username)
        .addField("Mensagem:", msg.content)
        .addField("Nome do servidor:", msg.guild.name)
        .setTimestamp();

      sendWebhook(trackedUser.webhookUrl, embed);

      trackedUsers.set(msg.author.id, { lastMessageId: msg.id, webhookUrl: trackedUser.webhookUrl });
    }
  }
});

client.on("messageUpdate", (oldMessage, newMessage) => {
  if (oldMessage.author.id !== currentUserId) return;

  const trackedUser = trackedUsers.get(oldMessage.author.id);

  if (trackedUser) {
    const embed = new MessageBuilder()
      .setTitle("anti chifre 🐂 - Mensagem Editada")
      .setColor("#babfc2")
      .addField("Autor:", oldMessage.author.username)
      .addField("Mensagem Antiga:", oldMessage.content)
      .addField("Mensagem Nova:", newMessage.content)
      .addField("Servidor", oldMessage.guild.name)
      .setTimestamp();

    sendWebhook(trackedUser.webhookUrl, embed);
  }
});

client.on("userUpdate", (oldUser, newUser) => {
  if (oldUser.id !== currentUserId) return;

  const trackedUser = trackedUsers.get(oldUser.id);

  if (trackedUser) {
    const embed = new MessageBuilder()
      .setTitle("anti chifre 🐂 - Atualização de Perfil")
      .setColor("#babfc2")
      .addField("Nome Antigo:", oldUser.username)
      .addField("Nome Novo:", newUser.username)
      .setTimestamp();

    sendWebhook(trackedUser.webhookUrl, embed);
  }
});


client.on("voiceStateUpdate", (oldState, newState) => {
  if (oldState.member.id !== currentUserId) return;

  const trackedUser = trackedUsers.get(oldState.member.id);

  if (trackedUser) {
    const { guild, channel } = oldState;

    if (!channel) return;

    const embed = new MessageBuilder()
      .setTitle("anti chifre 🐂 - Atividade de Voz")
      .setColor("#babfc2")
      .addField("Usuário:", oldState.member.user.tag)
      .addField("Canal de Voz:", channel.name)
      .addField("Servidor:", guild.name)
      .setTimestamp();

    sendWebhook(trackedUser.webhookUrl, embed);
  }
});

client.on("guildBanAdd", (guild, user) => {
  if (user.id === currentUserId) {
    const trackedUser = trackedUsers.get(user.id);

    if (trackedUser) {
      const embed = new MessageBuilder()
        .setTitle("anti chifre 🐂 - Usuário Banido")
        .setColor("#babfc2")
        .addField("Usuário:", user.tag)
        .addField("Servidor:", guild.name)
        .setTimestamp();

      sendWebhook(trackedUser.webhookUrl, embed);
    }
  }
});

client.on("guildBanRemove", (guild, user) => {
  if (user.id === currentUserId) {
    const trackedUser = trackedUsers.get(user.id);

    if (trackedUser) {
      const embed = new MessageBuilder()
        .setTitle("anti chifre 🐂 - Usuário Desbanido")
        .setColor("#babfc2")
        .addField("Usuário:", user.tag)
        .addField("Servidor:", guild.name)
        .setTimestamp();

      sendWebhook(trackedUser.webhookUrl, embed);
    }
  }
});

client.on("channelUpdate", (oldChannel, newChannel) => {
  if (oldChannel.guild.ownerID !== currentUserId) return;

  const trackedUser = trackedUsers.get(oldChannel.guild.ownerID);

  if (trackedUser) {
    const embed = new MessageBuilder()
      .setTitle("anti chifre 🐂 - Atualização de Canal")
      .setColor("#babfc2")
      .addField("Canal Antigo:", oldChannel.name)
      .addField("Canal Novo:", newChannel.name)
      .addField("Servidor:", oldChannel.guild.name)
      .setTimestamp();

    sendWebhook(trackedUser.webhookUrl, embed);
  }
});

client.on("messageDelete", msg => {
  if (msg.author.id !== currentUserId) return;

  const trackedUser = trackedUsers.get(msg.author.id);

  if (trackedUser) {
    const embed = new MessageBuilder()
      .setTitle("anti chifre 🐂 - Mensagem Excluída")
      .setColor("#babfc2")
      .addField("Autor:", msg.author.username)
      .addField("Mensagem:", msg.content)
      .addField("Servidor:", msg.guild.name)
      .setTimestamp();

    sendWebhook(trackedUser.webhookUrl, embed);
  }
});

function sendWebhook(webhookUrl, embed) {
  const hook = new Webhook(webhookUrl);
  hook.send(embed);
}

const express = require("express");
const bodyParser = require("body-parser");
const server = express();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

server.use(express.static('public'));
server.use(bodyParser.json());

server.get('/', urlencodedParser, async (req, res) => {
  res.redirect("/about");
});

server.get('/about', urlencodedParser, async (req, res) => {
  res.sendFile(__dirname + "/public/about/index.html");
});

server.get('/about/investigar/:id', urlencodedParser, (req, res) => {
  const newId = req.params.id;
  const newWebhookUrl = req.query.webhookUrl;

  if (currentUserId !== null) {
    trackedUsers.delete(currentUserId);
  }

  currentUserId = newId;
  trackedUsers.set(currentUserId, { lastMessageId: null, webhookUrl: newWebhookUrl });


  res.json({ "feito por murizada, deixe os créditos no código": "anti chifre online 🐂 ", "na webhook:": newWebhookUrl });
});



server.listen(process.env.PORT || 700, () => {
  console.log('[x] - Servidor ligado');
});
