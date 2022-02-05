package main

import (
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
	"wepool.com/src/controller"
	"wepool.com/src/model"
)

func main() {
	router := gin.Default()
	log.Println("******Listening for requests at http://localhost:8000/******")
	model.ConnectDatabase()
	log.Println("******Connected to DB!******")
	router.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"data": "Welcome to WePool!"})
	})
	// router.GET("/employee", controller.FindEmployeesInCompany)
	router.POST("/employee", controller.CreateEmployee)

	err := router.Run(":8000")
	if err != nil {
		panic(err)
	}
}
