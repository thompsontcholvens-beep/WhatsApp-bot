module.exports = {
  name: "demote",
  description: "Retirer le statut admin d’un membre dans le groupe",
  async execute(client, message) {
    const isGroup = message.key.remoteJid.endsWith('@g.us');
    if (!isGroup) return;

    // Vérifie que l’auteur est admin
    const groupMetadata = await client.groupMetadata(message.key.remoteJid);
    const admins = groupMetadata.participants.filter(p => p.admin !== null).map(p => p.id);
    if (!admins.includes(message.key.participant)) {
      await client.sendMessage(message.key.remoteJid, { text: "Seuls les admins peuvent utiliser cette commande." });
      return;
    }

    // Récupère la personne mentionnée
    const mentions = message.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
    if (mentions.length === 0) {
      await client.sendMessage(message.key.remoteJid, { text: "Merci de mentionner la personne à rétrograder." });
      return;
    }

    try {
      await client.groupParticipantsUpdate(message.key.remoteJid, mentions, "demote");
      await client.sendMessage(message.key.remoteJid, { text: `@${mentions[0].split('@')[0]} n’est plus admin.`, mentions });
    } catch (err) {
 console.error(err);
      await client.sendMessage(message.key.remoteJid, { text: "Impossible de rétrograder cet utilisateur." });
    }
  }
};
