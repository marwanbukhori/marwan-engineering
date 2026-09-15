---
name: Rembayung Booking Queue
status: live
category: Backend & Infra
order: 10
description: >-
  A demonstration system built to exercise a full OpenShift, Spring Boot and Angular
  stack under real load, modelled on a restaurant booking night that collapsed and
  sold the same tables twice.
tags:
  - Distributed systems
  - Kubernetes
  - Observability
  - CI/CD
  - Load testing
liveUrl: https://console-marwanbukhori-dev.apps.rm3.7wse.p1.openshiftapps.com
repoUrl: https://github.com/marwanbukhori/rembayung-queue
videoUrl: /videos/rembayung-demo.mp4
techStack:
  - Java 25
  - Spring Boot 4.1
  - Oracle 23ai
  - Redis
  - Angular 20
  - OpenShift
  - Ansible
  - GitHub Actions
  - k6
  - Splunk
  - Dynatrace
images:
  - /projects/rembayung-console.png
  - /projects/rembayung-design.png
  - /projects/rembayung-simulation.png
  - /projects/rembayung-cluster.png
  - /projects/rembayung-live-cluster.png
  - /projects/rembayung-splunk-log.png
  - /projects/rembayung-topology.png
---

## Why it exists

A demonstration piece, built to show a DevOps and platform stack working end to end
rather than to run a restaurant. OpenShift and Kubernetes, Spring Boot on the
services, Angular on the console, Splunk for logs and Dynatrace for traces were all
chosen deliberately — a demo is only worth anything if the problem underneath it is
real enough to break, so every claim here is measured against a deployed cluster.

## The problem

It models a real failure. A Malaysian restaurant opened reservations at 21:00 each
night, and the platform failed twice over:

- It fell over at roughly three thousand attempts.
- It sold the same table twice, so scalpers took seats that were already gone.

Going down and overselling are different problems with different fixes. This rebuilds
that moment as something you can run, watch and check.

## How it works

Two services, each solving one of those failures:

- **queue-gate** issues a ticket per arrival and admits people at a fixed rate, so the
  crowd is metered before it ever reaches the database.
- Admission is a pure function of elapsed time, so no queue state has to be stored or
  coordinated between instances.
- **booking-service** takes a pessimistic row lock per slot, making bookings for one
  slot strictly serial — about one per second, slow on purpose.
- The oversell guard is a CHECK constraint in Oracle, not application logic, so no bug
  in the service can get past it.

Correctness is what's being optimised for, and the queue in front is what makes that
acceptable.

## How it runs

It deploys to a constrained OpenShift cluster: `restricted-v2` SCC only, a namespaced
quota, and horizontal autoscalers.

- Ansible renders and applies the manifests, waits for the rollout, smoke-tests the
  public route, and rolls back on its own if any of that fails.
- CI and CD are separate, so a rollback needs no rebuild.
- The deploy identity is a ServiceAccount with no `delete` verb and no access to
  secrets, pods or RBAC.
- Splunk takes structured events from every pod over HEC — what happened.
- Dynatrace, application-only OneAgent, supplies traces — where the time went.
- k6 runs in-cluster as a Kubernetes Job, so the load generator sits under the same
  quota as everything it tests.
- The Angular console reads the drop, the pods, the quota and the autoscalers live,
  and can start a run itself.

## What the numbers say

Every claim below came off the deployed system:

- **Never oversells.** Filling one slot to its exact boundary under 6-way concurrency
  landed 125 bookings, refused 19 with a 409, and left seats on exactly 250 — not 249,
  not 251.
- **Sheds load instead of collapsing.** 200 concurrent customers against a
  20-connection pool produced 186 rejections, every one a deliberate 503, zero errors,
  oversold still reading zero.
- **The bottleneck is contention, by design.** Across those 125 claims, waiting on the
  row lock measured a median of 2,268 ms and a p95 of 5,187 ms.
- **The tests are real.** 203 tests across three services, run against a real Oracle
  database in Testcontainers, not an in-memory substitute.
