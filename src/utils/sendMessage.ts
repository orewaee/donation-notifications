import {WebhookClient} from "discord.js";
import {Donation} from "../types";
import generateEmbed from "./generateEmbed";

export default async function sendMessage(webhookClient: WebhookClient, donation: Donation) {
    const embed = generateEmbed(donation);

    await webhookClient.send({
        content: `<@!${process.env.ID}>`,
        embeds: [embed]
    });
}
