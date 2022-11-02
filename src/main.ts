import "dotenv/config";
import io from "socket.io-client";
import {EmbedBuilder, WebhookClient} from "discord.js";

async function launch() {
    try {
        const
            url: string = "wss://socket.donationalerts.ru:443",
            config = {
                reconnection: true,
                reconnectionDelay: 1000,
                reconnectionDelayMax: 4000,
                reconnectionAttempts: Infinity
            }

        const
            donationalerts = io.connect(url, config),
            webhookClient = new WebhookClient({
                url: process.env.URL
            });

        if (!donationalerts) throw new Error("Error connecting to socket");

        donationalerts.on("connect", function () {
            donationalerts.emit("add-user", {
                token: process.env.TOKEN,
                type: "minor"
            });

            console.log("Successful socket connection");
        });

        donationalerts.on("reconnect_attempt", function () {
            console.log("Attempt to reconnect to a socket");
        });

        donationalerts.on("disconnect", function () {
            console.log("Disconnecting from a socket");
        });

        donationalerts.off("donation").on("donation", async function (donation) {
            donation = JSON.parse(donation);

            const embed = new EmbedBuilder()
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

            console.log("New donation", donation);

            await webhookClient.send({
                content: `<@!${process.env.ID}>`,
                embeds: [
                    embed
                ]
            })
        });
    } catch (e) {
        console.error(e);
    }
}

launch();
