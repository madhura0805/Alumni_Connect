import Post from '../models/postModel.js';
import User from '../models/userModels.js';
import path from 'path';
import { v4 as uuid } from 'uuid';
import HttpError from '../models/errorModel.js';

// CREATE A POST 
const createPost = async (req, res, next) => {
    try {
        let { title, category, description } = req.body;
        if (!title || !category || !description || !req.files) {
            return next(new HttpError("Fill in all fields and choose a thumbnail.", 422));
        }

        const { thumbnail } = req.files;
        if (thumbnail.size > 2000000) {
            return next(new HttpError("Thumbnail too big. File should be less than 2MB.", 422));
        }

        let fileName = `${uuid()}.${thumbnail.name.split('.').pop()}`;
        thumbnail.mv(path.join(__dirname, '..', '/uploads', fileName), async (err) => {
            if (err) return next(new HttpError(err));

            const newPost = await Post.create({ title, category, description, thumbnail: fileName, creator: req.user.id });
            if (!newPost) {
                return next(new HttpError("Post couldn't be created.", 422));
            }

            const currentUser = await User.findById(req.user.id);
            await User.findByIdAndUpdate(req.user.id, { posts: currentUser.posts + 1 });

            res.status(201).json(newPost);
        });
    } catch (err) {
        return next(new HttpError(err));
    }
};

// EDIT POST 
const editPost = async (req, res, next) => {
    try {
        const postId = req.params.id;
        let { title, category, description } = req.body;

        if (!title || !category || description.length < 12) {
            return next(new HttpError("Fill in all fields.", 422));
        }

        const oldPost = await Post.findById(postId);
        if (req.user.id !== oldPost.creator.toString()) {
            return next(new HttpError("Access Denied: You can only edit your own posts.", 403));
        }

        const updatedPost = await Post.findByIdAndUpdate(postId, { title, category, description }, { new: true });
        if (!updatedPost) {
            return next(new HttpError("Couldn't update post.", 400));
        }

        res.status(200).json(updatedPost);
    } catch (error) {
        return next(new HttpError(error));
    }
};

// DELETE POST 
const deletePost = async (req, res, next) => {
    try {
        const postId = req.params.id;
        if (!postId) {
            return next(new HttpError("Post unavailable", 400));
        }

        const post = await Post.findById(postId);
        if (req.user.id !== post.creator.toString()) {
            return next(new HttpError("Access Denied: You can only delete your own posts.", 403));
        }

        await Post.findByIdAndDelete(postId);
        const currentUser = await User.findById(req.user.id);
        await User.findByIdAndUpdate(req.user.id, { posts: currentUser.posts - 1 });

        res.json(`Post ${postId} deleted successfully.`);
    } catch (error) {
        return next(new HttpError(error));
    }
};

export { createPost, editPost, deletePost };
