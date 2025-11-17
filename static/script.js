
document.getElementById("experiment").addEventListener("change", () => {
    switchExperiment(document.getElementById("experiment").value);
});

let chart = null;
let lineChart = null;

function switchExperiment(experiment) {
    document.getElementById("coin3d").style.display = "none";
    document.getElementById("cubeContainer").style.display = "none";
    document.getElementById("twoDiceArea").style.display = "none";
}

function runSimulation() {
    const experiment = document.getElementById("experiment").value;
    const trials = parseInt(document.getElementById("trials").value) || 200;

    document.getElementById("logoBox").style.display = "none";

    fetch("/run_simulation", {
        method: "POST",
        body: JSON.stringify({ experiment, trials }),
        headers: { "Content-Type": "application/json" }
    })
    .then(r => r.json())
    .then(data => {

        updateBarChart(data.counts);
        updateLineChart(data.running);
        showExplanation(data.counts, experiment);

        if (experiment === "coin") {
            document.getElementById("coin3d").style.display = "block";
            animateCoin(data.counts["Heads"] >= data.counts["Tails"] ? "Heads" : "Tails");
        }

        else if (experiment === "dice") {
            document.getElementById("cubeContainer").style.display = "block";
            let best = Object.keys(data.counts).reduce((a,b)=>
                data.counts[a] > data.counts[b] ? a : b
            );
            animateDice(parseInt(best));
        }

        else if (experiment === "two_dice") {
            document.getElementById("twoDiceArea").style.display = "flex";
            const f1 = Math.floor(Math.random()*6)+1;
            const f2 = Math.floor(Math.random()*6)+1;
            animateTwoDice(f1, f2);
        }
    });
}

function updateBarChart(counts) {
    if (chart) chart.destroy();
    const ctx = document.getElementById("resultsChart");

    chart = new Chart(ctx, {
        type: "bar",
        plugins: [ChartDataLabels],
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
        },
        options: {
            plugins: {
                datalabels: {
                    color: "#000",
                    anchor: "end",
                    align: "top",
                    formatter: (value) => value,
                    animation: {
                        duration: 1200,
                        easing: "easeOutQuad"
                    }
                }
            },
            animation: {
                duration: 800,
                onProgress: () => fadeChartsIn()
            }
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
                fill: true,
                pointRadius: 5,
                pointHoverRadius: 8,
                pointBackgroundColor: "#FF6B6B"
            }]
        },
        options: {
            plugins: {
                tooltip: { enabled: true }   
            },
            scales: {
                y: { min: 0, max: 1 }
            },
            animation: {
                duration: 900,
                onProgress: () => fadeChartsIn()
            }
        }
    });
}

function fadeChartsIn() {
    document.querySelectorAll(".chart-fade").forEach(c => {
        c.style.opacity = "1";
        c.style.transform = "translateY(0)";
    });
}

function showExplanation(counts, experiment) {
    document.getElementById("explanation").textContent = "Simulation complete.";
}

function animateCoin(result) {
    const coin = document.getElementById("coin3d");
    coin.style.animation = "flipcoin 1.8s ease";
    setTimeout(() => {
        coin.style.animation = "";
        coin.style.transform = result === "Heads" ? "rotateY(0deg)" : "rotateY(180deg)";
    }, 1800);
}

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

function animateTwoDice(f1, f2) {
    const A = document.getElementById("diceA");
    const B = document.getElementById("diceB");
    const spinA = 360 * (Math.floor(Math.random()*3)+2);
    const spinB = 360 * (Math.floor(Math.random()*3)+2);
    const rot1 = faceRot[f1], rot2 = faceRot[f2];

    A.style.transition = "1.4s ease";
    B.style.transition = "1.4s ease";

    A.style.transform = `rotateX(${spinA+rot1.x}deg) rotateY(${spinA+rot1.y}deg)`;
    B.style.transform = `rotateX(${spinB+rot2.x}deg) rotateY(${spinB+rot2.y}deg)`;
}

function resetSimulation() {
    if (chart) chart.destroy();
    if (lineChart) lineChart.destroy();

    document.getElementById("logoBox").style.display = "flex";
    document.getElementById("coin3d").style.display = "none";
    document.getElementById("cubeContainer").style.display = "none";
    document.getElementById("twoDiceArea").style.display = "none";

    document.querySelectorAll(".chart-fade").forEach(c => {
        c.style.opacity = "0";
        c.style.transform = "translateY(20px)";
    });
}
