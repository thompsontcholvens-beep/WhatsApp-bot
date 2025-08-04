module.exports = {
  name: 'block',
  description: 'Bloque un utilisateur',
  async execute(m, { conn, args }) {
    if (!m.isOwner) return m.reply('Seul le propriétaire peut bloquer.')

    let target = m.mentionedJid[0] || (args[0] ? args[0] + '@s.whatsapp.net' : null)
    if (!target) return m.reply('Mentionne ou entre un numéro à bloquer.')

    await conn.updateBlockStatus(target, 'block')
    m.reply(`L'utilisateur ${target} a été bloqué ✅`)
  }
}
