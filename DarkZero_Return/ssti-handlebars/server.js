
const express = require("express");
const Handlebars = require("handlebars");
const path = require("path");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.post("/render", (req, res) => {
  const { template } = req.body;

  try {
    // VULNERABILIDAD SSTI:
    // Compilamos una plantilla controlada por el usuario.
    const compiled = Handlebars.compile(template);

    const result = compiled({
      username: "admin",
      secret: "FLAG{ssti_handlebars_lab}"
    });

    res.send(`
      <h2>Resultado:</h2>
      <pre>${result}</pre>
      <a href="/">Volver</a>
    `);
  } catch (error) {
    res.status(400).send("Error en la plantilla");
  }
});

app.listen(3000, "127.0.0.1", () => {
  console.log("Laboratorio: http://127.0.0.1:3000");
});
