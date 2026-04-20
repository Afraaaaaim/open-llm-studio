# Deployment

## Environment

* Host: VM
* Runtime: Docker + Docker Compose

## Services

* Backend (Go) → port 8000
* Frontend (Next.js) → port 3000

## Project Path

```id="k8d2pz"
/open-llm-studio
```

## Initial Setup

```id="q1n4xb"
git clone https://github.com/afraaaaaim/open-llm-studio.git
cd open-llm-studio
docker compose up -d --build
```

## Running Services

```id="g5w9rm"
docker compose up -d --build
```

## Stopping Services

```id="t7c3vl"
docker compose down
```

## Access

* Frontend: http://<server-ip>:3000
* Backend: http://<server-ip>:8000/hello

## Logs

```id="y2h8ns"
docker compose logs frontend
docker compose logs backend
```

## CI/CD (Planned)

Trigger: push to `main`

Steps:

1. SSH into server
2. Navigate to project directory
3. Pull latest changes
4. Rebuild and restart containers

```id="z6p4qk"
cd open-llm-studio
git pull origin main
docker compose up -d --build
```
