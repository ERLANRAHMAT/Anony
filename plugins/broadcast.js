let handler = async (m, { conn, text }) => {
  let chats = conn.chats.all().filter(v => v.jid.endsWith('.net')).map(v => v.jid)
  let cc = conn.serializeM(text ? m : m.quoted ? await m.getQuotedObj() : false || m)
  let teks = text ? text : cc.text
  m.reply(`Mengirim pesan siaran ke ${chats.length} chat pribadi`)
  for (let id of chats) {
    await conn.delay(5000)
    await conn.copyNForward(id, conn.cMod(m.chat, cc, '「 *Pesan Siaran* 」\n\n' + teks), false).catch(_ => _)
    m.reply('Selesai')
  }
}
handler.help = ['broadcast', 'bc'].map(v => v + ' <teks>')
handler.tags = ['owner']
handler.command = /^(broadcast|bc)$/i

handler.owner = true

module.exports = handler 