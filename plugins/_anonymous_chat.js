module.exports = {
    async before(m) {
        if (!m.chat.endsWith('@s.whatsapp.net')) return !0
        this.anonymous = this.anonymous ? this.anonymous : {}
        let room = Object.values(this.anonymous).find(room => [room.a, room.b].includes(m.sender) && room.state === 'CHATTING')
        if (room) {
            if (/^.*(next|leave|start|skip)/.test(m.text)) return
            if (['.next', '.leave', '.start', '.skip', 'Cari Partner', 'Keluar', 'Next'].includes(m.text)) return
            let other = [room.a, room.b].find(user => user !== m.sender)
            m.copyNForward(other, true, m.quoted && m.quoted.fromMe ? {
                contextInfo: {
                    ...m.msg.contextInfo,
                    forwardingScore: 1,
                    isForwarded: true,
                    participant: other
                }
            } : {})
        }
        return !0
    }
}
