const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cookieParser());
let cors = require("cors");
const filePath = path.join(__dirname, "faqData.json");

// Funzione per caricare le FAQ dal file JSON
function loadFaqData() {
  const data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data);
}

// Funzione per salvare le FAQ nel file JSON
function saveFaqData(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// Carica le FAQ all'avvio dell'applicazione
const port = 3001;

// entità che simulano i dati del database
const allSlavesData = [
  {
    id: 1,
    storeId: 1, // lo store Id indica l'admin a cui è associato lo slave
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@email.com",
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
        projectId: 1,
        type: "Autovettura",
        brand: "BMW",
        model: "500",
        engine: "118i",
        engineHp: "200",
        year: "2010",
        gearbox: "automatic",
        generation: "F20",
        readingMethod: "Magicmotorsport",
        ecuBrand: "Bosch",
        ecuName: "MEVD17.2",
        services:
          '[{"id": 1, "name": "DTC", "price": 100}, {"id": 2, "name": "ADV", "price": 150}]',
        dtc: ["P1234", "P2345"],
        status: "new",
        lastModified: "2021-10-10",
        userFileBuffer: null,
        userFileName: "FileName.zip",
        userFileId: 43,
        adminFileBuffer: null,
        adminFileName: "FileName.zip",
        adminFileId: 52,
        tickets: [1, 2, 3],
      },
      {
        projectId: 2,
        type: "Autovettura",
        brand: "Audi",
        model: "XUIW",
        engine: "118i",
        engineHp: "200",
        year: "2010",
        gearbox: "automatic",
        generation: "F20",
        readingMethod: "Magicmotorsport",
        ecuBrand: "Bosch",
        ecuName: "MEVD17.2",
        services:
          '[{"id": 1, "name": "DPF", "price": 100}, {"id": 2, "name": "ADV", "price": 150}]',
        dtc: [],
        status: "new",
        lastModified: "2021-10-10",
        userFileBuffer: null,
        userFileName: "FileName.zip",
        userFileId: 43,
        adminFileBuffer: null,
        adminFileName: "FileName.zip",
        adminFileId: 52,
        tickets: [1, 2, 3],
      },
      {
        projectId: 3,
        type: "Autovettura",
        brand: "Fiat",
        model: "500",
        engine: "118i",
        engineHp: "200",
        year: "2010",
        gearbox: "automatic",
        generation: "F20",
        readingMethod: "Magicmotorsport",
        ecuBrand: "Bosch",
        ecuName: "MEVD17.2",
        services:
          '[{"id": 1, "name": "DPF", "price": 100}, {"id": 2, "name": "ADV", "price": 150}]',
        dtc: [],
        status: "inProgress",
        lastModified: "2021-10-10",
        userFileBuffer: null,
        userFileName: "FileName.zip",
        userFileId: 43,
        adminFileBuffer: null,
        adminFileName: "FileName.zip",
        adminFileId: 52,
        tickets: [1, 2, 3],
      },
      {
        projectId: 4,
        type: "Autovettura",
        brand: "BMW",
        model: "500",
        engine: "118i",
        engineHp: "200",
        year: "2010",
        gearbox: "automatic",
        generation: "F20",
        readingMethod: "Magicmotorsport",
        ecuBrand: "Bosch",
        ecuName: "MEVD17.2",
        services:
          '[{"id": 1, "name": "DPF", "price": 100}, {"id": 2, "name": "ADV", "price": 150}]',
        dtc: [],
        status: "pending",
        lastModified: "2021-10-10",
        userFileBuffer: null,
        userFileName: "FileName.zip",
        userFileId: 43,
        adminFileBuffer: null,
        adminFileName: "FileName.zip",
        adminFileId: 52,
        tickets: [],
      },
      {
        projectId: 5,
        type: "Autovettura",
        brand: "Fiat",
        model: "500",
        engine: "118i",
        engineHp: "200",
        year: "2010",
        gearbox: "automatic",
        generation: "F20",
        readingMethod: "Magicmotorsport",
        ecuBrand: "Bosch",
        ecuName: "MEVD17.2",
        services:
          '[{"id": 1, "name": "DPF", "price": 100}, {"id": 2, "name": "ADV", "price": 150}]',
        dtc: [],
        status: "completed",
        lastModified: "2021-10-10",
        userFileBuffer: null,
        userFileName: "FileName.zip",
        userFileId: 43,
        adminFileBuffer: null,
        adminFileName: "FileName.zip",
        adminFileId: 52,
        tickets: [],
      },
    ],
  },
  {
    id: 2,
    storeId: 1, // lo store Id indica l'admin a cui è associato lo slave
    firstName: "Adam",
    lastName: "Nikolson",
    email: "adam@nikolson.it",
    companyName: "AutoYls",
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
        projectId: 1,
        type: "Autovettura",
        brand: "Audi",
        model: "500",
        engine: "118i",
        engineHp: "200",
        year: "2010",
        gearbox: "automatic",
        generation: "F20",
        readingMethod: "Magicmotorsport",
        ecuBrand: "Bosch",
        ecuName: "MEVD17.2",
        services:
          '[{"id": 1, "name": "DTC", "price": 100}, {"id": 2, "name": "ADV", "price": 150}]',
        dtc: ["P1234", "P2345"],
        status: "new",
        lastModified: "2021-10-10",
        userFileBuffer: null,
        userFileName: "FileName.zip",
        userFileId: 43,
        adminFileBuffer: null,
        adminFileName: "FileName.zip",
        adminFileId: 52,
        tickets: [1, 2, 3],
      },
      {
        projectId: 2,
        type: "Autovettura",
        brand: "Fiat",
        model: "500",
        engine: "118i",
        engineHp: "200",
        year: "2010",
        gearbox: "automatic",
        generation: "F20",
        readingMethod: "Magicmotorsport",
        ecuBrand: "Bosch",
        ecuName: "MEVD17.2",
        services:
          '[{"id": 1, "name": "DPF", "price": 100}, {"id": 2, "name": "ADV", "price": 150}]',
        dtc: [],
        status: "new",
        lastModified: "2021-10-10",
        userFileBuffer: null,
        userFileName: "FileName.zip",
        userFileId: 43,
        adminFileBuffer: null,
        adminFileName: "FileName.zip",
        adminFileId: 52,
        tickets: [1, 2, 3],
      },
      {
        projectId: 3,
        type: "Autovettura",
        brand: "Fiat",
        model: "500",
        engine: "118i",
        engineHp: "200",
        year: "2010",
        gearbox: "automatic",
        generation: "F20",
        readingMethod: "Magicmotor",
        ecuBrand: "Bosch",
        ecuName: "MEVD17.2",
        services:
          '[{"id": 1, "name": "DPF", "price": 100}, {"id": 2, "name": "ADV", "price": 150}]',
        dtc: [],
        status: "new",
        lastModified: "2021-10-10",
        userFileBuffer: null,
        userFileName: "FileName.zip",
        userFileId: 43,
        adminFileBuffer: null,
        adminFileName: "FileName.zip",
        adminFileId: 52,
        tickets: [1, 2, 3],
      },
    ],
  },
  {
    id: 3,
    storeId: 1, // lo store Id indica l'admin a cui è associato lo slave
    firstName: "Josh",
    lastName: "Mayer",
    email: "josh@mayer.com",
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
        projectId: 1,
        type: "Autovettura",
        brand: "Audi",
        model: "500",
        engine: "118i",
        engineHp: "200",
        year: "2010",
        gearbox: "automatic",
        generation: "F20",
        readingMethod: "Magicmotorsport",
        ecuBrand: "Bosch",
        ecuName: "MEVD17.2",
        services:
          '[{"id": 1, "name": "DTC", "price": 100}, {"id": 2, "name": "ADV", "price": 150}]',
        dtc: ["P1234", "P2345"],
        status: "new",
        lastModified: "2021-10-10",
        userFileBuffer: null,
        useruserFileName: "FileName.zip",
        userFileId: 43,
        adminFileBuffer: null,
        adminFileName: "FileName.zip",
        adminFileId: 52,
        tickets: [1, 2, 3],
      },
      {
        projectId: 2,
        type: "Autovettura",
        brand: "Fiat",
        model: "500",
        engine: "118i",
        engineHp: "200",
        year: "2010",
        gearbox: "automatic",
        generation: "F20",
        readingMethod: "Magicmotorsport",
        ecuBrand: "Bosch",
        ecuName: "MEVD17.2",
        services:
          '[{"id": 1, "name": "DPF", "price": 100}, {"id": 2, "name": "ADV", "price": 150}]',
        dtc: [],
        status: "new",
        lastModified: "2021-10-10",
        userFileBuffer: null,
        userFileName: "FileName.zip",
        userFileId: 43,
        adminFileBuffer: null,
        adminFileName: "FileName.zip",
        adminFileId: 52,
        tickets: [1, 2, 3],
      },
      {
        projectId: 3,
        type: "Autovettura",
        brand: "Fiat",
        model: "500",
        engine: "118i",
        engineHp: "200",
        year: "2010",
        gearbox: "automatic",
        generation: "F20",
        readingMethod: "Magicmotor",
        ecuBrand: "Bosch",
        ecuName: "MEVD17.2",
        services:
          '[{"id": 1, "name": "DPF", "price": 100}, {"id": 2, "name": "ADV", "price": 150}]',
        dtc: [],
        status: "new",
        lastModified: "2021-10-10",
        userFileBuffer: null,
        userFileName: "FileName.zip",
        userFileId: 43,
        adminFileBuffer: null,
        adminFileName: "FileName.zip",
        adminFileId: 52,
        tickets: [1, 2, 3],
      },
    ],
  },
  {
    id: 4,
    storeId: 1, // lo store Id indica l'admin a cui è associato lo slave
    firstName: "Mike",
    lastName: "Nelson",
    email: "mike@nelson.it",
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
        projectId: 1,
        type: "Autovettura",
        brand: "Audi",
        model: "500",
        engine: "118i",
        engineHp: "200",
        year: "2010",
        gearbox: "automatic",
        generation: "F20",
        readingMethod: "Magicmotorsport",
        ecuBrand: "Bosch",
        ecuName: "MEVD17.2",
        services:
          '[{"id": 1, "name": "DTC", "price": 100}, {"id": 2, "name": "ADV", "price": 150}]',
        dtc: ["P1234", "P2345"],
        status: "new",
        lastModified: "2021-10-10",
        userFileBuffer: null,
        userFileName: "FileName.zip",
        userFileId: 43,
        adminFileBuffer: null,
        adminFileName: "FileName.zip",
        adminFileId: 52,
        tickets: [1, 2, 3],
      },
      {
        projectId: 2,
        type: "Autovettura",
        brand: "Fiat",
        model: "500",
        engine: "118i",
        engineHp: "200",
        year: "2010",
        gearbox: "automatic",
        generation: "F20",
        readingMethod: "Magicmotorsport",
        ecuBrand: "Bosch",
        ecuName: "MEVD17.2",
        services:
          '[{"id": 1, "name": "DTC", "price": 100}, {"id": 2, "name": "ADV", "price": 150}]',
        dtc: ["P1234", "P2345"],
        status: "new",
        lastModified: "2021-10-10",
        userFileBuffer: null,
        userFileName: "FileName.zip",
        userFileId: 43,
        adminFileBuffer: null,
        adminFileName: "FileName.zip",
        adminFileId: 52,
        tickets: [1, 2, 3],
      },
      {
        projectId: 3,
        type: "Autovettura",
        brand: "Fiat",
        model: "500",
        engine: "118i",
        engineHp: "200",
        year: "2010",
        gearbox: "automatic",
        generation: "F20",
        readingMethod: "Magicmotor",
        ecuBrand: "Bosch",
        ecuName: "MEVD17.2",
        services:
          '[{"id": 1, "name": "DPF", "price": 100}, {"id": 2, "name": "ADV", "price": 150}]',
        dtc: [],
        status: "new",
        lastModified: "2021-10-10",
        userFileBuffer: null,
        userFileName: "FileName.zip",
        userFileId: 43,
        adminFileBuffer: null,
        adminFileName: "FileName.zip",
        adminFileId: 52,
        tickets: [1, 2, 3],
      },
    ],
  },
  {
    id: 5,
    storeId: 1, // lo store Id indica l'admin a cui è associato lo slave
    firstName: "Josh",
    lastName: "Viola",
    email: "josh@viola.it",
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
        projectId: 1,
        type: "Autovettura",
        brand: "Audi",
        model: "500",
        engine: "118i",
        engineHp: "200",
        year: "2010",
        gearbox: "automatic",
        generation: "F20",
        readingMethod: "Magicmotorsport",
        ecuBrand: "Bosch",
        ecuName: "MEVD17.2",
        services:
          '[{"id": 1, "name": "DTC", "price": 100}, {"id": 2, "name": "ADV", "price": 150}]',
        dtc: ["P1234", "P2345"],
        status: "new",
        lastModified: "2021-10-10",
        userFileBuffer: null,
        userFileName: "FileName.zip",
        userFileId: 43,
        adminFileBuffer: null,
        adminFileName: "FileName.zip",
        adminFileId: 52,
        tickets: [1, 2, 3],
      },
      {
        projectId: 2,
        type: "Autovettura",
        brand: "Fiat",
        model: "500",
        engine: "118i",
        engineHp: "200",
        year: "2010",
        gearbox: "automatic",
        generation: "F20",
        readingMethod: "Magicmotorsport",
        ecuBrand: "Bosch",
        ecuName: "MEVD17.2",
        services:
          '[{"id": 1, "name": "DTC", "price": 100}, {"id": 2, "name": "ADV", "price": 150}]',
        dtc: ["P1234", "P2345"],
        status: "new",
        lastModified: "2021-10-10",
        userFileBuffer: null,
        userFileName: "FileName.zip",
        userFileId: 43,
        adminFileBuffer: null,
        adminFileName: "FileName.zip",
        adminFileId: 52,
        tickets: [1, 2, 3],
      },
      {
        projectId: 3,
        type: "Autovettura",
        brand: "Fiat",
        model: "500",
        engine: "118i",
        engineHp: "200",
        year: "2010",
        gearbox: "automatic",
        generation: "F20",
        readingMethod: "Magicmotor",
        ecuBrand: "Bosch",
        ecuName: "MEVD17.2",
        services:
          '[{"id": 1, "name": "DPF", "price": 100}, {"id": 2, "name": "ADV", "price": 150}]',
        dtc: [],
        status: "new",
        lastModified: "2021-10-10",
        userFileBuffer: null,
        userFileName: "FileName.zip",
        userFileId: 43,
        adminFileBuffer: null,
        adminFileName: "FileName.zip",
        adminFileId: 52,
        tickets: [1, 2, 3],
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
    title: "Necessità di assistenza per ...",
    description:
      "Problema rilevato nell'ambito del caricamento del file. Ho riscontrato un errore di tipo x, come posso risolvere senza perdere i progressi?",
    date: "2024-07-05",
    lastUpdated: "2024-07-05",
    userAttachments: [
      {
        userFileId: 1,
        userFileName: "file.zip",
        userFileBuffer: [0x50, 0x4b, 0x03, 0x04],
      },
    ],
    messages: [],
    resolutionDate: null,
  },
  {
    id: 2,
    userId: 1,
    projectId: 1, // id della lavorazione collegata al ticket
    companyName: "Smart Car",
    status: "inProgress", // altri status: "open", "completed", "closed"
    category: "administrative",
    title: "Necessità di assistenza per ...",
    description:
      "Problema rilevato nell'ambito del caricamento del file. Ho riscontrato un errore di tipo x, come posso risolvere senza perdere i progressi?",
    date: "2024-07-05",
    lastUpdated: "2024-07-05",
    userAttachments: [
      {
        userFileId: 1,
        userFileName: "file.zip",
        userFileBuffer: [0x50, 0x4b, 0x03, 0x04],
      },
    ],
    messages: [],
    resolutionDate: null,
  },
  {
    id: 3,
    userId: 1,
    projectId: 1, // id della lavorazione collegata al ticket
    companyName: "Flash car",
    status: "open", // altri status: "open", "completed", "closed"
    category: "administrative",
    title: "Necessità di assistenza per ...",
    description:
      "Problema rilevato nell'ambito del caricamento del file. Ho riscontrato un errore di tipo x, come posso risolvere senza perdere i progressi?",
    date: "2024-07-05",
    lastUpdated: "2024-07-05",
    userAttachments: [
      {
        userFileId: 1,
        userFileName: "file.zip",
        userFileBuffer: [0x50, 0x4b, 0x03, 0x04],
      },
    ],
    messages: [],
    resolutionDate: null,
  },
  {
    id: 2,
    userId: 2,
    projectId: 2,
    companyName: "Speed Tuning",
    status: "open", // altri status: "inProgress", "completed", "closed"
    category: "technical",
    title: "Necessità di assistenza per ...",
    description:
      "Problema rilevato nell'ambito del caricamento del file. Ho riscontrato un errore di tipo x, come posso risolvere senza perdere i miei progressi?",
    date: "2024-07-05",
    lastUpdated: "2024-07-05",
    userAttachments: [
      {
        userFileId: 2,
        userFileName: "file.zip",
        userFileBuffer: null,
      },
    ],
    adminFileBuffer: null,
    adminFileName: "FileName.zip",
    adminFileId: 52,
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
    companyName: "Car Space",
    status: "completed", // altri status: "open", "inProgress", "closed"
    category: "technical",
    title: "Necessità di assistenza per ...",
    description:
      "Problema rilevato nell'ambito del caricamento del file. Ho riscontrato un errore di tipo x, come posso risolvere senza perdere i miei progressi?",
    date: "2024-07-05",
    lastUpdated: "2024-07-05",
    userAttachments: [
      {
        userFileId: 1,
        userFileName: "file.zip",
        userFileBuffer: null,
      },
    ],
    adminFileBuffer: null,
    adminFileName: "FileName.zip",
    adminFileId: 52,
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
    companyName: "Tuning now",
    status: "closed", // altri status: "open", "inProgress", "closed"
    category: "technical",
    title: "Necessità di assistenza per ...",
    description:
      "Problema rilevato nell'ambito del caricamento del file. Ho riscontrato un errore di tipo x, come posso risolvere senza perdere i miei progressi?",
    date: "2024-07-05",
    lastUpdated: "2024-07-05",
    userAttachments: [
      {
        userFileId: 1,
        userFileName: "file.zip",
        userFileBuffer: null,
      },
    ],
    adminFileBuffer: null,
    adminFileName: "FileName.zip",
    adminFileId: 52,
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
    companyName: "Extra Tuning",
    status: "closed", // altri status: "open", "inProgress", "closed"
    category: "technical",
    title: "Necessità di assistenza per ...",
    description:
      "Problema rilevato nell'ambito del caricamento del file. Ho riscontrato un errore di tipo x, come posso risolvere senza perdere i miei progressi?",
    date: "2024-07-05",
    lastUpdated: "2024-07-05",
    userAttachments: [
      {
        userFileId: 1,
        userFileName: "file.zip",
        userFileBuffer: null,
      },
    ],
    adminFileBuffer: null,
    adminFileName: "FileName.zip",
    adminFileId: 52,
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
    companyName: "Now Tuning",
    status: "closed", // altri status: "open", "inProgress", "closed"
    category: "technical",
    title: "Necessità di assistenza per ...",
    description:
      "Problema rilevato nell'ambito del caricamento del file. Ho riscontrato un errore di tipo x, come posso risolvere senza perdere i miei progressi?",
    date: "2024-07-05",
    lastUpdated: "2024-07-05",
    userAttachments: [
      {
        userFileId: 1,
        userFileName: "file.zip",
        userFileBuffer: null,
      },
    ],
    adminFileBuffer: null,
    adminFileName: "FileName.zip",
    adminFileId: 52,
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

let allSolutions = [
  { id: 1, name: "DPF", price: 50 },
  { id: 2, name: "ADV", price: 25 },
  { id: 3, name: "EGR", price: 60 },
  { id: 4, name: "ADBLUE", price: 40 },
  { id: 5, name: "SCR", price: 35 },
  { id: 6, name: "FULL EMISSION", price: 100 },
  { id: 7, name: "MAF", price: 25 },
  { id: 8, name: "TVA", price: 35 },
  { id: 9, name: "LAMBDA", price: 50 },
  { id: 10, name: "O2", price: 15 },
  { id: 11, name: "FLAPS", price: 55 },
  { id: 12, name: "SWIRL", price: 68 },
  { id: 13, name: "NOX", price: 36 },
  { id: 14, name: "SPEED LIMIT", price: 50 },
  { id: 15, name: "VMAX", price: 26 },
  { id: 16, name: "GPF", price: 45 },
  { id: 17, name: "OPF", price: 50 },
  { id: 18, name: "IAT", price: 50 },
  { id: 19, name: "HOT START", price: 100 },
  { id: 20, name: "WATER PUMP", price: 70 },
  { id: 21, name: "CATALYST", price: 60 },
  { id: 22, name: "SPORT DISPLAY CALIBRATION", price: 55 },
  { id: 23, name: "EXHAUST FLAP", price: 45 },
  { id: 24, name: "EVAP", price: 68 },
  { id: 25, name: "TORQUE MONITORING", price: 90 },
  { id: 26, name: "START STOP", price: 80 },
  { id: 27, name: "READINESS CALIBRATION", price: 80 },
  { id: 28, name: "AGS", price: 90 },
  { id: 29, name: "COLD START SOUND", price: 45 },
  { id: 30, name: "REV LIMITER", price: 60 },
  { id: 31, name: "OIL PRESSURE", price: 70 },
  { id: 32, name: "TPROT", price: 80 },
  { id: 33, name: "KICKDOWN", price: 50 },
  { id: 34, name: "ACT", price: 100 },
  { id: 35, name: "STAGE 1", price: 30 },
  { id: 36, name: "STAGE 2", price: 30 },
  { id: 37, name: "STAGE 3", price: 30 },
  { id: 38, name: "DTC", price: 100 },
];

// fasce di sconto per i crediti
let pricingCredits = [
  {
    id: 1,
    minTier: 0,
    maxTier: 100,
    unitPrice: 4,
    isSpecial: false,
  },
  {
    id: 2,
    minTier: 101,
    maxTier: 200,
    unitPrice: 3,
    isSpecial: true,
  },
];

const orders = [];

// per simulare upload e downolad dei file

const fileStorage = {};
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(cors());
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});

