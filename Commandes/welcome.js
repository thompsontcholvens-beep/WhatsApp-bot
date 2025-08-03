const welcomeSettings = {}; // Stockage temporaire en mémoire (id du groupe -> true/false)

module.exports = {
  name: "welcome",
  description: "Activer ou désactiver le message de bienvenue",
  async execute(client, message) {
    const chatId = message.key.remoteJid;
    const isGroup = chatId.endsWith('@g.us');
    if (!isGroup) return;

    // Vérifie que l’auteur est admin
    const groupMetadata = await client.groupMetadata(chatId);
    const admins = groupMetadata.participants.filter(p => p.admin !== null).map(p => p.id);
    if (!admins.includes(message.key.participant)) {
      await client.sendMessage(chatId, { text: "Seuls les admins peuvent utiliser cette commande." });
      return;
    }

    // Basculer l’état
    welcomeSettings[chatId] = !welcomeSettings[chatId];

    const status = welcomeSettings[chatId] ? "activé" : "désactivé";
    await client.sendMessage(chatId, { text: `Message de bienvenue ${status}.` });
  }
};

// Ensuite, dans la partie qui gère les nouveaux membres (event 'group-participants-update'), tu peux faire :

async function onParticipantsUpdate(client, update) {
  const chatId = update.id;
if (update.action === 'add') 
      for (const user of update.participants) 
        await client.sendMessage(chatId,  text: `Bienvenue @{user.split('@')[0]} !`, mentions: [user] });
      }
    }
  }
}
