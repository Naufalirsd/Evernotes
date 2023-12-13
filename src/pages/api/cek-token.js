import UserModel from "@/models/users";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res
            .status(405)
            .json({ error: true, message: "Metode Tidak Diizinkan" });
    }

    const { token } = req.body;

    try {
        // Periksa apakah token ada di database
        const user = await UserModel.findOne({ token });
        if (user) {
            res.status(200).json({ valid: true, message: "Token valid" });
        } else {
            res.status(401).json({
                valid: false,
                message: "Token tidak valid",
            });
        }
    } catch (error) {
        console.error("Error saat memeriksa token:", error);
        res.status(500).json({
            error: true,
            message: "Kesalahan Server Internal",
        });
    }
}
