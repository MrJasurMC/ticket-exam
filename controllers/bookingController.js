const { Booking, Cart, PaymentMethod, DeliveryMethod, Discount, TicketStatus } = require('../models');
const { ValidateBooking, ValidateBookingUpdate } = require('../validation/bookingValidation');

exports.createBooking = async (req, res) => {
    const { error } = ValidateBooking(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const booking = await Booking.create(req.body);
        res.status(201).send(booking);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.getBookings = async (req, res) => {
    try {
        const bookings = await Booking.findAll({
            include: [
                { model: Cart, as: 'cart' },
                { model: PaymentMethod, as: 'paymentMethod' },
                { model: DeliveryMethod, as: 'deliveryMethod' },
                { model: Discount, as: 'discount' },
                { model: TicketStatus, as: 'status' },
            ]
        });
        res.status(200).send(bookings);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findByPk(req.params.id, {
            include: [
                { model: Cart, as: 'cart' },
                { model: PaymentMethod, as: 'paymentMethod' },
                { model: DeliveryMethod, as: 'deliveryMethod' },
                { model: Discount, as: 'discount' },
                { model: TicketStatus, as: 'status' },
            ]
        });
        if (!booking) return res.status(404).send("Booking not found");
        res.status(200).send(booking);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.updateBooking = async (req, res) => {
    const { error } = ValidateBookingUpdate(req.body);
    if (error) {
        return res.status(400).send({ error: error.details[0].message });
    }
    try {
        const booking = await Booking.findByPk(req.params.id);
        if (!booking) return res.status(404).send("Booking not found");
        await booking.update(req.body);
        res.status(200).send(booking);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.deleteBooking = async (req, res) => {
    try {
        const booking = await Booking.findByPk(req.params.id);
        if (!booking) return res.status(404).send("Booking not found");

        const bookingData = booking.toJSON();

        await booking.destroy();
        res.status(200).send({ message: "Booking deleted successfully", data: bookingData });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};
