const bannedUsers = require('../data/banned.json'); // fichier JSON où tu stockes les numéros bannis
const fs = require('fs');

module.exports = {
  name: "ban",
  description: "Bannir un utilisateur par son numéro",
  async execute(message, args, client) {
    if (!message.isAdmin) return message.reply("Vous devez être admin pour utiliser cette commande.");
    if (args.length === 0) return message.reply("Veuillez fournir un numéro à bannir.");

    const userToBan = args[0].replace(/[^0-9]/g, "") + "@s.whatsapp.net"; // format WhatsApp ID

    if (bannedUsers.includes(userToBan)) {
      return message.reply("Cet utilisateur est déjà banni.");
    }

    bannedUsers.push(userToBan);
    fs.writeFileSync('./data/banned.json', JSON.stringify(bannedUsers, null, 2));

    message.reply(`L'utilisateur ${args[0]} a été banni avec succès.`);
  }
};
