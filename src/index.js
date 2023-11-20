require("dotenv").config();
const { Client, IntentsBitField, AttachmentBuilder } = require("discord.js");
const axios = require("axios");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on("ready", (c) => {
  console.log(`${c.user.tag} is ready`);
});

client.on("messageCreate", (message) => {
  if (message.author.bot) {
    return;
  }

  if (message.content === "kalimera") {
    message.reply("Kalimera se olous");
  }
});

const getNextWednessday = (date = new Date()) => {
  const dateCopy = new Date(date.getTime());

  const nextWednessday = new Date(
    dateCopy.setDate(
      dateCopy.getDate() + ((7 - dateCopy.getDay() + 3) % 7 || 7)
    )
  );

  nextWednessday.setHours(17, 30, 0); // dokcer runs in UTC

  return nextWednessday;
};

const getInspirobotLink = async () => {
  const result = await axios
    .get("https://inspirobot.me/api?generate=true")
    .then((resp) => {
      console.log(resp.data);
      return resp.data;
    });

  return result;
};

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) {
    return;
  }

  if (interaction.commandName === "loot") {
    interaction.reply("βρήκαμε τίποτα πάνω του μάστορα;;; καμία ζώνη");
  }

  if (interaction.commandName === "session_end") {
    interaction.reply("κανα level πηραμε;");
  }

  if (interaction.commandName === "mastora") {
    interaction.reply("Πάλι μας κλάνει σήμερα ο μπουντρουμάστορας...");
  }

  if (interaction.commandName === "time_for_next_session") {
    const countDownDate = getNextWednessday(new Date()).getTime();
    const now = new Date().getTime();
    const distance = countDownDate - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const msgToReply = `Υπομονή ρε bro ακόμα ${
      days === 0 ? "" : days + " μέρες ,"
    }${hours === 0 ? "" : hours + " ώρες ,"}${
      minutes === 0 ? "" : minutes + " λεπτά ,"
    }${seconds} δευτερόλεπτα για το επόμενο session`;
    interaction.reply(msgToReply);
  }

  if (interaction.commandName === "giannaki_inspire_me") {
    let imageUrl = await getInspirobotLink();

    console.log(imageUrl);

    const image = new AttachmentBuilder(imageUrl, "img.jpg");
    await interaction.reply({ files: [image] });
  }
});

client.login(process.env.TOKEN);
