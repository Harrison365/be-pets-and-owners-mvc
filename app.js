//npm init -y
//npm i express
//npm i nodemon -D // (npm run dev) will now run the server and keep it on between changes so no need to restart

const express = require("express");
const fs = require("fs/promises");
const {
  getOwnersById,
  getOwners,
  getOwners2,
  getPetsOfOwner,
} = require("./controllers.js");
const app = express();
app.use(express.json()); // allows us to access post request body.

//TASK 1

app.get("/api/owners/:id", getOwnersById);

//TASK 2

app.get("/api/owners", getOwners);

//TASK 2 but with .push instead

app.get("/api/ownersii", getOwners2);

//TASK 3

app.get("/api/owners/:id/pets", getPetsOfOwner);

//TASK 4
app.get("/api/pets", (req, res) => {
  let query = req.query.temperament;

  fs.readdir("./data/pets", "utf8")
    .then((pets) => {
      const promiseArr = pets.map((petFile) => {
        return fs.readFile(`./data/pets/${petFile}`, "utf8");
      });
      return Promise.all(promiseArr);
    })
    .then((petInfoArr) => {
      const petsJS = petInfoArr.map((pet) => {
        return JSON.parse(pet);
      });

      const filteredPets = petsJS.filter((pet) => {
        if (pet.temperament === query) {
          return pet;
        }
      });
      console.log(filteredPets);
      res.send(filteredPets);
    })
    .catch((err) => {
      console.log(err);
    });
});

//TASK 5

app.get("/api/pets/:id", (req, res) => {
  const { id } = req.params;
  fs.readFile(`./data/pets/p${id}.json`, "utf8")
    .then((petInfo) => {
      const petJS = JSON.parse(petInfo);
      res.send(petJS);
    })
    .catch((err) => {
      console.log(err);
    });
});

//TASK 6 update owner ID included in body
app.patch("/api/owners/:id/edit", (req, res) => {
  const { id } = req.params;
  const ownerUpdated = req.body;

  fs.writeFile(`./data/owners/o${id}.json`, JSON.stringify(ownerUpdated))
    .then(() => {
      res.status(201).send(ownerUpdated);
    })
    .catch((err) => {
      console.log(err);
    });
});

//TASK 6 if ID not included in patch request body
app.patch("/api/owners/:id/editii", (req, res) => {
  const { id } = req.params;
  const body = req.body;
  globalOwner = "";
  fs.readFile(`./data/owners/o${id}.json`)
    .then((owner) => {
      const ownerJS = JSON.parse(owner);
      ownerJS.name = body.name;
      ownerJS.age = body.age;
      globalOwner = ownerJS;
      return fs.writeFile(`./data/owners/o${id}.json`, JSON.stringify(ownerJS));
    })
    .then(() => {
      console.log(globalOwner);
      res.status(201);
      res.send(globalOwner);
    })
    .catch((err) => {
      console.log(err);
    });
});

//TASK 7
app.post("/api/owners/create", (req, res) => {
  let body = req.body;
  let newId = Date.now();
  body["id"] = newId;
  fs.writeFile(`./data/owners/o${body.id}.json`, JSON.stringify(body))
    .then(() => {
      res.status(200);
      res.send(body);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(8080, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("express listnening to port 8080");
  }
});
