const express = require("express");
const dotenv = require("dotenv");
const { sequelize } = require("./models");
const genderRoute = require("./routes/genderRoute");
const langRoute = require("./routes/langRoute");
const regionRoute = require("./routes/regionRoute");
const districtRoute = require("./routes/districtRoute");
const paymentMethodRoute = require("./routes/paymentMethodRoute");
const deliveryMethodRoute = require("./routes/deliveryMethodRoute");
const ticketStatusRoute = require("./routes/ticketStatusRoute");
const seatTypeRoute = require("./routes/seatTypeRoute");
const sectorRoute = require("./routes/sectorRoute");
const typesRoute = require("./routes/typesRoute");
const countryRoute = require("./routes/countryRoute");
const flatRoute = require("./routes/flatRoute");
const discountRoute = require("./routes/discountRoute");
const eventTypeRoute = require("./routes/eventTypeRoute");
const humanCategoryRoute = require("./routes/humanCategoryRoute");
const venueRoute = require("./routes/venueRoute");
const venuePhotoRoute = require("./routes/venuePhotoRoute");
const venueTypesRoute = require("./routes/venueTypesRoute");
const seatRoute = require("./routes/seatRoute");
const eventRoute = require("./routes/eventRoute");
const ticketTypeRoute = require("./routes/ticketTypeRoute");
const ticketRoute = require("./routes/ticketRoute");
const customerRoute = require("./routes/customerRoute");
const customerCardRoute = require("./routes/customerCardRoute");
const customerAddressRoute = require("./routes/customerAddressRoute");
const adminRoute = require("./routes/adminRoute");
const cartRoute = require("./routes/cartRoute");
const cartItemRoute = require("./routes/cartItemRoute");
const bookingRoute = require("./routes/bookingRoute");
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

app.use("/api", genderRoute);
app.use("/api", langRoute);
app.use("/api", regionRoute);
app.use("/api", districtRoute);
app.use("/api", paymentMethodRoute);
app.use("/api", deliveryMethodRoute);
app.use("/api", ticketStatusRoute);
app.use("/api", seatTypeRoute);
app.use("/api", sectorRoute);
app.use("/api", typesRoute);
app.use("/api", countryRoute);
app.use("/api", flatRoute);
app.use("/api", discountRoute);
app.use("/api", eventTypeRoute);
app.use("/api", humanCategoryRoute);
app.use("/api", venueRoute);
app.use("/api", venuePhotoRoute);
app.use("/api", venueTypesRoute);
app.use("/api", seatRoute);
app.use("/api", eventRoute);
app.use("/api", ticketTypeRoute);
app.use("/api", ticketRoute);
app.use("/api", customerRoute);
app.use("/api", customerCardRoute);
app.use("/api", customerAddressRoute);
app.use("/api", adminRoute);
app.use("/api", cartRoute);
app.use("/api", cartItemRoute);
app.use("/api", bookingRoute);

setupSwagger(app);

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});