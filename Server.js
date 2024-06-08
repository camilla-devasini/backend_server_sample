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
    designId: 1,
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
    faq: [
      {
        question: "How do I reset my password?",
        answer: "Click on the 'Forgot password?' link on the login page.",
      },
      {
        question: "Can I change my email address?",
        answer:
          "Yes, you can change your email address in your account settings.",
      },
      {
        question: "How do I delete my account?",
        answer: "You can delete your account in your account settings.",
      },
    ],
  });
});

// POST
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  // se email e password sono uguali a test@test e pass123 ovvero quelli che ho impostato io come corretti
  // allora mi aspetto che il backend esegua una chiamata che restituisca i dati dell'utente e il suo jwt token
  if (email === "test@test.com" && password === "pass123") {
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
    console.log("Set-Cookie header:", res.get("Set-Cookie"));
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
  res.status(200).send("User logged out");
});

app.post("/register", (req, res) => {
  res.status(200).send("New user request registered");
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
