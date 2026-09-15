---
name: Personal Chef Agent
status: done
category: AI
order: 30
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
images:
  - /projects/chefbot-architecture.png
  - /projects/chefbot-recipe.png
  - /projects/chefbot-photo-input.png
techStack:
  - Python
  - LangChain
  - LangGraph
  - Ollama
  - Tavily
  - Streamlit
---

## What it does

Type the ingredients you have, or photograph them, and get recipes grounded in a live
web search rather than invented by the model. Everything except the search runs on
your own machine.

## How it works

- A LangChain tool-calling agent on `qwen2.5:7b`, served locally by Ollama.
- It calls a Tavily web-search tool, so suggestions come from real results.
- A LangGraph checkpointer holds per-session conversation state, so a follow-up like
  "make the first one vegetarian" works without repeating any context.

## The photo path, and why it's separate

Ollama's vision models don't reliably support tool calling in the same request. So a
photo doesn't go to the agent at all: a vision-only model, `qwen2.5vl:7b`, turns the
image into a plain-text ingredient list first, and that list enters the same agent as
an ordinary chat turn. One awkward constraint, solved by splitting the step rather
than fighting the model.

## Where it came from

The capstone from LangChain Academy's Foundations course, rebuilt to run entirely on
local models. It ships as a Streamlit chat app, with a Jupyter notebook walking
through the same logic lesson by lesson.
