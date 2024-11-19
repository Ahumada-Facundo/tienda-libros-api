const { Pedido, PedidoLibro, Libro, Usuario } = require('../models');

const createPedido = async (req, res) => {
    const { id_usuario, libros } = req.body;

    try {
        const usuario = await Usuario.findByPk(id_usuario);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }


        const pedido = await Pedido.create({
            id_usuario,
            fecha_pedido: new Date(),
            estado: 'en proceso',
            total: 0,
        }, {
            fields: ['id_usuario', 'fecha_pedido', 'estado', 'total']
        });

        let totalPedido = 0;


        for (const libro of libros) {
            const { id_libro, cantidad } = libro;
            const libroExistente = await Libro.findByPk(id_libro);
            if (!libroExistente) {
                return res.status(404).json({ error: `Libro con id ${id_libro} no encontrado` });
            }

            const precioTotal = libroExistente.precio * cantidad;
            totalPedido += precioTotal;


            await PedidoLibro.create({
                id_pedido: pedido.id_pedido,
                id_libro,
                cantidad,
                precio: libroExistente.precio,
            }, {
                fields: ['id_pedido', 'id_libro', 'cantidad', 'precio']
            });
        }

        // Actualizar el total del pedido
        pedido.total = totalPedido;
        await pedido.save();

        return res.status(201).json({
            message: 'Pedido creado exitosamente',
            pedido,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al crear el pedido' });
    }
};


const getPedidos = async (req, res) => {
    try {
        const pedidos = await Pedido.findAll({
            include: [
                {
                    model: Usuario,
                    as: 'usuario',
                    attributes: ['id_usuario', 'nombre', 'email'],
                },
                {
                    model: Libro,
                    as: 'libros',
                    attributes: ['id_libro', 'titulo', 'precio'],
                    through: { attributes: ['cantidad'] },
                },
            ],
        });

        return res.status(200).json(pedidos);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al obtener los pedidos' });
    }
};


const getPedidoById = async (req, res) => {
    const { id } = req.params;

    try {
        const pedido = await Pedido.findByPk(id, {
            include: [
                {
                    model: Usuario,
                    as: 'usuario',
                    attributes: ['id_usuario', 'nombre', 'email'],
                },
                {
                    model: Libro,
                    as: 'libros',
                    attributes: ['id_libro', 'titulo', 'precio'],
                },
            ],
        });

        if (!pedido) {
            return res.status(404).json({ error: 'Pedido no encontrado' });
        }

        return res.status(200).json(pedido);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al obtener el pedido' });
    }
};

module.exports = {
    createPedido,
    getPedidos,
    getPedidoById,
};
