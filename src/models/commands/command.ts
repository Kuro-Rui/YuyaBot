export interface CommandOptions {
    name: string;
    description: string;
    cooldown?: number;
}

export abstract class Command {
    protected abstract _executable: (...args: any[]) => Promise<void>;

    public setExecutable(executable: (...args: any[]) => Promise<void>): void {
        this._executable = executable;
    }

    public abstract check(...args: any[]): Promise<boolean>;

    public abstract execute(...args: any[]): Promise<void>;
}
