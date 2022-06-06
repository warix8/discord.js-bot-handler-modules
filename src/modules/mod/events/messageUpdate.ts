"use strict";

import Client from "../../../../main";
import {Message} from "discord.js";
import ModuleEvent from "../../../utils/ModuleEvent";
import {Constants} from "discord.js";

export default class extends ModuleEvent {

    constructor(client: typeof Client) {
        super({
            client: client,
            name: Constants.Events.MESSAGE_UPDATE,
            module: "mod"
        });
    }

    async run(oldMessage: Message, newMessage: Message) {

    }

}
