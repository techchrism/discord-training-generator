# Discord Training Generator

This script is a simple way to generate training data from exported Discord messages.
It copies the preceding message as context and exports the "messages.txt" file with "subject: " and "other: "
preceding the lines so the model can be prompted with a conversation history followed by "subject: "

## Installation
 - Install Node.js and clone this repository
 - Run `npm install`

## Usage
 - Export the Discord messages you want to JSON using https://github.com/Tyrrrz/DiscordChatExporter
 - Put the .json files into the "exported-json" folder
 - Find the id of the user you want to generate training data for.
   This can be done simply by opening one of the .json files, searching for the username,
   and copying the id from the "author" object
 - Run `node index.js --user={the user id}`
