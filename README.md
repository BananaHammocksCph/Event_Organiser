# Event_Organiser
Repository containing the source code and micro-services related to the Event Organiser App developed for SI class

### Prerequisites
### Running the application
### Architecture

![alt text](https://github.com/BananaHammocksCph/Event_Organiser/blob/master/img/Event_Organiser_Architecture.png "Architectural Overview of the Event_Organiser Application")

#### User-Event DB

Here we can see some of data structures involved with the User-Event Engine. 
This is the DB involved in the handling of users and events and is central to the application.

![alt text](https://github.com/BananaHammocksCph/Event_Organiser/blob/master/img/Engine_Class_Diagram.png "Class Diagram of User-Event DB")

#### User-IP DB

Here we can see some of the data structures within the User-IP DB. This is used by the IP_Validation_Service for making analysis.

![alt text](https://github.com/BananaHammocksCph/Event_Organiser/blob/master/img/User-IP-DB.png "Class Diagram of User-IP DB")

#### API