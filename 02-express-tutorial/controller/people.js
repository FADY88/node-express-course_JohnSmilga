let { people } = require("../data");

const getPeople = (req, res) => {
  res.status(200).json(people);
};

let usersAdded = 6;
const postPeople = (req, res) => {
  if (!req.body.name) {
    return res
      .status(400)
      .json({ success: false, msg: "please provide name value" });
  }
  people.push({ id: usersAdded++, name: req.body.name });
  console.log(people);
  res.status(201).json({ success: true, name: req.body.name });
};

const postPostMan = (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ success: false, msg: "Please provide name value" });
  }
  res.status(201).send({ success: true, data: [...people, name] });
};

const putId = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ success: false, msg: "Please provide name value" });
  }
  let itemFound = false;
  people.forEach(e => {
    if (e.id === Number(id)) {
      e.name = name;
      itemFound = true;
    }
  });
  if (!itemFound) {
    res.status(404).json({ success: false, msg: `No person with id: ${id}` });
  }

  res.status(200).json({ success: true, data: [...people] });
};

const deleteId = (req, res) => {
  const { id } = req.params;

  let oldLength = people.length;
  people = people.filter(e => e.id !== Number(id));
  if (oldLength === people.length) {
    return res
      .status(404)
      .json({ success: false, msg: `No person with id: ${id}` });
  }

  res.status(200).json({ success: true, data: [...people] });
};

module.exports = { getPeople, postPeople, postPostMan, putId, deleteId };
