module.exports = {
  name: 'unblock',
  description: 'Débloque un utilisateur',
  async execute(m, { conn, args }) {
    if (!m.isOwner) return m.reply('Seul le propriétaire peut débloquer.')

    let target = m.mentionedJid[0] || (args[0] ? args[0] + '@s.whatsapp.net' : null)
    if (!target) return m.reply('Mentionne ou entre un numéro à débloquer.')

    await conn.updateBlockStatus(target, 'unblock')
    m.reply(`L'utilisateur ${target} a été débloqué ✅`)
  }
}
