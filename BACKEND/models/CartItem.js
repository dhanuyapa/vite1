const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartItemSchema = new Schema({
    customerId: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    foodItems: [{ 
        foodId: {
            type: Schema.Types.ObjectId,
            ref: 'secondfoods',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            default: 1
        }
    }]
});

const CartItem = mongoose.model("CartItem", cartItemSchema);

module.exports = CartItem;
