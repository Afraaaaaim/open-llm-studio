package chat

// Message represents a single chat message.
type Message struct {
	Role    string `json:"role"`
	Content string `json:"content"`
}

// Request is the payload sent by the frontend.
type Request struct {
	Model    string    `json:"model"`
	Messages []Message `json:"messages"`
}