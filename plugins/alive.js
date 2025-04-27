import config from '../config.cjs';

const alive = async (m, Matrix) => {
  const uptimeSeconds = process.uptime();
  const days = Math.floor(uptimeSeconds / (3600 * 24));
  const hours = Math.floor((uptimeSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((uptimeSeconds % 3600) / 60);
  const seconds = Math.floor(uptimeSeconds % 60);
  
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';

  if (!['alive', 'uptime', 'runtime'].includes(cmd)) return;

  
  const instagram = "Joshumambo1";
  const tiktok = "Joshumambo1";
  const facebook = "Joshumambo";
  const botName = "Joshumambo1 NetKing";

  
  const apiUrl = `https://kaiz-apis.gleeze.com/api/uptime?instag=${instagram}&ghub=${github}&fb=${facebook}&hours=${hours}&minutes=${minutes}&seconds=${seconds}&botname=${botName}`;

  
  const statusMessage = `╭──「 🤖 *${botName}*  STATUS 」─╮
│
│ ✅ *Online & Operational*
│ ⏱️ *Uptime: ${days}d ${hours}h ${minutes}m ${seconds}s*
│
│ 📊 *System Information:*
│ ⚡ *Server: Active*
│ 🔄 *Version: ${config.VERSION || "1.0.0"}*
│
╰────────────╯`;

  try {
    await Matrix.sendMessage(m.from, {
      image: { url: apiUrl },
      caption: statusMessage,
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363347365643318@newsletter',
          newsletterName: "Joshumambo1 Alive",
          serverMessageId: 143
        }
      }
    }, {
      quoted: m
    });
  } catch (error) {
    console.error("Error in alive command:", error);
    
    await Matrix.sendMessage(m.from, {
      text: `${statusMessage}\n\n⚠️ Image generation failed`,
      contextInfo: {
        mentionedJid: [m.sender]
      }
    }, {
      quoted: m
    });
  }
};

export default alive;
