let handler = async function (m, { conn, text, usedPrefix, command }) {
    let user = global.db.data.users[m.sender]
    if (user.registered === true) return conn.sendButton(m.chat, `Anda sudah terdaftar\nMau daftar ulang? ${usedPrefix}unreg <SN|SERIAL NUMBER>`, wm, 'Unreg', `${usedPrefix}unreg`, m)
    let [name, age, gender] = text.split(/[&|.]/i)
    let example = `\n\nContoh:\n${usedPrefix + command} Ariffb.19.cowo`
    if (!name) throw 'Nama tidak boleh kosong (Alphanumeric)' + example
    if (!age) throw 'Umur tidak boleh kosong (Angka)' + example
    if (!gender) throw 'Jenis kelamin tidak boleh kosong (Alphanumeric)' + example
    if (!['cewe', 'cowo'].includes(gender)) throw 'Pilihan: cowo / cewe' + example
    age = parseInt(age)
    user.name = name.trim()
    user.age = age
    user.gender = gender
    user.regTime = + new Date
    user.registered = true
    m.reply(` 
╭─「 *Daftar Berhasil* 」
│ Nama: ${name}
│ Umur: ${age} tahun
│ Jenis Kelamin: ${gender}
╰──── 
`.trim())
}
handler.help = ['daftar', 'reg', 'register'].map(v => v + ' <nama>.<umur>.<jk>')
handler.tags = ['main']
handler.command = /^(daftar|reg(ister)?)$/i

module.exports = handler