module.exports = (sequelize, Sequelize) => {
    const Document = sequelize.define("document", {
        gsm: {
            type: Sequelize.STRING
        },
        username: {
            type: Sequelize.STRING
        },
        name: {
            type: Sequelize.STRING
        },
        surname: {
            type: Sequelize.STRING
        },
        id_serial_no: {
            type: Sequelize.STRING
        },
        tckn: {
            type: Sequelize.STRING
        },
        father_name: {
            type: Sequelize.STRING
        },
        birthplace: {
            type: Sequelize.STRING
        },
        birthdate: {
            type: Sequelize.DATE
        },
        customer_no: {
            type: Sequelize.STRING
        }
    });
    return Document;
};