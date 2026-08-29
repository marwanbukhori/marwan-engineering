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
  /** Real technologies used, shown only on the project detail page (not used for filtering). */
  techStack?: string[];
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
      "A LangGraph graph does retrieve then generate: the resume is chunked by heading, embedded once offline, and loaded into memory as a single NumPy matrix, no vector database, since it's one document. Each question is embedded and scored against every chunk with cosine similarity, the top 3 chunks are passed to the model, and the system prompt forces it to answer only from those excerpts and cite the section headings, or say it doesn't know rather than guess. Exposed as a FastMCP server (query_resume, list_resume_topics tools) so it can be added as a Claude connector, plus a plain POST /api/chat endpoint for non-MCP clients. The same code runs against Ollama locally or Vercel AI Gateway in production via one env var swap.",
    techStack: [
      "Python",
      "LangGraph",
      "FastMCP",
      "Vercel AI Gateway",
      "Ollama",
      "NumPy",
      "Docker",
    ],
  },
  {
    slug: "chefbot",
    name: "Personal Chef Agent",
    status: "in progress",
    description:
      "A local AI chef that suggests recipes from ingredients you type or photograph, grounding suggestions in a live web search instead of hallucinating recipes.",
    tags: ["Agents", "LangGraph", "Tool use", "Multimodal"],
    repoUrl: "https://github.com/marwanbukhori/chef-bot",
    videoUrl: "/videos/chef-bot-demo.mp4",
    detail:
      "Built from the LangChain Academy Foundations of LangChain capstone, rebuilt to run entirely on local Ollama models. A LangChain tool-calling agent (qwen2.5:7b) calls a Tavily web-search tool to ground recipe suggestions in real results, with a LangGraph checkpointer keeping per-session conversation state so follow-ups like \"make the first one vegetarian\" work without repeating context. Ollama's vision models don't reliably support tool calling in the same request, so photos go through a separate vision-only model (qwen2.5vl:7b) first, which turns the image into a plain-text ingredient list that flows into the same agent as a normal chat turn. Ships as a Streamlit chat app, with a Jupyter notebook walking through the same logic lesson by lesson.",
    techStack: ["Python", "LangChain", "LangGraph", "Ollama", "Tavily", "Streamlit"],
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
