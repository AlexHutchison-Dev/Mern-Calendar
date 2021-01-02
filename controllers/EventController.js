//TODO I think this can be removed

const UserEventController = require("../controllers/UserEventController");

module.exports = {
  query: (req, res) => {
    console.log("Event query recieved");

    User.authenticate("local")(req, res, () => {
      UserEventController.find(req.body.id, (docs) => {
        console.log(`recieved docs: ${docs}`);
        res.json({ success: true, events: docs[0].events });
      });
    });
  },
};