let faqData = loadFaqData();

let userData = {
  userId: 1,
  role: "admin",
  designId: 1,
  firstName: "John",
  lastName: "Smith",
  companyName: "Smith srl",
  email: "john.smith@email.com",
  address: "Via Roma 1",
  city: "Roma",
  zipcode: "00100",
  vatNumber: "12345678901",
  phone: "3334445555",
  credits: 1000,
  isSlave: true, // in fase di registrazione ha spuntato la checkbox "I am a slave"
  isFirstAccess: true, // sta facendo accesso con la password temporanea
};

// COMMON ROUTES

// OK
app.get(`/user/:userId/settings`, (req, res) => {
  const userId = req.params.userId;
  res.status(200).send({
    userId: userId,
    designId: 1,
  });
});

// OK
app.get(`/user/:userId`, (req, res) => {
  const userId = req.params.userId;
  res.status(200).send({
    ...userData,
    userId: userId,
  });
});

// OK
app.put(`/user/:userId`, (req, res) => {
  const userId = req.params.userId;
  const userInfo = req.body;
  const userDataUpdated = {
    ...userData,
    ...userInfo,
  };
  console.log("updatedUser", userDataUpdated);
  console.log("userData", userData);

  res.status(200).send({
    ...userDataUpdated,
  });
});

