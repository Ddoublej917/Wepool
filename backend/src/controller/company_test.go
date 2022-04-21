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

var company_user1 model.Employee = model.Employee{
	WorkEmail:      "user1@company.1",
	Password:       "1234",
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
	Company:        model.Company{},
}
var company_user2 model.Employee = model.Employee{
	WorkEmail:      "user2@company.1",
	Password:       "1234",
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
	Company:        model.Company{},
}
var company_report1 model.Report = model.Report{
	PetitionerEmail:  company_user1.WorkEmail,
	OffenderEmail:    company_user2.WorkEmail,
	IssueDescription: "Test",
	EmployeeID:       company_user1.ID,
	Employee:         company_user1,
	CompanyID:        0,
	Company:          model.Company{},
}
var company_company1 model.Company = model.Company{
	Name:          "company1",
	Domain:        "company.1",
	Locations:     []model.Location{},
	CarpoolGroups: []model.CarpoolGroup{},
	Employees:     []model.Employee{},
	Reports:       []model.Report{},
}

/*
POST /company/report
Gets all the reports/issues filed at a company for use by moderators
May return OK, BadRequest, Unauthorized, or NotFound.
*/
func TestGetCompanyReports(t *testing.T) {
	teardownTest := SetupTest(t)
	defer teardownTest(t)

	model.DB.FirstOrCreate(&company_report1)
	model.DB.FirstOrCreate(&company_user1)
	company_user1.Reports = append(company_user1.Reports, company_report1)
	model.DB.Update(&company_user1)
	model.DB.FirstOrCreate(&company_company1)

	_, engine := gin.CreateTestContext(httptest.NewRecorder())
	engine.POST("/company/report", GetCompanyReports)
	var buf bytes.Buffer
	var request *http.Request

	input := CompanyInput{
		ID: company_company1.ID,
	}

	_, engine = gin.CreateTestContext(httptest.NewRecorder())
	engine.POST("/company/report", GetCompanyReports)

	json.NewEncoder(&buf).Encode(input)
	request, _ = http.NewRequest(http.MethodPost, "/company/report", &buf)
	TestHTTPResponse(t, engine, request, func(w *httptest.ResponseRecorder) bool {
		expectedStatus := http.StatusOK
		statusOK := w.Code == expectedStatus
		if !statusOK {
			t.Errorf("expected %v, got %v. Body:\n%v", expectedStatus, w.Code, w.Body)
		}
		return statusOK
	})

	notFoundInput := CompanyInput{
		ID: 9999,
	}

	json.NewEncoder(&buf).Encode(notFoundInput)
	request, _ = http.NewRequest(http.MethodPost, "/company/report", &buf)
	TestHTTPResponse(t, engine, request, func(w *httptest.ResponseRecorder) bool {
		expectedStatus := http.StatusNotFound
		statusOK := w.Code == expectedStatus
		if !statusOK {
			t.Errorf("expected %v, got %v. Body:\n%v", expectedStatus, w.Code, w.Body)
		}
		return statusOK
	})
}
