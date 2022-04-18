package model

import "github.com/jinzhu/gorm"

type Location struct {
	gorm.Model
	PlusCode string `json:"plusCode"`
	// PlusCode string `json:"plusCode" gorm:"primary_key"`
	Address  string `json:"address"`
	Title    string `json:"title"`
	Employees []Employee `json:"employees,omitempty"`
	Carpoolgroups []CarpoolGroup `json:"carpoolgroups,omitempty"`
}
