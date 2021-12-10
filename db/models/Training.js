import mongoose from "mongoose";

const TrainingSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: [true, "Name is required!"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Description is required!"],
    trim: true,
  },
  
  videoUrl: {
      // {name: { type: String }}
      type:String,
      required:[true,"Video is required"]
  },

  heading2: {
    type: String,
    required: [true, "Name is required!"],
    trim: true,
  },

  section2Videos:[
  ],

  heading3: {
    type: String,
    required: [true, "Name is required!"],
    trim: true,
  },

  section3videos:[

  ],


  createdAt: { type: Date, default: Date.now ,timezone: 'Asia/Dubai'},
});

export default mongoose.models.Training || mongoose.model("Training", TrainingSchema);
