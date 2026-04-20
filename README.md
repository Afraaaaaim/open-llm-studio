# Open LLM Studio

Open-source LLM application platform built with Go (backend) and Next.js (frontend).

## Overview

This project is a personal study initiative aimed at building an enterprise-grade LLM system from scratch. The goal is to understand and implement core concepts behind modern AI platforms, including API design, model orchestration, and scalable architecture.

## Tech Stack

* **Backend:** Go
* **Frontend:** Next.js
* **Database:** PostgreSQL (planned)
* **Containerization:** Docker

## Project Structure

```
.
├── backend     # Go API and core logic
├── frontend    # Next.js application
├── docker      # Container configs
├── docs        # Documentation
├── LICENSE
└── README.md
```

## Development Setup

### Prerequisites

* Go (latest stable)
* Node.js (LTS) / Bun
* Docker 

### Clone

```
git clone https://github.com/afraaaaaim/open-llm-studio.git
cd open-llm-studio
```

## Branching Strategy

* `main` → production-ready
* `dev` → active development

Feature work should be done on separate branches and merged into `dev`.

## Goals

* Build a modular LLM backend in Go
* Create a clean frontend interface using Next.js
* Implement model abstraction (multi-provider support)
* Explore RAG, agents, and orchestration patterns
* Maintain production-level code quality

## Status

Early stage. Initial scaffolding in progress.

## License

This project is licensed under the AGPL-3.0 License.
