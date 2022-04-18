# model
--
    import "."


## Usage

```go
var DB *gorm.DB
```

#### func  ConnectDatabase

```go
func ConnectDatabase()
```

#### func  ConnectDatabaseForTesting

```go
func ConnectDatabaseForTesting()
```

#### type CarpoolGroup

```go
type CarpoolGroup struct {
	gorm.Model
	Employees     []Employee `json:"employees"`
	CompanyID     uint       `json:"companyID"`
	Company       Company    `json:"company"`
	LocationID    Location   `json:"locationID"`
	PreferencesID uint       `json:"preferencesID"`
}
```


#### type Company

```go
type Company struct {
	gorm.Model
	Name          string         `json:"name"`
	Domain        string         `json:"domain"`
	Locations     []Location     `json:"locations"`
	CarpoolGroups []CarpoolGroup `json:"carpoolGroups"`
}
```


#### type Employee

```go
type Employee struct {
	gorm.Model
	WorkEmail     string `json:"workEmail" gorm:"unique_index"`
	Password      string `json:"password"`
	PreferencesID uint   `json:"preferencesID"`
}
```


#### type Location

```go
type Location struct {
	PlusCode string `json:"plusCode" gorm:"primary_key"`
	Address  string `json:"address"`
	Title    string `json:"title"`
}
```


#### type Preferences

```go
type Preferences struct {
	gorm.Model
	Talkativeness int    `json:"talkativeness"` // Talkativeness, on a scale of 1 to 5 (highest)
	Music         bool   `json:"music"`         // Whether or not music should be played
	Temperature   int    `json:"temperature"`   // Temperature preference, in degrees Celsius
	Mask          bool   `json:"mask"`          // Whether or not a mask is required
	Food          bool   `json:"food"`          // Whether or not food is allowed
	Smoking       bool   `json:"smoking"`       // Whether or not smoking is allowed
	Gender        string `json:"gender"`        // Oneof: male, female, any
}
```


#### type Session

```go
type Session struct {
	gorm.Model
	EmployeeID int
	Employee   Employee
}
```

A representation of an active connection. A logged in user creates a session
token that they can use as an authentication token. A session belongs to a user
account and can perform actions on their behalf.
