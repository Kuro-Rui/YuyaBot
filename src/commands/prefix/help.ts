import { EmbedBuilder, Message } from "discord.js";
import { Yuya } from "../../models/bot";
import { PrefixCommand } from "../../models/commands";

export const helpPrefixCommand = new PrefixCommand({
    name: "help",
    description: "Shows a list of available commands.",
});

helpPrefixCommand.setExecutable(async (message: Message) => {
    const commands = (message.client as Yuya).handlers.commands.prefixCommands;
    const embed = new EmbedBuilder({ title: "Commands" })
        .setColor("Blue")
        .setDescription(
            commands
                .map((command) => `**\`${command.name}\`**\n> ${command.description}`)
                .join("\n\n"),
        );
    await message.reply({ embeds: [embed] });
});
