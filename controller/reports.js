import db from "../lib/mongodb.js";
import { ObjectId } from "mongodb";

const collection = db.collection("reports");

export const getAll = async (req, res) => {
    const reports = await collection.find().toArray();
    res.json(reports);
};

export const getOne = async (req, res) => {
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
