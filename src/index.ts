import { IntentsBitField, Partials } from "discord.js";
import { Yuya } from "./models/bot";

const yuya = new Yuya({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.DirectMessages,
        IntentsBitField.Flags.MessageContent,
    ],
    partials: [Partials.Channel, Partials.GuildMember, Partials.Message, Partials.User],
    failIfNotExists: false,
    mobile: true,
});

process.on("SIGINT", () => yuya.destroy());

console.clear();
yuya.start();
