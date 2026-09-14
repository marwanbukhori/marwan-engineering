---
name: Rembayung Booking Queue
status: live
order: 1
description: >-
  A restaurant booking system built to survive its own busiest second: it meters
  the crowd before the database sees it, and a database constraint makes selling
  the same table twice impossible.
tags:
  - Distributed systems
  - Kubernetes
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
---

It models a real failure. A Malaysian restaurant opened reservations at 21:00 each
night; the platform fell over at roughly three thousand attempts, and scalpers took
seats that had already been sold. Two failures, not one: the site went down, and it
sold the same table twice. This rebuilds that moment as something you can run,
watch, and check.

Two services split the problem. queue-gate issues a ticket per arrival and admits
them at a fixed rate, so the crowd is metered before it reaches the database, and
admission is a pure function of elapsed time, so no queue state has to be stored or
coordinated. booking-service then takes a pessimistic row lock per slot, which makes
bookings for one slot strictly serial and therefore slow on purpose, about one per
second. Correctness is what is being optimised for, and the queue in front is what
makes that acceptable.

The oversell guard is a CHECK constraint in Oracle rather than application logic, so
no bug in the service can get past it. Filling one slot to its exact boundary under
6-way concurrency landed 125 bookings, refused 19 with a 409, and left seats on
exactly 250, never 249 or 251. Under 200 concurrent customers against a
20-connection pool the system shed load deliberately: 186 rejections, every one an
intentional 503, zero errors, and the oversold counter still reading zero. 203 tests
run against a real Oracle database in Testcontainers, not an in-memory substitute.

Two things there were genuinely surprising. Readiness probes that included the
database emptied the Service during overload, because the correct response to a busy
database is a 503, not disappearing. And the deploy pipeline wrote only the container
image for 81 commits, so every other field in a manifest reached the cluster only
when a human remembered, which means a committed, CI-green, deployed change could do
nothing at all.
