const { Seat, Venue, Sector, SeatType } = require('../models');
const { ValidateSeat, ValidateSeatUpdate } = require('../validation/seatValidation');

exports.createSeat = async (req, res) => {
    const { error } = ValidateSeat(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const seat = await Seat.create(req.body);
        res.status(201).send(seat);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.getSeats = async (req, res) => {
    try {
        const seats = await Seat.findAll({
            include: [
                { model: Venue, as: 'venue' },
                { model: Sector, as: 'sector' },
                { model: SeatType, as: 'seatType' },
            ]
        });
        res.status(200).send(seats);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.getSeatById = async (req, res) => {
    try {
        const seat = await Seat.findByPk(req.params.id, {
            include: [
                { model: Venue, as: 'venue' },
                { model: Sector, as: 'sector' },
                { model: SeatType, as: 'seatType' },
            ]
        });
        if (!seat) return res.status(404).send("Seat not found");
        res.status(200).send(seat);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.updateSeat = async (req, res) => {
    const { error } = ValidateSeatUpdate(req.body);
    if (error) {
        return res.status(400).send({ error: error.details[0].message });
    }
    try {
        const seat = await Seat.findByPk(req.params.id);
        if (!seat) return res.status(404).send("Seat not found");
        await seat.update(req.body);
        res.status(200).send(seat);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.deleteSeat = async (req, res) => {
    try {
        const seat = await Seat.findByPk(req.params.id);
        if (!seat) return res.status(404).send("Seat not found");

        const seatData = seat.toJSON();

        await seat.destroy();
        res.status(200).send({ message: "Seat deleted successfully", data: seatData });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.getSeatsByVenue = async (req, res) => {
    try {
        const seats = await Seat.findAll({
            where: { venue_id: req.params.venueId },
            include: [{ model: Sector, as: 'sector' }, { model: SeatType, as: 'seatType' }]
        });
        res.status(200).send(seats);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};
