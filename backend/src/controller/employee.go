package controller

import (
	"fmt"
	"net/http"
	"github.com/gin-gonic/gin"
	"wepool.com/src/model"
)

type CreateEmployeeInput struct {
	WorkEmail string `json:"workEmail" binding:"required"`
	Password  string `json:"password" binding:"required"`
}

type ChangePasswordInput struct {
	WorkEmail   string `json:"workEmail" binding:"required"`
	OldPassword string `json:"oldPassword" binding:"required"`
	NewPassword string `json:"newPassword" binding:"required"`
}

type AuthenticationInput struct {
	SessionID int `json:"sessionID" binding:"required"`
}

type CarpoolGroupEmployees struct {
    WorkEmail string `json:"workEmail" binding:"required"`
}

type Preferences struct {
	Talkativeness int    `json:"talkativeness"` // Talkativeness, on a scale of 1 to 5 (highest)
	Music         int   `json:"music"`         // Whether or not music should be played
	Temperature   int    `json:"temperature"`   // Temperature preference, in degrees Celsius
	Mask          bool   `json:"mask"`          // Whether or not a mask is required
	Food          bool   `json:"food"`          // Whether or not food is allowed
	Smoking       bool   `json:"smoking"`       // Whether or not smoking is allowed
	Gender        string `json:"gender"`        // Oneof: male, female, any
}

type Homelocation struct {
	Address  string `json:"address"`
}

type Location struct {
	Address  string `json:"address"`
}

type Profile struct {
	FirstName  string `json:"firstName"`
	LastName  string `json:"lastName"`
}

type EmployeePreferences struct {
	WorkEmail string `json:"workEmail" binding:"required"`
	Preferences Preferences `json:"preferences" binding:"required"`
	Homelocation Homelocation `json:"homeLocation" binding:"required"`
	Location Location `json:"workLocation" binding:"required"`
	Profile Profile `json:"profile" binding:"required"`
}

type Report struct {
	PetitionerEmail      string         `json:"petitionerEmail"`
	OffenderEmail        string         `json:"offenderEmail"`
	IssueDescription     string     `json:"issueDescription"`
}

func GetEmployeeProfile(c *gin.Context) {
	var employee model.Employee
	var EmployeeInput CarpoolGroupEmployees

	if err := c.ShouldBindJSON(&EmployeeInput); err != nil {
		c.JSON(http.StatusBadRequest, err)
		return
	}	
	result:= model.DB.Preload("Profile").Where("work_email= ?", EmployeeInput.WorkEmail).First(&employee)	
	if result.Error != nil {	
		fmt.Println("Error", result.Error)
		c.JSON(http.StatusNotFound, result.Error)
		return
	}
	
	c.JSON(200, employee)
	return
}

func UpdateEmployeePreferences(c *gin.Context) {
	var employee model.Employee
	var EmployeePreferences EmployeePreferences

	if err := c.ShouldBindJSON(&EmployeePreferences); err != nil {
		c.JSON(http.StatusBadRequest, err)
		return
	}	

	if err := model.DB.Preload("Homelocation").Preload("Preferences").Preload("Profile").Preload("CarpoolGroup.Location").Where("work_email = ?", EmployeePreferences.WorkEmail).First(&employee).Error; err != nil {
	  c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
	  return
	}

	// TODO: Optimize by creating a DB session to do the transactions
	model.DB.Model(&employee.Homelocation).Updates(EmployeePreferences.Homelocation);
	model.DB.Model(&employee.Preferences).Updates(EmployeePreferences.Preferences);
	model.DB.Model(&employee.Profile).Updates(EmployeePreferences.Profile);
	model.DB.Model(&employee.CarpoolGroup.Location).Updates(EmployeePreferences.Location);

	c.JSON(200, &employee)
	return
}

