import "dotenv/config";
import io from "socket.io-client";
import {WebhookClient} from "discord.js";
import sendMessage from "./utils/sendMessage";
import {Donation} from "./types";

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

            console.log("New donation", donation);

            await sendMessage(webhookClient, donation);
        });
    } catch (e) {
        console.error(e);
    }
}

launch();
