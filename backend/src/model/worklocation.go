package model

import "github.com/jinzhu/gorm"

type Worklocation struct {
	gorm.Model
	Address string `json:"address"`
	// Carpoolgroups  []Carpoolgroup
}

