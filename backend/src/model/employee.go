package model

type Employee struct {
	ID        uint `json:"id" gorm:"primary_key"`
	WorkEmail string `json:"workEmail"`
	Password  string `json:"password"`
}

