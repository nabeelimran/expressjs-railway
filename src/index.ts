import express from "express";
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3333;

//enabling cors
app.use(cors());

//Parse data
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.post("/post", async (req, res) => {
  //Destructuring response token from request body
    const {token} = req.body;

  //sends secret key and response token to google
      await axios.post(
        `https://www.google.com/recaptcha/api/siteverify?secret=6LdglM8kAAAAAFqsa6Q9Onc6vxwFEcu7Lf9zFBXE&response=${token}`
        );

  //check response status and send back to the client-side
      if (res.status(200)) {
        res.send({status:true});
      }else{
        res.send({status:false});
      }
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
