import mongoose from "mongoose";

const professorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  school: {
    type: String,
    required: true
  },
  ratings: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Rating" 
  }],
});

// Create the Professor model and export it
const Professor = mongoose.model('Professor', professorSchema);
export default Professor;
