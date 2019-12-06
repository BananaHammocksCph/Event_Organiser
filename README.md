# Event_Organiser
Repository containing the source code and micro-services related to the Event Organiser App developed for SI class

### Table of contents
1. [Prerequisites](#Prerequisites)
2. [Running Application](#Running the application)
3. [Architecture](#Architecture / Design)
4. [API](#API)
5. [Message Queue](#Message Queue)

### Prerequisites
### Running the application
### Architecture / Design

![alt text](https://github.com/BananaHammocksCph/Event_Organiser/blob/master/img/Event_Organiser_Architecture.png "Architectural Overview of the Event_Organiser Application")

#### User-Event DB

Here we can see some of data structures involved with the User-Event Engine. 
This is the DB involved in the handling of users and events and is central to the application.

![alt text](https://github.com/BananaHammocksCph/Event_Organiser/blob/master/img/Engine_Class_Diagram.png "Class Diagram of User-Event DB")


#### User-IP DB

Here we can see some of the data structures within the User-IP DB. This is used by the IP_Validation_Service for making analysis.

![alt text](https://github.com/BananaHammocksCph/Event_Organiser/blob/master/img/User-IP-DB.png "Class Diagram of User-IP DB")

#### [Ratings Client](./Rating_Cl/)

A mobile app written in Unity. This is where users rate an event they have attended from 1-5. The IP address is also recorded here as well along with the users coordinates, these are passed through the VPN Validator Service to make a subliminary check that users aren't spoofing their location. 

#### [Web App](./Event_Cl/)

A web application where users can create and make specifications to their event. 

#### [REST Server](./Event_Engine/)

REST Server for handling events and calling micro services

#### [VPN Validator Service](./VPN_Validator_Service/)

Maintains a mongo document which is used to analyse the legitimacy of the clients making calls to the server. Takes the coordinates and ip address from the client and makes use of the IP-GEODATA Webservice to get the geodata from the IP Address, it then compares to the users coordinates to ensure a small measure of legitimacy. 

#### IP-GEODATA WEBSERVICE

A remotely maintained [web-service](https://rapidapi.com/geoplugin/api/ip-geolocation1) used by the VPN Validator Service to obtain the geolocation of a specified IP Address. 

#### [Analysis / Prediction Service](./Event_Analyser_Service/)

A micro-service which takes the event, user and rating data in a CSV document and makes analysis / predictions based on the data. 

#### [Data Processor Service](./Data_Processor_Service/)

A micro-service used to convert database data into a csv which can subsequently be analysed by the Event Analyser Service.

#### [Email / Order Service](./OrderMail_Service/)

An email and ordering micro-service used to send orders or emails to those required. This micro-service gets its information from a messaging queue system and only operates during work-hours. 

### API

##### User 

| Parameter                    | Description                       |
|:----------------------------|:----------------------------------|
| `/users`      | Returns a list of users`|
| `/users/{id}`| Returns a user associated with the specified id` |

##### Event 

| Parameter                    | Description                       |
|:----------------------------|:----------------------------------|
| `/events`      | Returns a list of events`|
| `/events/{id}`| Returns an event associated with the specified id` |

##### Rating 

| Parameter                    | Description                       |
|:----------------------------|:----------------------------------|
| `/events/{event_id}/ratings`      | Returns a list of users`|
| `/events/{event_id}/ratings/{id}`| Returns a rating associated with the specified event and id` |


#### Status Codes

| Status Code | Description |
| :--- | :--- |
| 200 | `OK` |
| 201 | `CREATED` |
| 400 | `BAD REQUEST` |
| 404 | `NOT FOUND` |
| 500 | `INTERNAL SERVER ERROR` |

#### Message Queue

We will be using a messaging queue to communicate with our microservice, which handles the applications orders and emailing. This is because our mails are only be running and handled during business-hours in consideration of the recipients.

| Queue | Description |
| :--- | :--- |
| `order_queue` | `This is the queue for handling orders, they are high priority` |
| `mail_queue` | `This is the queue for handling mails, they are for the most part not as high priority as orders` |
