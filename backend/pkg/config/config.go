package config

import "os"

// Config holds all application configuration loaded from environment variables.
type Config struct {
	Port       string
	OllamaHost string
}

// Load reads environment variables and returns a Config.
// Falls back to sensible defaults for local development.
func Load() *Config {
	return &Config{
		Port:       getEnv("PORT", "8000"),
		OllamaHost: getEnv("OLLAMA_HOST", "http://172.17.0.1:11434"),
	}
}

func getEnv(key, fallback string) string {
	if val := os.Getenv(key); val != "" {
		return val
	}
	return fallback
}