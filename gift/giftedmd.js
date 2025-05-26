const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const path = require('path');

const { loadDatabase, customMessage } = require('./gifted/giftedMessage');
const adminCmd = require('./gifted/admin');
const blockCmd = require('./gifted/block');
const { token, ownerId } = require('./set');

const bot = new TelegramBot(token, { polling: true });

// Load or create DB
const dbPath = path.join(__dirname, 'db.json');
let db = { users: {}, blocked: [] };
if (fs.existsSync(dbPath)) {
    db = JSON.parse(fs.readFileSync(dbPath));
}

// Save DB
const saveDB = () => {
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
};

bot.on('message', async (msg) => {
    const text = msg.text || '';
    const userId = String(msg.from.id);

    // Blocked user check
    if (db.blocked.includes(userId)) {
        return bot.sendMessage(msg.chat.id, "You are blocked from using this bot.");
    }

    // Register user
    if (!db.users[userId]) {
        db.users[userId] = { username: msg.from.username || 'Unknown' };
        saveDB();
    }

    // Handle admin commands
    if (text === '/admin') return adminCmd(bot, msg, db);
    if (text.startsWith('/block')) return blockCmd(bot, msg, db, saveDB);

    // Setup bot wrappers for custom functions
    const Gifted = bot;
    Gifted.sendMessage = bot.sendMessage.bind(bot);
    Gifted.sendPhoto = bot.sendPhoto.bind(bot);
    Gifted.sendVideo = bot.sendVideo.bind(bot);
    Gifted.sendAudio = bot.sendAudio.bind(bot);
    Gifted.sendDocument = bot.sendDocument.bind(bot);

    await loadDatabase(Gifted, msg);
    await customMessage(Gifted, msg);

    // Add your other commands here
    // Example: if (text.startsWith('/play')) { ... }
});