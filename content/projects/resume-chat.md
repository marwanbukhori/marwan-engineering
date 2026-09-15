---
name: RAG Chat over my resume
status: done
category: AI
order: 20
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
images:
  - /projects/resume-chat-architecture.png
  - /projects/resume-chat-mcp-inspector.png
  - /projects/resume-chat-answer.png
techStack:
  - Python
  - LangGraph
  - FastMCP
  - Vercel AI Gateway
  - Ollama
  - NumPy
  - Docker
---

## What it does

Ask a question about my background and get an answer drawn from my actual resume,
with the section it came from cited — or an admission that it doesn't know, rather
than a plausible invention.

## How the retrieval works

A LangGraph graph does retrieve, then generate:

- The resume is chunked by heading and embedded once, offline.
- The 18 chunk vectors sit in memory as a single NumPy matrix. No vector database,
  because one document doesn't need one.
- Each question is embedded and scored against every chunk by cosine similarity, and
  the top 3 are passed to the model.
- The system prompt permits answers only from those excerpts, and requires citing the
  section headings.

## How it's exposed

Two front doors over the same graph. A FastMCP server publishes `query_resume` and
`list_resume_topics`, so it can be added straight to Claude as a connector, and a
plain `POST /api/chat` endpoint serves anything that doesn't speak MCP.

## Running it

The same code runs against Ollama locally or Vercel AI Gateway in production, swapped
with one environment variable.
