package chat

import (
	"backend/pkg/ollama"
)

// Service handles the business logic for chat.
type Service struct {
	ollama *ollama.Client
}

// NewService creates a new chat Service with the given Ollama client.
func NewService(ollamaClient *ollama.Client) *Service {
	return &Service{ollama: ollamaClient}
}
// Send forwards a chat request to Ollama and returns the response.
func (s *Service) Send(req Request) (map[string]any, error) {
	payload := map[string]any{
		"model":    req.Model,
		"messages": req.Messages,
		"stream":   false,
	}

	result, err := s.ollama.Post("/api/chat", payload)
	if err != nil {
		return map[string]any{
			"model": req.Model,
			"message": map[string]any{
				"role":    "assistant",
				"content": "Hey there from backend!!! 👋 It looks like I'm having trouble connecting to Ollama. Please make sure it's running and reachable, then try again!",
			},
			"done": true,
		}, nil
	}

	return result, nil
}