// Download file
// TODO
app.get(`/export/:fileId`, (req, res) => {
  const { fileId } = req.params;
  const storedFile = fileStorage[fileId];
  if (storedFile) {
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${encodeURIComponent(storedFile.fileName)}"`
    );
    res.setHeader("Content-Type", "application/octet-stream");
    res.setHeader("Access-Control-Expose-Headers", "Content-Disposition"); // MOLTO IMPORTANTE
    res.send(storedFile.fileBuffer);
  } else {
    res.status(404).send({ error: "File not found" });
  }
});

// LOGIN/REGISTER

// OK
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  // se email e password sono uguali a test@test e pass123 ovvero quelli che ho impostato io come corretti
  // allora mi aspetto che il backend esegua una chiamata che restituisca i dati dell'utente e il suo jwt token
  if (email === "john.smith@email.com" && password === "ASDsder_!!12-3") {
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

// OK
app.post(`/logout/${userData.userId}`, (req, res) => {
  res.clearCookie("token");
  res.status(200).send({
    isLoggedOut: true,
  });
});

// OK
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

// OK
app.post("/change-password", (req, res) => {
  const { email, temporaryPassword, newPassword, salveCode } = req.body;
  if (
    email === "john.smith@email.com" &&
    temporaryPassword === "ASDsder_!!12-3"
  ) {
    //questa chiamata verifica che l'utente abbia inserito corretta email e vecchia password,
    // salva la nuova password associata alla email e poi modifica la scheda utente, settando isFirstAccess === false
    userData = {
      ...userData,
      isFirstAccess: false,
    };
    res.status(200).send({
      ...userData,
    });
  } else {
    res.status(401).send({ error: "Unauthorized user" });
  }
});

// ADMIN ROUTES
// Admin routes - Slaves

// OK
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

// OK
app.get("/backoffice/slaves/:slaveId", (req, res) => {
  const slaveId = req.params.slaveId;
  const slave = allSlavesData.find((item) => item.id === Number(slaveId));
  res.status(200).send(slave);
  // selezione dei dati: escludo: id, projects, password,
  // se lo status è pending, devo fare anche una chiamata alla tabella slaves_temporary con l'id dello slave per ottenere la password temporanea
  // per il primo accesso
});

// OK
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

  let filteredProjects = slave.projects.reverse();

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
    notFilteredData: slave.projects.reverse(),
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

// OK
app.get("/backoffice/slaves/:slaveId/projects/:projectId", (req, res) => {
  const { slaveId, projectId } = req.params;
  const slave = allSlavesData.find((slave) => slave.id === Number(slaveId));
  if (slave) {
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
      message: `Slave with id ${slaveId} not found`,
    });
  }
});

