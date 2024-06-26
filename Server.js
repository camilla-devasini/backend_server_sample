const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());
let cors = require("cors");

const port = 3001;
// Admin's slaves for the dashboard
const allSlavesData = [
  {
    id: 1,
    firstName: "Mario",
    lastName: "Rossi",
    email: "mario@rossi.com",
    phone: "3348558857",
    status: "pending",
    projects: [
      {
        id: 1,
        date: "2021-10-10",
        status: "completed",
        brand: "Fiat",
        model: "500",
        generation: "2010",
        engine: "2.0",
        engineHp: "200",
        year: "2010",
        gearbox: "automatic",
        readingMethod: "Magicmotorsport",
        extraOptions: "Only options --adblue",
        price: 100,
      },
      {
        id: 2,
        date: "2021-10-09",
        status: "pending",
        brand: "Toyota",
        model: "Aygo",
        generation: "2019",
        engine: "2.0",
        engineHp: "200",
        year: "2010",
        gearbox: "manual",
        readingMethod: "Magicmotorsport",
        extraOptions: "Only options --adblue",
        price: 100,
      },
      {
        id: 3,
        date: "2021-10-08",
        status: "pending",
        brand: "Toyota",
        model: "Z4X",
        generation: "2018",
        engine: "2.0",
        engineHp: "100",
        year: "2010",
        gearbox: "automatic",
        readingMethod: "Magicmotorsport",
        extraOptions: "Only options --adblue",
        price: 100,
      },
      {
        id: 4,
        date: "2021-10-07",
        status: "refunded",
        brand: "Fiat",
        model: "600",
        generation: "2010",
        engine: "2.0",
        engineHp: "200",
        year: "2010",
        gearbox: "automatic",
        readingMethod: "Magicmotorsport",
        extraOptions: "Only options --adblue",
        price: 100,
      },
      {
        id: 5,
        date: "2021-10-10",
        status: "failed",
        brand: "BMW",
        model: "Serie 1",
        generation: "2010",
        engine: "2.0",
        engineHp: "200",
        year: "2010",
        gearbox: "manual",
        readingMethod: "Magicmotorsport",
        extraOptions: "Only options --adblue",
        price: 100,
      },
    ],
  },
  {
    id: 2,
    firstName: "Giovanni",
    lastName: "Verdi",
    email: "giovanni@verdi.it",
    phone: "3234558857",
    status: "banned",
    projects: [
      {
        id: 1,
        date: "2021-10-10",
        status: "completed",
        brand: "brand1",
        model: "Stelvio",
        generation: "2010",
        engine: "2.0",
        engineHp: "127",
        year: "2010",
        gearbox: "automatic",
        readingMethod: "Magicmotorsport",
        extraOptions: "Only options --adblue",
        price: 100,
      },
      {
        id: 2,
        date: "2021-10-10",
        status: "new",
        brand: "brand1",
        model: "Stelvio",
        generation: "2010",
        engine: "2.0",
        engineHp: "200",
        year: "2010",
        gearbox: "automatic",
        readingMethod: "Magicmotorsport",
        extraOptions: "Only options --adblue",
        price: 100,
      },
      {
        id: 3,
        date: "2021-10-10",
        status: "pending",
        brand: "brand1",
        model: "Stelvio",
        generation: "2010",
        engine: "2.0",
        engineHp: "200",
        year: "2010",
        gearbox: "automatic",
        readingMethod: "Magicmotorsport",
        extraOptions: "Only options --adblue",
        price: 100,
      },
      {
        id: 4,
        date: "2021-10-10",
        status: "refunded",
        brand: "brand1",
        model: "Stelvio",
        generation: "2010",
        engine: "2.0",
        engineHp: "200",
        year: "2010",
        gearbox: "automatic",
        readingMethod: "Magicmotorsport",
        extraOptions: "Only options --adblue",
        price: 100,
      },
      {
        id: 5,
        date: "2021-10-10",
        status: "failed",
        brand: "brand1",
        model: "Stelvio",
        generation: "2010",
        engine: "2.0",
        engineHp: "200",
        year: "2010",
        gearbox: "automatic",
        readingMethod: "Magicmotorsport",
        extraOptions: "Only options --adblue",
        price: 100,
      },
    ],
  },
  {
    id: 3,
    firstName: "Luca",
    lastName: "Gialli",
    email: "luca@gialli.com",
    phone: "3348552342",
    status: "active",
    projects: [
      {
        id: 1,
        date: "2021-10-10",
        status: "completed",
        brand: "brand1",
        model: "Stelvio",
        generation: "2010",
        engine: "2.0",
        engineHp: "200",
        year: "2010",
        gearbox: "automatic",
        readingMethod: "Magicmotorsport",
        extraOptions: "Only options --adblue",
        price: 100,
      },
      {
        id: 2,
        date: "2021-10-10",
        status: "new",
        brand: "brand1",
        model: "Stelvio",
        generation: "2010",
        engine: "2.0",
        engineHp: "200",
        year: "2010",
        gearbox: "automatic",
        readingMethod: "Magicmotorsport",
        extraOptions: "Only options --adblue",
        price: 100,
      },
      {
        id: 3,
        date: "2021-10-10",
        status: "pending",
        brand: "brand1",
        model: "Stelvio",
        generation: "2010",
        engine: "2.0",
        engineHp: "200",
        year: "2010",
        gearbox: "automatic",
        readingMethod: "Magicmotorsport",
        extraOptions: "Only options --adblue",
        price: 100,
      },
      {
        id: 4,
        date: "2021-10-10",
        status: "refunded",
        brand: "brand1",
        model: "Stelvio",
        generation: "2010",
        engine: "2.0",
        engineHp: "200",
        year: "2010",
        gearbox: "automatic",
        readingMethod: "Magicmotorsport",
        extraOptions: "Only options --adblue",
        price: 100,
      },
      {
        id: 5,
        date: "2021-10-10",
        status: "failed",
        brand: "brand1",
        model: "Stelvio",
        generation: "2010",
        engine: "2.0",
        engineHp: "200",
        year: "2010",
        gearbox: "automatic",
        readingMethod: "Magicmotorsport",
        extraOptions: "Only options --adblue",
        price: 100,
      },
    ],
  },
  {
    id: 4,
    firstName: "Mario",
    lastName: "Neri",
    email: "mario@neri.it",
    phone: "3348558857",
    status: "active",
    projects: [
      {
        id: 1,
        date: "2021-10-10",
        status: "completed",
        brand: "brand1",
        model: "Stelvio",
        generation: "2010",
        engine: "2.0",
        engineHp: "200",
        year: "2010",
        gearbox: "automatic",
        readingMethod: "Magicmotorsport",
        extraOptions: "Only options --adblue",
        price: 100,
      },
      {
        id: 2,
        date: "2021-10-10",
        status: "new",
        brand: "brand1",
        model: "Stelvio",
        generation: "2010",
        engine: "2.0",
        engineHp: "200",
        year: "2010",
        gearbox: "automatic",
        readingMethod: "Magicmotorsport",
        extraOptions: "Only options --adblue",
        price: 100,
      },
      {
        id: 3,
        date: "2021-10-10",
        status: "pending",
        brand: "brand1",
        model: "Stelvio",
        generation: "2010",
        engine: "2.0",
        engineHp: "200",
        year: "2010",
        gearbox: "automatic",
        readingMethod: "Magicmotorsport",
        extraOptions: "Only options --adblue",
        price: 100,
      },
      {
        id: 4,
        date: "2021-10-10",
        status: "refunded",
        brand: "brand1",
        model: "Stelvio",
        generation: "2010",
        engine: "2.0",
        engineHp: "200",
        year: "2010",
        gearbox: "automatic",
        readingMethod: "Magicmotorsport",
        extraOptions: "Only options --adblue",
        price: 100,
      },
      {
        id: 5,
        date: "2021-10-10",
        status: "failed",
        brand: "brand1",
        model: "Stelvio",
        generation: "2010",
        engine: "2.0",
        engineHp: "200",
        year: "2010",
        gearbox: "automatic",
        readingMethod: "Magicmotorsport",
        extraOptions: "Only options --adblue",
        price: 100,
      },
    ],
  },
  {
    id: 5,
    firstName: "Luca",
    lastName: "Viola",
    email: "luca@viola.it",
    phone: "3348558857",
    status: "active",
    projects: [
      {
        id: 1,
        date: "2021-10-10",
        status: "completed",
        brand: "brand1",
        model: "Stelvio",
        generation: "2010",
        engine: "2.0",
        engineHp: "200",
        year: "2010",
        gearbox: "automatic",
        readingMethod: "Magicmotorsport",
        extraOptions: "Only options --adblue",
        price: 100,
      },
      {
        id: 2,
        date: "2021-10-10",
        status: "new",
        brand: "brand1",
        model: "Stelvio",
        generation: "2010",
        engine: "2.0",
        engineHp: "200",
        year: "2010",
        gearbox: "automatic",
        readingMethod: "Magicmotorsport",
        extraOptions: "Only options --adblue",
        price: 100,
      },
      {
        id: 3,
        date: "2021-10-10",
        status: "pending",
        brand: "brand1",
        model: "Stelvio",
        generation: "2010",
        engine: "2.0",
        engineHp: "200",
        year: "2010",
        gearbox: "automatic",
        readingMethod: "Magicmotorsport",
        extraOptions: "Only options --adblue",
        price: 100,
      },
      {
        id: 4,
        date: "2021-10-10",
        status: "refunded",
        brand: "brand1",
        model: "Stelvio",
        generation: "2010",
        engine: "2.0",
        engineHp: "200",
        year: "2010",
        gearbox: "automatic",
        readingMethod: "Magicmotorsport",
        extraOptions: "Only options --adblue",
        price: 100,
      },
      {
        id: 5,
        date: "2021-10-10",
        status: "failed",
        brand: "brand1",
        model: "Stelvio",
        generation: "2010",
        engine: "2.0",
        engineHp: "200",
        year: "2010",
        gearbox: "automatic",
        readingMethod: "Magicmotorsport",
        extraOptions: "Only options --adblue",
        price: 100,
      },
    ],
  },
];
app.use(cors());
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});
const userData = {
  userId: 1,
  role: "admin",
};
// GET
app.get(`/user/:userId/settings`, (req, res) => {
  const userId = req.params.userId;
  res.status(200).send({
    userId: userId,
    designId: 2,
    role: "admin",
  });
});
app.get(`/user/:userId`, (req, res) => {
  const userId = req.params.userId;
  res.status(200).send({
    userId: userId,
    designId: 2,
    role: "admin",
    firstName: "Mario",
    lastName: "Rossi",
    companyName: "Rossi srl",
    email: "test@test.com",
    address: "Via Roma 1",
    city: "Roma",
    zipcode: "00100",
    vatNumber: "12345678901",
    phone: "3334445555",
  });
});

