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

This is a demonstration piece, built to show a DevOps and platform stack working end
to end rather than to run a restaurant. OpenShift and Kubernetes, Spring Boot on the
services, Angular on the console, Splunk for logs and Dynatrace for traces were all
chosen deliberately, because a demo is only worth anything if the problem underneath
it is real enough to break. So the system models a genuine failure and every claim it
makes is measured against a deployed cluster.

## The problem

It models a real failure. A Malaysian restaurant opened reservations at 21:00 each
night; the platform fell over at roughly three thousand attempts, and scalpers took
seats that had already been sold. Two failures, not one: the site went down, and it
sold the same table twice. This rebuilds that moment as something you can run,
watch, and check.

## How it runs

It deploys to a constrained OpenShift cluster: `restricted-v2` SCC only, a namespaced
quota, and horizontal autoscalers. Ansible renders and applies the manifests, waits
for the rollout, smoke-tests the public route and rolls back on its own if any of that
fails. CI and CD are separate, so a rollback needs no rebuild, and the deploy identity
is a ServiceAccount with no `delete` verb and no access to secrets, pods or RBAC.

Every pod ships structured events to Splunk over HEC, which answers what happened, and
an application-only Dynatrace OneAgent supplies traces, which answer where the time
went. Load comes from k6 running in-cluster as a Kubernetes Job, so the load generator
is subject to the same quota as everything it is testing. The Angular console reads
the drop, the pods, the quota and the autoscalers live, and can start a run itself.

## What the numbers say

The oversell guard is a CHECK constraint in Oracle rather than application logic, so
no bug in the service can get past it. Filling one slot to its exact boundary under
6-way concurrency landed 125 bookings, refused 19 with a 409, and left seats on
exactly 250, never 249 or 251. Under 200 concurrent customers against a
20-connection pool the system shed load deliberately: 186 rejections, every one an
intentional 503, zero errors, and the oversold counter still reading zero. 203 tests
run against a real Oracle database in Testcontainers, not an in-memory substitute.

