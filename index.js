const fs = require('fs').promises;
const path = require('path');
const {argv} = require('yargs').option('user', {
    alias: 'u',
    type: 'string',
    description: 'The user ID to use'
});

if(!argv.user)
{
    console.error('No user ID specified!');
    return;
}

async function main(argv)
{
    const discordPath = './exported-json';
    const beforeCount = 1;
    let allMessages = [];
    const files = (await fs.readdir(discordPath)).filter(file => file.endsWith('.json'));
    for(const fileName of files)
    {
        console.log(`Reading "${fileName}"`);
        const messages = JSON.parse(await fs.readFile(path.join(discordPath, fileName)))['messages'];
        let before = [];
        for(const message of messages)
        {
            if(!message.content || message.type !== 'Default')
            {
                continue;
            }
        
            if(message['author']['id'] === argv.user)
            {
                allMessages.push(...before);
                before = [];
                allMessages.push(message);
            }
            else
            {
                before.push(message);
                if(before.length > beforeCount)
                {
                    before.shift();
                }
            }
        }
    }
    
    console.log(`Total ${allMessages.length} training messages obtained for id ${argv.user}`);
    let text = '';
    let wasSubject = false;
    for(const message of allMessages)
    {
        let role = message.author.id === argv.user ? 'subject' : 'other';
        if(role === 'other' && wasSubject)
        {
            wasSubject = false;
            text += "\n";
        }
        else if(role === 'subject')
        {
            wasSubject = true;
        }
        text += `${role}:  ${message.content.replace("\n", ' ')}\n`;
    }
    await fs.writeFile('./messages.txt', text);
}

main(argv).then(() =>
{
    console.log('Done!');
}).catch(e =>
{
    console.error(e);
});
