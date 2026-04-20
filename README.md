# Open LLM Studio

Open-source LLM application platform built with Go (backend) and Next.js (frontend).

## Overview

This project is a personal study initiative aimed at building an enterprise-grade LLM system from scratch. The goal is to understand and implement core concepts behind modern AI platforms, including API design, model orchestration, and scalable architecture.

## Tech Stack

- **Backend:** Go
- **Frontend:** Next.js
- **Database:** PostgreSQL (planned)
- **Containerization:** Docker

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

- Go (latest stable)
- Node.js (LTS) / Bun
- Docker

### Clone

```bash
git clone https://github.com/afraaaaaim/open-llm-studio.git
cd open-llm-studio
```

---

## Code Quality

### Backend (Go)

Go has formatting built in — no configuration needed.

**Format**

```bash
cd backend
go fmt ./...
```

**Lint** — uses [golangci-lint](https://golangci-lint.run/) with config in `backend/.golangci.yml`

```bash
# Install (once)
brew install golangci-lint        # macOS
# or
curl -sSfL https://raw.githubusercontent.com/golangci/golangci-lint/master/install.sh | sh -s -- -b $(go env GOPATH)/bin

# Run
golangci-lint run
```

Enabled linters (`backend/.golangci.yml`):

| Linter | Purpose |
|---|---|
| `govet` | Detects suspicious code constructs |
| `errcheck` | Ensures errors are always handled |
| `staticcheck` | Advanced static analysis |

---

### Frontend (Next.js)

**Lint**

```bash
cd frontend
npm run lint        # check
npm run lint:fix    # auto-fix
```

**Format**

```bash
npm run format        # write
npm run format:check  # CI check
```

---

## Branching Strategy

- `main` → production-ready
- `dev` → active development

Feature work should be done on separate branches and merged into `dev`.

## Goals

- Build a modular LLM backend in Go
- Create a clean frontend interface using Next.js
- Implement model abstraction (multi-provider support)
- Explore RAG, agents, and orchestration patterns
- Maintain production-level code quality

## Status

Early stage. Initial scaffolding in progress.

## License

This project is licensed under the AGPL-3.0 License.