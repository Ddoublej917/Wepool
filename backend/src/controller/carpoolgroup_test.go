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

var carpoolgroup_company1 = model.Company{
	Name:          "company1",
	Domain:        "company.1",
	Locations:     []model.Location{},
	CarpoolGroups: []model.CarpoolGroup{},
	Employees:     []model.Employee{},
	Reports:       []model.Report{},
}

var carpoolgroup_company2 = model.Company{
	Name:          "company2",
	Domain:        "company.2",
	Locations:     []model.Location{},
	CarpoolGroups: []model.CarpoolGroup{},
	Employees:     []model.Employee{},
	Reports:       []model.Report{},
}

var carpoolgroup_group1a = model.CarpoolGroup{
	ID:            10,
	Created:       0,
	Employees:     []model.Employee{},
	CompanyID:     carpoolgroup_company1.ID,
	Company:       carpoolgroup_company1,
	LocationID:    0,
	Location:      model.Location{},
	Preferences:   model.Preferences{},
	PreferencesID: 0,
	CarCapacity:   0,
}

var carpoolgroup_group2a = model.CarpoolGroup{
	ID:            20,
	Created:       0,
	Employees:     []model.Employee{},
	CompanyID:     carpoolgroup_company2.ID,
	Company:       carpoolgroup_company2,
	LocationID:    0,
	Location:      model.Location{},
	Preferences:   model.Preferences{},
	PreferencesID: 0,
	CarCapacity:   0,
}

var carpoolgroup_group2b = model.CarpoolGroup{
	ID:            21,
	Created:       0,
	Employees:     []model.Employee{},
	CompanyID:     carpoolgroup_company2.ID,
	Company:       carpoolgroup_company2,
	LocationID:    0,
	Location:      model.Location{},
	Preferences:   model.Preferences{},
	PreferencesID: 0,
	CarCapacity:   0,
}

var carpoolgroup_user1 = model.Employee{
	WorkEmail:      "alice@company.1",
	Password:       "abcd",
	Preferences:    model.Preferences{},
	PreferencesID:  0,
	CarpoolGroupID: 0,
	CarpoolGroup:   model.CarpoolGroup{},
	Homelocation:   model.Homelocation{},
	HomelocationID: 0,
	Profile:        model.Profile{},
	ProfileID:      0,
	Reports:        []model.Report{},
	CompanyID:      0,
	Company:        carpoolgroup_company1,
}

/*
GET /GetCarpoolGroupsByCompanyName
Given a company name, return the list of CarpoolGroups
associated with it.
May return OK, NotFound, BadRequest
*/
func TestGetCarpoolGroupsByCompanyName(t *testing.T) {
	teardownTest := SetupTest(t)
	defer teardownTest(t)

	carpoolgroup_company1.CarpoolGroups = append(carpoolgroup_company1.CarpoolGroups, carpoolgroup_group1a)
	carpoolgroup_company2.CarpoolGroups = append(carpoolgroup_company2.CarpoolGroups, carpoolgroup_group2a)
	carpoolgroup_company2.CarpoolGroups = append(carpoolgroup_company2.CarpoolGroups, carpoolgroup_group2b)
	model.DB.FirstOrCreate(&carpoolgroup_company1)
	model.DB.FirstOrCreate(&carpoolgroup_company2)
	model.DB.FirstOrCreate(&carpoolgroup_group1a)
	model.DB.FirstOrCreate(&carpoolgroup_group2a)
	model.DB.FirstOrCreate(&carpoolgroup_group2b)

	_, engine := gin.CreateTestContext(httptest.NewRecorder())
	engine.GET("/GetCarpoolGroupsByCompanyName", GetCarpoolGroupsByCompanyName)
	var buf bytes.Buffer
	var request *http.Request

	badInput := ""
	json.NewEncoder(&buf).Encode(badInput)
	request, _ = http.NewRequest(http.MethodGet, "/GetCarpoolGroupsByCompanyName", &buf)
	TestHTTPResponse(t, engine, request, func(w *httptest.ResponseRecorder) bool {
		expectedStatus := http.StatusBadRequest
		statusOK := w.Code == expectedStatus
		if !statusOK {
			t.Errorf("expected %v, got %v. Body:\n%v", expectedStatus, w.Code, w.Body)
			return false
		}
		return true
	})

	notFoundInput := GetCarpoolGroupsByCompanyNameInput{
		Name: "oops",
	}

	json.NewEncoder(&buf).Encode(notFoundInput)
	request, _ = http.NewRequest(http.MethodGet, "/GetCarpoolGroupsByCompanyName", &buf)
	TestHTTPResponse(t, engine, request, func(w *httptest.ResponseRecorder) bool {
		expectedStatus := http.StatusNotFound
		statusOK := w.Code == expectedStatus
		if !statusOK {
			t.Errorf("expected %v, got %v. Body:\n%v", expectedStatus, w.Code, w.Body)
			return false
		}
		return true
	})

	input1 := GetCarpoolGroupsByCompanyNameInput{
		Name: carpoolgroup_company1.Name,
	}

	json.NewEncoder(&buf).Encode(input1)
	request, _ = http.NewRequest(http.MethodGet, "/GetCarpoolGroupsByCompanyName", &buf)
	TestHTTPResponse(t, engine, request, func(w *httptest.ResponseRecorder) bool {
		expectedStatus := http.StatusOK
		statusOK := w.Code == expectedStatus
		var response []model.CarpoolGroup
		json.Unmarshal(w.Body.Bytes(), &response)
		if !statusOK {
			t.Errorf("expected %v, got %v. Body:\n%v", expectedStatus, w.Code, w.Body)
			return false
		}
		return true
	})

	input2 := GetCarpoolGroupsByCompanyNameInput{
		Name: carpoolgroup_company2.Name,
	}

	json.NewEncoder(&buf).Encode(input2)
	request, _ = http.NewRequest(http.MethodGet, "/GetCarpoolGroupsByCompanyName", &buf)
	TestHTTPResponse(t, engine, request, func(w *httptest.ResponseRecorder) bool {
		expectedStatus := http.StatusOK
		statusOK := w.Code == expectedStatus
		var response []model.CarpoolGroup
		json.Unmarshal(w.Body.Bytes(), &response)
		if !statusOK {
			t.Errorf("expected %v, got %v. Body:\n%v", expectedStatus, w.Code, w.Body)
			return false
		}
		return true
	})
}

