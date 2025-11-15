from flask import Flask, render_template, request, jsonify
import random

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/run_simulation", methods=["POST"])
def run_simulation():
    data = request.json
    experiment = data.get("experiment")
    trials = int(data.get("trials", 200))

    results = {}
    running_prob = []

    if experiment == "coin":
        results = {"Heads": 0, "Tails": 0}
        for i in range(1, trials + 1):
            result = random.choice(["Heads", "Tails"])
            results[result] += 1
            if i % 10 == 0:
                running_prob.append(results["Heads"] / i)

    elif experiment == "dice":
        results = {str(n): 0 for n in range(1, 7)}
        for i in range(1, trials + 1):
            result = random.randint(1, 6)
            results[str(result)] += 1
            if i % 10 == 0:
                most = max(results.values())
                running_prob.append(most / i)

    elif experiment == "two_dice":
        # sums 2..12
        results = {str(s): 0 for s in range(2, 13)}
        for i in range(1, trials + 1):
            r = random.randint(1, 6) + random.randint(1, 6)
            results[str(r)] += 1
            if i % 10 == 0:
                most = max(results.values())
                running_prob.append(most / i)

    else:
        # fallback - return empty
        results = {}

    return jsonify({"counts": results, "running": running_prob})

if __name__ == "__main__":
    app.run(debug=True)
