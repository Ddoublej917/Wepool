package main

import (
	"log"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"wepool.com/src/controller"
	"wepool.com/src/model"
)

func main() {
	router := gin.Default()
	router.Use(cors.Default())

	log.Println("******Listening for requests at http://localhost:8000/******")
	model.ConnectDatabase()
	log.Println("******Connected to DB!******")
	router.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"data": "Welcome to WePool!"})
	})
	// router.GET("/employee", controller.FindEmployeesInCompany)
	router.POST("/signup", controller.UserSignup)
	router.POST("/login", controller.UserLogin)
	router.POST("/login-session", controller.Login)
	router.POST("/logout", controller.Logout)
	router.POST("/add-employee-to-carpool-group", controller.AddEmployeeToCarpoolGroup)
	router.POST("/get-carpool-groups-by-company-name", controller.GetCarpoolGroupsByCompanyName)
	router.POST("/employee/carpool-group", controller.GetEmployeeCarpoolGroupInfo)
	router.POST("/employee/profile", controller.GetEmployeeProfile)
	router.PUT("/employee/preferences", controller.UpdateEmployeePreferences)
	router.POST("/employee/report", controller.CreateEmployeeReport)
	router.POST("/company/report", controller.GetCompanyReports)

	err := router.Run(":8000")
	if err != nil {
		panic(err)
	}
}