app.get("/faq", (req, res) => {
  res.status(200).send({
    title: "Benvenuto nella sezione FAQ",
    description: "Qui potresti trovare quello che stai cercando.",
    faqList: [
      {
        id: 0,
        question: "Come posso fare acquisti",
        answer:
          "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ",
      },
      {
        id: 1,
        question: "Dove compro i crediti",
        answer:
          "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ",
      },
      {
        id: 2,
        question: "Diritto al rimborso",
        answer:
          "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ",
      },
      {
        id: 3,
        question: "domanda 4",
        answer:
          "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ",
      },
      {
        id: 4,
        question: "domanda 5",
        answer:
          "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ",
      },
      {
        id: 5,
        question: "domanda 6",
        answer:
          "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ",
      },
      {
        id: 6,
        question: "domanda 7",
        answer:
          "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ",
      },
      {
        id: 7,
        question: "domanda 8",
        answer:
          "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ",
      },
    ],
  });
});

app.get("/slaves", (req, res) => {
  const { page = 1, search, statusFilter } = req.query;
  const limit = 3; // number of items per page

  let filteredData = allSlavesData;

  if (search) {
    filteredData = allSlavesData.filter((item) => {
      const lowerCaseSearch = search.toLowerCase();
      return (
        item.firstName.toLowerCase().includes(lowerCaseSearch) ||
        item.lastName.toLowerCase().includes(lowerCaseSearch) ||
        item.email.toLowerCase().includes(lowerCaseSearch) ||
        item.phone.toLowerCase().includes(lowerCaseSearch)
      );
    });
  }
  if (statusFilter) {
    statusFilter === "all"
      ? filteredData
      : (filteredData = filteredData.filter(
          (item) => item.status === statusFilter
        ));
  }

  const resultsCount = filteredData.length;
  const totalPages = Math.ceil(resultsCount / limit);
  const offset = (Number(page) - 1) * limit;
  const paginatedResults = filteredData.slice(offset, offset + limit);

  res.status(200).send({
    data: paginatedResults,
    pagination: {
      activePage: Number(page),
      itemsPerPage: limit,
      totalPages: totalPages,
      totalItems: resultsCount,
    },
  });
});

