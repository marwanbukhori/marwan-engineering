export type TimelineItem = {
  period: string;
  company: string;
  role: string;
  detail: string;
  /** Optional path to a real, provided company logo PNG in /public, e.g. "/logos/verus-virtus.png". */
  logo?: string;
};

export const timeline: TimelineItem[] = [
  {
    period: "2022 – 2024",
    company: "Terato Tech",
    role: "Junior Software Engineer, Terato Tech",
    detail: "Reporting features on CloudBOS deployed nationwide across 1,000+ fuel stations.",
  },
  {
    period: "2024 – 2026",
    company: "Silentmode",
    role: "Software Engineer (Full-Stack), Silentmode",
    detail:
      "Built the E-Invoice System from scratch: event-driven microservice on AWS, CQRS and DDD, LHDN integration. Shipped subsidy transaction processing, 800K+ txns/day.",
  },
  {
    period: "2026 (short contract)",
    company: "Geomotion",
    role: "Software Engineer (Security), Geomotion",
    detail: "Security hardening across 6 microservice repos: WAF rules, CSP headers, automated CI/CD scanning.",
  },
  {
    period: "2026 – present",
    company: "Verus Virtus",
    role: "Software Engineer, Verus Virtus",
    detail: "Building Nexus, an AI platform that turns natural language into audited network commands.",
  },
];
