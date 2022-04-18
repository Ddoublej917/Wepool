package controller

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"wepool.com/src/model"
)

type CreateCompanyInput struct {
	Name   string `json:"name"`
	Domain string `json:"domain"`
}


type CompanyInput struct {
	ID uint `json:"companyID" binding:"required"`
}

/*
Given a name and a domain, create a company.
May return OK, Bad Request.
*/
func CreateCompany(c *gin.Context) {
	// Validate input
	var input CreateCompanyInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	// Create location
	company := model.Company{Name: input.Name, Domain: input.Domain}
	model.DB.Create(&company)

	c.JSON(http.StatusOK, company)
}

func GetCompanyReports(c *gin.Context) {
	var company model.Company
	var CompanyInput CompanyInput

	if err := c.ShouldBindJSON(&CompanyInput); err != nil {
		c.JSON(http.StatusBadRequest, err)
		return
	}		
	result:= model.DB.Preload("Reports").Where("id= ?", CompanyInput.ID).First(&company)	
	if result.Error != nil {	
		fmt.Println("Error", result.Error)
		c.JSON(http.StatusNotFound, result.Error)
		return
	}
	
	c.JSON(200, company.Reports);
	return
}