const express = require("express");
const dotenv = require("dotenv");
const { sequelize } = require("./models");
const setupSwagger = require("./swagger/swagger");
const cors = require("cors");
dotenv.config();


const app = express();

app.use(express.json());
app.use(
    cors({
        origin: "*"
    })
);

app.use("/api", require("./routes/genderRoute"));
app.use("/api", require("./routes/langRoute"));
app.use("/api", require("./routes/regionRoute"));
app.use("/api", require("./routes/districtRoute"));
app.use("/api", require("./routes/paymentMethodRoute"));
app.use("/api", require("./routes/deliveryMethodRoute"));
app.use("/api", require("./routes/ticketStatusRoute"));
app.use("/api", require("./routes/seatTypeRoute"));
app.use("/api", require("./routes/sectorRoute"));
app.use("/api", require("./routes/typesRoute"));
app.use("/api", require("./routes/countryRoute"));
app.use("/api", require("./routes/flatRoute"));
app.use("/api", require("./routes/discountRoute"));
app.use("/api", require("./routes/eventTypeRoute"));
app.use("/api", require("./routes/humanCategoryRoute"));
app.use("/api", require("./routes/venueRoute"));
app.use("/api", require("./routes/venuePhotoRoute"));
app.use("/api", require("./routes/venueTypesRoute"));
app.use("/api", require("./routes/seatRoute"));
app.use("/api", require("./routes/eventRoute"));
app.use("/api", require("./routes/ticketTypeRoute"));
app.use("/api", require("./routes/ticketRoute"));
app.use("/api", require("./routes/customerRoute"));
app.use("/api", require("./routes/customerCardRoute"));
app.use("/api", require("./routes/customerAddressRoute"));
app.use("/api", require("./routes/adminRoute"));
app.use("/api", require("./routes/cartRoute"));
app.use("/api", require("./routes/cartItemRoute"));
app.use("/api", require("./routes/bookingRoute"));

setupSwagger(app);

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});