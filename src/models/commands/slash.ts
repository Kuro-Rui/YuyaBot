import {
    ChatInputCommandInteraction,
    InteractionReplyOptions,
    MessagePayload,
    SlashCommandBuilder,
} from "discord.js";
import { Command, CommandOptions } from "./command";

export type SlashCommandExecutableFunction = (
    interaction: ChatInputCommandInteraction,
) => Promise<void>;

export class SlashCommand extends Command {
    private readonly _data = new SlashCommandBuilder();
    public readonly cooldown: number;
    protected _executable: SlashCommandExecutableFunction = async (
        interaction: ChatInputCommandInteraction,
    ) => {};

    constructor(options: CommandOptions) {
        super();
        this._data.setName(options.name.toLowerCase());
        this._data.setDescription(options.description);
        this.cooldown = options.cooldown || 0;
    }

    public get data(): SlashCommandBuilder {
        return this._data;
    }

    public setExecutable(executable: SlashCommandExecutableFunction): void {
        this._executable = executable;
    }

    public async reply(
        interaction: ChatInputCommandInteraction,
        options: string | MessagePayload | InteractionReplyOptions,
    ): Promise<void> {
        if (interaction.deferred) await interaction.followUp(options);
        else await interaction.reply(options);
    }

    public async check(interaction: ChatInputCommandInteraction): Promise<boolean> {
        // TODO: Permissions check
        return true;
    }

    public execute(interaction: ChatInputCommandInteraction): Promise<void> {
        return this._executable(interaction);
    }
}
