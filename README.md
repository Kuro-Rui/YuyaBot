# YuyaBot

A general-purpose Discord bot inspired by Shinyu from TWS.

---

## Invite the bot!

https://discord.com/oauth2/authorize?client_id=890596157699526686&scope=bot+applications.commands&permissions=274878286912

---

## Self-Hosting

This guide won't be that detailed since I don't meant for this bot to be self-hosted. However, if you want to:

### Prerequisites:

-   A Discord bot user
-   Node.js v20 or higher

### Installation:

1. Clone the repository
2. Run `npm install` to install the node packages needed
3. Set up `.env` (rename `.env.example` to `.env`)
    > `DISCORD_TOKEN` : The bot's token
4. Set up `config.json` (rename `config.example.json` to `config.json`)
    > `prefix` : The bot's prefix

### Running the bot:

```bash
npm run build
npm run start
```
