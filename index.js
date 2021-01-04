require('dotenv').config();

const Discord       = require("discord.js");
const createError   = require("./src/CreateError.js");
const createTodo    = require("./src/CreateTodo.js");

const client  = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });


client.on("message", msg=>
{

    //Command Handler.
    if (msg.content.startsWith("$") && msg.author.tag != client.user.tag)
    {

        //Slpit the command from the json data.
        const data = msg.content.split(";");

        //Syntax error.
        if (data.length != 2)
        {
            const embened = createError({
                title: "Syntax ERROR", 
                user: client.user, 
                color: 0xa83232, 
                desc: "Invalid syntax. Correct syntax: <command>;<data>"
            });

            msg.channel.send(embened);

            return;
        }

        //Extract the command.
        const cmd  = data[0];

        //Initialize JSON object.
        let json = null;

        //Try to parse the JSON data.
        try
        {
            json        = JSON.parse(data[1]);
            json.user   = client.user;
        }


        //Failed to parse JSON data.
        catch (e)
        {
            const embened = createError({
                title: "Invalid JSON data", 
                user: client.user, 
                color: 0xa83232, 
                desc: "Data must be a valid JSON string!"
            });

            msg.channel.send(embened);

            return;
        }

        
        //Execute the appropriate command.
        switch (cmd)
        {
            case "$add":
            {
                const todo = createTodo(json);
                msg.channel.send(todo);
                break;
            }

            default:
                break;
        }

    }

});



client.on('messageReactionAdd', async (reaction, user) => 
{
	// When we receive a reaction we check if the reaction is partial or not
    if (reaction.partial) 
    {
		// If the message this reaction belongs to was removed the fetching might result in an API error, which we need to handle
        try 
        {
            await reaction.fetch();
            await user.fetch();
        } 
        
        //Error fetching the partial data.
        catch (error) 
        {
			const embened = createError({
                title: "Connection Error", 
                user: client.user, 
                color: 0xa83232, 
                desc: "Reacted message could not be found..."
            });

            msg.channel.send(embened);

			return;
		}
    }
    
    //Update the embeded message color.
    if (reaction.emoji.name == "👍")
    {
        const msg = reaction.message.embeds[0];
        msg.color = 0x24fc03;
        reaction.message.edit(msg).then( ()=>{} ).catch(()=>
        {
            const embened = createError({
                title: "Uknown Error.", 
                user: client.user, 
                color: 0xa83232, 
                desc: "Message failed to be updated upon reaction..."
            });

            msg.channel.send(embened);
        });
    }


});





client.on('messageReactionRemove', async (reaction, user) => 
{
	// When we receive a reaction we check if the reaction is partial or not
    if (reaction.partial) 
    {
		// If the message this reaction belongs to was removed the fetching might result in an API error, which we need to handle
        try 
        {
            await reaction.fetch();
            await user.fetch();
        } 
        
        //Error fetching the partial data.
        catch (error) 
        {
			const embened = createError({
                title: "Connection Error", 
                user: client.user, 
                color: 0xa83232, 
                desc: "Un-reacted message could not be found..."
            });

            msg.channel.send(embened);

			return;
		}
    }
    
    //Update the embeded message color.
    if (reaction.emoji.name == "👍")
    {
        const msg = reaction.message.embeds[0];
        msg.color = 0x4287f5;
        reaction.message.edit(msg).then( ()=>{} ).catch(()=>
        {
            const embened = createError({
                title: "Uknown Error.", 
                user: client.user, 
                color: 0xa83232, 
                desc: "Message failed to be updated upon reaction..."
            });

            msg.channel.send(embened);
        });

        //Remove the reaction completely.
        reaction.remove().then( ()=>{} ).catch(()=>
        {
            const embened = createError({
                title: "Uknown Error.", 
                user: client.user, 
                color: 0xa83232, 
                desc: "Message failed to be updated upon reaction..."
            });

            msg.channel.send(embened);
        });
    }


});


//Connect the bot to discord application.
client.login(process.env.TOKEN);