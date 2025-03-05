document.addEventListener("DOMContentLoaded", function () {
    const analysisContent = document.getElementById("analysis-content");

    // Example: Replace with real analysis data
    const matchAnalysis = `
        <p>
            Today's football fixtures bring us some thrilling encounters. The biggest clash of the day is the highly anticipated battle between 
            <strong>Manchester United</strong> and <strong>Liverpool</strong>. Both teams come into this fixture in great form, with Liverpool 
            boasting an aggressive attacking style, while United relies on strong midfield control and counterattacks. The match is expected to 
            be a high-scoring affair, given the recent performances of both squads.
        </p>

        <p>
            Another exciting fixture is <strong>Barcelona vs. Real Madrid</strong>. El Clásico never disappoints, and this time, both teams have 
            everything to play for. Real Madrid has been dominant in recent weeks, securing crucial wins in La Liga and the Champions League. 
            However, Barcelona's young squad is showing resilience, and their home advantage could play a significant role. Expect an intense 
            tactical battle between the two managers, with key players like Vinícius Jr. and Pedri set to shine.
        </p>

        <p>
            In the English Premier League, <strong>Chelsea takes on Arsenal</strong> in a crucial London Derby. Chelsea, struggling with inconsistency, 
            will need to find a way to break down Arsenal’s compact defensive structure. Meanwhile, Arsenal, with their title ambitions alive, will look 
            to capitalize on any weaknesses in Chelsea's defensive setup. The midfield battle between Declan Rice and Enzo Fernández could be the 
            deciding factor in this encounter.
        </p>

        <p>
            Lastly, in Serie A, <strong>Inter Milan faces Juventus</strong> in a match that could determine the fate of the league title race. Juventus, 
            known for their defensive solidity, will aim to frustrate Inter's attacking threats. On the other hand, Inter's high-pressing style might 
            force Juventus into making mistakes. This game is expected to be a low-scoring tactical showdown.
        </p>

        <p>
            As we analyze these key matches, one thing is certain: football fans are in for an exciting day full of drama, goals, and surprises. 
            Stay tuned for post-match analysis and insights as we break down the key moments from these epic clashes.
        </p>
    `;

    // Insert the match analysis into the HTML
    analysisContent.innerHTML = matchAnalysis;
});
