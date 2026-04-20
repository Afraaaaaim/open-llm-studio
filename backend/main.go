package main

import (
	"encoding/json" // used to convert Go data -> JSON format
	"net/http"      // provides HTTP server and request/response handling
)

// hello is a handler function.
// A handler is just a function that runs when a specific URL is hit.
//
// w (ResponseWriter): used to send data back to the client
// r (*Request): contains all details about the incoming request
func hello(w http.ResponseWriter, r *http.Request) {
	// Tell the client that the response will be JSON
	// Without this, browsers/tools may not interpret it correctly
	w.Header().Set("Content-Type", "application/json")

	// Create a simple response as a map (like a JSON object)
	response := map[string]string{
		"message": "hello from go",
	}

	// Convert the Go map into JSON and write it to the response
	// This sends the data back to whoever called the API
	err := json.NewEncoder(w).Encode(response)

	// Always good practice: check for errors when writing responses
	if err != nil {
		http.Error(w, "failed to encode response", http.StatusInternalServerError)
		return
	}
}

func main() {
	// Register the /hello route
	// When someone visits http://<host>:8000/hello, the hello() function runs
	http.HandleFunc("/hello", hello)

	// Start the HTTP server on port 8000
	// ":8000" means listen on all network interfaces
	// nil means we are using the default router (ServeMux)
	err := http.ListenAndServe(":8000", nil)

	// If the server fails to start, log the error and stop
	if err != nil {
		panic(err)
	}
}
