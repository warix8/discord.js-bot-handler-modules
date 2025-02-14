"use strict";

import type Client from "../../../../main";
import ModuleEvent from "../../../utils/ModuleEvent";
import { Events } from "discord.js";

export default class extends ModuleEvent {
	constructor(client: typeof Client) {
		super({
			client: client,
			name: Events.ClientReady
		});
		this.client = client;
	}

	async run() {
		// Bot ready here
	}
}
