const { db, saveDB } = require('./gifted');

module.exports = {
    command: 'block',
    description: 'Block a user by replying to their message. Auto-unblocks in 24 hours.',
    category: 'admin',
    ownerOnly: true,

    async run(bot, msg) {
        const reply = msg.reply_to_message;
        if (!reply) return bot.sendMessage(msg.chat.id, "Please reply to the user's message to block them.");

        const userId = reply.from.id;

        if (db.blocked && db.blocked[String(userId)]) {
            return bot.sendMessage(msg.chat.id, "User is already blocked.");
        }

        if (!db.blocked) db.blocked = {};
        db.blocked[String(userId)] = Date.now();
        saveDB();

        bot.sendMessage(msg.chat.id, `User ${reply.from.username || userId} has been blocked for 24 hours.`);
        try {
            await bot.sendMessage(userId, "You have been blocked from using this bot for 24 hours by an admin.");
        } catch (err) {
            console.error("Couldn't notify the blocked user:", err.message);
        }
    }
};