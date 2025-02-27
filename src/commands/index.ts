import { debugPrefixCommand } from "./prefix/debug";
import { evalPrefixCommand } from "./prefix/eval";
import { helpPrefixCommand } from "./prefix/help";
import { shutdownPrefixCommand } from "./prefix/shutdown";
import { helpSlashCommand } from "./slash/help";
import { pingSlashCommand } from "./slash/ping";
import { uptimeSlashCommand } from "./slash/uptime";
import { PrefixCommand, SlashCommand } from "../models/commands";

// Prefix commands is ONLY for dev commands
export const allPrefixCommands = [
    debugPrefixCommand,
    evalPrefixCommand,
    helpPrefixCommand,
    shutdownPrefixCommand,
] as PrefixCommand[];

export const allSlashCommands = [
    helpSlashCommand,
    pingSlashCommand,
    uptimeSlashCommand,
] as SlashCommand[];
