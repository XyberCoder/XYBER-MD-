// admin.js
module.exports = async function adminCmd(bot, msg, db) {
    const chatId = msg.chat.id;

    // Example: list all blocked users and total users
    const blockedUsers = db.blocked || [];
    const totalUsers = Object.keys(db.users || {}).length;
    const totalGroups = Object.keys(db.groups || {}).length;

    let reply = `Admin Panel:\n\n`;
    reply += `Total Users: ${totalUsers}\n`;
    reply += `Total Groups: ${totalGroups}\n`;
    reply += `Blocked Users (${blockedUsers.length}):\n`;

    if (blockedUsers.length === 0) {
        reply += `None\n`;
    } else {
        blockedUsers.forEach((userId, i) => {
            reply += `${i + 1}. ${userId}\n`;
        });
    }

    return bot.sendMessage(chatId, reply);
};