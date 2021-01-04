const Discord = require("discord.js");

/**
 * 
 * @param {{title:string, user: any, color: number, desc: string}} opts {}
 */
const createError = (opts)=>
{
    const embened = new Discord.MessageEmbed()
    .setTitle(opts.title)
    .setAuthor(opts.user.username, opts.user.avatarURL())
    .setColor(opts.color)
    .setDescription(opts.desc);

    return embened;
};

//Export the function directly.
module.exports = createError;