app.get("/slaves/:slaveId", (req, res) => {
  const slaveId = req.params.slaveId;
  const slave = allSlavesData.find((item) => item.id === Number(slaveId));
  res.status(200).send(slave);
});

app.get(`/slaves/:slaveId/projects`, (req, res) => {
  const slaveId = req.params.slaveId;
  const { page = 1, status, brand, model, date, extraOptions } = req.query;
  const limit = 3;

  // Find the slave by id
  const slave = allSlavesData.find((slave) => slave.id === Number(slaveId));

  if (!slave) {
    return res.status(404).send({
      message: `Slave with id ${slaveId} not found`,
    });
  }

  let filteredProjects = slave.projects;

  filteredProjects = filteredProjects.filter((project) => {
    return (
      (status !== "all" ? project.status === status : true) &&
      (brand !== "all" ? project.brand === brand : true) &&
      (model !== "all" ? project.model === model : true) &&
      (date !== "all" ? project.date === date : true) &&
      (extraOptions !== "all" ? project.extraOptions === extraOptions : true)
    );
  });

  const resultsCount = filteredProjects.length;
  const totalPages = Math.ceil(resultsCount / limit);
  const validPage = Math.max(1, Math.min(Number(page), totalPages));

  const offset = (validPage - 1) * limit;
  const paginatedResults = filteredProjects.slice(offset, offset + limit);

  res.status(200).send({
    notFilteredData: slave.projects,
    data: paginatedResults,
    pagination: {
      activePage: Number(page),
      itemsPerPage: limit,
      totalPages: totalPages,
      totalItems: resultsCount,
    },
  });
});
app.get("/slaves/:slaveId/projects/:projectId", (req, res) => {
  const { slaveId, projectId } = req.params;
  console.log("slaveId", slaveId);
  console.log("projectId", projectId);
  const slave = allSlavesData.find((slave) => slave.id === Number(slaveId));
  if (slave) {
    console.log("slave", slave);
    const project = slave.projects.find(
      (project) => project.id === Number(projectId)
    );
    if (project) {
      return res.status(200).send(project);
    } else {
      return res.status(404).send({
        message: `Project with id ${projectId} not found`,
      });
    }
  } else {
    return res.status(404).send({
      message: `Slave with id ${slaveId} not found`,
    });
  }
});
// POST
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  // se email e password sono uguali a test@test e pass123 ovvero quelli che ho impostato io come corretti
  // allora mi aspetto che il backend esegua una chiamata che restituisca i dati dell'utente e il suo jwt token
  if (email === "test@test.com" && password === "qqqqq") {
    // creo il token jwt contenente userId e role
    const token = jwt.sign(userData, "my_secret_key", {
      expiresIn: "1h",
    });
    // setto il token nel cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 3600000, // 1h
    });
    // console.log("Set-Cookie header:", res.get("Set-Cookie"));
    res.status(200).json({
      userData,
      token,
    });
  } else {
    res.status(401).send({ error: "Unauthorized user" });
  }
});

