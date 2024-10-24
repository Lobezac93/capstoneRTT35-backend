import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  professor: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Professor', 
    required: true 
  },
  comment: {
     type: String, 
     required: true 
  },
  rating: { 
    type: Number, 
    required: true, 
    min: 1,
    max: 5 
  }
}, {timestamps: true});

const Rating = mongoose.model('Rating', ratingSchema);

export default Rating;

