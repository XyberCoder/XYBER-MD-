const ADMIN_ID = 6900338774; // Replace with your Telegram ID

module.exports = (bot, msg, db) => {
    if (msg.from.id !== ADMIN_ID) {
        return bot.sendMessage(msg.chat.id, "Access denied. Admins only.");
    }

    const users = Object.values(db.users || {});
    const blocked = db.blocked || [];

    let text = `*Bot Users: ${users.length}*\n\n`;
    users.forEach((user, i) => {
        const status = blocked.includes(user.id) ? '❌ Blocked' : '✅ Active';
        text += `${i + 1}. ${user.first_name} (@${user.username || 'N/A'})\nID: \`${user.id}\`\nStatus: ${status}\n\n`;
    });

    bot.sendMessage(msg.chat.id, text, { parse_mode: 'Markdown' });
};