//FILE
// OK
app.put(
  `/backoffice/slaves/:slaveId/projects/:projectId`,
  upload.single("file"),
  (req, res) => {
    const { slaveId, projectId } = req.params;
    let formData = req.body;
    console.log("formData", formData);
    const file = req.file;
    console.log("file", file);

    // Handle the status update
    const status = formData.status;

    const fileId = Math.floor(Math.random() * 100);
    if (file) {
      fileStorage[fileId] = {
        fileBuffer: file.buffer,
        fileName: file.originalname,
        fileId: fileId,
      };
    }

    const slave = allSlavesData.find((item) => item.id == slaveId);
    const newProjectData = {
      ...(status && { status }), // Only include status if it was sent
      ...(file && {
        adminFileBuffer: file.buffer,
        adminFileName: file.originalname,
        adminFileId: fileId,
      }),
    };

    if (slave) {
      const projectIndex = slave.projects.findIndex(
        (p) => p.projectId == projectId
      );
      if (projectIndex !== -1) {
        slave.projects[projectIndex] = {
          ...slave.projects[projectIndex],
          ...newProjectData,
        };
        res.status(200).send({
          updatedProject: slave.projects[projectIndex],
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
  }
);

// OK
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

// Admin routes - counters: per avere i conteggi da mostrare nella dashboard come dati di recap
// OK
app.get("/backoffice/projects/counter", (req, res) => {
  try {
    const totalProjects = allSlavesData.reduce((acc, curr) => {
      return acc + curr.projects.length;
    }, 0);

    const totalPendingProjects = allSlavesData.reduce((acc, curr) => {
      return (
        acc +
        curr.projects.filter((project) => project.status === "pending").length
      );
    }, 0);
    const totalRefundedProjects = allSlavesData.reduce((acc, curr) => {
      return (
        acc +
        curr.projects.filter((project) => project.status === "refunded").length
      );
    }, 0);
    const totalFailedProjects = allSlavesData.reduce((acc, curr) => {
      return (
        acc +
        curr.projects.filter((project) => project.status === "failed").length
      );
    }, 0);
    const totalInProgressProjects = allSlavesData.reduce((acc, curr) => {
      return (
        acc +
        curr.projects.filter((project) => project.status === "inProgress")
          .length
      );
    }, 0);
    const totalCompletedProjects = allSlavesData.reduce((acc, curr) => {
      return (
        acc +
        curr.projects.filter((project) => project.status === "completed").length
      );
    }, 0);

    const totalNewProjects = allSlavesData.reduce((acc, curr) => {
      return (
        acc + curr.projects.filter((project) => project.status === "new").length
      );
    }, 0);

    return res.status(200).send({
      totalProjects: totalProjects,
      totalNewProjects: totalNewProjects,
      totalRefundedProjects: totalRefundedProjects,
      totalFailedProjects: totalFailedProjects,
      totalInProgressProjects: totalInProgressProjects,
      totalPendingProjects: totalPendingProjects,
      totalCompletedProjects: totalCompletedProjects,
    });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

// Per il grafico della dashboard Serve anche una chiamata che faccia GROUP BY delle lavorazioni completate per mese per gli ultimi 6 mesi
// OK
app.get("/backoffice/tickets/counter", (req, res) => {
  try {
    const totalOpenTickets = allTickets.filter(
      (ticket) => ticket.status === "open"
    ).length;
    const totalInProgressTickets = allTickets.filter(
      (ticket) => ticket.status === "inProgress"
    ).length;
    const totalCompletedTickets = allTickets.filter(
      (ticket) => ticket.status === "completed"
    ).length;
    const totalClosedTickets = allTickets.filter(
      (ticket) => ticket.status === "closed"
    ).length;
    return res.status(200).send({
      totalTickets: allTickets.length,
      totalOpenTickets: totalOpenTickets,
      totalInProgressTickets: totalInProgressTickets,
      totalCompletedTickets: totalCompletedTickets,
      totalClosedTickets: totalClosedTickets,
    });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

// OK
app.get("/backoffice/slaves-counter", (req, res) => {
  try {
    const totalUsers = allSlavesData.length;
    const totalActiveUsers = allSlavesData.filter(
      (slave) => slave.status === "active"
    ).length;
    const totalPendingUsers = allSlavesData.filter(
      (slave) => slave.status === "pending"
    ).length;
    const totalBannedUsers = allSlavesData.filter(
      (slave) => slave.status === "banned"
    ).length;
    console.log("totalUsers", totalUsers);
    console.log("totalActiveUsers", totalActiveUsers);
    console.log("totalPendingUsers", totalPendingUsers);
    console.log("totalBannedUsers", totalBannedUsers);

    return res.status(200).send({
      totalSlaves: totalUsers,
      totalActiveUsers: totalActiveUsers,
      totalPendingUsers: totalPendingUsers,
      totalBannedUsers: totalBannedUsers,
    });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

// Admin routes - Tickets
// OK
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

// OK
app.get("/backoffice/tickets/:id", (req, res) => {
  const ticketId = req.params.id;
  const ticket = allTickets.find((item) => item.id === Number(ticketId));
  res.status(200).send(ticket);
});

// OK
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

// OK
app.post(
  "/backoffice/tickets/:id/messages",
  upload.single("file"),
  (req, res) => {
    const ticketId = req.params.id;
    const messageData = req.body;
    const file = req.file;
    const fileId = Math.floor(Math.random() * 100);

    if (file) {
      fileStorage[fileId] = {
        fileBuffer: file.buffer,
        fileName: file.originalname,
        fileId: fileId,
      };
    }
    // questa chiamata deve aggiungere una nuova riga alla tabella tickets_messages associando il messaggio al ticket con id ticketId
    // post o put?
    const ticket = allTickets.find((item) => item.id === Number(ticketId));
    const newMessageData = {
      ...messageData,
      ticketFileBuffer: file ? file.buffer : null,
      ticketFileName: file ? file.originalname : null,
      ticketFileId: file ? fileId : null,
    };

    if (ticket) {
      console.log("newMessageData", newMessageData);
      ticket.messages.push(newMessageData);
      res.status(200).send({
        updatedTicket: ticket,
      });
    } else {
      res.status(404).send({
        message: `Ticket with id ${ticketId} not found`,
      });
    }
  }
);

// Admin routes - Pricing Services solutionss
// TODO
app.get("/backoffice/solutions", (req, res) => {
  res.status(200).send(allSolutions);
});

// TODO
app.put("/backoffice/solutions", (req, res) => {
  let updatedSolutions = req.body;
  allSolutions = updatedSolutions;
  res.status(200).send(allSolutions);
});

// Admin routes - Pricing credits

// OK
app.get("/backoffice/credits", (req, res) => {
  res.status(200).send(pricingCredits);
});

// TODO
app.put("/backoffice/credits", (req, res) => {
  let updatedCredits = req.body;
  pricingCredits = updatedCredits;
  res.status(200).send(pricingCredits);
});

// Admin routes - faq
// TODO
app.get("/backoffice/faq", (req, res) => {
  const { title, description, faqList } = faqData;
  res.status(200).send({
    title,
    description,
    faqList,
  });
});

// Admin routes - create faq
// TODO
app.post("/backoffice/faq", (req, res) => {
  const { question, answer } = req.body;
  const newFaq = {
    id: faqData.faqList.length
      ? faqData.faqList[faqData.faqList.length - 1].id + 1
      : 0,
    question: question,
    answer: answer,
  };
  faqData.faqList.push(newFaq);
  saveFaqData(faqData);
  res.status(201).send(newFaq);
});

// Admin routes - update faq
// TODO
app.put("/backoffice/faq/:id", (req, res) => {
  const faqId = parseInt(req.params.id, 10);
  const { question, answer } = req.body;
  const index = faqData.faqList.findIndex((faq) => faq.id === faqId);
  if (index !== -1) {
    faqData.faqList[index] = {
      ...faqData.faqList[index],
      question: question,
      answer: answer,
    };
    saveFaqData(faqData);
    res.status(200).send(faqData.faqList[index]);
  } else {
    res.status(404).send({ message: "FAQ not found" });
  }

  // const { newFaqData } = req.body;
  // console.log("newFaqData", req.body);
  // const index = faqData.faqList.findIndex((faq) => faq.id === faqId);
  // if (index !== -1) {
  //   faqData.faqList[index] = { ...faqData.faqList[index], ...newFaqData };
  //   saveFaqData(faqData);
  //   res.status(200).send(faqData.faqList[index]);
  // } else {
  //   res.status(404).send({ message: "FAQ not found" });
  // }
});

// Admin routes - delete faq
// TODO
app.delete("/backoffice/faq/:id", (req, res) => {
  const faqId = parseInt(req.params.id, 10);
  const initialLength = faqData.faqList.length;
  faqData.faqList = faqData.faqList.filter((faq) => faq.id !== faqId);
  if (faqData.faqList.length < initialLength) {
    saveFaqData(faqData);
    res.status(200).send({ message: "FAQ deleted successfully" });
  } else {
    res.status(404).send({ message: "FAQ not found" });
  }
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
  { id: 1, modelId: 1, name: "B38" },
  { id: 2, modelId: 1, name: "B47" },
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
const engineHp = [
  { id: 1, engineId: 1, name: 231 },
  { id: 2, engineId: 1, name: 114 },
  { id: 3, engineId: 2, name: 150 },
  { id: 4, engineId: 2, name: 180 },
  { id: 5, engineId: 3, name: 100 },
  { id: 6, engineId: 3, name: 120 },
  { id: 7, engineId: 4, name: 100 },
  { id: 8, engineId: 4, name: 120 },
  { id: 9, engineId: 5, name: 100 },
  { id: 10, engineId: 5, name: 120 },
  { id: 11, engineId: 6, name: 100 },
  { id: 12, engineId: 6, name: 120 },
  { id: 13, engineId: 7, name: 100 },
  { id: 14, engineId: 7, name: 120 },
];
const generations = [
  { id: 1, gearboxe1: 1, name: "E81" },
  { id: 1, gearboxe1: 1, name: "E82" },
  { id: 1, gearboxe1: 1, name: "E87" },
  { id: 1, gearboxe1: 1, name: "E88" },
  { id: 2, gearboxe1: 1, name: "E82" },
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
  { id: 1, generationId: 1, name: "2004" },
  { id: 1, generationId: 1, name: "2013" },
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
const readingMethods = [
  { id: 1, name: "MagicMotorsport Flex" },
  { id: 2, name: "Alientech Kess" },
  { id: 3, name: "Alientech K-Tag" },
  { id: 4, name: "Dimsport New Trasdata" },
  { id: 5, name: "Dimsport Genius" },
  { id: 6, name: "Bosch" },
  { id: 7, name: "ECM Titanium" },
  { id: 8, name: "WinOLS" },
  { id: 9, name: "Swiftec" },
];
const ecuBrands = [
  { id: 1, name: "Bosch" },
  { id: 2, name: "Siemens" },
  { id: 3, name: "Delphi" },
  { id: 4, name: "Denso" },
  { id: 5, name: "Marelli" },
  { id: 6, name: "Continental" },
  { id: 7, name: "Mitsubishi" },
];
const ecuNames = [
  { id: 1, ecuBrandId: 1, name: "EDC15" },
  { id: 2, ecuBrandId: 1, name: "EDC16" },
  { id: 3, ecuBrandId: 2, name: "EDC17" },
  { id: 4, ecuBrandId: 2, name: "SID201" },
  { id: 5, ecuBrandId: 2, name: "SID202" },
  { id: 7, ecuBrandId: 3, name: "DCM3.7" },
  { id: 8, ecuBrandId: 3, name: "DCM3.7AP" },
  { id: 9, ecuBrandId: 4, name: "DENSO" },
  { id: 10, ecuBrandId: 5, name: "MJD" },
  { id: 11, ecuBrandId: 6, name: "SIM2K" },
  { id: 12, ecuBrandId: 6, name: "SIM4K" },
  { id: 13, ecuBrandId: 7, name: "SIM8K" },
];

// TODO
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

// Fifth call: Get GEARBOXES and ENGINEHP related to the selected engine
app.get("/frontoffice/project/gearboxes/:engineId", (req, res) => {
  const { engineId } = req.params;
  const filteredGearboxes = gearboxes.filter(
    (gearbox) => gearbox.engineId === Number(engineId)
  );
  res.status(200).send(filteredGearboxes);
});

app.get("/frontoffice/project/engineHp/:engineId", (req, res) => {
  const { engineId } = req.params;
  const filteredEngineHp = engineHp.filter(
    (engine) => engine.engineId === Number(engineId)
  );
  res.status(200).send(filteredEngineHp);
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

app.get("/frontoffice/project/readingMethods", (req, res) => {
  res.status(200).send(readingMethods);
});

app.get("/frontoffice/project/ecuBrands", (req, res) => {
  res.status(200).send(ecuBrands);
});

app.get("/frontoffice/project/ecuNames/:ecuBrandId", (req, res) => {
  const { ecuBrandId } = req.params;
  const filteredEcuNames = ecuNames.filter(
    (ecu) => ecu.ecuBrandId === Number(ecuBrandId)
  );
  res.status(200).send(filteredEcuNames);
});
// user routes - lista delle solutions acquistabili con prezzo
// TODO
app.get("/frontoffice/solutions", (req, res) => {
  res.status(200).send(allSolutions);
});

// user routes - creazione di un progetto
// TODO
app.post(
  "/frontoffice/project/:userId/add",
  upload.single("file"),
  (req, res) => {
    const { userId } = req.params;
    let projectData = req.body;
    const file = req.file;
    const fileId = Math.floor(Math.random() * 100);
    if (file) {
      //salvo i dati del file in fileStorage (provvisoriamente)
      fileStorage[fileId] = {
        fileBuffer: file.buffer,
        fileName: file.originalname,
        fileId: fileId,
      };
      console.log("fileId uplopaded:", fileId);
    }

    const user = allSlavesData.find((item) => item.id === Number(userId));
    const newProj = {
      ...projectData,
      projectId: Math.floor(Math.random() * 50) + 50,
      lastModified: new Date().toISOString().slice(0, 10),
      userFileBuffer: file ? file.buffer : null,
      userFileName: file ? file.originalname : null,
      userFileId: fileId,
      status: "new",
      tickets: [],
    };

    if (user) {
      user.projects.push(newProj);
      console.log("new project added:", newProj);

      res.status(200).send({
        projectId: newProj.projectId,
      });
    } else {
      res.status(404).send({
        message: `User with id ${userId} not found`,
      });
    }
  }
);

// OK
app.get("/frontoffice/project/:userId/:projectId", (req, res) => {
  const { userId, projectId } = req.params;
  const slave = allSlavesData.find((slave) => slave.id === Number(userId));
  if (slave) {
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

//user routes - elenco progetti
// OK
app.get("/frontoffice/:userId/projects", (req, res) => {
  const slaveId = req.params.userId;
  const { page = 1, status, brand, model, date } = req.query;
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
      (date !== "all" ? project.date === date : true)
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

// user routes - ticket
app.get("/frontoffice/tickets/:userId", (req, res) => {
  const { page = 1, status, category, companyName, date } = req.query;
  const limit = 4;
  const userTickets = allTickets.filter(
    (ticket) => ticket.userId === Number(req.params.userId)
  );

  let filteredTickets = userTickets;
  console.log("userTickets", userTickets);

  filteredTickets = userTickets.filter((ticket) => {
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
    notFilteredData: userTickets,
    pagination: {
      activePage: Number(page),
      itemsPerPage: limit,
      totalPages: totalPages,
      totalItems: resultsCount,
      totalOpenTickets: userTickets.filter((item) => item.status === "open")
        .length,
      totalInProgressTickets: userTickets.filter(
        (item) => item.status === "inProgress"
      ).length,
      totalCompletedTickets: userTickets.filter(
        (item) => item.status === "completed"
      ).length,
      totalClosedTickets: userTickets.filter((item) => item.status === "closed")
        .length,
    },
  });
});

app.get("/frontoffice/tickets/:userId/:id", (req, res) => {
  const { userId, id: ticketId } = req.params;
  const ticket = allTickets.find(
    (ticket) =>
      ticket.userId === Number(userId) && ticket.id === Number(ticketId)
  );
  res.status(200).send(ticket);
});

app.post(
  "/frontoffice/tickets/:userId/:id/messages",
  upload.single("file"),
  (req, res) => {
    const { userId, id: ticketId } = req.params;
    const messageData = req.body;
    const file = req.file;
    const fileId = Math.floor(Math.random() * 100);

    if (file) {
      fileStorage[fileId] = {
        fileBuffer: file.buffer,
        fileName: file.originalname,
        fileId: fileId,
      };
    }
    // questa chiamata deve aggiungere una nuova riga alla tabella tickets_messages associando il messaggio al ticket con id ticketId
    // post o put?
    const ticket = allTickets.find(
      (item) => item.userId === Number(userId) && item.id === Number(ticketId)
    );
    const newMessageData = {
      ...messageData,
      ticketFileBuffer: file ? file.buffer : null,
      ticketFileName: file ? file.originalname : null,
      ticketFileId: file ? fileId : null,
    };

    if (ticket) {
      console.log("newMessageData", newMessageData);
      ticket.messages.push(newMessageData);
      res.status(200).send({
        updatedTicket: ticket,
      });
    } else {
      res.status(404).send({
        message: `Ticket with id ${ticketId} not found`,
      });
    }
  }
);

TODO;
app.post(
  "/frontoffice/tickets/:userId/:projectId/create",
  upload.single("file"),
  (req, res) => {
    const { userId, projectId } = req.params;
    let ticketData = req.body;
    const file = req.file;
    const fileId = Math.floor(Math.random() * 100);
    if (file) {
      //salvo i dati del file in fileStorage (provvisoriamente)
      fileStorage[fileId] = {
        fileBuffer: file.buffer,
        fileName: file.originalname,
        fileId: fileId,
      };
      console.log("fileId uplopaded:", fileId);
    }

    const user = allSlavesData.find((item) => item.id === Number(userId));
    const newTicket = {
      ...ticketData,
      id: Math.floor(Math.random() * 50) + 50,
      userId: Number(userId),
      companyName: user.companyName,
      projectId: projectId,
      messages: [],
      date: new Date().toISOString().slice(0, 10),
      lastModified: new Date().toISOString().slice(0, 10),
      userAttachments: [
        {
          userFileBuffer: file ? file.buffer : null,
          userFileName: file ? file.originalname : null,
          userFileId: fileId,
        },
      ],
      status: "open",
    };

    if (user) {
      user.projects
        .find((item) => item.projectId === Number(projectId))
        .tickets.push(newTicket.id);
      console.log("new ticket added:", newTicket);

      res.status(200).send({
        ticketId: newTicket.id,
      });

      allTickets.push(newTicket);
    } else {
      res.status(404).send({
        message: `User with id ${userId} not found`,
      });
    }
  }
);

// user order credits
app.get("/frontoffice/credits", (req, res) => {
  res.status(200).send(pricingCredits);
});

// quando lo user conferma il numero di crediti da acquistare, in backend si crea un ordine con un orderId
// TODO
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
// TODO
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

// user routes - faq
app.get("/frontoffice/faq", (req, res) => {
  const { title, description, faqList } = faqData;
  res.status(200).send({
    faqList: faqList.map((faq) => ({
      question: faq.question,
      answer: faq.answer,
    })),
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// {
//   "id": 4,
//   "question": "Posso modificare o cancellare una lavorazione?",
//   "answer": "E' possibile richiedere la modifica o la cancellazione di una lavorazione, contattando l'amministratore tramite l'apposito ticket. La richiesta verrà valutata e risolta dall'amministratore."
// },
