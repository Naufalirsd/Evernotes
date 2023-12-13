import { useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/CreateNote.module.css"; // Sesuaikan path sesuai struktur folder Anda

export default function CreateNote() {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [note, setNote] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Lakukan pengiriman data ke server atau API untuk menyimpan catatan
        // Pastikan untuk menambahkan validasi dan logika penyimpanan sesuai kebutuhan

        // Setelah penyimpanan berhasil, redirect ke halaman dashboard atau halaman list notes
        router.push("/dashboard");
    };

    return (
        <div className={styles.createNoteContainer}>
            <h2>Create Note</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label htmlFor="note">Note:</label>
                <textarea
                    id="note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}></textarea>
                <button type="submit">Create Note</button>
            </form>
        </div>
    );
}
