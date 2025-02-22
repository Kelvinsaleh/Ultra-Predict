document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".view-analysis").forEach(button => {
        button.addEventListener("click", async function () {
            const matchId = this.getAttribute("data-id");

            try {
                const response = await fetch(`/api/match/${matchId}`);
                const match = await response.json();

                if (match.team1 && match.team2) {
                    const analysisText = `
                        ⚽ ${match.match}
                        📅 Time: ${match.time}
                        ✅ Prediction: ${match.prediction} (Odds: ${match.odds})

                        🏆 ${match.team1.name} Analysis:
                        - ${match.team1.analysis}
                        - Injuries: ${match.team1.injuries}
                        - Recent Form: ${match.team1.form}

                        🔥 ${match.team2.name} Analysis:
                        - ${match.team2.analysis}
                        - Injuries: ${match.team2.injuries}
                        - Recent Form: ${match.team2.form}
                    `;

                    alert(analysisText);
                } else {
                    alert("No detailed analysis available for this match.");
                }
            } catch (error) {
                console.error("Error fetching match details:", error);
                alert("Error loading analysis. Please try again.");
            }
        });
    });
});
