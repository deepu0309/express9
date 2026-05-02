const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`
<h2>Submit Form (Express9) 🚀</h2>
<p style="color:green;">Deployed at: ${new Date().toLocaleString()}</p>
    <form onsubmit="submitForm(event)">
      <input id="name" placeholder="Name"/><br/><br/>
      <input id="email" placeholder="Email"/><br/><br/>
      <button type="submit">Submit</button>
    </form>
    <p id="result"></p>

    <script>
      async function submitForm(e) {
        e.preventDefault();
        const res = await fetch('/submit', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            name: document.getElementById('name').value,
            email: document.getElementById('email').value
          })
        });
        const data = await res.json();
        document.getElementById('result').innerText = data.message;
      }
    </script>
  `);
});

app.post("/submit", async (req, res) => {
  try {
    const response = await fetch("http://localhost:5000/submit", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    res.json(data);
  } catch {
    res.status(500).json({ message: "Backend error" });
  }
});

app.listen(3000, "0.0.0.0");
