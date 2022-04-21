package controller

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
	"wepool.com/src/model"
)

/*
Given a location object, add it to the database.
May return OK, Bad Request.
*/
func TestCreateLocation(t *testing.T) {
	teardownTest := SetupTest(t)
	defer teardownTest(t)

	newLocation := model.Location{
		PlusCode: "jmr3+w6",
		Address:  "1064 Center Dr, Gainesville, FL 32611",
		Title:    "NEB",
	}

	var buf bytes.Buffer
	var request *http.Request

	_, engine := gin.CreateTestContext(httptest.NewRecorder())
	engine.POST("/CreateLocation", CreateLocation)

	json.NewEncoder(&buf).Encode(&newLocation)
	request, _ = http.NewRequest(http.MethodPost, "/CreateLocation", &buf)
	TestHTTPResponse(t, engine, request, func(w *httptest.ResponseRecorder) bool {
		expectedStatus := http.StatusOK
		statusOK := w.Code == expectedStatus
		if !statusOK {
			t.Errorf("expected %v, got %v. Body:\n%v", expectedStatus, w.Code, w.Body)
		}
		return statusOK
	})
}
