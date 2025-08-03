module.exports = {
  name: "kickall",
  description: "Expulse tous les membres du groupe sauf les admins",
  async execute(message, args, client) {
    if (!message.isGroup) return message.reply("Cette commande est réservée aux groupes.");
    if (!message.isAdmin) return message.reply("Vous devez être admin pour utiliser cette commande.");

    const group = await client.getGroupMetadata(message.from);
    const participants = group.participants;

    for (const participant of participants) {
      if (!participant.isAdmin && participant.id !== client.user.id) {
        await client.groupParticipantsUpdate(message.from, [participant.id], "remove");
      }
    }
    message.reply("Tous les membres non-admin ont été expulsés.");
  }
};
