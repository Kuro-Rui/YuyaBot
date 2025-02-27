import { EmbedBuilder, Message } from "discord.js";
import { Yuya } from "../../models/bot";
import { PrefixCommand } from "../../models/commands";

export class HelpPrefixCommand extends PrefixCommand {
    constructor() {
        super({ name: "help", description: "Shows a list of available commands." });
    }

    public async execute(message: Message): Promise<void> {
        const commands = (message.client as Yuya).handlers.commands.prefixCommands;
        const embed = new EmbedBuilder({ title: "Commands" })
            .setColor("Blue")
            .setDescription(
                commands
                    .map((command) => `**\`${command.name}\`**\n> ${command.description}`)
                    .join("\n\n"),
            );
        await message.reply({ embeds: [embed] });
    }
}
