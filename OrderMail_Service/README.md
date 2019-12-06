# Event_Organiser

## OrderMail_Service
Repository containing the source code for the OrderMail_Service.

This micro-service handles orders and mails for the main application. It does this by retrieving them from a messaging queue. This microservice only runs during the day hours so as not to be too intrusive for any receiving client.   