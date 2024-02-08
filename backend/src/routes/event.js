/* RUTAS DE EVENTOS
 * Ruta: host + /api/events
 */
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { obtenerEventos, crearEvento, editarEvento, eliminarEvento } = require('../controllers/events');
const { isDate } = require('../helpers/isDate');

const router = Router();

// Todas las peticiones por debajo de esta instrucción deben pasar por la validación del JWT
router.use(validarJWT);

// Obtener eventos
router.get('/', obtenerEventos);

// Crear un nuevo evento
router.post(
    '/',
    [
        check('title', 'El título es obligatorio.').not().isEmpty(),
        check('start', 'La fecha de inicio es obligatoria.').custom(isDate),
        check('end', 'La fecha de finalización es obligatoria.').custom(isDate),
        validarCampos
    ],
    crearEvento);

// Editar evento
router.put(
    '/:id',
    [
        check('title', 'El título es obligatorio.').not().isEmpty(),
        check('start', 'La fecha de inicio es obligatoria.').custom(isDate),
        check('end', 'La fecha de finalización es obligatoria.').custom(isDate),
        validarCampos
    ],
    editarEvento);

// Eliminar evento
router.delete('/:id', eliminarEvento);

module.exports = router;