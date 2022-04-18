package model

import "github.com/jinzhu/gorm"

type Preferences struct {
	gorm.Model
	Talkativeness int    `json:"talkativeness"` // Talkativeness, on a scale of 1 to 5 (highest)
	Music         int   `json:"music"`         // Whether or not music should be played
	Temperature   int    `json:"temperature"`   // Temperature preference, in degrees Celsius
	Mask          bool   `json:"mask"`          // Whether or not a mask is required
	Food          bool   `json:"food"`          // Whether or not food is allowed
	Smoking       bool   `json:"smoking"`       // Whether or not smoking is allowed
	Gender        string `json:"gender"`        // Oneof: male, female, any
}
