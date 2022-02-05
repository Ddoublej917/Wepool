package controller

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"wepool.com/src/model"
)

type CreateEmployeeInput struct {
	WorkEmail  string `json:"workEmail" binding:"required"`
	Password string `json:"password" binding:"required"`
}

// GET /employee
// Get all employees in a company
// func FindEmployeesInCompany(c *gin.Context) {
// 	var employees []model.Employee
// 	model.DB.Find(&employees)

// 	c.JSON(http.StatusOK, gin.H{"data": employees})
// }

// POST /employee
// Create a new employee
func CreateEmployee(c *gin.Context) {
	// Validate input
	var input CreateEmployeeInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	
	// Create employee
	// TODO: Hash the password
	employee := model.Employee{WorkEmail: input.WorkEmail, Password: input.Password}
	model.DB.Create(&employee)
	
	c.JSON(http.StatusOK, gin.H{"data": employee})
}
