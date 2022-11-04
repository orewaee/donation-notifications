import {EmbedBuilder} from "discord.js";
import {Donation} from "../types";

export default function generateEmbed(donation: Donation): EmbedBuilder {
    return new EmbedBuilder()
        .setTitle("New donation")
        .addFields(
            {
                name: "Id",
                value: `${donation.id}`
            },
            {
                name: "Username",
                value: `${donation.username}`
            },
            {
                name: "Message",
                value: `${donation.message}` || "_Missing_"
            },
            {
                name: "Amount",
                value: `${donation.amount} ${donation.currency}`
            }
        )
        .setColor("#7161EF");
}
