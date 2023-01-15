import React, { useEffect, useState } from "react";
import CardList from "./CardList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

function App() {
  //weather
  const [cityName, setCityName] = useState("");
  const [cardsList, setCardsList] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

//error alert ----
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  function handleError(message) {
    handleClick();
    setErrorMessage(message);
  }
//error alert end---


  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`http://localhost:3000/weather?q=${cityName}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((dataObj) => {
        cardsList.push(dataObj);
        setCardsList([...cardsList]);
      })
      .catch((error) => {
        console.error("ERROR ALERT FRONT END", error); // log the error to the console
        handleError(error.message);
      });
      setCityName('');
    // submit the form
    console.log("setWeather");
    console.log("cardlist: ", cardsList);
  };

  const handleSave = (event) => {
    event.preventDefault();
    fetch("http://localhost:3000/", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cardsList),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    fetch("http://localhost:3000")
    .then(data => data.json())
    .then(data => {
      setCardsList(data)
    })
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={open}
          autoHideDuration={1000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            City does not exist!
          </Alert>
        </Snackbar>
        
        <div className="form">
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              "& > :not(style)": {
                m: 1,
                width: "25ch",
                display: "flex",
                justifyContent: "center",
              },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              label="City Name"
              color="primary"
              focused
              value={cityName}
              onChange={(e) => {
                setErrorMessage(null);
                setCityName(e.target.value);
              }}
              size="small"
            />
          </Box>
          <Stack direction="row" spacing={2}>
            <Button
              color="primary"
              variant="contained"
              size="small"
              onClick={handleSubmit}
            >
              Get Weather
            </Button>
            <br></br>
            <Button
              color="primary"
              variant="contained"
              size="small"
              onClick={handleSave}
            >
              Save
            </Button>
          </Stack>
          <br></br>
          <br></br>
          <div>
            <CardList cardsList={cardsList} setCardsList={setCardsList} />
          </div>
        </div>
      </header>
    </div>
  );
}




export default App;
