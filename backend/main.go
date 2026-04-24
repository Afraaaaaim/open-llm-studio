package main

import (
	"log"
	"net/http"

	"backend/internal/chat"
	"backend/pkg/config"
	"backend/pkg/middleware"
)

func main() {
	cfg := config.Load()

	mux := http.NewServeMux()

	mux.HandleFunc("/api/chat", chat.NewHandler(cfg))

	handler := middleware.WithLogging(middleware.WithCORS(mux))

	log.Printf("server starting on port %s", cfg.Port)
	if err := http.ListenAndServe(":"+cfg.Port, handler); err != nil {
		log.Fatalf("server failed: %v", err)
	}
}