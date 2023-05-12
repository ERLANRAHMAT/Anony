let fs = require('fs')
let path = require('path')
const defaultMenu = {
    before: `
%readmore`.trimStart(),
    header: '╭─「 *%category* 」',
    body: '│ • %cmd %islimit %isPremium',
    footer: '╰────\n',
    after: `
`,
}

let handler = async (m, { conn, usedPrefix: _p, text, isOwner, command }) => {
    try {
        let package = JSON.parse(await fs.promises.readFile(path.join(__dirname, '../package.json')).catch(_ => '{}'))
        let { limit, name } = global.db.data.users[m.sender]
        let setting = db.data.settings[conn.user.jid]
        let d = new Date(new Date + 3600000)
        let locale = 'id'
        // d.getTimeZoneOffset()
        // Offset -420 is 18.00
        // Offset    0 is  0.00
        // Offset  420 is  7.00
        let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
        let week = d.toLocaleDateString(locale, { weekday: 'long' })
        let date = d.toLocaleDateString(locale, {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        })
        let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }).format(d)
        let time = d.toLocaleTimeString(locale, {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        })
        let _uptime = process.uptime() * 1000
        let _muptime
        if (process.send) {
            process.send('uptime')
            _muptime = await new Promise(resolve => {
                process.once('message', resolve)
                setTimeout(resolve, 1000)
            }) * 1000
        }
        let muptime = conn.clockString(_muptime)
        let uptime = conn.clockString(_uptime)
        let totalreg = Object.keys(db.data.users).length
        let rtotalreg = Object.values(db.data.users).filter(user => user.registered == true).length
        let tags
        let teks = text.toLowerCase()
        /**
         * arrayMenu
         * @param {Array} 
         * kalo ga ada didaftar ini ga bisa dipanggil, jadi harus diisi
         */
        let arrayMenu = ['list', 'all', 'anonymous', 'anonymous chat', 'info', 'jadibot', 'o', 'owner']
        if (!arrayMenu.includes(teks)) teks = 'list' // kalo teks da ada di arrayMenu maka bakal nampilin list
        // buat 1 per 1 sesuai yang ada di arrayMenu
        if (['all'].includes(teks)) tags = {
            'main': 'Utama',
            'anonymous': 'Anonymous Chat',
            'jadibot': 'Jadi Bot'
        }
        if (['anonymous', 'anonymous chat'].includes(teks)) tags = {
            'anonymous': 'Anonymous Chat'
        }
        if (['jadibot'].includes(teks)) tags = {
            'jadibot': 'Jadi Bot'
        }
        if (['info'].includes(teks)) tags = {
            'info': 'Info'
        }
        if (['o', 'owner'].includes(teks)) {
            if (!isOwner) return conn.sendContactArray(m.chat, owner, m)
            tags = {
                'owner': 'Owner',
                'host': 'Host',
                'advanced': 'Advanced'
            }
        }
        if (teks == 'list') { // kalo teks ga sesuai arrayMenu bakal nampilin ini
            let { isBusiness } = await conn.isOnWhatsApp(conn.user.jid) // bot wa bisnis?
            let arrayMenuFilter = arrayMenu.filter(v => !['list', 'anonymous', 'o'].includes(v))
            if (isBusiness) {
                return m.reply(`
╭─「 *Menu* 」\n${arrayMenuFilter.map(v => '│ • ' + _p + command + ' ' + v).join`\n`}
╰────
  `.trim())
            }
            else {
                let array = Object.keys(arrayMenuFilter).map(v => ({
                    title: arrayMenuFilter[v],
                    description: '',
                    rowId: `.m ${arrayMenuFilter[v]}`
                }))
                let button = {
                    buttonText: 'Klik Disini',
                    description: `Hai @${m.sender.split`@`[0]}, klik untuk melihat daftar perintah`,
                    title: 'menu'
                }
                return conn.sendListM(m.chat, button, array, m)
            }
        }
        let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
            return {
                help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
                tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
                prefix: 'customPrefix' in plugin,
                limit: plugin.limit,
                premium: plugin.premium,
                enabled: !plugin.disabled,
            }
        })
        let groups = {}
        for (let tag in tags) {
            groups[tag] = []
            for (let plugin of help)
                if (plugin.tags && plugin.tags.includes(tag))
                    if (plugin.help) groups[tag].push(plugin)
        }
        conn.menu = conn.menu ? conn.menu : {}
        let before = conn.menu.before || defaultMenu.before
        let header = conn.menu.header || defaultMenu.header
        let body = conn.menu.body || defaultMenu.body
        let footer = conn.menu.footer || defaultMenu.footer
        let after = conn.menu.after || (conn.user.jid == global.conn.user.jid ? '' : `Anonymous Chat oleh @${global.conn.user.jid.split`@`[0]}`) + defaultMenu.after
        let _text = [
            before,
            ...Object.keys(tags).map(tag => {
                return header.replace(/%category/g, tags[tag]) + '\n' + [
                    ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
                        return menu.help.map(help => {
                            return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                                .replace(/%islimit/g, menu.limit ? '(Limit)' : '')
                                .replace(/%isPremium/g, menu.premium ? '(Premium)' : '')
                                .trim()
                        }).join('\n')
                    }),
                    footer
                ].join('\n')
            }),
            after
        ].join('\n')
        text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
        let replace = {
            '%': '%',
            p: _p, uptime, muptime,
            me: conn.user.name,
            npmname: package.name,
            npmdesc: package.description,
            version: package.version,
            github: package.homepage ? package.homepage.url || package.homepage : '[unknown github url]',
            limit, name, weton, week, date, dateIslamic, time, totalreg, rtotalreg,
            readmore: readMore
        }
        text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
        await conn.sendButtonLoc(m.chat, fla + teks, text.trim(), wm, 'Donasi', '.donasi')
    } catch (e) {
        console.log(e)
    }
}
handler.help = ['menu']
handler.tags = ['main']
handler.command = /^(m|menu|help|\?)$/i

module.exports = handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001) 