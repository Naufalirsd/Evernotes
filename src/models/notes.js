import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 60,
    },
    note: {
        type: String,
        maxlength: 2000,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

let NoteModel;

// Cek apakah model 'Note' sudah ada
if (mongoose.models.Note) {
    // Jika sudah ada, gunakan kembali model yang sudah ada
    NoteModel = mongoose.model("Note");
} else {
    // Jika belum ada, buat model 'Note'
    NoteModel = mongoose.model("Note", noteSchema);
}

export default NoteModel;
