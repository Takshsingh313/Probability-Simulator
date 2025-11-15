from flask import Flask, render_template, request, jsonify
import random

app = Flask(__name__)

@app.route("/")
def index():
    # Returns the HTML file for the UI
    return render_template("index.html")

@app.route("/run_simulation", methods=["POST"])
def run_simulation():
    data = request.json
    experiment = data["experiment"]
    trials = int(data["trials"])
    results = {}
    running_prob = []

    if experiment == "coin":
        results = {"Heads": 0, "Tails": 0}
        for i in range(1, trials + 1):
            result = random.choice(["Heads", "Tails"])
            results[result] += 1
            if i % 10 == 0:
                running_prob.append(results["Heads"] / i)

    if experiment == "dice":
        results = {str(n): 0 for n in range(1, 7)}
        for i in range(1, trials + 1):
            result = random.randint(1, 6)
            results[str(result)] += 1

            if i % 10 == 0:
                most = max(results.values())   # count of most frequent face
                running_prob.append(most / i)  # probability of that face

    return jsonify({"counts": results, "running": running_prob})


if __name__ == "__main__":
    app.run(debug=True)