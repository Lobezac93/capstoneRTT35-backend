import mongoose from 'mongoose';

const ratingSchema = new mongoose.Schema({
  rating: { type: Number, required: true },
  difficulty: { type: Number, required: true },
  wouldTakeAgain: { type: Boolean, required: true },
  comment: { type: String, required: true },
});

const Rating = mongoose.model('Rating', ratingSchema);
export default Rating;
