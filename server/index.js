const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const dbConection = require("./config/connexionDataBase");
const user = require("./router/UserRouter");
const auth = require("./router/AuthRouter");
const ApiError = require("./util/ApiError");
const upload = require("./router/Upload");
const categoryPath = require("./router/categoryRouter");
// const bookPath = require("./router/BookRouter");
// const SubcategoryPath = require("./router/SubCategoryRouter");
// const Product = require("./router/ProductRouter");
// const Resrvation = require("./router/ReservationRouter");
// const ResrvationAdmin = require("./router/ReservationAdminRouter");
// const Brand = require("./router/BrandsRouter");
// const TestRouter = require("./router/TestRouter");
// const RestPassword = require("./router/RestPasswordRouter");
const GlobalError = require("./middlewares/GlobalError");
const verifyToken = require("./middlewares/VerifyToken");
const virefiyAdmin = require("./middlewares/VerifyAdmin");
const cors = require("cors");

const app = express();
dotenv.config();
dbConection();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("views", path.join(__dirname, "view"));
app.set("view engine", "ejs");
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// app.use("/api/book", bookPath);

// app.use("/api/test", TestRouter);
// app.use("/auth", RestPassword);
app.use("/api/category", verifyToken, virefiyAdmin, categoryPath);
// app.use("/api/subcategory", verifyToken, virefiyAdmin, SubcategoryPath);
// app.use("/api/product", verifyToken, virefiyAdmin, Product);
// app.use("/api/reservation", verifyToken, Resrvation);
// app.use("/api/admin/reservation", verifyToken, virefiyAdmin, ResrvationAdmin);
// app.use("/api/brand", verifyToken, virefiyAdmin, Brand);
app.use("/api/user", user);
app.use("/api/auth", auth);

app.use("/", upload);

app.all("*", (req, res, next) => {
  next(new ApiError(`Request is Not found ${req.originalUrl}`, 400));
});

app.use(GlobalError);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.error(`unhandledRejection ${err.name} | ${err.message}`);
  process.exit(1);
});
