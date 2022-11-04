# donation-notifications
A small application that sends a message about a new donation from [DonationAlerts](https://www.donationalerts.com/) to [Discord](https://discord.com/)

### How to start
1. First you need to clone the repository. To do this, use the command `git clone https://github.com/orewaee/donation-notifications.git`
2. After cloning is complete, you need to install all the libraries used in the application. Depending on your package manager, use the commands: `npm install` or `yarn install`
3. Before starting, you need to specify all the necessary environment variables. There are only 3 of them: `TOKEN` - DonationAlerts secret token, `URL` - url of the hook with which messages will be sent to Discord and `ID` - id of the Discord user who will be pinged with a new donation.
4. Now you can run the application. Use one of the commands provided in `package.json`
