require("dotenv").config();
const { REST, Routes } = require("discord.js");

const commands = [
  {
    name: "loot",
    description: "Replies with funny message",
  },
  {
    name: "session_end",
    description: "Replies with funny message",
  },
  {
    name: "time_for_next_session",
    description: "Replies with time left for the next session ",
  },
  {
    name: "mastora",
    description: "Replies with a message about the dungeon master ",
  },
  {
    name: "giannaki_inspire_me",
    description: "Replies with an AI generated inspirational qoiute ",
  },
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log("Registering commands");
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      {
        body: commands,
      }
    );
    console.log("Slash commands were registered successfully");
  } catch (err) {
    console.log(err);
  }
})();
