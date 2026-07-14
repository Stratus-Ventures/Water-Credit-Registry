package server

import (
	"fmt"
	"net/http"
)

func server() {
	// How we handle our routes
	// http.HandleFunc("/hello", func(w http.ResponseWriter, r *http.Request) {
	// 	fmt.Fprintln(w, "Hello!")
	// })

	fmt.Println("server started, At 127.0.0.1:8080")
	http.ListenAndServe(":8080", nil)
}
