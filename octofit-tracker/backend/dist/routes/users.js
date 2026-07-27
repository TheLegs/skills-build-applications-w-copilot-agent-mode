import { Router } from 'express';
import User from '../models/User.js';
const router = Router();
router.get('/', async (req, res) => {
    const users = await User.find().select('-passwordHash').lean();
    res.json({ users });
});
router.post('/', async (req, res) => {
    const user = await User.create(req.body);
    res.status(201).json({ user: { ...user.toObject(), passwordHash: undefined } });
});
router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id).select('-passwordHash').lean();
    res.json({ user });
});
export default router;
