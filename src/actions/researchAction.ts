import {
  type Action,
  type ActionResult,
  type IAgentRuntime,
  type Memory,
  type State,
  ModelType,
} from "@elizaos/core";
import { promises as fs } from "fs";
import path from "path";

const RESEARCH_TRIGGERS = ["research", "find", "summarize", "investigate", "look up", "search for"];

export const researchAction: Action = {
  name: "RESEARCH",
  description: "Search the web and synthesize a structured research report on any topic.",
  similes: ["SEARCH", "FIND", "SUMMARIZE", "INVESTIGATE", "LOOK_UP"],

  validate: async (_runtime: IAgentRuntime, message: Memory): Promise<boolean> => {
    const text = message.content.text?.toLowerCase() ?? "";
    return RESEARCH_TRIGGERS.some((t) => text.includes(t));
  },

  handler: async (
    runtime: IAgentRuntime,
    message: Memory,
    _state?: State
  ): Promise<ActionResult> => {
    const userText = message.content.text ?? "";

    // Extract topic — strip leading trigger words
    const topic = userText
      .replace(/^(please\s+)?(research|find|summarize|investigate|look up|search for)\s+/i, "")
      .trim() || userText.trim();

    try {
      // 1. Web search via Tavily service
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const tavily = runtime.getService("TAVILY") as any;
      if (!tavily) throw new Error("Tavily service not available. Is TAVILY_API_KEY set?");

      const searchResponse = await tavily.search(topic, { max_results: 8, include_answer: true });
      const results: Array<{ title: string; url: string; content: string }> =
        searchResponse.results ?? [];

      if (!results.length) throw new Error(`No results found for: ${topic}`);

      // 2. Build context for LLM
      const snippets = results
        .map((r, i) => `[${i + 1}] ${r.title}\n${r.url}\n${r.content.slice(0, 400)}`)
        .join("\n\n");

      const prompt = `You are a research assistant. Using the search results below, write a structured report on: "${topic}"

Format the report exactly as:
## Executive Summary
(2-3 sentence overview)

## Key Findings
(bullet points of the most important findings)

## Sources
(numbered list of sources used)

Search Results:
${snippets}`;

      // 3. LLM synthesis
      const report = await runtime.useModel(ModelType.TEXT_LARGE, { prompt });

      // 4. Append sources footer if LLM omitted it
      const sourcesFooter = results.map((r, i) => `${i + 1}. [${r.title}](${r.url})`).join("\n");
      const fullReport = report.includes("## Sources")
        ? report
        : `${report}\n\n## Sources\n${sourcesFooter}`;

      // 5. Save to outputs/
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      const slug = topic
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")
        .slice(0, 50);
      const outputDir = path.resolve("outputs");
      await fs.mkdir(outputDir, { recursive: true });
      const filePath = path.join(outputDir, `${slug}-${timestamp}.md`);
      await fs.writeFile(filePath, `# Research: ${topic}\n\n${fullReport}`, "utf-8");

      console.log(`[RESEARCH] Report saved to ${filePath}`);

      return { success: true, text: fullReport, values: { topic, filePath } };
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error("[RESEARCH] Error:", msg);
      return {
        success: false,
        text: `Sorry, I ran into a problem while researching "${topic}": ${msg}`,
        values: { error: msg },
      };
    }
  },

  examples: [
    [
      { name: "user", content: { text: "Research the latest AI breakthroughs in 2025." } },
      { name: "Aria", content: { text: "Researching AI breakthroughs in 2025...", action: "RESEARCH" } },
    ],
    [
      { name: "user", content: { text: "Summarize the Nosana network." } },
      { name: "Aria", content: { text: "Searching and summarizing Nosana network.", action: "RESEARCH" } },
    ],
  ],
};