func GetEmployeeCarpoolGroupInfo(c *gin.Context) {
	var employee model.Employee
	var EmployeeInput CarpoolGroupEmployees

	if err := c.ShouldBindJSON(&EmployeeInput); err != nil {
		c.JSON(http.StatusBadRequest, err)
		return
	}		
	result:= model.DB.Preload("CarpoolGroup").Preload("CarpoolGroup.Employees").Preload("CarpoolGroup.Location").Preload("CarpoolGroup.Employees.Homelocation").Preload("CarpoolGroup.Employees.Profile").Where("work_email= ?", EmployeeInput.WorkEmail).First(&employee)	
	if result.Error != nil {	
		fmt.Println("Error", result.Error)
		c.JSON(http.StatusNotFound, result.Error)
		return
	}
	
	c.JSON(200, employee)
	return
}

func CreateEmployeeReport(c *gin.Context) {
	var ReportInput Report
	var Employee model.Employee

	if err := c.ShouldBindJSON(&ReportInput); err != nil {
		c.JSON(http.StatusBadRequest, err)
		return
	}		
	result:= model.DB.Where("work_email= ?", ReportInput.PetitionerEmail).First(&Employee)	
	if result.Error != nil {	
		fmt.Println("Error", result.Error)
		c.JSON(http.StatusNotFound, result.Error)
		return
	}
	report := model.Report{
		PetitionerEmail:  ReportInput.PetitionerEmail,
		OffenderEmail:    ReportInput.OffenderEmail,
		IssueDescription: ReportInput.IssueDescription,
		EmployeeID:       Employee.ID,
	}
	model.DB.Create(&report);

	c.JSON(200, report)
	return
}

/*
GET /employee
Get the employee info associated with a session.
May return OK, BadRequest, Unauthorized, or NotFound.
*/
func ReadEmployee(c *gin.Context) {
	// Validate input
	var auth AuthenticationInput
	if err := c.ShouldBindJSON(&auth); err != nil {
		c.JSON(http.StatusBadRequest, err)
		return
	}
	var session model.Session
	result := model.DB.Find(&session, auth.SessionID)
	if result.Error != nil {
		c.JSON(http.StatusUnauthorized, result.Error)
		return
	}
	var employee model.Employee
	result = model.DB.Find(&employee, session.EmployeeID)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, result.Error)
		return
	}
	c.JSON(http.StatusOK, employee)
}

/*
POST /employee
Create a new employee.
May return OK, BadRequest
*/
func UserSignup(c *gin.Context) {
	// Validate input
	var input CreateEmployeeInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, err)
		return
	}

	// Create employee
	// TODO: Hash the password
	employee := model.Employee{WorkEmail: input.WorkEmail, Password: input.Password}
	model.DB.Create(&employee)

	c.JSON(201, employee)
}

/*
POST /login
Given an employee and a password, attempt to create a new session and provide
a session key for authentication.
May return OK, BadRequest, Unauthorized
*/
func Login(c *gin.Context) {
	var input CreateEmployeeInput
	err := c.ShouldBindJSON(&input)
	if err != nil {
		c.JSON(http.StatusBadRequest, err)
		return
	}
	// Username or password is incorrect.
	var employee model.Employee
	result := model.DB.Where("work_email = ?", input.WorkEmail).First(&employee)
	if result.RecordNotFound() {
		c.JSON(http.StatusUnauthorized, "")
		return
	} else if employee.Password != input.Password {
		c.JSON(http.StatusUnauthorized, "")
		return
	} else {
		var session model.Session
		model.DB.Where("employee_id = ?", employee.ID).FirstOrCreate(&session)
		c.JSON(http.StatusOK, session.ID)
	}
}

/*
POST /logout
Given a session id, attempt to logout that session.
Deletes session from database if it exists, then returns an http status.
May return OK, BadRequest
*/
func Logout(c *gin.Context) {
	var auth AuthenticationInput
	err := c.ShouldBindJSON(&auth)
	if err != nil {
		c.JSON(http.StatusBadRequest, err)
		return
	}
	var session model.Session
	result := model.DB.First(&session, auth.SessionID)
	if result.Error == nil {
		model.DB.Delete(&session)
	}
	c.JSON(http.StatusOK, "")
}

func UserLogin(c *gin.Context) {
	var employee model.Employee
	var input CreateEmployeeInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := model.DB.Where("work_email = ? AND password = ?", input.WorkEmail, input.Password).First(&employee).Error; err != nil {
		c.JSON(401, gin.H{"error": "Invalid email or password"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": employee})
}
