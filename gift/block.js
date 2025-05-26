const fs = require('fs');
const ADMIN_ID = 6900338774; // Replace with your ID

function saveDB(db) {
    fs.writeFileSync('./db.json', JSON.stringify(db, null, 2));
}

module.exports = (bot, msg, db, text) => {
    if (msg.from.id !== ADMIN_ID) {
        return bot.sendMessage(msg.chat.id, "Access denied.");
    }

    const userId = text.split(" ")[1];
    if (!userId) return bot.sendMessage(msg.chat.id, "Usage: /block <user_id>");

    if (!db.blocked.includes(userId)) {
        db.blocked.push(userId);
        saveDB(db);
        bot.sendMessage(msg.chat.id, `User ${userId} has been blocked.`);
    } else {
        bot.sendMessage(msg.chat.id, `User ${userId} is already blocked.`);
    }
};