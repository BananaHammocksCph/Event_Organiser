const express = require("express");
const router = express.Router(); // eslint-disable-line new-cap
const EventHelper = require('../helpers/EventHelper');
const amqp = require('amqp');
const async = require('async');
const UserHelper = require('../helpers/UserHelper');

var connection = amqp.createConnection({
	host : 'rabbitmq'
});

let db = require("../db");
const Event = db.Mongoose.model("event", db.EventSchema, "event");
const User = db.Mongoose.model("user", db.UserSchema, "user");
const Rating = db.Mongoose.model("rating", db.RatingSchema, "rating");

router.get("/:id/ratings", function(req, res, next) {
	Event.findById(req.params.id)
    .populate('rating')
    .exec(function(err, event) {
      if (err) throw err;
      return res.json({
        status: 200,
        data: event.Ratings
      });
    });
    });

router.post("/:id/ratings", async function(req, res, next) {

let lat = req.body.lat;
let lon = req.body.lon
let ip = req.body.ip;

let user = {id: 1};

try {
let UserDTO = UserHelper.userConnectionDTO(user, lat, lon, ip); 
let promise = await UserHelper.requestVPN(UserDTO);
console.log(promise);
if (!promise.data.valid){
 return res.json({
		status: 400,
		data: promise.data
	});
}

}catch (error) {
	console.log(error);
	console.log("CAUGHT AN ERROR");
return res.json({
      status: 400
    });
}



let rate = new Rating();
rate.Score = req.body.Score;
	Event.findById(req.params.id, function (err, event) {
	event.Ratings.push(rate);
	event.save(function(err) {
   if (err) return res.json({
   status: 400,
 });
 return res.json({
    status: 200,
  });
	});

	})
});

router.get("/:eventId/ratings/:id", function(req, res, next) {
  Event.findById(req.params.eventId, function (err, event) {
		if (err) {
			return res.json({
				status: 400
			})
		}
		return res.json({
			status: 200,
			data: event.Ratings.id(req.params.id)
		})
	})
});

router.put("/:eventId/ratings/:id", function(req, res, next) {
  let initRate = new Rating();
  initRate.Score = req.body.Score;
  
  Event.findById(req.params.eventId)
  .then((event) => {
    const rate = event.Ratings.id(req.params.id);
    rate.set(initRate); 
    return event.save(); // saves document with subdocuments and triggers validation
  })
  .then((event) => {
    res.send({ 
      status: 200,
      data: event 
    });
  })
  .catch(e =>  res.send({ 
    status: 400
  }));
});

router.delete("/:eventId/ratings/:id", function(req, res, next) {
	Event.findById(req.params.eventId, function (err, event) {
		event.Ratings.id(req.params.id).remove();
		event.save(function(err) {
    if (err) return res.json({
    status: 400,
  });
 return res.json({
    status: 200,
  });
	});

	})
  
});


router.get("/", function(req, res, next) {
  let status = 200;

  Event.find({}, function(err, users) {
    if (err) {
      return res.send(err);
    }
    return res.json({
      status: status,
      data: users
    });
  });
});

router.get("/:id", function (req, res, next) {
  Event.findById(req.params.id, function (err, event) {
    let status = 200;
    if (err)
      return res.send(err);
    res.json({
      status: status,
      data: event
    });
  });
});

router.post("/", function(req, res, next) {
  let event = new Event();
  event.Description = req.body.Description;
  event.Name = req.body.Name;
  event.Type = req.body.Type;
  event.Email = req.body.email;
  event.Catering = req.body.Catering;
  event.Catering_Desc = req.body.Catering_Desc;
  event.Date = Date.parse(req.body.Date);
  event.Location = req.body.Location;
	event.Ratings = [];
	
  if (req.body.Ratings) {
  let parsedRatings = req.body.Ratings.reduce((total, inc) => {
		let rate = new Rating();
		rate.Score = inc.Score;
    return total.concat(rate);
  }, [])
  	event.Ratings = parsedRatings;
}

// Calls automated processes related to received Event object
  if (event.Catering) {
    connection.publish("mail_queue", EventHelper.EventEmailDTO(event), {
      contentType: "application/json",
      contentEncoding: "utf-8"
    });
  }

  let status = 200;
  event.save(function(err) {
    if (err) {
     return res.json({ status: 500, error: err });
    }
      return res.json({
        status: status
      });
  });

});

router.put("/:id", function(req, res, next) {
  let status = 200;

  let event = new Event();
  event.Description = req.body.Description;
  event.Name = req.body.Name;
  event.Type = req.body.Type;
  event.Catering = req.body.Catering;
  event.Catering_Desc = req.body.Catering_Desc;
  event.Date = Date.parse(req.body.Date);
  event.Location = req.body.Location;

  Event.findByIdAndUpdate(
    req.params.id,
    event,
    { new: true },
    (err, retEvent) => {
      if (err) return res.status(500).send(err);
      return res.json({
        data: retEvent,
        status: status
      });
    });
});

router.delete("/:id", function(req, res, next) {
  let status = 200;
  Event.remove(
    {
      _id: req.params.id
    },
    function(err, user) {
      if (err) {
       return res.send(err);
      }
      return res.json({
        status: status
      });
    }
  );
});

// @RETURNS all users associated with an event
router.get("/:id/users", function (req, res, next) {
  let status = 200;
  Event.findById(req.params.id, function (err, event) {
    if (err)
      return res.send(err);
    res.json({
      status: status,
      data: event.Users
    });
  });
});

// Gets a specific user object from within event.Users
router.get("/:id/users/:user_id", function (req, res, next) {
  let status = 200;
  Event.find({ _id: req.params.id, 'users._id': req.params.user_id }, function (err, user) {
    if (err)
      return res.send(err);
    res.json({
      status: status,
      data: user
    });
  });
});

// Adds a user to an event
router.post("/:id/users/", function (req, res, next) {
  let status = 200;
  Event.findOne({ _id: req.params.id }).catch(function (err) {
    return res.send(err);
}).then(function ( event) {
  User.findById(req.body.Id).catch(function (err) {
    return res.send(err)}).then(function (user) {
    event.Users.push(user);
    event.save();
      res.json({
        status: status,
        data: event.Users
      });
  });
});
});

// Adds a user to an event
router.delete("/:id/users/:user_id", function (req, res, next) {
  let status = 200;
  Event.findOne({ _id: req.params.id }).catch(function (err) {
    return res.send(err);
  }).then(function (event) {
    event.Users.pull(req.params.user_id);
      event.save();
      res.json({
        status: status,
        data: event.Users
      });
    });
  });



module.exports = router;