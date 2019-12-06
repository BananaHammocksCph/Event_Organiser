# Event_Organiser
Repository containing the source code and micro-services related to the Event Organiser App developed for SI class

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
