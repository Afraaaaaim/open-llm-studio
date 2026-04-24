package chat

import (
	"encoding/json"
	"net/http"

	"backend/pkg/config"
	"backend/pkg/ollama"
)

func NewHandler(cfg *config.Config) http.HandlerFunc {
	ollamaClient := ollama.New(cfg.OllamaHost)
	svc := NewService(ollamaClient)

	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPost {
			http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
			return
		}

		var req Request
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			http.Error(w, "invalid request body", http.StatusBadRequest)
			return
		}

		resp, err := svc.Send(req)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(resp)
	}
}