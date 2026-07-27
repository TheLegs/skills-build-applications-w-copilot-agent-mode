import { Router } from 'express';
import Team from '../models/Team.js';
const router = Router();
router.get('/', async (req, res) => {
    const teams = await Team.find().populate('captain members', 'name email').lean();
    res.json({ teams });
});
router.post('/', async (req, res) => {
    const team = await Team.create(req.body);
    res.status(201).json({ team });
});
router.get('/:id', async (req, res) => {
    const team = await Team.findById(req.params.id).populate('captain members', 'name email').lean();
    res.json({ team });
});
export default router;
