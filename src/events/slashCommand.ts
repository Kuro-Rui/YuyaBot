import { Interaction } from "discord.js";
import { Event } from "./event";
import { Yuya } from "../models/bot";
import { Logger } from "../models/logger";

export class SlashCommandEvent extends Event {
    public readonly name = "interactionCreate";
    protected _logger = new Logger("Events.SlashCommand");

    public async handle(interaction: Interaction): Promise<void> {
        if (!interaction.isChatInputCommand()) return;
        await (interaction.client as Yuya).handlers.commands.handleSlashCommand(interaction);
    }
}
