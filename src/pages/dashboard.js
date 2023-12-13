import Link from "next/link";
import { useRouter } from "next/router";
import styles from "@/styles/Dashboard.module.css"; // Gantilah dengan path yang sesuai
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { getDataApi, postDataApi } from "@/utils/api";

export default function Dasbor() {
    const [user, setUser] = useState({ id: "", name: "" });
    const router = useRouter();
    const [allNotes, setAllNotes] = useState([]);

    useEffect(() => {
        const run = async () => {
            try {
                let myToken = "";
                if (localStorage.getItem("keepLogin") === "true") {
                    myToken = getCookie("token");
                } else {
                    myToken = sessionStorage.getItem("token");
                }

                if (!myToken) {
                    router.push("/login");
                    return;
                }

                const data = { token: myToken };

                let myUser;
                await postDataApi(
                    "/api/checkToken",
                    data,
                    (successData) => {
                        let roleName = "";
                        switch (successData.role) {
                            case 0:
                                roleName = "Santri";
                                break;
                            case 1:
                                roleName = "Admin";
                                break;
                        }
                        myUser = { ...successData, roleName };
                        setUser(myUser);
                    },
                    (failData) => {
                        console.log("failData: ", failData);
                        router.push("/login");
                    }
                );

                if (myUser && myUser.role === 1) {
                    await getDataApi(
                        "/api/listNotes",
                        (dataSuccess) => {
                            console.log("dataSuccess: ", dataSuccess);
                            setAllNotes(dataSuccess.notes);
                        },
                        (dataFail) => {
                            console.log("dataFail: ", dataFail);
                        }
                    );
                }
            } catch (error) {
                console.log("error: ", error);
            }
        };

        run();
    }, [router]);

    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <div
                    className={styles.header}
                    style={{ paddingBottom: "140%" }}>
                    <h1>Dashboard</h1>
                </div>
                <div>
                    <ul>
                        <li>
                            <button
                                className={styles.logoutBtn}
                                onClick={async () => {
                                    let myToken = "";
                                    if (
                                        localStorage.getItem("keepLogin") ===
                                        "true"
                                    ) {
                                        myToken = getCookie("token");
                                    } else {
                                        sessionStorage.setItem("token", "");
                                        router.push("/login");
                                        return;
                                    }
                                    if (myToken) {
                                        const data = { token: myToken };
                                        await postDataApi(
                                            "/api/logout",
                                            data,
                                            (successData) => {
                                                router.push("/login");
                                            },
                                            (failData) => {
                                                console.error(
                                                    "Gagal melakukan permintaan:",
                                                    failData
                                                );
                                                alert(
                                                    "terjadi kesalahan koneksi " +
                                                        failData
                                                );
                                            }
                                        );
                                    } else {
                                        router.push("/login");
                                    }
                                }}>
                                Logout
                            </button>
                        </li>
                        <li>
                            <button
                                className={`${styles.logoutBtn} ${styles.noteButton}`}
                                onClick={() => {
                                    // Tambahkan logika untuk membuat catatan di sini
                                    router.push("/create-note");
                                }}>
                                Buat Catatan
                            </button>
                        </li>
                        <li>
                            <button
                                className={`${styles.logoutBtn} ${styles.noteButton}`}
                                onClick={() => {
                                    // Tambahkan logika untuk menuju ke halaman detail catatan di sini
                                    router.push("/detail-notes/[id]", "/detail-notes/123");
                                }}>
                                Detail Catatan
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={styles.mainContent}>
                <div className={styles.userHeader}>
                    <span>
                        {user.name} ({user.roleName})
                    </span>
                </div>
                {user.role === 1 && (
                    <div className={styles.tableContainer}>
                        <div className={styles.title}>Data Catatan</div>
                        <div className={styles.table}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Note</th>
                                        <th>User ID</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allNotes &&
                                        allNotes.map((data, index) => (
                                            <tr key={index}>
                                                <td>{data.title}</td>
                                                <td>{data.note}</td>
                                                <td>{data.user_id}</td>
                                                <td>
                                                    {new Date(
                                                        data.date
                                                    ).toLocaleDateString()}
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
