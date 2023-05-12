let handler = async function (m, { conn }) {
    conn.sendContactArray(m.chat, owner, m)
  }
  handler.help = ['owner']
  handler.tags = ['info']
  handler.command = /^(owner)$/i
  
  module.exports = handler