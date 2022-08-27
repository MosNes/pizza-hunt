const { Pizza } = require('../models');

const pizzaController = {
    //get all Pizzas
    getAllPizza(req, res) {
        Pizza.find({})
            //return all fields from attached comments, not just commentId
            .populate({
                //path points it to correct collection
                path: 'comments',
                //do not return the __v field
                select: '-__v'
            })
            //do not return the __v field for pizzas either
            .select('-__v')
            //sort by id in descending order, returns the most recent pizzas first
            //timestamp is contained within the objectId
            .sort({ _id: -1 })
            .then(dbPizzaData => res.json(dbPizzaData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    //get a pizza by ID
    getPizzaById({ params }, res) {
        Pizza.findOne({ _id: params.id })
            .populate({
                path: 'comments',
                select: '-__v'
            })
            .select('-__v')
            .then(dbPizzaData => {
                //if no pizza is found,  send 404
                if (!dbPizzaData) {
                    res.status(404).json({ message: 'No pizza found with this ID' });
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    //create Pizza
    // create() method can handle the insertion of one or multiple records
    createPizza({ body }, res) {
        Pizza.create(body)
            .then(dbPizzaData => res.json(dbPizzaData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    //update Pizza by ID
    updatePizza({ params, body }, res) {
        //must set runValidators: true to enforce data validation rules in the model
        Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbPizzaData => {
                //if no pizza is found,  send 404
                if (!dbPizzaData) {
                    res.status(404).json({ message: 'No pizza found with this ID' });
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    //delete Pizza by ID
    deletePizza({ params }, res) {
        Pizza.findOneAndDelete({ _id: params.id })
            .then(dbPizzaData => {
                //if no pizza is found,  send 404
                if (!dbPizzaData) {
                    res.status(404).json({ message: 'No pizza found with this ID' });
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    }
};

module.exports = pizzaController;