let handler = async (m, { conn, usedPrefix }) => {
    if (global.conn.user.jid == conn.user.jid) conn.sendButton(m.chat, 'Perintah ini hanya untuk yang jadi bot', 'Jadi Bot', '.m jadibot', m)
    else global.conn.reply(conn.user.jid, `${usedPrefix}jadibot ${Buffer.from(JSON.stringify(conn.base64EncodedAuthInfo())).toString('base64')}`, m)
}
handler.help = ['getcode']
handler.tags = ['jadibot']
handler.command = /^(getcode)$/i

handler.owner = true

module.exports = handler