//todo: set up tests
package main

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

type company struct {
	ID		string `json:"id"`
	Name 		string `json:"name"`
	Domain 		string `json:"domain"`
}

type location struct {
	Address		string `json:"address"`
	PlusCode	string `json:"plusCode"`
}

type workLocation struct {
	CompanyID	string `json:"companyID"`
	PlusCode	string `json:"plusCode"`
}

func main() {
	// Set up API endpoints
	router := gin.Default()

	// todo: set up logging

	// Operations on individual companies.
	router.PUT("/c/:id/put", putCompanyByID)
	router.DELETE("/c/:id/delete", deleteCompanyByID)
	router.GET("/c/:id", getCompanyByID)

	// Operations on work locations associated with a company.
	router.PUT("/c/:id/locations/put", putLocationsByCompanyID)
	router.PUT("/c/:id/locations/delete",deleteLocationsByCompanyID)
	router.GET("/c/:id/locations", getLocationsByCompanyID)

	// Start API endpoints.
	router.Run()

}

//todo: replace this with a database backing store.
var companies = map[string]*company {
	"ufl": {ID:"ufl", Name: "University of Florida",  Domain: "ufl.edu"},
}

var locations = map[string]*location {
	"JMW2+JR": {Address: "Reitz Student Union, Gainesville, FL 32603", PlusCode: "JMW2+JR"},
}

var workLocations = map[string][]*workLocation {
	"ufl": {{CompanyID: "ufl", PlusCode: "JMW2+JR"}},
}

func getCompanyByID(c *gin.Context) {
	if companies[c.Param("id")] != nil {
		c.IndentedJSON(http.StatusOK, *companies[c.Param("id")])
	} else {
		c.String(http.StatusNotFound, "company with id "+c.Param("id")+" not found")
	}
}

func putCompanyByID(c *gin.Context) {
	var newCompany company
	if err := c.BindJSON(&newCompany); err != nil {
		return
	}

	companies[newCompany.ID] = &newCompany
}

func deleteCompanyByID(c *gin.Context) {
	companies[c.Param("id")] = nil
}

func getLocationsByCompanyID(c *gin.Context) {
	ret := make ([]location, 5)
	for i := range workLocations[c.Param("id")] {
		plusCode := workLocations[c.Param("id")][i].PlusCode
		ret = append(ret, *locations[plusCode])
	}
	c.IndentedJSON(http.StatusOK, ret)
}

func putLocationsByCompanyID(c *gin.Context) {
	var newLocations []location
	if err := c.BindJSON(&newLocations); err != nil {
		c.String(http.StatusBadRequest, "invalid location list")
		return
	}

	workLocations[c.Param("id")] = make ([]*workLocation, len(newLocations))

	for i := range newLocations {
		var newWorkLocation *workLocation
		newWorkLocation.CompanyID = c.Param("id")
		newWorkLocation.PlusCode = newLocations[i].PlusCode
		locations[newLocations[i].PlusCode] = &newLocations[i]
		workLocations[c.Param("id")] = append(workLocations[c.Param("id")], newWorkLocation)
	}
}

func deleteLocationsByCompanyID(c *gin.Context) {
	workLocations[c.Param("id")] = nil
}