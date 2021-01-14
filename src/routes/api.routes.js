import cropType from '../controllers/cropType.controller';

module.exports = (app) => {
    // Create a new Customer
    app.post('/croptypes', cropType.create);

    // Retrieve all Customers
    app.get('/croptypes', cropType.findAll);

    // Retrieve a single Customer with customerId
    app.get('/croptypes/:cropTypeId', cropType.findOne);

    // Update a Customer with customerId
    app.put('/croptypes/:customerId', cropType.update);
    //
    // // Delete a Customer with customerId
    // app.delete("/customers/:customerId", customers.delete);
    //
    // // Create a new Customer
    // app.delete("/customers", customers.deleteAll);
};
