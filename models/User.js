const sequelizePaginate = require('sequelize-paginate');
const { Op } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        name: {
            type: DataTypes.STRING(20),
        },
        email: {
            type: DataTypes.STRING(30),
        },
        phone: {
            type: DataTypes.STRING(15),
        },
        latitude: {
            type: DataTypes.FLOAT(30),
        },
        longitude: {
            type: DataTypes.FLOAT(30),
        },
        address: {
            type: DataTypes.STRING(100),
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        password: {
            type: DataTypes.STRING(100),
        }
    });


    User.associate = function (models) {
   
    }
    User.byEmail = async (req) => {
        return User.findOne({
            where: {
                email: req
            }
        })
    },
        User.add = async (req) => {
            return User.create(req)
        },
        User.getAll = async function (req) {
            const { query } = req;
            let where = {
            }
            if (query.type) {
                where.type = query.type
            }
            if (query.latitude && query.longitude) {
                where.latitude = {
                    [Op.between]: [query.latitude - (query.area ? query.area : 0.02), parseFloat(query.latitude) + parseFloat(query.area ? query.area : 0.02)],  //0.02 = 2 kilo meter, 1=111 kilo meter
                },
                    where.longitude = {
                        [Op.between]: [query.longitude - (query.area ? query.area : 0.02), parseFloat(query.longitude) + parseFloat(query.area ? query.area : 0.02)],
                    }
            }
            if (query.name) where.name = { [Op.like]: `%${query.name}%` };
            if (query.address) where.address = { [Op.like]: `%${query.address}%` };
            const options = {
                page: parseInt(query.page) || 1, // defaultValue 1
                paginate: parseInt(query.size) || 10,
                where,
                order: [['id', 'DESC']]
            };
            const { docs, pages, total } = await User.paginate(options);
            return { docs, pages, total };


        };
    User.byId = async function (req) {
        const { params } = req;
        return await User.findOne({
            where: {
                id: params.id
            }
        })

    };
    User.updateUser = async function (req) {
        const { params, body } = req;
        return await User.update(body, {
            where: {
                id: params.id
            }
        })

    };
    sequelizePaginate.paginate(User);
    return User;
};