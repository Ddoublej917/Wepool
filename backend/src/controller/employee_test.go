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
POST /login
Given an employee and a password, attempt to create a new session and provide
a session key for authentication.
May return OK, BadRequest, Unauthorized
*/
func TestLogin(t *testing.T) {
	teardownTest := SetupTest(t)
	defer teardownTest(t)

	employee := model.Employee{WorkEmail: "test@user.com", Password: "password123"}
	model.DB.Create(&employee)

	goodInput := CreateEmployeeInput{WorkEmail: employee.WorkEmail, Password: employee.Password}
	badPasswordInput := CreateEmployeeInput{WorkEmail: employee.WorkEmail, Password: "oops"}
	badEmployeeInput := CreateEmployeeInput{WorkEmail: "oops@oops.oops", Password: "oops"}
	var buf bytes.Buffer
	var request *http.Request

	_, engine := gin.CreateTestContext(httptest.NewRecorder())
	engine.POST("/login", Login)

	json.NewEncoder(&buf).Encode(badPasswordInput)
	request, _ = http.NewRequest(http.MethodPost, "/login", &buf)
	TestHTTPResponse(t, engine, request, func(w *httptest.ResponseRecorder) bool {
		expectedStatus := http.StatusUnauthorized
		statusOK := w.Code == expectedStatus
		if !statusOK {
			t.Errorf("expected %v, got %v. Body:\n%v", expectedStatus, w.Code, w.Body)
		}
		return statusOK
	})

	json.NewEncoder(&buf).Encode(badEmployeeInput)
	request, _ = http.NewRequest(http.MethodPost, "/login", &buf)
	TestHTTPResponse(t, engine, request, func(w *httptest.ResponseRecorder) bool {
		expectedStatus := http.StatusUnauthorized
		statusOK := w.Code == expectedStatus
		if !statusOK {
			t.Errorf("expected %v, got %v. Body:\n%v", expectedStatus, w.Code, w.Body)
		}
		return statusOK
	})

	json.NewEncoder(&buf).Encode(goodInput)
	request, _ = http.NewRequest(http.MethodPost, "/login", &buf)
	TestHTTPResponse(t, engine, request, func(w *httptest.ResponseRecorder) bool {
		expectedStatus := http.StatusOK
		statusOK := w.Code == expectedStatus
		if !statusOK {
			t.Errorf("expected %v, got %v. Body:\n%v", expectedStatus, w.Code, w.Body)
		}
		return statusOK
	})
}

func TestLogout(t *testing.T) {
	teardownTest := SetupTest(t)
	defer teardownTest(t)

	employee := model.Employee{WorkEmail: "test@user.com", Password: "password123"}
	session := model.Session{EmployeeID: int(employee.ID)}
	model.DB.Create(&employee)
	model.DB.Create(&session)

	realAuthenticationInput := AuthenticationInput{SessionID: int(session.ID)}
	fakeAuthenticationInput := AuthenticationInput{SessionID: int(session.ID) + 1}
	var buf bytes.Buffer
	var request *http.Request

	_, engine := gin.CreateTestContext(httptest.NewRecorder())
	engine.POST("/logout", Logout)

	json.NewEncoder(&buf).Encode(fakeAuthenticationInput)
	request, _ = http.NewRequest(http.MethodPost, "/logout", &buf)
	TestHTTPResponse(t, engine, request, func(w *httptest.ResponseRecorder) bool {
		expectedStatus := http.StatusOK
		statusOK := w.Code == expectedStatus
		if !statusOK {
			t.Errorf("expected %v, got %v. Body:\n%v", expectedStatus, w.Code, w.Body)
		}
		return statusOK
	})

	json.NewEncoder(&buf).Encode(realAuthenticationInput)
	request, _ = http.NewRequest(http.MethodPost, "/logout", &buf)
	TestHTTPResponse(t, engine, request, func(w *httptest.ResponseRecorder) bool {
		expectedStatus := http.StatusOK
		statusOK := w.Code == expectedStatus
		if !statusOK {
			t.Errorf("expected %v, got %v. Body:\n%v", expectedStatus, w.Code, w.Body)
		}
		return statusOK
	})

}

func TestUserSignup(t *testing.T) {
	teardownTest := SetupTest(t)
	defer teardownTest(t)

	employeeInput := CreateEmployeeInput{WorkEmail: "test@user.com", Password: "password123"}
	var buf bytes.Buffer
	var request *http.Request

	_, engine := gin.CreateTestContext(httptest.NewRecorder())
	engine.POST("/employee", UserSignup)

	json.NewEncoder(&buf).Encode(employeeInput)
	request, _ = http.NewRequest(http.MethodPost, "/employee", &buf)
	TestHTTPResponse(t, engine, request, func(w *httptest.ResponseRecorder) bool {
		expectedStatus := http.StatusCreated
		statusOK := w.Code == expectedStatus
		if !statusOK {
			t.Errorf("expected %v, got %v. Body:\n%v", expectedStatus, w.Code, w.Body)
		}
		return statusOK
	})
}

func TestUserLogin(t *testing.T) {
	teardownTest := SetupTest(t)
	defer teardownTest(t)

	employee := model.Employee{WorkEmail: "test@user.com", Password: "password123"}
	model.DB.Create(&employee)

	goodInput := CreateEmployeeInput{WorkEmail: employee.WorkEmail, Password: employee.Password}
	badPasswordInput := CreateEmployeeInput{WorkEmail: employee.WorkEmail, Password: "oops"}
	badEmployeeInput := CreateEmployeeInput{WorkEmail: "oops@oops.oops", Password: "oops"}
	var buf bytes.Buffer
	var request *http.Request

	_, engine := gin.CreateTestContext(httptest.NewRecorder())
	engine.POST("/login", UserLogin)

	json.NewEncoder(&buf).Encode(badEmployeeInput)
	request, _ = http.NewRequest(http.MethodPost, "/login", &buf)
	TestHTTPResponse(t, engine, request, func(w *httptest.ResponseRecorder) bool {
		expectedStatus := http.StatusUnauthorized
		statusOK := w.Code == expectedStatus
		if !statusOK {
			t.Errorf("expected %v, got %v. Body:\n%v", expectedStatus, w.Code, w.Body)
		}
		return statusOK
	})

	json.NewEncoder(&buf).Encode(badPasswordInput)
	request, _ = http.NewRequest(http.MethodPost, "/login", &buf)
	TestHTTPResponse(t, engine, request, func(w *httptest.ResponseRecorder) bool {
		expectedStatus := http.StatusUnauthorized
		statusOK := w.Code == expectedStatus
		if !statusOK {
			t.Errorf("expected %v, got %v. Body:\n%v", expectedStatus, w.Code, w.Body)
		}
		return statusOK
	})

	json.NewEncoder(&buf).Encode(goodInput)
	request, _ = http.NewRequest(http.MethodPost, "/login", &buf)
	TestHTTPResponse(t, engine, request, func(w *httptest.ResponseRecorder) bool {
		expectedStatus := http.StatusOK
		statusOK := w.Code == expectedStatus
		if !statusOK {
			t.Errorf("expected %v, got %v. Body:\n%v", expectedStatus, w.Code, w.Body)
		}
		return statusOK
	})
}
