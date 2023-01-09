import db from "../lib/mongodb.js";
import { ObjectId } from "mongodb";
import { response } from "express";

const collection = db.collection("photos");
import mongoose from "mongoose";

export const getAll = async (req, res) => {
    const reports = await collection.find().toArray();
    res.json(reports);
};

export const getOne = async (req, res) => {
    const isValid = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!isValid) return res.json("invalide id");
    const report = await collection.findOne({ _id: ObjectId(req.params.id) });

    res.json(report);
};

export const update = async (req, res) => {
    const id = req.params.id;
    // TODO
    res.status(204).end();
};

export const remove = async (req, res) => {
    await collection.deleteOne({ _id: ObjectId(req.params.id) });
    res.status(204).end();
};

export const create = async (req, res) => {
    const result = await collection.insertOne({ ...req.body });
    res.status(201).json(result);
};
