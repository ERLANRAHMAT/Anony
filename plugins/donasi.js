let handler = async m => m.reply(` 
╭─「 *Donasi* 」 
│ • https://saweria.co/ariffb
│ • https://trakteer.id/ariffb/tip
╰────
`.trim())
handler.help = ['donasi']
handler.tags = ['info']
handler.command = /^dona(te|si)$/i

module.exports = handler