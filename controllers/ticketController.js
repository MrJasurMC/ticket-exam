const { Ticket, Event, Seat, TicketStatus, TicketType } = require('../models');
const { ValidateTicket, ValidateTicketUpdate } = require('../validation/ticketValidation');

exports.createTicket = async (req, res) => {
    const { error } = ValidateTicket(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const ticket = await Ticket.create(req.body);
        res.status(201).send(ticket);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.getTickets = async (req, res) => {
    try {
        const tickets = await Ticket.findAll({
            include: [
                { model: Event, as: 'event' },
                { model: Seat, as: 'seat' },
                { model: TicketStatus, as: 'status' },
                { model: TicketType, as: 'ticketType' },
            ]
        });
        res.status(200).send(tickets);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.getTicketById = async (req, res) => {
    try {
        const ticket = await Ticket.findByPk(req.params.id, {
            include: [
                { model: Event, as: 'event' },
                { model: Seat, as: 'seat' },
                { model: TicketStatus, as: 'status' },
                { model: TicketType, as: 'ticketType' },
            ]
        });
        if (!ticket) return res.status(404).send("Ticket not found");
        res.status(200).send(ticket);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.updateTicket = async (req, res) => {
    const { error } = ValidateTicketUpdate(req.body);
    if (error) {
        return res.status(400).send({ error: error.details[0].message });
    }
    try {
        const ticket = await Ticket.findByPk(req.params.id);
        if (!ticket) return res.status(404).send("Ticket not found");
        await ticket.update(req.body);
        res.status(200).send(ticket);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.deleteTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findByPk(req.params.id);
        if (!ticket) return res.status(404).send("Ticket not found");

        const ticketData = ticket.toJSON();

        await ticket.destroy();
        res.status(200).send({ message: "Ticket deleted successfully", data: ticketData });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.getTicketsByEvent = async (req, res) => {
    try {
        const tickets = await Ticket.findAll({
            where: { event_id: req.params.eventId },
            include: [{ model: Seat, as: 'seat' }, { model: TicketStatus, as: 'status' }]
        });
        res.status(200).send(tickets);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};
