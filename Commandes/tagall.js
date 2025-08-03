module.exports = {
  name: 'tagall',
  description: 'Mentionne tous les membres du groupe',
  async execute(sock, from, sender) {
    const group = await sock.groupMetadata(from);
    const mentions = group.participants.map(p => p.id);
    await sock.sendMessage(from, { text: '*👥 TAGALL :*', mentions });
  }
};
