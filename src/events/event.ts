import { ClientEvents } from "discord.js";
import { Logger } from "../models/logger";

export abstract class Event {
    public abstract readonly name: keyof ClientEvents;
    protected abstract _logger: Logger;

    protected get logger(): Logger {
        return this._logger;
    }

    public abstract handle(...args: any[]): Promise<void>;
}
