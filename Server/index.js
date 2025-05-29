const mongoose = require('mongoose');
const app = require('./app');
require("dotenv").config({ path: ".env" });

const PORT = process.env.PORT || 3997;
mongoose.set('strictQuery', true); // elimina el warning de mongoose 7

//se inicia la conexion con la base de datos y con el servidor de la aplicacion pasando las variables declaradas en ./constants.js
async function main() {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`
    );
  
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }

  /**
   * app.listen(PORT, HOST, () => {
      console.log(`http://${HOST}:${PORT}/api/${process.env.API_VERSION}`);
    });
   */
  
  //ejecuta la funcion de arriba para establecer la conexion
  main().catch((err) => console.log(err));
