import UserModel from "@/models/users";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res
            .status(405)
            .json({ error: true, message: "Metode Tidak Diizinkan" });
    }

    const { token } = req.body;

    try {
        // Hapus token dari pengguna
        const user = await UserModel.findOne({ token });
        if (user) {
            user.token = undefined;
            await user.save();
        }

        res.status(200).json({ success: true, message: "Logout berhasil" });
    } catch (error) {
        console.error("Logout gagal:", error);
        res.status(500).json({
            error: true,
            message: "Kesalahan Server Internal",
        });
    }
}
