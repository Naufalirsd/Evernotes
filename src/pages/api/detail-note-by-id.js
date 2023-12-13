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

        const { id } = req.query;

        const note = await NoteModel.findById(id);

        if (!note) {
            return res
                .status(404)
                .json({ error: true, message: "Catatan tidak ditemukan" });
        }

        res.status(200).json({ success: true, data: note });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            error: true,
            message: "Terjadi Kesalahan Internal Server",
        });
    }
}
