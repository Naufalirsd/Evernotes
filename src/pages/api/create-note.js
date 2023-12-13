import { connectMongoDB } from "@/db/mongoDB";
import { getCookies } from "cookies-next";
import { verifyToken } from "@/utils/auth";
import NoteModel from "@/models/notes";

connectMongoDB();

export default async function handler(req, res) {
    try {
        if (req.method !== "POST") {
            return res
                .status(405)
                .json({ error: true, message: "Metode tidak diizinkan" });
        }

        const { token } = getCookies({ req });
        const { user_id } = verifyToken(token);

        const { title, note } = req.body;

        const newNote = new NoteModel({
            title,
            note,
            user_id,    
        });

        await newNote.save();

        res.status(201).json({
            success: true,
            message: "Catatan berhasil dibuat",
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            error: true,
            message: "Terjadi Kesalahan Internal Server",
        });
    }
}
