import * as express from "express";
import * as cors from "cors";
import * as http from "http";
import { PORT } from "./config";
import balance from './routes/balance';

// node app initialization
const app = express();
app.use(cors());
app.use(express.static("static"));

// creates a server
let server = http.createServer(app);
server.listen(PORT, () => {
  console.log("🚀 Server ready at", PORT);
});

 // sample router to test whether server working fine
 app.get("/ok", (req, res) => {
  res.send("Yes WORKING now");
});

 // balance API service endpoint
app.use("/balance", balance);

export default app;


