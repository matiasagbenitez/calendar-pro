const { response } = require('express');
const Evento = require('../models/Evento');

const obtenerEventos = async (req, res = response) => {
    const eventos = await Evento.find().populate('user', 'name');
    res.status(200).json({
        ok: true,
        msg: 'obtenerEventos',
        eventos
    });
}

const crearEvento = async (req, res = response) => {
    const evento = new Evento(req.body);
    try {

        evento.user = req.uid;

        const eventoCreado = await evento.save();
        res.status(201).json({
            ok: true,
            msg: 'Evento creado.',
            evento: eventoCreado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error interno del servidor.'
        });
    }
}

const editarEvento = async (req, res = response) => {
    const eventoId = req.params.id;
    try {
        const evento = await Evento.findById(eventoId);

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no encontrado.'
            });
        }

        if (evento.user.toString() !== req.uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene permisos para editar este evento.'
            });
        }

        // Actualizar el evento
        const nuevoEvento = {
            ...req.body,
            user: req.uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, { new: true });

        res.status(200).json({
            ok: true,
            msg: 'Evento actualizado.',
            evento: eventoActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error interno del servidor.'
        });
    }

}

const eliminarEvento = async (req, res = response) => {
    const eventoId = req.params.id;
    try {
        const evento = await Evento.findById(eventoId);

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no encontrado.'
            });
        }

        if (evento.user.toString() !== req.uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene permisos para eliminar este evento.'
            });
        }

        // Eliminar el evento
        const eventoEliminado = await Evento.findByIdAndDelete(eventoId);

        res.status(200).json({
            ok: true,
            msg: 'Evento eliminado.',
            evento: eventoEliminado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error interno del servidor.'
        });
    }
}

module.exports = {
    obtenerEventos,
    crearEvento,
    editarEvento,
    eliminarEvento
}