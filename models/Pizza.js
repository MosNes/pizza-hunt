const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

//create the pizza Schema
const PizzaSchema = new Schema({
    pizzaName: {
        type: String
    },
    createdBy: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
        //getter runs whenever a query is performed and formats the date value
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    size: {
        type: String,
        default: 'Large'
    },
    toppings: [],
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
},
    {
        toJSON: {
            //enable virtuals
            virtuals: true,
            //enable getters
            getters: true
        },
        id: false
    }
);

//get total count of comments and replies on retrieval
PizzaSchema.virtual('commentCount').get(function () {
    //reduce method iterates through an array and updates the 'total' value
    return this.comments.reduce((total, comment) => total + comment.replies.length +1, 0);
});

//create the Pizza model using the PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

//export the Pizza model
module.exports = Pizza;