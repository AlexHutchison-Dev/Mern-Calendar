const UserEvent = require("../models/UserEventModel");
const User = require("../models/UserModel");
const Event = require("../models/EventModel");

module.exports = {
  create: (userId) => {
    console.log("creating new userevent document");
    const newUserEvent = new UserEvent({
      user: userId,
      events: [],
    });

    newUserEvent.save();
  },

  query: (req, res) => {
    console.log("Event query recieved");

    User.authenticate("local")(req, res, () => {
      find(req.body.id, (docs) => {
        // console.log(`recieved docs: ${docs}`);
        const events = docs[0].events;
        res.json({ success: true, events: events });
      });
    });
  },

  //
  addevent: (req, res) => {
    User.authenticate("local")(req, res, () => {
      find(req.body.user, (docs) => {
        console.log(req.body);
        const { date, month, year, title, notes } = req.body;
        const newEvent = new Event({
          day: date,
          month,
          year,
          title,
          notes,
        });

        console.log(newEvent);

        const userEvent = docs[0];

        console.log(`add event docs[0] :  ${docs[0]}`);
        if (userEvent.events) {
          userEvent.events.push(newEvent);
        } else {
          console.log("adding events");
          userEvent.events = [newEvent];
        }

        userEvent.save();

        res.json({ success: true, events: userEvent.events });
      });
    });
  },

  deleteevent: (req, res) => {
    console.log(`delete called for ${JSON.stringify(req.body)}`);

    User.authenticate("local")(req, res, async () => {
      find(req.body.user, (docs) => {
        var userEvent = docs[0];
        console.log(userEvent)
        userEvent.events.pull({ _id: req.body.eventId });

        
          userEvent.save(() => {
            find(req.body.user, (docs) => {
              
              console.log(`delete events docs[0] :  ${docs[0]}`);
              res.json({
                success: true,
                events: docs[0].events,
              });
            });
          });
          
            

            
          });
        
        
      
    });
  },
};

const find = (id, callback) => {
  console.log("find");
  UserEvent.find({ user: id })
    .exec()
    .then((docs) => {
      callback(docs);
    })
    .catch((err) => {
      console.log(`UserEvent find error: ${err} for id ${id}`);
    });
};
