const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:3001", // Ganti dengan URL frontend Anda
  optionsSuccessStatus: 200, // Beberapa browser lama (IE11, berbagai SmartTV) memerlukan ini
  credentials: true, // Izinkan kredensial (seperti cookie)
};

const corsMiddleware = cors(corsOptions);

module.exports = corsMiddleware;
