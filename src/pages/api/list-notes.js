import { connectMongoDB } from "@/db/mongoDB";
import NoteModel from "@/models/notes";

connectMongoDB();

export default async function handler(req, res) {
    try {
        if (req.method !== "GET") {
            return res
                .status(405)
                .json({ error: true, message: "Metode tidak diizinkan" });
        }

        const allNotes = await NoteModel.find({});

        res.status(200).json({ success: true, data: allNotes });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            error: true,
            message: "Terjadi Kesalahan Internal Server",
        });
    }
}
