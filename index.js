const express = require('express');

const app = express();
const port = 3000;


const fs = require('fs');

// Путь к файлу, содержащему ID контейнера в метаданных
const containerIdFilePath = '/proc/1/cgroup';

app.use(express.json())



app.get("/home",async (req,res)=>{
    try {
        const content = fs.readFileSync(containerIdFilePath, 'utf-8');
        const matches = content.match(/\/docker\/([a-f0-9]+)/);
        let containerId = "";
        if (matches && matches.length > 1) {
          containerId = matches[1];
          console.log('Container ID:', containerId);
        } else {
          console.log('Unable to determine Container ID.');
        }
        res.json({containerId})
      } catch (err) {
        console.error('Error reading container ID:', err);
      }
})


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
