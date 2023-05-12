let handler = async function (m) {
    db.data.users[m.sender].registered = false
    m.reply(`Unreg berhasil!`)
}
handler.help = ['', 'ister'].map(v => 'unreg' + v)
handler.tags = ['main']
handler.command = /^unreg(ister)?$/i

handler.register = true

module.exports = handler