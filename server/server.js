const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();
const { spawn } = require("child_process");
const { resolve } = require("path");
const { rejects } = require("assert");
app.use(express.json());
app.use(cors());

//Function used to execute Python scripts
const executePython = async (script) => {

    const py = spawn("python3", [script]);

    const result = await new Promise((resolve, reject) => {
        let output;

        // Get output from python script
        py.stdout.on('data', (data) => {
            output = JSON.parse(data);
        });

        // Handle erros
        py.stderr.on("data", (data) => {
            console.error(`[python] Error occured: ${data}`);
            reject(`Error occured in ${script}`);
        });

        py.on("exit", (code) => {
            console.log(`Child process exited with code ${code}`);
            resolve(output);
        });
    });
    return result;
}

app.post("/api", async (req, res) => {
    //Parse Json
    let itemString = "";
    for(const STRING of Object.entries(req.body)[0][1]) {
        itemString += "" + STRING + "\n";
    }

    //Add items onto "items.txt"
    fs.writeFile("items.txt", itemString, function(err, data){
        console.log("Added items onto items.txt");
    });

    //Runs Selenium Python script
    await executePython("script/main.py", []);

    //Reads extracted data from "extracted_data.txt"
    fs.readFile("extracted_data.txt", 'utf8', (err, data) => {
        //Error handling
        if (err) {
          console.error(err);
          return;
        }

        let temp = data.split("\n");
        temp.pop();
        const items = temp.map((x) => x.split(":")[0]);
        const prices = temp.map((x) => parseFloat(x.split(":")[1]));

        //Returns data back to front-end
        res.send(
            { 
            Items: items,
            Prices: prices
            }
        );
        console.log(items);
        console.log(prices);
      });
})


app.listen(8000, () => {console.log("Server started on port 8000")});