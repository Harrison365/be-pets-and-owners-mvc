const fs = require("fs/promises");

//TASK 1
const fetchOwnerById = (idNumber) => {
  return fs
    .readFile(`./data/owners/o${idNumber}.json`, "utf8")
    .then((ownerInfo) => {
      return JSON.parse(ownerInfo);
    });
};

//TASK 2
const fetchOwners = () => {
  return fs
    .readdir("./data/owners", "utf8")
    .then((owners) => {
      const promiseArr = owners.map((ownerFile) => {
        return fs.readFile(`./data/owners/${ownerFile}`, "utf8");
      });
      return Promise.all(promiseArr);
    })
    .then((ownerInfoArr) => {
      return ownerInfoArr.map((ownerString) => {
        return JSON.parse(ownerString);
      });
    });
};

//TASK 2 Second Solution
const fetchOwners2 = () => {
  return fs
    .readdir("./data/owners", "utf8")
    .then((owners) => {
      let arr = [];
      owners.forEach((ownerFile) => {
        arr.push(fs.readFile(`./data/owners/${ownerFile}`, "utf8"));
      });
      return Promise.all(arr);
    })
    .then((arr) => {
      return arr.map((string) => {
        return JSON.parse(string);
      });
    });
};

//TASK 3
fetchPetsOfOwner = (id) => {
  return fs
    .readdir("./data/pets", "utf8")
    .then((pets) => {
      const promiseArr = pets.map((petsFile) => {
        return fs.readFile(`./data/pets/${petsFile}`, "utf8");
      });
      return Promise.all(promiseArr);
    })
    .then((petsInfoArr) => {
      return petsInfoArr
        .map((pet) => {
          return JSON.parse(pet);
        })
        .filter((petJS) => {
          return petJS.owner === `o${id}`;
        });
    });
};

//TASK 4

//TASK 5

//TASK 6

//TASK 6 Second Solution

//TASK 7

module.exports = {
  fetchOwnerById,
  fetchOwners,
  fetchOwners2,
  fetchPetsOfOwner,
};
