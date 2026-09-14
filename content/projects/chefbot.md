---
name: Personal Chef Agent
status: done
order: 3
description: >-
  A local AI chef that suggests recipes from ingredients you type or photograph,
  grounding suggestions in a live web search instead of hallucinating recipes.
tags:
  - Agents
  - LangGraph
  - Tool use
  - Multimodal
repoUrl: https://github.com/marwanbukhori/chef-bot
videoUrl: /videos/chef-bot-demo.mp4
techStack:
  - Python
  - LangChain
  - LangGraph
  - Ollama
  - Tavily
  - Streamlit
---

Built from the LangChain Academy Foundations of LangChain capstone, rebuilt to run
entirely on local Ollama models. A LangChain tool-calling agent (qwen2.5:7b) calls
a Tavily web-search tool to ground recipe suggestions in real results, with a
LangGraph checkpointer keeping per-session conversation state so follow-ups like
"make the first one vegetarian" work without repeating context. Ollama's vision
models don't reliably support tool calling in the same request, so photos go
through a separate vision-only model (qwen2.5vl:7b) first, which turns the image
into a plain-text ingredient list that flows into the same agent as a normal chat
turn. Ships as a Streamlit chat app, with a Jupyter notebook walking through the
same logic lesson by lesson.
