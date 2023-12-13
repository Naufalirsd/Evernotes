import { connectMongoDB } from "@/db/mongoDB";
import NoteModel from "@/models/notes";
import { verifyToken } from "@/utils/auth";
import { getCookies } from "cookies-next";

connectMongoDB();

export default async function handler(req, res) {
    try {
        if (req.method !== "DELETE") {
            return res
                .status(405)
                .json({ error: true, message: "Metode tidak diizinkan" });
        }

        const { token } = getCookies({ req });
        const { user_id } = verifyToken(token);

        const { id } = req.query;

        const note = await NoteModel.findById(id);

        if (!note) {
            return res
                .status(404)
                .json({ error: true, message: "Catatan tidak ditemukan" });
        }

        if (note.user_id !== user_id) {
            return res
                .status(403)
                .json({
                    error: true,
                    message: "Anda tidak diizinkan menghapus catatan ini",
                });
        }

        await note.remove();

        res.status(200).json({
            success: true,
            message: "Catatan berhasil dihapus",
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            error: true,
            message: "Terjadi Kesalahan Internal Server",
        });
    }
}
