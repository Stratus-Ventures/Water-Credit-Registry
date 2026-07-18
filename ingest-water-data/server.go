// THE GOALS
// 1. Create a consumer and producer for the water credits data.
// <- in via gRPC (or websockets if easier)
// -> out via websockets(ProtocolBuffer)
// 2. Publish data to Redis Pub/Sub Channels
// 3. Publish data to POSTGRES for the oracle to pull
// 4. Create Unit and Integration tests for the services and functions

package main

import (
	"fmt"
	"net/http"
)

func main() {
	// How we handle our routes
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintln(w, "Hello!")
	})

	fmt.Println("server started, At 127.0.0.1:8080")
	http.ListenAndServe(":8080", nil)
}
