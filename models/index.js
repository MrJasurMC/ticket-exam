const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const Gender = require("./gender.model")(sequelize, Sequelize);
const Lang = require("./lang.model")(sequelize, Sequelize);
const Region = require("./region.model")(sequelize, Sequelize);
const District = require("./district.model")(sequelize, Sequelize);
const PaymentMethod = require("./paymentmethod.model")(sequelize, Sequelize);
const DeliveryMethod = require("./deliverymethod.model")(sequelize, Sequelize);
const TicketStatus = require("./ticketstatus.model")(sequelize, Sequelize);
const SeatType = require("./seattype.model")(sequelize, Sequelize);
const Sector = require("./sector.model")(sequelize, Sequelize);
const Types = require("./types.model")(sequelize, Sequelize);
const Country = require("./country.model")(sequelize, Sequelize);
const Flat = require("./flat.model")(sequelize, Sequelize);
const Discount = require("./discount.model")(sequelize, Sequelize);
const EventType = require("./eventtype.model")(sequelize, Sequelize);
const HumanCategory = require("./humancategory.model")(sequelize, Sequelize);
const Venue = require("./venue.model")(sequelize, Sequelize);
const VenuePhoto = require("./venuephoto.model")(sequelize, Sequelize);
const VenueTypes = require("./venuetypes.model")(sequelize, Sequelize);
const Seat = require("./seat.model")(sequelize, Sequelize);
const Event = require("./event.model")(sequelize, Sequelize);
const TicketType = require("./tickettype.model")(sequelize, Sequelize);
const Ticket = require("./ticket.model")(sequelize, Sequelize);
const Customer = require("./customer.model")(sequelize, Sequelize);
const CustomerCard = require("./customercard.model")(sequelize, Sequelize);
const CustomerAddress = require("./customeraddress.model")(sequelize, Sequelize);
const Admin = require("./admin.model")(sequelize, Sequelize);
const Cart = require("./cart.model")(sequelize, Sequelize);
const CartItem = require("./cartitem.model")(sequelize, Sequelize);
const Booking = require("./booking.model")(sequelize, Sequelize);

Gender.associate(sequelize.models);
Lang.associate(sequelize.models);
Region.associate(sequelize.models);
District.associate(sequelize.models);
PaymentMethod.associate(sequelize.models);
DeliveryMethod.associate(sequelize.models);
TicketStatus.associate(sequelize.models);
SeatType.associate(sequelize.models);
Sector.associate(sequelize.models);
Types.associate(sequelize.models);
Country.associate(sequelize.models);
Flat.associate(sequelize.models);
Discount.associate(sequelize.models);
EventType.associate(sequelize.models);
HumanCategory.associate(sequelize.models);
Venue.associate(sequelize.models);
VenuePhoto.associate(sequelize.models);
VenueTypes.associate(sequelize.models);
Seat.associate(sequelize.models);
Event.associate(sequelize.models);
TicketType.associate(sequelize.models);
Ticket.associate(sequelize.models);
Customer.associate(sequelize.models);
CustomerCard.associate(sequelize.models);
CustomerAddress.associate(sequelize.models);
Admin.associate(sequelize.models);
Cart.associate(sequelize.models);
CartItem.associate(sequelize.models);
Booking.associate(sequelize.models);

module.exports = {
  sequelize,
  Gender,
  Lang,
  Region,
  District,
  PaymentMethod,
  DeliveryMethod,
  TicketStatus,
  SeatType,
  Sector,
  Types,
  Country,
  Flat,
  Discount,
  EventType,
  HumanCategory,
  Venue,
  VenuePhoto,
  VenueTypes,
  Seat,
  Event,
  TicketType,
  Ticket,
  Customer,
  CustomerCard,
  CustomerAddress,
  Admin,
  Cart,
  CartItem,
  Booking,
};
