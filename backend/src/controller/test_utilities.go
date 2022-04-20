package controller

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
	"wepool.com/src/model"
)

func SetupTest(tb testing.TB) func(tb testing.TB) {
	model.ConnectDatabaseForTesting()

	return func(tb testing.TB) {
		model.DB.Close()
	}
}

// Helper function to process a request and test its response
func TestHTTPResponse(t *testing.T, r *gin.Engine, req *http.Request, f func(w *httptest.ResponseRecorder) bool) {

	// Create a response recorder
	w := httptest.NewRecorder()

	// Create the service and process the above request.
	r.ServeHTTP(w, req)

	if !f(w) {
		t.Fail()
	}
}
