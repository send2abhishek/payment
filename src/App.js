import React, { useEffect } from "react";
import {
  makeStyles,
  Grid,
  Typography,
  Button,
  TextField,
} from "@material-ui/core/";

const useStyle = makeStyles((theme) => ({
  main: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cards: {
    display: "flex",
    margin: "0 auto",
    gap: "1rem",
    padding: "1rem",
  },
}));

const setupPaymentSession = () => {
  window.PaymentSession.configure({
      fields: {
          // ATTACH HOSTED FIELDS IDS TO YOUR PAYMENT PAGE FOR A CREDIT CARD
          card: {
              cardNumber: "cardNumber",
              securityCode: "cardCVC",
              expiryMonth: "cardMonth",
              expiryYear: "cardYear"
          }
      },
      callbacks: {
          initialized: function (err, response) {
              console.log("init....");
              console.log(err, response);
              console.log("/init.....");
              // HANDLE INITIALIZATION RESPONSE
          },
          formSessionUpdate: function (err,response) {
              console.log("update callback.....");
              console.log(err,response);
              console.log("/update callback....");

              // HANDLE RESPONSE FOR UPDATE SESSION
              if (response.statusCode) {
                  if (200 === response.statusCode) {
                      console.log("Session updated with data: " + response.data.sessionId);
                  } else if (201 === response.statusCode) {
                      console.log("Session update failed with field errors.");

                      if (response.message) {
                          var field = response.message.indexOf('valid')
                          field = response.message.slice(field + 5, response.message.length);
                          console.log(field + " is invalid or missing.");
                      }
                  } else {
                      console.log("Session update failed: " + response);
                  }
              }
          }
      }
  })
}

const App = (props) => {
  const classes = useStyle(props);

  useEffect(() => {
    setupPaymentSession()
  }, [])

  const updateSession = (e) => {
    e.preventDefault()

    this.PaymentSession.updateSessionFromForm()
  }

  return (
    <div>
      <Grid container className={classes.main}>
        <Typography
          align="center"
          style={{ padding: "1rem", fontSize: "1.5rem" }}
        >
          Enter Payment Details
        </Typography>
        <Grid container item xs={12} sm={10} className={classes.cards}>
          <form style={{ width: "50%" }}>
            <TextField
              value={5123456789012346}
              label="Card Number"
              variant="outlined"
              type="number"
              fullWidth
              name="number"
              id="cardNumber"
              InputProps={{
                readOnly: true,
              }}
              disabled
            />
            <TextField
              value={"Abhishek Kumar"}
              name="name"
              label="Card Holder Name"
              variant="outlined"
              type="text"
              style={{ marginTop: "0.5rem" }}
              InputProps={{
                readOnly: true,
              }}
              fullWidth
            />
            <Typography
              component="div"
              style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}
            >
              <TextField
                value={"May"}
                label="Month"
                variant="outlined"
                type="text"
                name="expiry"
                id="cardMonth"
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
              />
              <TextField
                value={2021}
                label="Year"
                variant="outlined"
                type="text"
                name="year"
                id="cardYear"
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
              />
              <TextField
                value={123}
                name="cvc"
                label="CVV/CVC"
                variant="outlined"
                type="number"
                id="cardCVC"
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
                disabled
              />
            </Typography>
            <Typography component="div" style={{ marginTop: "1rem" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={updateSession}
                style={{ textTransform: "capitalize" }}
              >
                {`Make Payment of ${500} EGP`}
              </Button>
            </Typography>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

export default App;
