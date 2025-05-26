const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Simulated database
const db = {
    users: {},
    groups: {}
};

const ownerId = ['123456789']; // Your Telegram User ID(s) here

async function giftedLoadDatabase(Gifted, m) {
    const userId = m.from.id;
    const chatId = m.chat.id;
    const chatType = m.chat.type;
    if (!db.users[userId]) {
        db.users[userId] = {
            username: m.from.username
        };
    }
    if (chatType === 'group' || chatType === 'supergroup') {
        if (!db.groups[chatId]) {
            db.groups[chatId] = {
                groupName: m.chat.title
            };
        }
    }
}

async function giftedCustomMessage(Gifted, m) {
    const userId = m.from.id;
    const chatType = m.chat.type;

    m.isOwner = ownerId.includes(userId.toString());
    m.isGroup = chatType === 'group' || chatType === 'supergroup';
    m.isPrivate = !m.isGroup;

    // Button Menu Pages
    const menuPages = {
        1: [
            [{ text: '🧠 AI', feature: 'menu_ai' }, { text: '🖼 Anime', feature: 'menu_anime' }],
            [{ text: '⬇️ Downloader', feature: 'menu_downloader' }, { text: '🛠 Tools', feature: 'menu_tools' }],
            [{ text: '➡️ Next', feature: 'menu_page_2' }]
        ],
        2: [
            [{ text: '🧩 General', feature: 'menu_general' }, { text: '🔞 NSFW', feature: 'menu_nsfw' }],
            [{ text: '🔍 Search', feature: 'menu_search' }],
            [{ text: '⬅️ Back', feature: 'menu_page_1' }]
        ]
    };

    const buildMenuText = (m) => `
╭══〘〘 *CYBER-MD* 〙〙═⊷
┃❍ *User:* @${m.from.username || 'N/A'}
┃❍ *User ID:* ${m.from.id}
┃❍ *Owner:* ${m.isOwner ? '✅ Yes' : '❌ No'}
┃❍ *Prefix:* /
┃❍ *Version:* 2.0.0
┃❍ *Time:* ${new Date().toLocaleTimeString()}
┃❍ *Date:* ${new Date().toLocaleDateString()}
╰═════════════════⊷

*Select a category below:*`;

    Gifted.reply = async (content, buttonsOrMsg, m) => {
        let buttons = [];

        if (Array.isArray(buttonsOrMsg)) {
            buttons = buttonsOrMsg.map(row => row.map(btn => ({
                text: btn.text,
                callback_data: JSON.stringify({ feature: btn.feature || '', data: btn.data || '' })
            })));
        }

        const options = {
            reply_to_message_id: m.message_id || null,
            parse_mode: 'Markdown',
            reply_markup: buttons.length > 0 ? { inline_keyboard: buttons } : undefined
        };

        if (typeof content === 'string') {
            return await Gifted.sendMessage(m.chat.id, content, options);
        } else if (typeof content === 'object') {
            if (content.text) return await Gifted.sendMessage(m.chat.id, content.text, options);
        }
    };

    // Handle /menu command
    if (m.text && m.text.toLowerCase() === '/menu') {
        return Gifted.reply(buildMenuText(m), menuPages[1], m);
    }

    // Handle callback_query events
    Gifted.on('callback_query', async (callback) => {
        const msg = callback.message;
        const data = JSON.parse(callback.data || '{}');
        const feature = data.feature;

        switch (feature) {
            case 'menu_page_1':
                return Gifted.reply(buildMenuText(callback), menuPages[1], msg);
            case 'menu_page_2':
                return Gifted.reply(buildMenuText(callback), menuPages[2], msg);

            case 'menu_ai':
                return Gifted.reply('*AI Commands:*\n✧ /flux\n✧ /gemini\n✧ /gpt\n✧ /luminai\n✧ /sd', [[{ text: '⬅️ Back', feature: 'menu_page_1' }]], msg);
            case 'menu_anime':
                return Gifted.reply('*Anime Commands:*\n✧ /konachan\n✧ /neko\n✧ /waifu', [[{ text: '⬅️ Back', feature: 'menu_page_1' }]], msg);
            case 'menu_downloader':
                return Gifted.reply('*Downloader:*\n✧ /apk\n✧ /gitclone\n✧ /play\n✧ /video\n✧ /ytmp3\n✧ /ytmp4', [[{ text: '⬅️ Back', feature: 'menu_page_1' }]], msg);
            case 'menu_tools':
                return Gifted.reply('*Tools:*\n✧ /createqr\n✧ /pastebin', [[{ text: '⬅️ Back', feature: 'menu_page_1' }]], msg);
            case 'menu_general':
                return Gifted.reply('*General:*\n✧ /help\n✧ /menu\n✧ /ping\n✧ /repo\n✧ /system\n✧ /uptime', [[{ text: '⬅️ Back', feature: 'menu_page_2' }]], msg);
            case 'menu_nsfw':
                return Gifted.reply('*NSFW:*\n✧ /hneko\n✧ /hwaifu', [[{ text: '⬅️ Back', feature: 'menu_page_2' }]], msg);
            case 'menu_search':
                return Gifted.reply('*Search:*\n✧ /wikipedia', [[{ text: '⬅️ Back', feature: 'menu_page_2' }]], msg);
        }
    });
}

module.exports = { loadDatabase: giftedLoadDatabase, customMessage: giftedCustomMessage };