import mongoose from "mongoose"

const collection= 'Carts'
const schema = new mongoose.Schema({
    products: [
        {
          pid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
          },
          quantity: {
            type: Number,
            required: true,
            min: 1
          }
        }
      ]
},{collection:'Carts'}
)
const Carts = mongoose.model(collection, schema)
export  default Carts