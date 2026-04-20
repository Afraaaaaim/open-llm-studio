FROM golang:1.22-alpine

WORKDIR /app

# Copy from build context (./backend), not from Dockerfile location
COPY . .

RUN go build -o app

EXPOSE 8000

CMD ["./app"]