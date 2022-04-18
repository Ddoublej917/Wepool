package model

import "github.com/jinzhu/gorm"

type Report struct {
	gorm.Model
	PetitionerEmail          string         `json:"petitionerEmail"`
	OffenderEmail        string         `json:"offenderEmail"`
	IssueDescription     string     `json:"issueDescription"`
	EmployeeID uint `json:"employeeId"`
	Employee Employee `json:"employee,omitempty"`
	CompanyID uint `json:"companyID"`
	Company Company `json:"company,omitempty"`
}
