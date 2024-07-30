const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(cookieParser());
let cors = require("cors");

const port = 3001;

// entità che simulano i dati del database
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

const allSolutions = [
  { id: 1, name: "DPF", price: 100 },
  { id: 2, name: "ADV", price: 150 },
  { id: 3, name: "EGR", price: 200 },
  { id: 4, name: "ADBLUE", price: 250 },
  { id: 5, name: "SCR", price: 300 },
  { id: 6, name: "FULL EMISSION", price: 100 },
  { id: 7, name: "MAF", price: 150 },
  { id: 8, name: "TVA", price: 200 },
  { id: 9, name: "LAMBDA", price: 250 },
  { id: 10, name: "O2", price: 300 },
  { id: 11, name: "FLAPS", price: 100 },
  { id: 12, name: "SWIRL", price: 150 },
  { id: 13, name: "NOX", price: 200 },
  { id: 14, name: "SPEED LIMIT", price: 250 },
  { id: 15, name: "VMAX", price: 300 },
  { id: 16, name: "GPF", price: 100 },
  { id: 17, name: "OPF", price: 150 },
  { id: 18, name: "IAT", price: 200 },
  { id: 19, name: "HOT START", price: 250 },
  { id: 20, name: "WATER PUMP", price: 300 },
  { id: 21, name: "CATALYST", price: 100 },
  { id: 22, name: "SPORT DISPLAY CALIBRATION", price: 150 },
  { id: 23, name: "EXHAUST FLAP", price: 200 },
  { id: 24, name: "EVAP", price: 250 },
  { id: 25, name: "TORQUE MONITORING", price: 300 },
  { id: 26, name: "START STOP", price: 100 },
  { id: 27, name: "READINESS CALIBRATION", price: 150 },
  { id: 28, name: "AGS", price: 200 },
  { id: 29, name: "COLD START SOUND", price: 250 },
  { id: 30, name: "REV LIMITER", price: 300 },
  { id: 31, name: "OIL PRESSURE", price: 100 },
  { id: 32, name: "TPROT", price: 150 },
  { id: 33, name: "KICKDOWN", price: 200 },
  { id: 34, name: "ACT", price: 250 },
  { id: 35, name: "STAGE 1", price: 300 },
  { id: 36, name: "STAGE 2", price: 100 },
  { id: 37, name: "STAGE 3", price: 150 },
  { id: 38, name: "DTC", price: 250 },
];

// fasce di sconto per i crediti
const pricingCredits = [
  {
    id: 1,
    minTier: 50,
    maxTier: 450,
    unitPrice: 0.2,
    discountPercentage: 0,
    isSpecial: false,
  },
  {
    id: 2,
    minTier: 500,
    maxTier: 500,
    unitPrice: 0.2,
    discountPercentage: 12.0,
    isSpecial: true,
  },
  {
    id: 3,
    minTier: 550,
    maxTier: 750,
    unitPrice: 0.2,
    discountPercentage: 10.0,
    isSpecial: false,
  },
  {
    id: 4,
    minTier: 800,
    maxTier: 950,
    unitPrice: 0.2,
    discountPercentage: 15.0,
    isSpecial: false,
  },
  {
    id: 5,
    minTier: 1000,
    maxTier: 1000,
    unitPrice: 0.2,
    discountPercentage: 20.0,
    isSpecial: true,
  },
];

const userProjects = [];

const orders = [];

app.use(cors());
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});
const userData = {
  userId: 1,
  role: "user",
  designId: 2,
  role: "user",
  firstName: "Mario",
  lastName: "Rossi",
  companyName: "Rossi srl",
  email: "test@test.com",
  address: "Via Roma 1",
  city: "Roma",
  zipcode: "00100",
  vatNumber: "12345678901",
  phone: "3334445555",
  credits: 1000,
};

// COMMON ROUTES

app.get(`/user/:userId/settings`, (req, res) => {
  const userId = req.params.userId;
  res.status(200).send({
    userId: userId,
    designId: 2,
  });
});

