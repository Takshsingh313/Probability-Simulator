/* Experiment switch */
document.getElementById("experiment").addEventListener("change", () => {
    switchExperiment(document.getElementById("experiment").value);
});

/* GLOBALS */
let chart = null;
let lineChart = null;

/* Hide/Show animation objects */
function switchExperiment(experiment) {
    document.getElementById("coin3d").style.display = "none";
    document.getElementById("cubeContainer").style.display = "none";
    document.getElementById("twoDiceArea").style.display = "none";
}
   

/* CHARTS */
function updateBarChart(counts) {
    if (chart) chart.destroy();
    const ctx = document.getElementById("resultsChart");

    chart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: Object.keys(counts),
            datasets: [{
                label: "Frequency",
                data: Object.values(counts),
                backgroundColor: [
                    "#FF6B6B", "#4ECDC4", "#45B7D1",
                    "#FFA07A", "#98D8C8", "#F7DC6F"
                ]
            }]
        }
    });
}

function updateLineChart(running) {
    if (lineChart) lineChart.destroy();
    const ctx = document.getElementById("lineChart");

    lineChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: running.map((_,i)=>(i+1)*10),
            datasets: [{
                label: "Probability Trend",
                data: running,
                borderColor: "#FF6B6B",
                backgroundColor: "rgba(255,107,107,0.2)",
                tension: 0.3,
                fill: true
            }]
        },
        options: { scales: { y: { min: 0, max: 1 } } }
    });
}

/* EXPLANATION */
function showExplanation(counts, experiment) {
    const el = document.getElementById("explanation");
    el.textContent = "Simulation complete.";
}

/* COIN ANIMATION */
function animateCoin(result) {
    const coin = document.getElementById("coin3d");
    coin.style.animation = "flipcoin 1.8s ease";
    setTimeout(() => {
        coin.style.animation = "";
        coin.style.transform = result === "Heads" ? "rotateY(0deg)" : "rotateY(180deg)";
    }, 1800);
}

/* DICE ANIMATION */
const faceRot = {
    1:{x:0,y:0},2:{x:0,y:-90},3:{x:0,y:180},
    4:{x:0,y:90},5:{x:90,y:0},6:{x:-90,y:0}
};

function animateDice(face) {
    const cube = document.getElementById("diceCube");
    const rot = faceRot[face];
    const spin = 360 * (Math.floor(Math.random()*3)+2);

    cube.style.transition = "1.4s ease";
    cube.style.transform = `rotateX(${spin+rot.x}deg) rotateY(${spin+rot.y}deg)`;
}

/* TWO DICE ANIMATION */
function animateTwoDice(f1, f2) {
    const A = document.getElementById("diceA");
    const B = document.getElementById("diceB");

    const rot1 = faceRot[f1];
    const rot2 = faceRot[f2];

    const spinA = 360 * (Math.floor(Math.random()*3)+2);
    const spinB = 360 * (Math.floor(Math.random()*3)+2);

    A.style.transition = "1.4s ease";
    B.style.transition = "1.4s ease";

    A.style.transform = `rotateX(${spinA+rot1.x}deg) rotateY(${spinA+rot1.y}deg)`;
    B.style.transform = `rotateX(${spinB+rot2.x}deg) rotateY(${spinB+rot2.y}deg)`;
}
