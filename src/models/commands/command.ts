export interface CommandOptions {
    name: string;
    description: string;
    cooldown?: number;
}

export abstract class Command {
    public abstract check(...args: any[]): Promise<boolean>;

    public abstract execute(...args: any[]): Promise<void>;
}
