import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name === "" || phone === "" || email === "") {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone,
          email,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        alert("Failed to submit data");
      }
    } catch (error) {
      console.error(error);
      alert("Server not reachable");
    }
  };

  return (
    <div style={styles.container}>
      {!submitted ? (
        <form style={styles.box} onSubmit={handleSubmit}>
          <h2>Good Morning</h2>

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
          />

          <input
            type="text"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={styles.input}
          />

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />

          <button type="submit" style={styles.button}>
            Submit
          </button>
        </form>
      ) : (
        <div style={styles.box}>
          <h2>Good Morning {name}</h2>
          <p>Thank you for submitting your details</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
  },
  box: {
    backgroundColor: "white",
    padding: "30px",
    width: "300px",
    textAlign: "center",
    borderRadius: "6px",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#333",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
};

export default App;
