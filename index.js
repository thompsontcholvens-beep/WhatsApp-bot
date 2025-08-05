const fs = require('fs');
const path = require('path');
const { default: makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState('auth');
  const sock = makeWASocket({ auth: state });

  // Charger toutes les commandes
  const commands = {};
  const commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith('.js'));

  for (const file of commandFiles) {
const command = require(`./commands/${file}`);
    commands[command.name] = command;
  }

  sock.ev.on('messages.upsert', async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message) return;

    const from = msg.key.remoteJid;
    const isGroup = from.endsWith('@g.us');
    const sender = msg.key.participant || msg.key.remoteJid;
    const text = msg.message.conversation || msg.message.extendedTextMessage?.text || '';

    if (!text.startsWith('.')) return;

    const commandName = text.trim().split(' ')[0].slice(1).toLowerCase();

    if (commands[commandName]) {
      try {
        await commands[commandName].execute(sock, from, sender);
      } catch (err) {
        console.error(err);
        await sock.sendMessage(from, { text: 'Erreur lors de l\'exécution de la commande.' });
      }
    } else {
      await sock.sendMessage(from, { text: 'Commande inconnue. Tape .menu' });
    }
  });

  sock.ev.on('creds.update', saveCreds);
}

startBot();
