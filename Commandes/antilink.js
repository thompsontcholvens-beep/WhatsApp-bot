module.exports = {
  name: "antilink",
  description: "Supprime les messages contenant des liens dans le groupe",
  async onMessage(client, message) {
    const isGroup = message.key.remoteJid.endsWith('@g.us');
    if (!isGroup) return;

    const text = message.message?.conversation || message.message?.extendedTextMessage?.text || '';
    const linkPattern = /(https?:\/\/[^\s]+)/gi;

    if (linkPattern.test(text)) {
      // Supprimer le message
      try {
        await client.deleteMessage(message.key.remoteJid, message.key.id);
        // Optionnel : avertir l'utilisateur
        await client.sendMessage(message.key.remoteJid, { 
          text: `@${message.key.participant.split('@')[0]}, les liens ne sont pas autorisés ici !`, 
          mentions: [message.key.participant] 
        });
      } catch (error) {
        console.error('Erreur suppression message:', error);
      }
    }
  }
};
