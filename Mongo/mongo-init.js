// db.auth('admin-user', 'admin-password')

db = db.getSiblingDB('event-organizer')

db.myCollection.insertOne( { user: {
    Name: "test-user",
    Email: "test@test.com",
    Password: "test"
} } );