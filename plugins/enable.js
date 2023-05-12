let handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin, isROwner }) => {
  let isEnable = /true|enable|(turn)?on|1/i.test(command)
  let user = global.db.data.users[m.sender]
  let setting = global.db.data.settings[conn.user.jid]
  let type = (args[0] || '').toLowerCase()
  let isAll = false
  let isUser = false
  let o = [
    'public',
    'mycontact',
    'nyimak',
    'autoread',
    'anticall',
    'pconly',
    'gconly',
    'jadibot'
  ]
  switch (type) {
    // Owner
    case 'public':
      isAll = true
      if (!isOwner) return dfail('owner', m, conn)
      setting.self = !isEnable
      break
    case 'mycontact':
      if (!isOwner) return dfail('owner', m, conn)
      conn.callWhitelistMode = isEnable
      break
    case 'autoread':
      isAll = true
      if (!isOwner) return dfail('owner', m, conn)
      setting.autoread = isEnable
      break
    case 'anticall':
      isAll = true
      if (!isOwner) return dfail('owner', m, conn)
      setting.anticall = isEnable
      break
    case 'jadibot':
      if (!isOwner) return dfail('owner', m, conn)
      setting.jadibot = isEnable
      break

    default:
      if (!/[01]/.test(command)) throw `
╭─「 *Opsi* 」${isOwner ? '\n' + o.map(v => '│ ' + v).join`\n` : ''}
╰────

Contoh:
${usedPrefix}enable welcome
${usedPrefix}disable welcome
`.trim()
      throw false
  }
  m.reply(`
*${type}* berhasil *di${isEnable ? 'nyala' : 'mati'}kan* ${isAll ? 'untuk bot ini' : isUser ? '' : 'untuk chat ini'}
`.trim())
}
handler.help = ['en', 'dis'].map(v => v + 'able <option>')
handler.tags = ['group', 'owner']
handler.command = /^((en|dis)able|(tru|fals)e|(turn)?o(n|ff)|[01])$/i

module.exports = handler