# Probability-Simulator
This simulator instantly visualizes the results using a bar graph for outcome frequencies and a line graph that tracks the probability's convergence over time.
## About
This is a probability simulator that lets you select an experiment and a number of trials. After running the simulation, It displays the frequency of each outcome (e.g., die face) using a bar graph and tracks the probability over time with a line graph.
- Try it here: [link](https://probabilitysimulator.pythonanywhere.com/)
---
## Features

### Coin Flip Probability Simulation
- Simulates Heads/Tails outcomes and shows how frequencies approach 50/50 as trial count increases
### Single Dice Roll Probability
- Simulates a fair six-sided die and shows the probability distribution for faces 1–6, approaching 1/6 each.
### Two-Dice Sum Probability
- Simulates rolling two dice and computes the probability of sums 2–12, naturally showing higher probability for 7 and lower for 2 & 12.
### Running Probability Over Time
- A line graph tracks how probability stabilizes as trial count increases (Law of Large Numbers).
### Outcome Frequency Distribution
- Bar charts show how often each coin outcome, dice face, or dice sum occurred, helping users understand randomness and variation.
---
## Technologies used
- Frontend: HTML, JavaScript, CSS
- Backend: flask backend(app.py)


## Project Structure

```

probability-simulator/
├── devlogs/                 # contains all the demo video and screenshots of the experiments
├── static/                  # contains all the js and css files along with required png.
├── templates/               # contains the index of the web page
├── .gitignore/              
├── LICENSE                  # MIT license
├── README.md                # documentation of the project
├── app.py                   # flask backend 

```  
## Installation steps
1. **Clone the repo:**
   ```bash
   git clone https://github.com/Takshsingh313/Probability-Simulator
   cd Probability-Simulator
   ```

2. **Create a virtual environment :**
   
   Makes a seprate environment
   
   **Windows:**
   ```bash
   python -m venv venv
   .\venv\Scripts\activate
   ```
   
   **macOS / Linux:**
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install dependencies:**
   ```bash
   pip install flask
   ```
   
4. **Run the app:**
   ```bash
   python app.py
   ```

5. **Open it up:**
   
   open in the browser `http://127.0.0.1:5000`

--- 
## Installation steps 
### Prerequisites

- **Python 3.13+** 
-  use **pip** for installing packages
- **flask** 2.0 or above
- **Any of the browser** (Chrome, Firefox, Edge)

---

## Demo 
- demo video of the working of web app :  [Link](https://drive.google.com/file/d/1SzzwSYFVwaBxIw5cCn-BSQ12fVAEiuDB/view?usp=sharing)



---
## Author 
- Email: takshsingh313@gmail.com
- Insta id : @ [__takshsingh__](https://www.instagram.com/_takshsingh_/)
- **Taksh Singh**
---
