package model

import (
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
)

var DB *gorm.DB

func ConnectDatabase() {
	database, err := gorm.Open("sqlite3", "gorm.db")
	if err != nil {
		panic("Failed to connect to database!")
	}

	database.AutoMigrate(
		&Employee{},
		&Location{},
		&Company{},
		// &Worklocation{},
		&Homelocation{},
		&Profile{},
		&Session{},
		&CarpoolGroup{},
		&Preferences{},
		&Report{},
	)
	DB = database
}

func ConnectDatabaseForTesting() {
	database, err := gorm.Open("sqlite3", ":memory:")
	if err != nil {
		panic("Failed to connect to database!")
	}
	database.AutoMigrate(
		&Employee{},
		&Location{},
		&Company{},
		&Session{},
	)

	DB = database
}
