import { v4 as uuid } from "uuid";
import Users from "@/models/users";
import { connectMongoDB } from "@/db/mongoDB";

connectMongoDB();

export default async function handler(req, res) {
    try {
        // pengecekan method
        if (req.method !== "POST") {
            return res
                .status(405)
                .json({ error: true, message: "Metode tidak diijinkan" });
        }

        const { name, username, password } = req.body;

        // validasi dari client (ada atau tidak)
        if (name.length < 3 || name.length >= 20 || username.trim() === "") {
            return res.status(400).json({
                error: true,
                message:
                    "Nama dan username harus diisi, nama harus di antara 3 sampai 20 karakter",
            });
        }

        if (password.length < 6 || password.length > 10) {
            return res.status(400).json({
                error: true,
                message: "Password harus di antara 6 sampai 10 karakter",
            });
        }

        // cek apakah nama atau username sudah digunakan
        const user = await Users.findOne({ $or: [{ name }, { username }] });

        if (user) {
            return res.status(400).json({
                error: true,
                message: "Nama atau username sudah pernah didaftarkan",
            });
        }

        // lengkapi data yang kurang
        const id = uuid();

        const data = { id, name, username, password };

        // jika sudah sesuai simpan
        const newUser = new Users(data);
        await newUser.save();

        // kasih tahu client (hanya data yang diperbolehkan)
        return res
            .status(201)
            .json({
                id: newUser.id,
                name: newUser.name,
                username: newUser.username,
            });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            error: true,
            message: "Ada masalah, harap hubungi developer",
        });
    }
}