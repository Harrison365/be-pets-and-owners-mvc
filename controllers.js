const {
  fetchOwnerById,
  fetchOwners,
  fetchOwners2,
  fetchPetsOfOwner,
} = require("./models.js");

// TASK 1
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

//TASK 2
const getOwners = (req, res) => {
  fetchOwners()
    .then((ownerArrJS) => {
      res.send(ownerArrJS);
    })
    .catch((err) => {
      console.log(err);
    });
};

//TASK 2 Second Solution
const getOwners2 = (req, res) => {
  fetchOwners2()
    .then((ownersJS) => {
      res.send(ownersJS);
    })
    .catch((err) => {
      console.log(err);
    });
};

//TASK 3
const getPetsOfOwner = (req, res) => {
  const { id } = req.params;
  fetchPetsOfOwner(id)
    .then((petsOfOwnerJS) => {
      res.send(petsOfOwnerJS);
    })
    .catch((err) => {
      console.log(err);
    });
};

//TASK 4

//TASK 5

//TASK 6

//TASK 6 Second Solution

//TASK 7

module.exports = { getOwnersById, getOwners, getOwners2, getPetsOfOwner };
