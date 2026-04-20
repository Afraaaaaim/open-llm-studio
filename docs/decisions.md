# Decisions

This document records key technical decisions made in the project.

---

## 001 — Backend Language

**Decision:** Use Go for backend

**Reasoning:**

* Strong performance
* Simple concurrency model
* Minimal dependencies
* Good fit for API services

---

## 002 — Frontend Framework

**Decision:** Use Next.js

**Reasoning:**

* Built-in routing and SSR support
* Good developer experience
* Easy integration with APIs

---

## 003 — Containerization

**Decision:** Use Docker + Docker Compose

**Reasoning:**

* Consistent environment across development and production
* Simple deployment model
* Easy service orchestration

---

## 004 — Initial Architecture

**Decision:** Monolithic (single backend + frontend)

**Reasoning:**

* Simpler to build and reason about
* Avoid premature microservices complexity
* Easier debugging and iteration

---

## 005 — License

**Decision:** AGPL-3.0

**Reasoning:**

* Ensures modifications remain open source
* Prevents closed-source SaaS forks
* Aligns with OSS goals of the project

---
