export const TAG_COLORS: Record<string, string> = {
  RAG: "#62a63f",
  LangGraph: "#7da8ff",
  MCP: "#ffc94a",
  Embeddings: "#ff9d5c",
  Agents: "#ff6bae",
  "Tool use": "#b18cff",
  Multimodal: "#5cd6c0",
  "Distributed systems": "#e05c5c",
  Kubernetes: "#3f9bb5",
  "Load testing": "#a9744f",
  "Next.js": "#8fb4c9",
  "Marketing site": "#d98cb3",
  Design: "#e0c060",
  Observability: "#6fc3b8",
  "CI/CD": "#c98f5a",
};

export function tagColor(tag: string): string {
  return TAG_COLORS[tag] ?? "var(--subtle)";
}

/** Colors for the project filter bar. Kept apart from TAG_COLORS: categories filter, tags describe. */
export const CATEGORY_COLORS: Record<string, string> = {
  AI: "#7da8ff",
  "Backend & Infra": "#62a63f",
  Frontend: "#ffc94a",
  Tools: "#b18cff",
};

export function categoryColor(category: string): string {
  return CATEGORY_COLORS[category] ?? "var(--subtle)";
}
