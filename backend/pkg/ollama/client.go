package ollama

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
)

// Client is a simple HTTP client for the Ollama API.
type Client struct {
	baseURL    string
	httpClient *http.Client
}

// New creates a new Ollama client pointed at baseURL.
func New(baseURL string) *Client {
	return &Client{
		baseURL:    baseURL,
		httpClient: &http.Client{},
	}
}

// Post sends a POST request to the given Ollama path with the provided payload.
// Returns the decoded response as a map.
func (c *Client) Post(path string, payload any) (map[string]any, error) {
	body, err := json.Marshal(payload)
	if err != nil {
		return nil, fmt.Errorf("marshal payload: %w", err)
	}

	resp, err := c.httpClient.Post(c.baseURL+path, "application/json", bytes.NewReader(body))
	if err != nil {
		return nil, fmt.Errorf("request to ollama: %w", err)
	}
	defer resp.Body.Close()

	var result map[string]any
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return nil, fmt.Errorf("decode ollama response: %w", err)
	}

	return result, nil
}