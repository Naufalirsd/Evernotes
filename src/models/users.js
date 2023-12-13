import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        default: "",
    },
});

let UserModel;

// Cek apakah model 'User' sudah ada
if (mongoose.models.User) {
    // Jika sudah ada, gunakan kembali model yang sudah ada
    UserModel = mongoose.model("User");
} else {
    // Jika belum ada, buat model 'User'
    UserModel = mongoose.model("User", userSchema);
}

export default UserModel;
