/**
 * Custom Plugin Entry Point
 *
 * This file is where you can define custom actions, providers, and evaluators
 * for your ElizaOS agent. Add your logic here and reference this plugin in
 * your character file.
 *
 * ElizaOS Plugin Docs: https://elizaos.github.io/eliza/docs/core/plugins
 */

import { type Plugin } from "@elizaos/core";
import { researchAction } from "./actions/researchAction.js";

/**
 * Example custom action.
 * Replace this with your own action logic.
 */
const exampleAction = {
  name: "EXAMPLE_ACTION",
  description: "An example action — replace with your own.",
  similes: ["DEMO", "SAMPLE"],
  validate: async () => true,
  handler: async (_runtime: unknown, message: { content: { text?: string } }) => {
    console.log("Custom action triggered with message:", message.content.text);
  },
  examples: [],
};

/**
 * Your custom plugin.
 * Add this plugin's name to the `plugins` array in your character file
 * to activate it.
 */
export const customPlugin: Plugin = {
  name: "custom-plugin",
  description: "My custom ElizaOS plugin",
  actions: [exampleAction],
  providers: [],
  evaluators: [],
};

/**
 * Aria — Personal Research Assistant plugin.
 * Register this in characters/researcher.json under "plugins".
 */
export const ariaPlugin: Plugin = {
  name: "aria-research-plugin",
  description: "Aria's research plugin — web search + LLM synthesis",
  actions: [researchAction],
  providers: [],
  evaluators: [],
};

export default customPlugin;
