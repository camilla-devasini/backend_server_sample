const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());
let cors = require("cors");
const port = 3001;

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

// Admin's slaves for the dashboard
const allSlavesData = [
  {
    id: 1,
    firstName: "Mario",
    lastName: "Rossi",
    email: "prova@Rossi.prova",
    phone: "3348558857",
    status: "pending",
  },
  {
    id: 2,
    firstName: "Giovanni",
    lastName: "Verdi",
    email: "prova@Verdi.prova",
    phone: "3234558857",
    status: "banned",
  },
  {
    id: 3,
    firstName: "Luca",
    lastName: "Gialli",
    email: "prova@Gialli.prova",
    phone: "3348552342",
    status: "active",
  },
  {
    id: 4,
    firstName: "Mario",
    lastName: "Neri",
    email: "prova@Neri.prova",
    phone: "3348558857",
    status: "active",
  },
  {
    id: 5,
    firstName: "Luca",
    lastName: "Viola",
    email: "prova@Neri.prova",
    phone: "3348558857",
    status: "active",
  },
];

app.get("/slaves", (req, res) => {
  const { page, search, statusFilter } = req.query;
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
  console.log("pageNumber", page);

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

// POST
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  // se email e password sono uguali a test@test e pass123 ovvero quelli che ho impostato io come corretti
  // allora mi aspetto che il backend esegua una chiamata che restituisca i dati dell'utente e il suo jwt token
  if (email === "test@test" && password === "pass123") {
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
