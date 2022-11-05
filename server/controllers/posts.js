const { response, request } = require("express");
const PostMessage = require("../models/postMessage");
const mongoose = require('mongoose');

const getPosts = async (request, response) => {
  try {
    const postMessage = await PostMessage.find();

    response.status(200).json(postMessage);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

const createPost = async (request, response) => {
  const post = request.body;
  const newPost = new PostMessage({ ...post, creator: request.userId, createdAt: new Date().toISOString() });

  try {
    await newPost.save();
    response.status(201).json(newPost);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

const updatePost = async (request, response) => {
  const { id: _id} = request.params;
  const post = request.body;

  if(!mongoose.Types.ObjectId.isValid(_id))
    return response.status(404).send("No post with that id");

  const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id}, {new: true});

  response.json(updatedPost);
}

const deletePost = async (request, response) => {
  const { id } = request.params;

  if(!mongoose.Types.ObjectId.isValid(id))
    return response.status(404).send("No post with that id");

  await PostMessage.findByIdAndDelete(id);

  response.json({ message: "Post Deleted Successfully"});
}

const likePost = async (request, response) => {
  const { id } = request.params;

  if(!request.userId)
    return response.json({ message: "Unauthenticated" });

  if(!mongoose.Types.ObjectId.isValid(id))
    return response.status(404).send("No post with that id");

  const post = await PostMessage.findById(id);

  const index = post.likes.findIndex((id) => id === String(request.userId));

  if(index === -1) {
    post.likes.push(request.userId);
  } else {
    post.likes = post.likes.filter((id) => id !== String(request.userId));
  }

  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {new: true});

  response.status(200).json(updatedPost);
}

module.exports = { getPosts, createPost, updatePost, deletePost, likePost };