const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name must be provided"],
    maxlength: [30, "Max length is 30 characters"],
  },
  price: { type: Number, required: [true, "Product price must be provided"] },
  company: {
    type: String,
    enum: {
      values: ["ikea", "liddy", "caressa", "marcos"],
      message: "{VALUE} is not supported",
    },
    // enum: ["ikea", "liddy", "caressa", "marcos"],
    required: [true, "Company name must be provided"],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: { type: Number, default: 4.5 },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
// will create collection called "products"
module.exports = mongoose.model("Products", productSchema);
