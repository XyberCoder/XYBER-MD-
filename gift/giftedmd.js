require('../set'); const fs = require('fs'); const axios = require('axios'); const fetch = require('node-fetch'); const chalk = require('chalk'); const path = require('path'); const os = require('os');

function formatBytes(bytes) { const gb = bytes / (1024 ** 3); return gb.toFixed(2) + ' GB'; }

function formatUptime(seconds) { const d = Math.floor(seconds / (3600 * 24)); const h = Math.floor((seconds % (3600 * 24)) / 3600); const m = Math.floor((seconds % 3600) / 60); const s = Math.floor(seconds % 60); return ${d}d ${h}h ${m}m ${s}s; }

function getCurrentTime() { const now = new Date(); return now.toLocaleTimeString('en-KE', { hour12: true }); }

function getCurrentDate() { const now = new Date(); return now.toLocaleDateString('en-GB'); }

async function giftedLoadDatabase(Gifted, m) { const userId = m.from.id; const chatId = m.chat.id; const chatType = m.chat.type; if (!db.users[userId]) { db.users[userId] = { username: m.from.username }; } if (chatType === 'group' || chatType === 'supergroup') { if (!db.groups[chatId]) { db.groups[chatId] = { groupName: m.chat.title }; } } }

async function giftedCustomMessage(Gifted, m) { const userId = m.from.id; const chatId = m.chat.id; const chatType = m.chat.type;

if (m) {
    m.isOwner = ownerId.includes(userId) || false;
    m.isPrivate = (chatType !== 'group' && chatType !== 'supergroup' && chatType !== 'channel') || false;
    m.isGroup = (chatType === 'group' || chatType === 'supergroup') || false;
}

const text = m.text || '';

if (text === '/start') {
    return await Gifted.sendMessage(m.chat.id, {
        text: `Hey *${m.from.first_name || 'there'}*!\n\nWelcome to *CYBER-MD Bot*!\nUse /menu to view all commands.`,
        reply_to_message_id: m.message_id
    });
}

if (text === '/menu') {
    const uptime = formatUptime(process.uptime());
    const timeNow = getCurrentTime();
    const dateToday = getCurrentDate();
    const usedMem = formatBytes(os.totalmem() - os.freemem());
    const totalMem = formatBytes(os.totalmem());

    return await Gifted.sendMessage(m.chat.id, {
        text:

`╭══〘〘 𝙲𝚈𝙱𝙴𝚁-𝙼𝙳 〙〙═⊷ ┃❍ Pʀᴇғɪx:   / ┃❍ ᴏᴡɴᴇʀ:  @𝙲yber𝙲oder ┃❍ Pʟᴜɢɪɴs:  25 ┃❍ Vᴇʀsɪᴏɴ:  2.0.0 ┃❍ Uᴘᴛɪᴍᴇ:  ${uptime} ┃❍ Tɪᴍᴇ Nᴏᴡ:  ${timeNow} ┃❍ Dᴀᴛᴇ Tᴏᴅᴀʏ:  ${dateToday} ┃❍ Tɪᴍᴇ Zᴏɴᴇ:  Africa/Nairobi ┃❍ Sᴇʀᴠᴇʀ Rᴀᴍ:  ${usedMem} / ${totalMem} ╰═════════════════⊷

𝙲𝚈𝙱𝙴𝚁-𝙼𝙳 𝙲𝙾𝙼𝙼𝙰𝙽𝙳𝚂 𝙻𝙸𝚂𝚃:

╭─── 『 𝙰𝙸 』 ✧ /flux ✧ /gemini ✧ /gpt ✧ /luminai ✧ /sd ╰─────────────────◊

╭─── 『 𝙰𝙽𝙸𝙼𝙴 』 ✧ /konachan ✧ /neko ✧ /waifu ╰─────────────────◊

╭─── 『 𝙳𝙾𝚆𝙽𝙻𝙾𝙰𝙳𝙴𝚁 』 ✧ /apk ✧ /gitclone ✧ /play ✧ /video ✧ /ytmp3 ✧ /ytmp4 ╰─────────────────◊

╭─── 『 𝙶𝙴𝙽𝙴𝚁𝙰𝙻 』 ✧ /help ✧ /menu ✧ /ping ✧ /repo ✧ /system ✧ /uptime ╰─────────────────◊

╭─── 『 𝙽𝚂𝙵𝚆 』 ✧ /hneko ✧ /hwaifu ╰─────────────────◊

╭─── 『 𝚂𝙴𝙰𝚁𝙲𝙷 』 ✧ /wikipedia ╰─────────────────◊

╭─── 『 𝚃𝙾𝙾𝙻𝚂 』 ✧ /createqr ✧ /pastebin ╰─────────────────◊` }, m); }

Gifted.reply = async (content, buttonsOrMsg, m) => {
    try {
        let buttons = [];

        if (typeof buttonsOrMsg === 'object') {
            if (Array.isArray(buttonsOrMsg)) {
                buttons = buttonsOrMsg.map(row => {
                    if (Array.isArray(row)) {
                        return row.map(button => {
                            if (button.feature) {
                                return { text: button.text, callback_data: JSON.stringify({ feature: button.feature, data: button.data || '' }) };
                            } else if (button.callback_data) {
                                return { text: button.text, callback_data: button.callback_data };
                            } else if (button.url) {
                                return { text: button.text, url: button.url };
                            } else {
                                return button;
                            }
                        });
                    } else {
                        if (row.feature) {
                            return [{ text: row.text, callback_data: JSON.stringify({ feature: row.feature, data: row.data || '' }) }];
                        } else if (row.callback_data) {
                            return [{ text: row.text, callback_data: row.callback_data }];
                        } else if (row.url) {
                            return [{ text: row.text, url: row.url }];
                        } else {
                            return [row];
                        }
                    }
                });
            } else if (buttonsOrMsg.chat && buttonsOrMsg.message_id) {
                m = buttonsOrMsg;
            } else {
                content = { ...content, ...buttonsOrMsg };
            }
        }

        if (m.message_id) {
            content.reply_to_message_id = m.message_id;
        } else {
            content.reply_to_message_id = null;
        }

        if (buttons.length > 0) {
            content.reply_markup = { inline_keyboard: buttons };
        }

        if (typeof content === 'object') {
            if (content.image) {
                return await Gifted.sendPhoto(m.chat.id, content.image.url || content.image, content);
            }
            if (content.video) {
                return await Gifted.sendVideo(m.chat.id, content.video.url || content.video, content);
            }
            if (content.audio) {
                return await Gifted.sendAudio(m.chat.id, content.audio.url || content.audio, content);
            }
            if (content.document) {
                return await Gifted.sendDocument(m.chat.id, content.document.url || content.document, content);
            }
            if (content.text) {
                return await Gifted.sendMessage(m.chat.id, content.text, content);
            }
            throw new Error('Unsupported content type.');
        }

        throw new Error('Invalid content type.');
    } catch (error) {
        console.error('Gifted.reply error:', error.message);
        await Gifted.sendMessage(m.chat.id, `Failed to send message: ${error.message}`, {});
    }
};

// Gifted.downloadAndSend remains unchanged...

}

module.exports = { loadDatabase: giftedLoadDatabase, customMessage: giftedCustomMessage };

