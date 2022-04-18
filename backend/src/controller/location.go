package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"wepool.com/src/model"
)

/*
Given a location object, add it to the database.
May return OK, Bad Request.
*/
func CreateLocation(c *gin.Context) {
	// Validate input
	var location model.Location
	if err := c.ShouldBindJSON(&location); err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	// Create location
	model.DB.Create(&location)

	c.JSON(http.StatusOK, location)
}
