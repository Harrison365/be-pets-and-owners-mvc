const { fetchOwnerById, fetchOwners } = require("./models.js");

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

module.exports = { getOwnersById, getOwners };
