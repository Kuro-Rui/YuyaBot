import {
    ApplicationCommandType,
    ChatInputCommandInteraction,
    EmbedBuilder,
    MessageFlags,
} from "discord.js";
import { SlashCommand } from "../../models/commands";

export const helpSlashCommand = new SlashCommand({
    name: "help",
    description: "Shows a list of available commands.",
});

helpSlashCommand.setExecutable(async (interaction: ChatInputCommandInteraction) => {
    const commands = interaction.client.application.commands.cache.filter(
        (command) => command.type === ApplicationCommandType.ChatInput,
    );
    const embed = new EmbedBuilder({ title: "Commands" })
        .setColor("Blue")
        .setDescription(
            commands
                .map((command) => `</${command.name}:${command.id}>\n> ${command.description}`)
                .join("\n\n"),
        );
    await interaction.reply({ embeds: [embed], flags: [MessageFlags.Ephemeral] });
});
