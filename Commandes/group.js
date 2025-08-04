module.exports = {
  name: 'group',
  description: 'Ouvre ou ferme le groupe',
  async execute(m, { args, conn }) {
    if (!m.isGroup) return m.reply('Cette commande fonctionne uniquement dans les groupes.')
    if (!m.isAdmin) return m.reply('Seuls les admins peuvent utiliser cette commande.')

    if (args[0] === 'open') {
      await conn.groupSettingUpdate(m.chat, 'not_announcement')
      m.reply('✅ Groupe fermé aux messages de tous les membres.')
    } else if (args[0] === 'close') {
      await conn.groupSettingUpdate(m.chat, 'announcement')
      m.reply('🚫 Groupe fermé message seuls les admins peuvent écrire.')
    } else {
      m.reply('Utilisation : .group open ou .group close')
    }
  }
}
