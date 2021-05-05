//Emoji's
const example = '✅';


module.exports = async (client, reaction, user) => {

    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (user.bot) return;
    if (!reaction.message.guild) return;

    if (reaction.emoji.name === example) {
        console.log(`${user.username} reacted with ${example}`)
    }
}