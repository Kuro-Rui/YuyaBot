import { Message } from "discord.js";
import { Command, CommandOptions } from "./command";
import { Yuya } from "../bot";

export interface PrefixCommandOptions extends CommandOptions {
    aliases?: string[];
}

export type PrefixCommandExecutableFunction = (
    message: Message,
    ...args: string[]
) => Promise<void>;

export class PrefixCommand extends Command {
    public readonly name: string;
    public readonly aliases: string[];
    public readonly description: string;
    public readonly cooldown: number;
    protected _executable: PrefixCommandExecutableFunction = async (
        message: Message,
        ...args: string[]
    ) => {};

    constructor(options: PrefixCommandOptions) {
        super();
        this.name = options.name.toLowerCase();
        this.aliases = options.aliases?.map((a) => a.toLowerCase()) || [];
        this.description = options.description;
        this.cooldown = options.cooldown || 0;
    }

    public setExecutable(executable: PrefixCommandExecutableFunction): void {
        this._executable = executable;
    }

    public async check(message: Message): Promise<boolean> {
        // Prefix commands is ONLY for dev commands
        if (!(await (message.client as Yuya).isOwner(message.author.id))) return false;
        return true;
    }

    public execute(message: Message, ...args: string[]): Promise<void> {
        return this._executable(message, ...args);
    }
}
