import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "@/styles/Registration.module.css";

export default function Registration() {
    const router = useRouter();

    useEffect(() => {
        // ... (logika redirect)
    }, []);

    const [username, setUsername] = useState(""); // Tambahkan state untuk username
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");

    const handleRegistration = async (e) => {
         try {
             e.preventDefault();

             // Validasi panjang password dan keberadaan username
             if (
                 password.length < 6 ||
                 password.length > 10 ||
                 username.trim() === ""
             ) {
                 setError(
                     "Username dan password harus diisi, password harus di antara 6 sampai 10 karakter"
                 );
                 return;
             }

             const res = await fetch("/api/registration", {
                 method: "POST",
                 body: JSON.stringify({ username, password, name }),
                 headers: {
                     "Content-Type": "application/json",
                 },
             });
             const responseData = await res.json();

             if (res.ok) {
                 router.push("/login");
             } else {
                 setError(responseData.message);
             }
         } catch (error) {
             console.error("Error: ", error);
             alert("Terjadi Kesalahan, harap hubungi tim support");
         }
    };

    return (
        <div className={styles["registration-container"]}>
            <div className={styles["registration-box"]}>
                <h2 className={styles["registration-title"]}>Registrasi</h2>
                <form className={styles["registration-form"]}>
                    {/* ... (form-group untuk username) */}
                    <div className={styles["form-group"]}>
                        <label
                            className={styles["form-label"]}
                            htmlFor="username">
                            Username<span className={styles["star"]}>*</span>
                        </label>
                        <input
                            className={`${styles["form-input"]} ${styles["transparent-border"]}`}
                            placeholder="john_doe"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    {/* ... (form-group untuk name) */}
                    <div className={styles["form-group"]}>
                        <label className={styles["form-label"]} htmlFor="name">
                            Name<span className={styles["star"]}>*</span>
                        </label>
                        <input
                            className={`${styles["form-input"]} ${styles["transparent-border"]}`}
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    {/* ... (form-group untuk password) */}
                    <div className={styles["form-group"]}>
                        <label
                            className={styles["form-label"]}
                            htmlFor="password">
                            Password<span className={styles["star"]}>*</span>
                        </label>
                        <input
                            className={`${styles["form-input"]} ${styles["transparent-border"]}`}
                            placeholder="******"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        className={styles["registration-button"]}
                        onClick={handleRegistration}>
                        Daftar
                    </button>
                    {error && (
                        <p className={styles["error-message"]}>{error}</p>
                    )}
                </form>
                <div className={styles["login-link"]}>
                    <p>
                        Sudah punya akun?{" "}
                        <Link href="/login" className={styles["signin"]}>
                            Masuk
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}