/*
POST /AddEmployeeToCarpoolGroup
Given an employee workEmail and a carpoolGroupID,
try adding the related employee to the carpoolGroup.
May return OK, NotFound, BadRequest
*/
func TestAddEmployeeToCarpoolGroup(t *testing.T) {
	teardownTest := SetupTest(t)
	defer teardownTest(t)

	model.DB.FirstOrCreate(&carpoolgroup_company1)
	model.DB.FirstOrCreate(&carpoolgroup_group1a)

	_, engine := gin.CreateTestContext(httptest.NewRecorder())
	engine.POST("/AddEmployeeToCarpoolGroup", AddEmployeeToCarpoolGroup)
	var buf bytes.Buffer
	var request *http.Request

	groupNotFoundInput := AddUserToCarpoolGroupInput{
		WorkEmail:      carpoolgroup_user1.WorkEmail,
		CarpoolGroupID: 9999,
	}

	json.NewEncoder(&buf).Encode(groupNotFoundInput)
	request, _ = http.NewRequest(http.MethodGet, "/GetCarpoolGroupsByCompanyName", &buf)
	TestHTTPResponse(t, engine, request, func(w *httptest.ResponseRecorder) bool {
		expectedStatus := http.StatusNotFound
		statusOK := w.Code == expectedStatus
		var response []model.CarpoolGroup
		json.Unmarshal(w.Body.Bytes(), &response)
		if !statusOK {
			t.Errorf("expected %v, got %v. Body:\n%v", expectedStatus, w.Code, w.Body)
			return false
		}
		return true
	})

	userNotFoundInput := AddUserToCarpoolGroupInput{
		WorkEmail:      "oops@oops.oops",
		CarpoolGroupID: carpoolgroup_group1a.ID,
	}

	json.NewEncoder(&buf).Encode(userNotFoundInput)
	request, _ = http.NewRequest(http.MethodGet, "/GetCarpoolGroupsByCompanyName", &buf)
	TestHTTPResponse(t, engine, request, func(w *httptest.ResponseRecorder) bool {
		expectedStatus := http.StatusNotFound
		statusOK := w.Code == expectedStatus
		var response []model.CarpoolGroup
		json.Unmarshal(w.Body.Bytes(), &response)
		if !statusOK {
			t.Errorf("expected %v, got %v. Body:\n%v", expectedStatus, w.Code, w.Body)
			return false
		}
		return true
	})
}
