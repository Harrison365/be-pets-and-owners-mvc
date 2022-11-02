const { fetchOwnerById, fetchOwners, fetchOwners2 } = require("./models.js");

const getOwnersById = (req, res) => {
  const { id } = req.params;
  fetchOwnerById(id)
    .then((parsedOwnerInfo) => {
      res.send(parsedOwnerInfo);
    })
    .catch((err) => {
      console.log(err);
    });
};

const getOwners = (req, res) => {
  fetchOwners()
    .then((ownerArrJS) => {
      res.send(ownerArrJS);
    })
    .catch((err) => {
      console.log(err);
    });
};

const getOwners2 = (req, res) => {
  fetchOwners2()
    .then((ownersJS) => {
      res.send(ownersJS);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { getOwnersById, getOwners, getOwners2 };
