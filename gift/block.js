// block.js

const MS_PER_DAY = 24 * 60 * 60 * 1000;

module.exports = async function blockCmd(bot, msg, db, text) {
    const chatId = msg.chat.id;
    const userId = msg.from.id;

    // Command format: /block <userId>
    const parts = text.split(' ');
    if (parts.length < 2) {
        return bot.sendMessage(chatId, 'Usage: /block <userId>');
    }

    const targetUserId = parts[1].trim();

    if (targetUserId === String(userId)) {
        return bot.sendMessage(chatId, "You can't block yourself.");
    }

    if (!db.blocked) {
        // store blocked users as an object { userId: blockedAtTimestamp }
        db.blocked = {};
    }

    // Clean up expired blocks before adding a new one
    const now = Date.now();
    for (const [blockedUser, blockedAt] of Object.entries(db.blocked)) {
        if (now - blockedAt > MS_PER_DAY) {
            delete db.blocked[blockedUser];
        }
    }

    if (db.blocked[targetUserId]) {
        return bot.sendMessage(chatId, `User ${targetUserId} is already blocked.`);
    }

    db.blocked[targetUserId] = now;

    // Save db if needed here

    return bot.sendMessage(chatId, `User ${targetUserId} has been blocked for 24 hours.`);
};