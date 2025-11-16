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

        return jsonify({"counts": results, "running": running_prob})

    elif experiment == "dice":
        results = {str(n): 0 for n in range(1, 7)}
        for i in range(1, trials + 1):
            result = random.randint(1, 6)
            results[str(result)] += 1
            if i % 10 == 0:
                most = max(results.values())
                running_prob.append(most / i)

        # choose a face to animate (most frequent single-die face)
        most_face = max(results, key=lambda k: results[k])
        return jsonify({"counts": results, "running": running_prob, "diceA": int(most_face), "diceB": None})

    elif experiment == "two_dice":
        # sums 2..12
        results = {str(s): 0 for s in range(2, 13)}
        for i in range(1, trials + 1):
            a = random.randint(1, 6)
            b = random.randint(1, 6)
            s = a + b
            results[str(s)] += 1
            if i % 10 == 0:
                most = max(results.values())
                running_prob.append(most / i)

        # find most frequent sum
        most_sum = int(max(results, key=lambda k: results[k]))

        # choose a random valid pair (a,b) such that a + b == most_sum
        valid_pairs = [(x, most_sum - x) for x in range(1, 7) if 1 <= most_sum - x <= 6]
        if not valid_pairs:
            # fallback: random roll
            pair = (random.randint(1, 6), random.randint(1, 6))
        else:
            pair = random.choice(valid_pairs)

        return jsonify({
            "counts": results,
            "running": running_prob,
            "diceA": pair[0],
            "diceB": pair[1],
            "sum": most_sum
        })

    # fallback
    return jsonify({"counts": {}, "running": []})

if __name__ == "__main__":
    app.run(debug=True)
