package model

// Changed to ID from gorm.model in order to use custom type for createdAt
type CarpoolGroup struct {
	ID        uint `json:"id" gorm:"primary_key"`
	Created int64 `gorm:"autoCreateTime:milli"`	
	Employees     []Employee `json:"employees"`
	CompanyID     uint       `json:"companyID"`
	Company       Company    `json:"company"`
	LocationID uint `json:"locationID"`	
	Location    Location   `json:"location"`
	Preferences Preferences `json:"preferences,omitempty"`
	PreferencesID uint       `json:"preferencesID"`	
	CarCapacity  uint8 `json:"carCapacity"`		
}