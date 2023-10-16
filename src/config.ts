require("dotenv").config();

export const { PORT = 3000 } = process.env;
export const { DB_ADDRESS = "mongodb://localhost:27017/mestodb" } = process.env;
