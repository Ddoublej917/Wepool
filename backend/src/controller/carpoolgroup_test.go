package controller

import (
	"testing"

	"github.com/jinzhu/gorm"
	"wepool.com/src/model"
)

var company1 = model.Company{
	Model:         gorm.Model{},
	Name:          "company1",
	Domain:        "company.1",
	Locations:     []model.Location{},
	CarpoolGroups: []model.CarpoolGroup{},
	Employees:     []model.Employee{},
	Reports:       []model.Report{},
}

var company2 = model.Company{
	Model:         gorm.Model{},
	Name:          "company2",
	Domain:        "company.2",
	Locations:     []model.Location{},
	CarpoolGroups: []model.CarpoolGroup{},
	Employees:     []model.Employee{},
	Reports:       []model.Report{},
}

var group1 = model.CarpoolGroup{
	ID:            1,
	Created:       0,
	Employees:     []model.Employee{},
	CompanyID:     company1.ID,
	Company:       company1,
	LocationID:    0,
	Location:      model.Location{},
	Preferences:   model.Preferences{},
	PreferencesID: 0,
	CarCapacity:   0,
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
}
