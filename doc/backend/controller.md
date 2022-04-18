# controller
--
    import "."


## Usage

#### func  AddEmployeeToCarpoolGroup

```go
func AddEmployeeToCarpoolGroup(c *gin.Context)
```
POST /AddEmployeeToCarpoolGroup Given an employee workEmail and a
carpoolGroupID, try adding the related employee to the carpoolGroup. May return
OK, NotFound, BadRequest

#### func  CreateCompany

```go
func CreateCompany(c *gin.Context)
```

#### func  CreateLocation

```go
func CreateLocation(c *gin.Context)
```

#### func  GetCarpoolGroupsByCompanyName

```go
func GetCarpoolGroupsByCompanyName(c *gin.Context)
```
GET /GetCarpoolGroupsByCompanyName Given a company name, return the list of
CarpoolGroups associated with it. May return OK, NotFound, BadRequest

#### func  Login

```go
func Login(c *gin.Context)
```
POST /login Given an employee and a password, attempt to create a new session
and provide a session key for authentication. May return OK, BadRequest,
Unauthorized

#### func  Logout

```go
func Logout(c *gin.Context)
```
POST /logout Given a session id, attempt to logout that session. Deletes session
from database if it exists, then returns an http status. May return OK,
BadRequest

#### func  ReadEmployee

```go
func ReadEmployee(c *gin.Context)
```
GET /employee Get the employee info associated with a session. May return OK,
BadRequest, Unauthorized, or NotFound.

#### func  UserLogin

```go
func UserLogin(c *gin.Context)
```

#### func  UserSignup

```go
func UserSignup(c *gin.Context)
```
POST /employee Create a new employee. May return OK, BadRequest

#### type AddUserToCarpoolGroupInput

```go
type AddUserToCarpoolGroupInput struct {
	WorkEmail      string `json:"workEmail" binding:"required"`
	CarpoolGroupID uint   `json:"carpoolGroupID" binding:"required"`
}
```


#### type AuthenticationInput

```go
type AuthenticationInput struct {
	SessionID int `json:"sessionID" binding:"required"`
}
```


#### type ChangePasswordInput

```go
type ChangePasswordInput struct {
	WorkEmail   string `json:"workEmail" binding:"required"`
	OldPassword string `json:"oldPassword" binding:"required"`
	NewPassword string `json:"newPassword" binding:"required"`
}
```


#### type CreateCompanyInput

```go
type CreateCompanyInput struct {
	Name   string `json:"name"`
	Domain string `json:"domain"`
}
```


#### type CreateEmployeeInput

```go
type CreateEmployeeInput struct {
	WorkEmail string `json:"workEmail" binding:"required"`
	Password  string `json:"password" binding:"required"`
}
```


#### type GetCarpoolGroupsByCompanyNameInput

```go
type GetCarpoolGroupsByCompanyNameInput struct {
	Name string `json:"name" binding:"required"`
}
```
