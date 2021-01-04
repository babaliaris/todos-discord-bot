const Discord = require("discord.js");

/**
 * 
 * @param {{title:string, user: any, desc: string, sections: string[]}} opts {}
 */
const createTodo = (opts)=>
{
    const embened = new Discord.MessageEmbed()
    .setTitle(opts.title)
    .setAuthor(opts.user.username, opts.user.avatarURL())
    .setColor(0x4287f5)
    .setDescription(opts.desc);

    for (let i = 0; i < opts.sections.length; i++)
        embened.addField(`TODO`, ` ${opts.sections[i]}`);

    return embened;
};

//Export the function directly.
module.exports = createTodo;