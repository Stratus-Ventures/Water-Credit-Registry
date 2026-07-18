// THE GOALS
// 1. Create a consumer and producer for the water credits data. Use channels and concurrency.
// <- in via gRPC (or websockets if easier)
// -> out via websockets(ProtocolBuffer)
// 2. Publish data to Redis Pub/Sub Channels Consume the data via concurrent subrouteines.
// 3. Publish data to POSTGRES for the oracle to pull
// 4. Create Unit and Integration tests for the services and functions
// think: meter → [ingest goroutine] → channel → [broadcast goroutine] → viewers

package main

import (
	"fmt"
	"net/http"

	"github.com/Stratus-Ventures/Water-Credit-Registry/water-data-services/internal/routes"
)

func main() {
	router := routes.NewRouter()
	port := 8080
	addr := fmt.Sprintf(":%d", port)
	fmt.Printf("server listening on localhost:%s\n", addr)
	err := http.ListenAndServe(addr, router)
	if err != nil {
		panic(err)
	}
}
