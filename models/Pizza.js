const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

//create the pizza Schema
const PizzaSchema = new Schema({
    pizzaName: {
        type: String,
        //instead of setting required to true, you can set it to an error message string which will display when the field is not present
        //e.g. 'Your pizza needs a name!'
        required: true,
        trim: true
    },
    createdBy: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        //getter runs whenever a query is performed and formats the date value
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    size: {
        type: String,
        required: true,
        enum: ['Personal', 'Small', 'Medium', 'Large', 'Extra Large'],
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