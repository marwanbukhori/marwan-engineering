export type AppStatus = "live" | "in progress" | "planned" | "idea";

export type AppEntry = {
  slug: string;
  name: string;
  status: AppStatus;
  description: string;
  tags: string[];
  /** If set, this app has a real in-hub demo page at this path. */
  demoPath?: string;
  /** If set, links out to a live, externally-hosted deployment. */
  liveUrl?: string;
  /** If set, links out to the project's source repo. */
  repoUrl?: string;
  /** If set, a self-hosted demo video (path under /public) shown on the project page. */
  videoUrl?: string;
  /** Shown when a project card is expanded, framed as a README excerpt. */
  detail: string;
};

export const apps: AppEntry[] = [
  {
    slug: "resume-chat",
    name: "RAG Chat over my resume",
    status: "in progress",
    description:
      "Ask questions about my background and get answers grounded in my actual resume, from a LangGraph retrieval agent behind an MCP server, not a hallucinated bio.",
    tags: ["RAG", "LangGraph", "MCP", "Embeddings"],
    repoUrl: "https://github.com/marwanbukhori/marwan-resume-mcp",
    videoUrl: "/videos/resume-mcp-demo.mp4",
    detail:
      "Resume and project docs are chunked, embedded, and retrieved top k. Answers cite the source section instead of guessing.",
  },
  {
    slug: "mcp-tool-server",
    name: "MCP Tool Server",
    status: "planned",
    description:
      "A small MCP server exposing a couple of real tools to a model, to prove I understand the protocol beyond reading the spec.",
    tags: ["MCP", "Tool use"],
    detail:
      "Exposes two tools over MCP. A client model calls them mid conversation with structured arguments.",
  },
  {
    slug: "bug-filing-agent",
    name: "Agent that files its own bugs",
    status: "idea",
    description:
      "A LangGraph agent that reads error logs and drafts a bug report, a concrete test of tool calling across multiple steps.",
    tags: ["LangGraph", "Agents"],
    detail:
      "Log parser feeds a root cause summarizer, which feeds an issue draft tool call, chained as a LangGraph agent.",
  },
];

export function getApp(slug: string): AppEntry | undefined {
  return apps.find((app) => app.slug === slug);
}
