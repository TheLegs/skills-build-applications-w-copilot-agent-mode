import mongoose from 'mongoose';
const teamSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, default: '' },
    captain: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    createdAt: { type: Date, default: () => new Date() },
}, { timestamps: true });
const Team = mongoose.model('Team', teamSchema);
export default Team;
