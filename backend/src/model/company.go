package model

import "github.com/jinzhu/gorm"

type Company struct {
	gorm.Model
	Name          string         `json:"name"`
	Domain        string         `json:"domain"`
	Locations     []Location     `json:"locations"`
	CarpoolGroups []CarpoolGroup `json:"carpoolGroups"`
	Employees []Employee `json:"employees"`
	Reports []Report `json:"reports"`
}
