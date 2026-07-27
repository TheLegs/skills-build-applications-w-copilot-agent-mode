import mongoose from 'mongoose';
const workoutSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, default: '' },
    durationMinutes: { type: Number, required: true },
    intensity: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
    focusAreas: { type: [String], default: ['full body'] },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    publishedAt: { type: Date, default: () => new Date() },
}, { timestamps: true });
const Workout = mongoose.model('Workout', workoutSchema);
export default Workout;
