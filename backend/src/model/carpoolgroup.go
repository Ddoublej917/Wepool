package model

// Changed to ID from gorm.model in order to use custom type for createdAt
type CarpoolGroup struct {
	ID        uint `json:"id" gorm:"primary_key"`
	CreatedAt int64 `json:"createdAt" gorm:"autoCreateTime:milli"`	
	Employees     []Employee `json:"employees"`
	CompanyID     uint       `json:"companyID"`
	Company       Company    `json:"company"`
	LocationID uint `json:"locationID"`	
	Location    Location   `json:"location"`
	PreferencesID uint       `json:"preferencesID"`	
	CarCapacity  uint8 `json:"carCapacity"`		
}