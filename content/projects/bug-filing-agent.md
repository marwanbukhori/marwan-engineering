---
name: Agent that files its own bugs
status: idea
order: 5
description: >-
  A LangGraph agent that reads error logs and drafts a bug report, a concrete
  test of tool calling across multiple steps.
tags:
  - LangGraph
  - Agents
---

Log parser feeds a root cause summarizer, which feeds an issue draft tool call,
chained as a LangGraph agent.
