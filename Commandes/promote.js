module.exports = {
  name: "promote",
  description: "Promouvoir un membre en admin dans le groupe",
  async execute(client, message) {
    const isGroup = message.key.remoteJid.endsWith('@g.us');
    if (!isGroup) return;

    // Vérifier que l’auteur est admin
    const groupMetadata = await client.groupMetadata(message.key.remoteJid);
    const admins = groupMetadata.participants.filter(p => p.admin !== null).map(p => p.id);
    if (!admins.includes(message.key.participant)) {
      await client.sendMessage(message.key.remoteJid, { text: "Seuls les admins peuvent utiliser cette commande." });
      return;
    }

    // Récupérer la personne mentionnée
    const mentions = message.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
    if (mentions.length === 0) {
      await client.sendMessage(message.key.remoteJid, { text: "Merci de mentionner la personne à promouvoir." });
      return;
    }

    try {
      await client.groupParticipantsUpdate(message.key.remoteJid, mentions, "promote");
 await client.sendMessage(message.key.remoteJid, { text: `@${mentions[0].split('@')[0]} a été promu admin !`, mentions });
    } catch (err) {
      console.error(err);
      await client.sendMessage(message.key.remoteJid, { text: "Impossible de promouvoir cet utilisateur." });
    }
  }
};
