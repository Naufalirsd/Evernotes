// DetailNote.jsx
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/DetailNote.module.css"; // Sesuaikan path sesuai struktur folder Anda

export default function DetailNote() {
    const router = useRouter();
    const { id } = router.query; // Mendapatkan parameter ID dari URL
    const [noteData, setNoteData] = useState(null);

    useEffect(() => {
        // Lakukan pengambilan data catatan berdasarkan ID dari server atau API
        // Pastikan untuk menambahkan validasi dan logika pengambilan data sesuai kebutuhan

        // Contoh data catatan
        const sampleNoteData = {
            title: "Sample Note",
            note: "This is a sample note.",
            user_id: "123", // Contoh user ID, sesuaikan dengan logika aplikasi Anda
            date: new Date().toISOString(),
        };

        setNoteData(sampleNoteData);
    }, [id]);

    if (!noteData) {
        return <p>Loading...</p>;
    }

    return (
        <div className={styles.detailNoteContainer}>
            <h2>{noteData.title}</h2>
            <p>{noteData.note}</p>
            <p>User ID: {noteData.user_id}</p>
            <p>Date: {noteData.date}</p>
        </div>
    );
}
