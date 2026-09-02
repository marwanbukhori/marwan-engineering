export const TAG_COLORS: Record<string, string> = {
  RAG: "#62a63f",
  LangGraph: "#7da8ff",
  MCP: "#ffc94a",
  Embeddings: "#ff9d5c",
  Agents: "#ff6bae",
  "Tool use": "#b18cff",
  Multimodal: "#5cd6c0",
};

export function tagColor(tag: string): string {
  return TAG_COLORS[tag] ?? "var(--subtle)";
}
