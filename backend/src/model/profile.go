package model

import "github.com/jinzhu/gorm"

type Profile struct {
	gorm.Model
	FirstName string `json:"firstName"`
	LastName string `json:"lastName"`
	Gender string `json:"gender"`
	PhoneNumber string `json:"phoneNumber"`
}
