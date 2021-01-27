import React from "react";
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

const App = (props) => {
  const classes = useStyle(props);
  const [cardDetails, setCardDetails] = React.useState({
    cvc: "",
    expiry: "",
    year: "",
    focus: "",
    name: "",
    number: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const cardsCopy = { ...cardDetails };
    cardsCopy[name] = value;

    setCardDetails(cardsCopy);
  };

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
              onChange={handleInputChange}
              value={5123456789012346}
              label="Card Number"
              variant="outlined"
              type="number"
              fullWidth
              name="number"
              id="cardNumber"
              disabled
            />
            <TextField
              onChange={handleInputChange}
              value={"Abhishek Kumar"}
              name="name"
              label="Card Holder Name"
              variant="outlined"
              type="text"
              fullWidth
              style={{ marginTop: "0.5rem" }}
            />
            <Typography
              component="div"
              style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}
            >
              <TextField
                onChange={handleInputChange}
                value={"May"}
                label="Month"
                variant="outlined"
                type="text"
                fullWidth
                name="expiry"
                id="cardMonth"
              />
              <TextField
                onChange={handleInputChange}
                value={2021}
                label="Year"
                variant="outlined"
                type="text"
                fullWidth
                name="year"
                id="cardYear"
              />
              <TextField
                onChange={handleInputChange}
                value={123}
                name="cvc"
                label="CVV/CVC"
                variant="outlined"
                type="number"
                id="cardCVC"
                fullWidth
                disabled
              />
            </Typography>
            <Typography component="div" style={{ marginTop: "1rem" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => window.pay()}
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
