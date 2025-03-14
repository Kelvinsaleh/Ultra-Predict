// vip.js (Handles VIP Authentication & Access Control)

document.addEventListener("DOMContentLoaded", async function () {
    try {
        const firebaseConfig = await fetch("/firebase-config").then(res => res.json());
        firebase.initializeApp(firebaseConfig);
        const auth = firebase.auth();
        const db = firebase.firestore();

        const loginBtn = document.getElementById("loginBtn");
        const logoutBtn = document.getElementById("logoutBtn");
        const vipContent = document.getElementById("vip-content");

        // Handle login
        loginBtn?.addEventListener("click", async () => {
            const provider = new firebase.auth.GoogleAuthProvider();
            await auth.signInWithPopup(provider);
        });

        // Handle logout
        logoutBtn?.addEventListener("click", async () => {
            await auth.signOut();
            location.reload();
        });

        // Check authentication state
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                // Check if the user has VIP access
                const userRef = db.collection("vipUsers").doc(user.uid);
                const userDoc = await userRef.get();

                if (userDoc.exists && userDoc.data().isVIP) {
                    vipContent.innerHTML = `<h3>Welcome, ${user.displayName}</h3>
                                            <p>Here are your exclusive VIP predictions:</p>
                                            <table id="vipPredictionsTable">
                                                <tr>
                                                    <th>Match</th>
                                                    <th>Prediction</th>
                                                </tr>
                                            </table>`;
                    loadVIPPredictions();
                } else {
                    vipContent.innerHTML = "<p>You do not have VIP access. Please subscribe.</p>";
                }
            }
        });

        async function loadVIPPredictions() {
            const vipPredictionsRef = db.collection("vipPredictions").doc("latest");
            const doc = await vipPredictionsRef.get();
            if (doc.exists) {
                const predictions = doc.data().matches;
                const table = document.getElementById("vipPredictionsTable");
                predictions.forEach(match => {
                    let row = table.insertRow();
                    row.insertCell(0).innerText = match.match;
                    row.insertCell(1).innerText = match.prediction;
                });
            }
        }
    } catch (error) {
        console.error("Error handling VIP access:", error);
    }
});
