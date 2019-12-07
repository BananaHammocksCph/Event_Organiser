const express = require("express");
const router = express.Router(); // eslint-disable-line new-cap

let db = require("../db");
const Event = db.Mongoose.model("event", db.EventSchema, "event");

router.get("/", function(req, res) {
  let status = 200;

  Event.find({}, function(err, users) {
    if (err) {
      res.send(err);
    }
    res.json({
      status: status,
      data: users
    });
  });
});

router.post("/", function(req, res) {
   let event = new Event();
   event.Description = req.body.Description;
   event.Type = req.body.Type;
   event.Catering = req.body.Catering;
   event.Catering_Desc = req.body.Catering_Desc;
   event.Date = req.body.Date;
   event.Location = req.body.Location;

   let status = 200;
    event.save(function(err) {
    if(err) {
        status = 400;
      }
    });
    res.json({
          status: status,
        });
});

router.get("/:id", function(req, res) {
  Event.findById(req.params.ID, function (err, event) {
    let status = 200;
        if (err)
            res.send(err);
        res.json({
            status: status,
            data: event
        });
    });
});

router.put("/:id", function(req, res) {
    let status = 200;

     let event = new Event();
     event.ID = req.body.ID
     event.Description = req.body.Description;
     event.Type = req.body.Type;
     event.Catering = req.body.Catering;
     event.Catering_Desc = req.body.Catering_Desc;
     event.Date = req.body.Date;
     event.Location = req.body.Location;

});

router.delete("/:id", function(req, res) {
  let status = 200;
  Event.remove(
    {
      _id: req.params.ID
    },
    function(err, user) {
      if (err) {
        status = 400;
      }
      res.json({
        status: status
      });
    }
  );
});

module.exports = router;