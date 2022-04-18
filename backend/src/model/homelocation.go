package model

import "github.com/jinzhu/gorm"

type Homelocation struct {
	gorm.Model
	Address  string `json:"address"`
}
