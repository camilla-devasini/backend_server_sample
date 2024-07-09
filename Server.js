const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());
let cors = require("cors");

const port = 3001;

const allSlavesData = [
  {
    id: 1,
    storeId: 1, // lo store Id indica l'admin a cui è associato lo slave
    firstName: "Mario",
    lastName: "Rossi",
    email: "mario@rossi.com",
    phone: "3348558857",
    companyName: "Auto23",
    address: "35 via bernardino",
    city: "bergamo",
    zipCode: "24100",
    vatNumber: "IT849948474",
    status: "pending",
    password: null,
    passwordTemporary: "Ahfj!2-E3rh4du?!Qlb2",
    credits: 100,
    lastCreditsUpdateReason: null,
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
        tickets: [1, 2, 3],
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
    storeId: 1, // lo store Id indica l'admin a cui è associato lo slave
    firstName: "Giovanni",
    lastName: "Verdi",
    email: "giovanni@verdi.it",
    companyName: "Autooos",
    address: "via Roma 2",
    city: "Milano",
    zipCode: "34483",
    vatNumber: "IT849948474",
    phone: "3234558857",
    status: "banned",
    password: null,
    passwordTemporary: "Ahfj!23445.Erhdu",
    credits: 200,
    lastCreditsUpdateReason: null,
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
    storeId: 1, // lo store Id indica l'admin a cui è associato lo slave
    firstName: "Luca",
    lastName: "Gialli",
    email: "luca@gialli.com",
    companyName: "Ciaociao",
    address: "via Lodi 1",
    city: "Roma",
    zipCode: "24100",
    vatNumber: "IT849948474",
    phone: "3348552342",
    status: "active",
    password: null,
    passwordTemporary: "Ahfj!23445.Erhdu",
    credits: 300,
    lastCreditsUpdateReason: null,
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
        ticketsId: [1, 2],
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
    storeId: 1, // lo store Id indica l'admin a cui è associato lo slave
    firstName: "Mario",
    lastName: "Neri",
    email: "mario@neri.it",
    companyName: "Autoyay",
    address: "via Garibaldi 11",
    city: "Padova",
    zipCode: "24103",
    vatNumber: "IT849948474",
    phone: "3348558857",
    status: "active",
    password: null,
    passwordTemporary: "Ahfj!23445.Erhdu",
    credits: 0,

    lastCreditsUpdateReason: null,
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
    storeId: 1, // lo store Id indica l'admin a cui è associato lo slave
    firstName: "Luca",
    lastName: "Viola",
    email: "luca@viola.it",
    phone: "3348558857",
    companyName: "V-auto",
    address: "via Manzoni 45",
    city: "Siracusa",
    zipCode: "24130",
    vatNumber: "IT849948474",
    status: "pending",
    password: null,
    passwordTemporary: "Ahfj!23445.Erhdu",
    credits: 5,

    lastCreditsUpdateReason: null,
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

const allTickets = [
  {
    id: 1,
    userId: 1,
    projectId: 1, // id della lavorazione collegata al ticket
    companyName: "Auto23",
    status: "inProgress", // altri status: "open", "completed", "closed"
    category: "billing",
    title: "Problema x",
    description: "Descrizione del problema",
    date: "2024-07-05",
    lastUpdated: "2024-07-05",
    attachments: null,
    messages: [],
    resolutionDate: null,
  },
  {
    id: 2,
    userId: 2,
    projectId: 2,
    companyName: "Autooos",
    status: "open", // altri status: "inProgress", "completed", "closed"
    category: "technical",
    title: "Problema y",
    description: "Descrizione del problema",
    date: "2024-07-05",
    lastUpdated: "2024-07-05",
    attachments: null,
    messages: [
      {
        role: "admin",
        message: "Commento dell'admin",
        sendTime: "2024-07-05",
      },
      {
        role: "user",
        message: "Commento dello slave",
        sendTime: "2024-07-06",
      },
    ],
    resolutionDate: null,
  },
  {
    id: 3,
    userId: 3,
    projectId: 3,
    companyName: "Ciaociao",
    status: "completed", // altri status: "open", "inProgress", "closed"
    category: "technical",
    title: "Problema z",
    description: "Descrizione del problema",
    date: "2024-07-05",
    lastUpdated: "2024-07-05",
    attachments: null,
    messages: [
      {
        role: "admin",
        message: "Commento dell'admin",
        sendTime: "2024-07-05",
      },
      {
        role: "user",
        message: "Commento dello slave",
        sendTime: "2024-07-06",
      },
    ],
    resolutionDate: "2024-07-07",
  },
  {
    id: 4,
    userId: 3,
    projectId: 4,
    companyName: "Ciaociao",
    status: "closed", // altri status: "open", "inProgress", "closed"
    category: "technical",
    title: "Problema t",
    description: "Descrizione del problema",
    date: "2024-07-05",
    lastUpdated: "2024-07-05",
    attachments: null,
    messages: [
      {
        role: "admin",
        message: "Commento dell'admin",
        sendTime: "2024-07-05",
      },
      {
        role: "user",
        message: "Commento dello slave",
        sendTime: "2024-07-06",
      },
    ],
    resolutionDate: "2024-07-07",
  },
  {
    id: 5,
    userId: 2,
    projectId: 5,
    companyName: "Ciaociao",
    status: "closed", // altri status: "open", "inProgress", "closed"
    category: "technical",
    title: "Problema t",
    description: "Descrizione del problema",
    date: "2024-07-05",
    lastUpdated: "2024-07-05",
    attachments: null,
    messages: [
      {
        role: "admin",
        message: "Commento dell'admin",
        sendTime: "2024-07-05",
      },
      {
        role: "user",
        message: "Commento dello slave",
        sendTime: "2024-07-06",
      },
    ],
    resolutionDate: "2024-07-07",
  },
  {
    id: 6,
    userId: 2,
    projectId: 6,
    companyName: "Ciaociao",
    status: "closed", // altri status: "open", "inProgress", "closed"
    category: "technical",
    title: "Problema t",
    description: "Descrizione del problema",
    date: "2024-07-05",
    lastUpdated: "2024-07-05",
    attachments: null,
    messages: [
      {
        role: "admin",
        message: "Commento dell'admin",
        sendTime: "2024-07-05",
      },
      {
        role: "user",
        message: "Commento dello slave",
        sendTime: "2024-07-06",
      },
    ],
    resolutionDate: "2024-07-07",
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
// USER
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

// SLAVES
app.get("/slaves", (req, res) => {
  const { page = 1, search, statusFilter } = req.query;
  const limit = 4; // number of items per page

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
      totalActiveUsers: allSlavesData.filter((item) => item.status === "active")
        .length,
      totalPendingUsers: allSlavesData.filter(
        (item) => item.status === "pending"
      ).length,
      totalBannedUsers: allSlavesData.filter((item) => item.status === "banned")
        .length,
    },
  });
});

app.get("/slaves/:slaveId", (req, res) => {
  const slaveId = req.params.slaveId;
  const slave = allSlavesData.find((item) => item.id === Number(slaveId));
  res.status(200).send(slave);
  // selezione dei dati: escludo: id, projects, password,
  // se lo status è pending, devo fare anche una chiamata alla tabella slaves_temporary con l'id dello slave per ottenere la password temporanea
  // per il primo accesso
});

app.get(`/slaves/:slaveId/projects`, (req, res) => {
  const slaveId = req.params.slaveId;
  const { page = 1, status, brand, model, date, extraOptions } = req.query;
  const limit = 4;

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
      totalCompletedProjects: slave.projects.filter(
        (item) => item.status === "completed"
      ).length,
      totalPendingProjects: slave.projects.filter(
        (item) => item.status === "pending"
      ).length,
      totalRefundedProjects: slave.projects.filter(
        (item) => item.status === "refunded"
      ).length,
      totalFailedProjects: slave.projects.filter(
        (item) => item.status === "failed"
      ).length,
      totalNewProjects: slave.projects.filter((item) => item.status === "new")
        .length,
      totalInProgressProjects: slave.projects.filter(
        (item) => item.status === "inProgress"
      ).length,
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

app.put(`/slaves/:slaveId`, (req, res) => {
  const { slaveId } = req.params;

  const slave = allSlavesData.find((item) => item.id == slaveId);

  if (slave) {
    Object.entries(req.body).forEach(([key, value]) => {
      slave[key] = value;
    });
    return res.status(200).send({
      updatedSlave: slave,
    });
  } else {
    res.status(404).send({
      message: `Slave with id ${slaveId} not found`,
    });
  }
});

// TICKETS
app.get("/tickets", (req, res) => {
  const { page = 1, status, category, companyName, date } = req.query;
  const limit = 4;

  let filteredTickets = allTickets;

  filteredTickets = filteredTickets.filter((ticket) => {
    return (
      (status !== "all" ? ticket.status === status : true) &&
      (category !== "all" ? ticket.category === category : true) &&
      (companyName !== "all" ? ticket.companyName === companyName : true) &&
      (date !== "all" ? ticket.date === date : true)
    );
  });

  const resultsCount = filteredTickets.length;
  const totalPages = Math.ceil(resultsCount / limit);
  const validPage = Math.max(1, Math.min(Number(page), totalPages));

  const offset = (validPage - 1) * limit;
  const paginatedResults = filteredTickets.slice(offset, offset + limit);

  res.status(200).send({
    data: paginatedResults,
    notFilteredData: allTickets,
    pagination: {
      activePage: Number(page),
      itemsPerPage: limit,
      totalPages: totalPages,
      totalItems: resultsCount,
    },
  });
});

app.get("/tickets/:id", (req, res) => {
  const ticketId = req.params.id;
  const ticket = allTickets.find((item) => item.id === Number(ticketId));
  res.status(200).send(ticket);
});

app.put("/tickets/:id", (req, res) => {
  const ticketId = req.params.id;
  const ticketData = req.body;
  const ticket = allTickets.find((item) => item.id === Number(ticketId));
  if (ticket) {
    Object.entries(ticketData).forEach(([key, value]) => {
      ticket[key] = value;
    });
    res.status(200).send({
      updatedTicket: ticket,
    });
  } else {
    res.status(404).send({
      message: `Ticket with id ${ticketId} not found`,
    });
  }
});

app.post("/tickets/:id/messages", (req, res) => {
  const ticketId = req.params.id;
  const { messageData } = req.body;
  // questa chiamata deve aggiungere una nuova riga alla tabella tickets_messages associando il messaggio al ticket con id ticketId
  // post o put?
  const ticket = allTickets.find((item) => item.id === Number(ticketId));
  if (ticket) {
    ticket.messages.push(messageData);
    res.status(200).send({
      updatedTicket: ticket,
    });
  } else {
    res.status(404).send({
      message: `Ticket with id ${ticketId} not found`,
    });
  }
});

// LOGIN/REGISTER
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
  // questa chiamata avviene quando uno slave fa la richiesta di accesso.
  // lo slave deve essere inserito:
  // - nella tabella slaves con lo status pending
  // - nella tabella slaves_temporary con la password temporanea
  // la funzione per generare tale password è già implementata:

  // const generateRandomPassword = (length = 12) => {
  //   const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  //   const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  //   const numberChars = "0123456789";
  //   const specialChars = "!@#$%^&*()_+[]{}|;:,.<>?";

  //   const allChars =
  //     uppercaseChars + lowercaseChars + numberChars + specialChars;

  //   let password = "";

  //   // Ensure at least one character from each category
  //   password +=
  //     uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)];
  //   password +=
  //     lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)];
  //   password += numberChars[Math.floor(Math.random() * numberChars.length)];
  //   password += specialChars[Math.floor(Math.random() * specialChars.length)];

  //   // Fill the rest of the password
  //   for (let i = password.length; i < length; i++) {
  //     const randomIndex = Math.floor(Math.random() * allChars.length);
  //     password += allChars[randomIndex];
  //   }

  //   // Shuffle the password
  //   password = password
  //     .split("")
  //     .sort(() => 0.5 - Math.random())
  //     .join("");

  //   return password;
  // };
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
