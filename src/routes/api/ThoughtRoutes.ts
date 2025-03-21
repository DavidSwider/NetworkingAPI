import { Router } from 'express';
const router = Router();

import { getAllThoughts, 
    getThoughtById, 
    createThought, 
    deleteThought, 
    updateThought,
    addReaction,
    deleteReaction
 } from '../../controllers/ThoughtController.js';

 router.route('/')
    .get(getAllThoughts)
    .post(createThought);

router.route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

router.route('/:thoughtId/reactions')
    .post(addReaction);

router.route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);

export { router as thoughtsRoutes };