app.post(`/logout/${userData.userId}`, (req, res) => {
  res.clearCookie("token");
  res.status(200).send({
    isLoggedOut: true,
  });
});

app.post("/register", (req, res) => {
  res.status(200).send({
    isRegistered: true,
  });
});

// PUT
app.put(`/user/:userId`, (req, res) => {
  const userId = req.params.userId;
  res.status(200).send({
    userId: userId,
    designId: 2,
    name: "Mario",
    lastName: "Rossi",
    companyName: "Rossi srl",
    email: "test@test.com",
    address: "Via Roma 1",
    city: "Roma",
    zipcode: "00100",
    vatNumber: "12345678901",
    phone: "3334445555",
  });
});

app.put(`/slaves/:slaveId/projects/:projectId`, (req, res) => {
  const { slaveId, projectId } = req.params;
  const { status } = req.body;
  console.log("request of body", req.body);

  const slave = allSlavesData.find((item) => item.id == slaveId);

  if (slave) {
    const project = slave.projects.find((project) => project.id == projectId);
    if (project) {
      project.status = status;

      res.status(200).send({
        updatedProject: project,
      });
    } else {
      res.status(404).send({
        message: `Project with id ${projectId} not found`,
      });
    }
  } else {
    res.status(404).send({
      message: `Slave with id ${slaveId} not found`,
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
