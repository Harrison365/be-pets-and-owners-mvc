const fs = require("fs/promises");

const fetchOwnerById = (idNumber) => {
  return fs
    .readFile(`./data/owners/o${idNumber}.json`, "utf8")
    .then((ownerInfo) => {
      return JSON.parse(ownerInfo);
    });
};

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

module.exports = { fetchOwnerById, fetchOwners };
