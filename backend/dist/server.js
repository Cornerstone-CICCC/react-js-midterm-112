"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const dotenv_1 = __importDefault(require("dotenv"));
const product_route_1 = __importDefault(require("./routes/product.route"));
const cart_route_1 = __importDefault(require("./routes/cart.route"));
dotenv_1.default.config();
// Create Server
const app = (0, express_1.default)();
//Middleware
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
}));
if (!process.env.COOKIE_PRIMARY_KEY || !process.env.COOKIE_SECONDARY_KEY) {
    throw new Error("Missing cookie keys!");
}
app.use((0, cookie_session_1.default)({
    name: "session",
    keys: [process.env.COOKIE_PRIMARY_KEY, process.env.COOKIE_SECONDARY_KEY],
    // maxAge: 30 * 60 * 1000 *10 // 3 mins
}));
app.use(express_1.default.json());
//Routes
app.use("/users", user_routes_1.default);
app.use("/products", product_route_1.default);
app.use("/carts", cart_route_1.default);
app.get("/", (req, res) => {
    res.status(200).send("Server is running");
});
//Fallback/404
app.use((req, res, next) => {
    res.status(404).send("Invalid route");
});
//Start server
const PORT = process.env.PORT;
const CONN_STRING = process.env.DATABASE_URI;
if (!PORT || !CONN_STRING) {
    throw new Error("Missing port or connecting string!");
}
// to see if you can connect to Mongoose
mongoose_1.default
    .connect(CONN_STRING, { dbName: "techmarket" })
    .then(() => {
    console.log("connected to MongoDB!");
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
})
    .catch((err) => {
    console.error(err);
    throw err;
});