app.get(`/user/:userId`, (req, res) => {
  const userId = req.params.userId;
  res.status(200).send({
    ...userData,
    userId: userId,
  });
});

app.put(`/user/:userId`, (req, res) => {
  const userId = req.params.userId;
  const userInfo = req.body;
  console.log("userInfo", userInfo);
  res.status(200).send({
    ...userData,
    userId: userId,
    ...userInfo,
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

// ADMIN ROUTES
// Admin routes - Slaves
app.get("/backoffice/slaves", (req, res) => {
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

app.get("/backoffice/slaves/:slaveId", (req, res) => {
  const slaveId = req.params.slaveId;
  const slave = allSlavesData.find((item) => item.id === Number(slaveId));
  res.status(200).send(slave);
  // selezione dei dati: escludo: id, projects, password,
  // se lo status è pending, devo fare anche una chiamata alla tabella slaves_temporary con l'id dello slave per ottenere la password temporanea
  // per il primo accesso
});

app.get(`/backoffice/slaves/:slaveId/projects`, (req, res) => {
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

app.get("/backoffice/slaves/:slaveId/projects/:projectId", (req, res) => {
  const { slaveId, projectId } = req.params;
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

app.put(`/backoffice/slaves/:slaveId/projects/:projectId`, (req, res) => {
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

app.put(`/backoffice/slaves/:slaveId`, (req, res) => {
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

// Admin routes - Tickets
app.get("/backoffice/tickets", (req, res) => {
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

app.get("/backoffice/tickets/:id", (req, res) => {
  const ticketId = req.params.id;
  const ticket = allTickets.find((item) => item.id === Number(ticketId));
  res.status(200).send(ticket);
});

app.put("/backoffice/tickets/:id", (req, res) => {
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

app.post("/backoffice/tickets/:id/messages", (req, res) => {
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

// Admin routes - Service solutions prices
app.get("/backoffice/solutions", (req, res) => {
  res.status(200).send(allSolutions);
});

// USER ROUTES

// user routes - project
// creating a new project - valori per i select

const types = [
  { id: 1, name: "Autovettura" },
  { id: 2, name: "Moto" },
  { id: 3, name: "Camion" },
];

const brands = [
  { id: 1, typeId: [1, 2, 3], name: "BMW" },
  { id: 2, typeId: [1, 2, 3], name: "Audi" },
  { id: 3, typeId: [1, 2, 3], name: "Mercedes" },
];

const models = [
  { id: 1, brandId: 1, name: "Serie 1" },
  { id: 2, brandId: 1, name: "Serie 2" },
  { id: 3, brandId: 1, name: "R1200GS" },
  { id: 4, brandId: 2, name: "A3" },
  { id: 5, brandId: 2, name: "A4" },
];
const engines = [
  { id: 1, modelId: 1, name: "118i" },
  { id: 2, modelId: 1, name: "120d" },
  { id: 3, modelId: 2, name: "220i" },
  { id: 4, modelId: 3, name: "1.4 TFSI" },
  { id: 5, modelId: 3, name: "1.4 TFSI" },
  { id: 6, modelId: 4, name: "3.0 TDI" },
  { id: 7, modelId: 5, name: "3.0 TDI" },
];

const gearboxes = [
  { id: 1, engineId: 1, name: "Manual" },
  { id: 2, engineId: 1, name: "Automatic" },
  { id: 3, engineId: 2, name: "Manual" },
  { id: 4, engineId: 2, name: "Automatic" },
  { id: 5, engineId: 3, name: "Manual" },
  { id: 6, engineId: 3, name: "Automatic" },
  { id: 7, engineId: 4, name: "Manual" },
  { id: 8, engineId: 4, name: "Automatic" },
  { id: 9, engineId: 5, name: "Manual" },
  { id: 10, engineId: 5, name: "Automatic" },
  { id: 11, engineId: 6, name: "Manual" },
  { id: 12, engineId: 6, name: "Automatic" },
  { id: 13, engineId: 7, name: "Manual" },
  { id: 14, engineId: 7, name: "Automatic" },
];

const generations = [
  { id: 1, gearboxe1: 1, name: "F20" },
  { id: 2, gearboxe1: 1, name: "F40" },
  { id: 3, gearboxe1: 2, name: "F22" },
  { id: 4, gearboxe1: 4, name: "8V" },
  { id: 5, gearboxe1: 4, name: "8Y" },
  { id: 6, gearboxe1: 5, name: "B9" },
  { id: 7, gearboxe1: 6, name: "B9" },
  { id: 8, gearboxe1: 7, name: "B8" },
  { id: 9, gearboxe1: 8, name: "B9" },
  { id: 10, gearboxe1: 9, name: "B9" },
  { id: 11, gearboxe1: 10, name: "B9" },
  { id: 12, gearboxe1: 11, name: "B8" },
  { id: 13, gearboxe1: 12, name: "B9" },
  { id: 14, gearboxe1: 13, name: "B9" },
  { id: 15, gearboxe1: 14, name: "B9" },
  { id: 16, gearboxe1: 15, name: "B9" },
  { id: 17, gearboxe1: 16, name: "B9" },
  { id: 18, gearboxe1: 17, name: "B9" },
  { id: 19, gearboxe1: 18, name: "B9" },
  { id: 20, gearboxe1: 19, name: "B9" },
  { id: 21, gearboxe1: 20, name: "B9" },
  { id: 22, gearboxe1: 21, name: "B9" },
  { id: 23, gearboxe1: 22, name: "B9" },
  { id: 24, gearboxe1: 23, name: "B9" },
  { id: 25, gearboxe1: 24, name: "B9" },
  { id: 26, gearboxe1: 25, name: "B9" },
  { id: 27, gearboxe1: 26, name: "B9" },
  { id: 28, gearboxe1: 27, name: "B9" },
  { id: 29, gearboxe1: 28, name: "B9" },
  { id: 30, gearboxe1: 29, name: "B9" },
  { id: 31, gearboxe1: 30, name: "B9" },
  { id: 32, gearboxe1: 31, name: "B9" },
  { id: 33, gearboxe1: 32, name: "B9" },
];

const years = [
  { id: 1, generationId: 1, name: "2011" },
  { id: 2, generationId: 1, name: "2012" },
  { id: 3, generationId: 2, name: "2019" },
  { id: 4, generationId: 2, name: "2020" },
  { id: 5, generationId: 3, name: "2014" },
  { id: 6, generationId: 3, name: "2015" },
  { id: 7, generationId: 4, name: "2016" },
  { id: 8, generationId: 4, name: "2017" },
  { id: 9, generationId: 5, name: "2018" },
  { id: 10, generationId: 5, name: "2019" },
  { id: 11, generationId: 6, name: "2020" },
  { id: 12, generationId: 6, name: "2021" },
  { id: 13, generationId: 7, name: "2014" },
  { id: 14, generationId: 7, name: "2015" },
  { id: 15, generationId: 8, name: "2016" },
  { id: 16, generationId: 8, name: "2017" },
  { id: 17, generationId: 9, name: "2018" },
  { id: 18, generationId: 9, name: "2019" },
  { id: 19, generationId: 10, name: "2020" },
  { id: 20, generationId: 10, name: "2021" },
  { id: 21, generationId: 11, name: "2014" },
  { id: 22, generationId: 11, name: "2015" },
  { id: 23, generationId: 12, name: "2016" },
  { id: 24, generationId: 12, name: "2017" },
  { id: 25, generationId: 13, name: "2018" },
  { id: 26, generationId: 13, name: "2019" },
  { id: 27, generationId: 14, name: "2020" },
  { id: 28, generationId: 14, name: "2021" },
  { id: 29, generationId: 15, name: "2014" },
  { id: 30, generationId: 15, name: "2015" },
];

// USER ROUTES
// User routes - New project

// data per popolare i select

// First call: Get all TYPES of vehicles
app.get("/frontoffice/project/types", (req, res) => {
  res.status(200).send(types);
});

// Second call: Get BRANDS related to the selected vehicle type
app.get("/frontoffice/project/brands/:typeId", (req, res) => {
  const { typeId } = req.params;
  const filteredBrands = brands.filter((brand) =>
    brand.typeId.includes(Number(typeId))
  );
  res.status(200).send(filteredBrands);
});

// Third call: Get MODELS related to the selected brand
app.get("/frontoffice/project/models/:brandId", (req, res) => {
  const { brandId } = req.params;
  const filteredModels = models.filter(
    (model) => model.brandId === Number(brandId)
  );
  res.status(200).send(filteredModels);
});

// Fourth call: Get ENGINES related to the selected model
app.get("/frontoffice/project/engines/:modelId", (req, res) => {
  const { modelId } = req.params;
  const filteredEngines = engines.filter(
    (engine) => engine.modelId === Number(modelId)
  );
  res.status(200).send(filteredEngines);
});

// Fifth call: Get GEARBOXES related to the selected engine
app.get("/frontoffice/project/gearboxes/:engineId", (req, res) => {
  const { engineId } = req.params;
  const filteredGearboxes = gearboxes.filter(
    (gearbox) => gearbox.engineId === Number(engineId)
  );
  res.status(200).send(filteredGearboxes);
});

// Sixth call: Get GENERATIONS related to the selected gearbox
app.get("/frontoffice/project/generations/:gearboxId", (req, res) => {
  const { gearboxId } = req.params;
  const filteredGenerations = generations.filter(
    (generation) => generation.gearboxe1 === Number(gearboxId)
  ); // Note: Check the property name 'gearboxe1' seems incorrect
  res.status(200).send(filteredGenerations);
});

// Seventh call: Get YEARS related to the selected generation
app.get("/frontoffice/project/years/:generationId", (req, res) => {
  const { generationId } = req.params;
  const filteredYears = years.filter(
    (year) => year.generationId === Number(generationId)
  );
  res.status(200).send(filteredYears);
});

// user routes - creazione di un progetto
app.post("/frontoffice/project/:userId/add", (req, res) => {
  const { userId } = req.params;
  let projectData = req.body;

  console.log("projectData", projectData);
  const user = allSlavesData.find((item) => item.id === Number(userId));
  projectData = {
    ...projectData,
    projectId: Math.floor(Math.random() * 100),
    lastModified: new Date().toISOString(),
  };
  if (user) {
    user.projects.push(projectData);

    res.status(200).send({
      projectId: projectData.projectId,
    });
  } else {
    res.status(404).send({
      message: `User with id ${userId} not found`,
    });
  }
});

app.get("/frontoffice/project/:userId/:projectId", (req, res) => {
  const { userId, projectId } = req.params;
  const slave = allSlavesData.find((slave) => slave.id === Number(userId));
  if (slave) {
    console.log("slave", slave);
    const project = slave.projects.find(
      (project) => project.projectId === Number(projectId)
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
      message: `Slave with id ${userId} not found`,
    });
  }
});

// user order credits
// quando lo user conferma il numero di crediti da acquistare, in backend si crea un ordine con un orderId
app.post("/frontoffice/orders/:userId/create", (req, res) => {
  const { userId } = req.params;
  const orderData = req.body;

  const orderCreated = {
    ...orderData.orderData,
    orderId: 123444,
  };

  orders.push(orderCreated);
  res.status(200).send(orderCreated);
});

// quando l'api di pagamento di paypal restituisce la conferma del pagamento, in backend si aggiorna lo stato dell'ordine
// orderData passato come body contient infatti paymentDetails, ovvero paypalOrderId, paymentDate e paymentStatus, dati che vengono restituiti da paypal.
app.put("/frontoffice/orders/:orderId/complete", (req, res) => {
  const { orderId } = req.params;
  const orderData = req.body;

  let orderIndex = orders.findIndex((item) => item.orderId === Number(orderId));
  if (orderIndex !== -1) {
    orders[orderIndex] = {
      ...orders[orderIndex],
      ...orderData,
    };

    res.status(200).send(orders[orderIndex]);
  } else {
    res.status(404).send({
      message: `Order with id ${orderId} not found`,
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
