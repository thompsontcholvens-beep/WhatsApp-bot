module.exports = {
  name: "admins",
  description: "Mentionne tous les admins du groupe.",
  async execute(m, { conn }) {
    if (!m.isGroup) return m.reply("Cette commande fonctionne seulement dans un groupe.");

    const metadata = await conn.groupMetadata(m.chat);
    const admins = metadata.participants.filter(p => p.admin);

    if (admins.length === 0) return m.reply("Aucun admin trouvé.");

    let mentions = admins.map(p => p.id);
    let texte = "*Admins du groupe:*\n" + admins.map(p => `@${p.id.split("@")[0]}`).join("\n");

    conn.sendMessage(m.chat, { text: texte, mentions }, { quoted: m });
  }
}
