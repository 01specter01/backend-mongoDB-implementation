import db from "../lib/mongodb.js";
import { ObjectId } from "mongodb";
import { response } from "express";
import mongoose from "mongoose";

const collection = db.collection("photos");

//get all methode
export const getAll = async (req, res) => {
    const reports = await collection.find().toArray();
    res.json(reports);
};

//get methode
export const getOne = async (req, res) => {
    const isValid = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!isValid) return res.json("invalide id");
    const report = await collection.findOne({ _id: ObjectId(req.params.id) });

    res.json(report);
};

//put methode
export const replace = async (req, res) => {
    const id = req.params.id;
    const document = { ...req.body };

    // Da wir mit PUT einen Datensatz ersetzen wollen.
    // verwenden wir in MongoDB die Methode replaceOne().
    // Wir übergeben einen Filter wie bei find, findOne, deleteOne,...
    // Zusätzlich übergeben wir das neue Dokument,
    // welches das bisherige ersetzen soll.
    const result = await collection.replaceOne(
        { _id: ObjectId(req.params.id) },
        document
        // {
        //     // wollen wir einen Datensatz, den wir nicht gefunden haben, neu anlegen,
        //     // können wir dies mit der Option upsert: true machen.
        //     // upsert liefert uns als result eine Übersicht,
        //     // ob ein Datensatz aktualisiert oder angelegt wurde.
        //     upsert: true,
        // },
    );

    res.status(200).json(result); // eigentlich 204, wegen result aber "nur" 200
};

//patch methode
export const update = async (req, res) => {
    const isValid = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!isValid) return res.json("invalide id");
    const id = req.params.id;
    // TODO
    res.status(204).end();
};

//delete methode
export const remove = async (req, res) => {
    const isValid = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!isValid) return res.json("invalide id");
    await collection.deleteOne({ _id: ObjectId(req.params.id) });
    res.status(204).end();
};

//post methode
export const create = async (req, res) => {
    const result = await collection.insertOne({ ...req.body });
    res.status(201).json(result);
};
