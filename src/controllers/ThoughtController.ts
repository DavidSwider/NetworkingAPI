import { Request, Response } from 'express';
import { Thought } from '../models/Thought';

export const getAllThoughts = async(_req: Request, res: Response) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch(error: any){
        res.status(500).json({
            message: error.message
        });
    }
};

export const getThoughtById = async(req: Request, res: Response) => {
    try {
        const thought = await Thought.findById(req.params.thoughtId);
        if (!thought) {
            return res.status(404).json({ message: 'No thought with that ID' });
        }
        res.json(thought);
        return;
    } catch(error: any){
        res.status(500).json({
            message: error.message
        });
        return;
    }
};

export const createThought = async(req: Request, res: Response) => {
    try {
        const thought = await Thought.create(req.body);
        res.json(thought);
    } catch(error: any){
        res.status(500).json({
            message: error.message
        });
    }
};

export const deleteThought = async(req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndDelete({id: req.params.thoughtId });
        if (!thought) {
            return res.status(404).json({ message: 'No thought with that ID' });
        }
        res.json({ message: 'Thought deleted!' })
        return;
    } catch(error: any){
        res.status(500).json({
            message: error.message
        });
        return;
    }
};

export const updateThought = async(req: Request, res: Response) => {
    try {
        const thought = await Thought.findByIdAndUpdate(
            req.params.thoughtId,
            { $set: req.body },
            { runValidators: true, new: true }
          );
    
          if (!thought) {
            res.status(404).json({ message: 'No user with this id!' });
          }
    
          res.json(thought)
    } catch (error: any) {
          res.status(400).json({
            message: error.message
          });
    }
};

export const addReaction = async(req: Request, res: Response) => {
    try {
        const thought = await Thought.findByIdAndUpdate(
            req.params.thoughtId,
            { $push: { reactions: req.body } },
            { runValidators: true, new: true }
          );
    
          if (!thought) {
            res.status(404).json({ message: 'No thought with this id!' });
          }
    
          res.json(thought)
    } catch (error: any) {
          res.status(400).json({
            message: error.message
          });
    }
};

export const deleteReaction = async(req: Request, res: Response) => {
    try {
        const thought = await Thought.findByIdAndUpdate(
            req.params.thoughtId,
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
          );
    
          if (!thought) {
            res.status(404).json({ message: 'No thought with this id!' });
          }
    
          res.json(thought)
    } catch (error: any) {
          res.status(400).json({
            message: error.message
          });
    }
};



