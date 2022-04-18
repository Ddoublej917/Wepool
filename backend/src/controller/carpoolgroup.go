package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"wepool.com/src/model"
)

type GetCarpoolGroupsByCompanyNameInput struct {
	Name string `json:"name" binding:"required"`
}

type AddUserToCarpoolGroupInput struct {
	WorkEmail      string `json:"workEmail" binding:"required"`
	CarpoolGroupID uint   `json:"carpoolGroupID" binding:"required"`
}

/*
GET /GetCarpoolGroupsByCompanyName
Given a company name, return the list of CarpoolGroups
associated with it.
May return OK, NotFound, BadRequest
*/
func GetCarpoolGroupsByCompanyName(c *gin.Context) {
	var input GetCarpoolGroupsByCompanyNameInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, err)
		return
	}

	var company model.Company
	result := model.DB.Preload("CarpoolGroups").Where("name = ?", input.Name).First(&company)
	if result.RecordNotFound() {
		c.JSON(http.StatusNotFound, "")
		return
	}
	c.JSON(http.StatusOK, company.CarpoolGroups)
}

/*
POST /AddEmployeeToCarpoolGroup
Given an employee workEmail and a carpoolGroupID,
try adding the related employee to the carpoolGroup.
May return OK, NotFound, BadRequest
*/
func AddEmployeeToCarpoolGroup(c *gin.Context) {
	var input AddUserToCarpoolGroupInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, err)
		return
	}
	var employee model.Employee
	result := model.DB.Where("work_email = ?", input.WorkEmail).First(&employee)
	if result.RecordNotFound() {
		c.JSON(http.StatusNotFound, "")
		return
	}
	var carpoolGroup model.CarpoolGroup
	result = model.DB.Where("id = ?", input.WorkEmail).First(&carpoolGroup)
	if result.RecordNotFound() {
		c.JSON(http.StatusNotFound, "")
		return
	}
	carpoolGroup.Employees = append(carpoolGroup.Employees, employee)
	model.DB.Save(&carpoolGroup)
	c.JSON(http.StatusOK, "")
}
