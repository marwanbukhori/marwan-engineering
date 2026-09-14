---
name: RAG Chat over my resume
status: done
order: 2
description: >-
  Ask questions about my background and get answers grounded in my actual
  resume, from a LangGraph retrieval agent behind an MCP server, not a
  hallucinated bio.
tags:
  - RAG
  - LangGraph
  - MCP
  - Embeddings
repoUrl: https://github.com/marwanbukhori/marwan-resume-mcp
videoUrl: /videos/resume-mcp-demo.mp4
techStack:
  - Python
  - LangGraph
  - FastMCP
  - Vercel AI Gateway
  - Ollama
  - NumPy
  - Docker
---

A LangGraph graph does retrieve then generate: the resume is chunked by heading,
embedded once offline, and loaded into memory as a single NumPy matrix, no vector
database, since it's one document. Each question is embedded and scored against
every chunk with cosine similarity, the top 3 chunks are passed to the model, and
the system prompt forces it to answer only from those excerpts and cite the
section headings, or say it doesn't know rather than guess. Exposed as a FastMCP
server (query_resume, list_resume_topics tools) so it can be added as a Claude
connector, plus a plain POST /api/chat endpoint for non-MCP clients. The same code
runs against Ollama locally or Vercel AI Gateway in production via one env var swap.
