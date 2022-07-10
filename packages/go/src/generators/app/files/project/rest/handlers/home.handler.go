package handlers

import (
	"fmt"
	"net/http"
)

func HomeRouteHandler(responseWriter http.ResponseWriter, request *http.Request) {
    responseWriter.WriteHeader(http.StatusOK)

    fmt.Println("received a request at /")
}
