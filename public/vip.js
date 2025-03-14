document.addEventListener("DOMContentLoaded", async function () {
    try {
        const firebaseConfig = await fetch("/firebase-config").then(res => res.json());
        firebase.initializeApp(firebaseConfig);
        const auth = firebase.auth();
        const db = firebase.firestore();

        const loginBtn = document.getElementById("loginBtn");
        const logoutBtn = document.getElementById("logoutBtn");
        const vipContent = document.getElementById("vip-content");

        loginBtn?.addEventListener("click", async () => {
            const provider = new firebase.auth.GoogleAuthProvider();
            await auth.signInWithPopup(provider);
        });

        logoutBtn?.addEventListener("click", async () => {
            await auth.signOut();
            location.reload();
        });

        auth.onAuthStateChanged(async (user) => {
            if (user) {
                loginBtn.style.display = "none";
                logoutBtn.style.display = "block";
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

        // Payment Processing
        window.subscribeVIP = async function (amount) {
            const user = auth.currentUser;
            if (!user) {
                alert("Please log in first.");
                return;
            }

            const response = await fetch("/create-payment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount, uid: user.uid })
            });

            const data = await response.json();
            if (data.url) {
                window.location.href = data.url; // Redirect to PayPal
            } else {
                alert("Payment failed. Try again.");
            }
        };
    } catch (error) {
        console.error("Error handling VIP access:", error);
    }
});
