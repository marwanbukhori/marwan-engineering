export type FaqItem = {
  question: string;
  answer: string;
};

export const faqs: FaqItem[] = [
  {
    question: "Why are you moving from full-stack engineering into AI?",
    answer:
      "I spent four years shipping backend systems and event-driven architectures. AI is the next layer on top of that, same engineering discipline, new primitives. I'm not starting over. I'm applying production habits to agentic systems, which is exactly what Nexus and the LangChain work are.",
  },
  {
    question: "What's the most technically challenging thing you've built?",
    answer:
      "Probably Nexus. It translates natural language into real network CLI commands, so the hard part wasn't the AI, it was the safety layer: confirmation gated execution, a permanent floor blocking catastrophic commands, and CLI output sourced from reviewed templates instead of generated freeform.",
  },
  {
    question: "You took a security contract without a security background. How did that go?",
    answer:
      "I delivered WAF rules, CSP headers, and automated CI/CD scanning across six microservices for a client audit. I hadn't specialized in security before that role, but the approach is the same one I use for any unfamiliar stack: read the real findings, find the smallest correct fix, ship it, verify it. It's the same pattern that got me from a Vue and Laravel background to a second maintainer on a NestJS CQRS microservice in a few months.",
  },
  {
    question: "Are you locked into your current stack?",
    answer:
      "No. I've picked up new stacks under real production pressure more than once, and I'd treat something like Java and Spring Boot or C# and .NET the same way: a stretch, not a blocker.",
  },
  {
    question: "What are you looking for next, and are you available now?",
    answer:
      "AI or agentic engineering roles primarily, and I'm also open to platform, DevOps, or data engineering. I'm available immediately.",
  },
];
