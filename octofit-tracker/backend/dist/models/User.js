import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['athlete', 'coach', 'admin'], default: 'athlete' },
    joinedAt: { type: Date, default: () => new Date() },
    preferredWorkoutTypes: { type: [String], default: ['cardio', 'strength'] },
    team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
}, { timestamps: true });
const User = mongoose.model('User', userSchema);
export default User;
