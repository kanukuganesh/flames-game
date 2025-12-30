# 🔥 FLAMES Game - The Code Story

Imagine building a house where people come to find out their destiny. This project corresponds to that house, built with three magical blueprints: **HTML**, **CSS**, and **JavaScript**.

## 🏗️ The Foundation (HTML)
Our story begins with the **Architect (HTML)**. He sketches the layout of our house (`index.html`).
- He builds a grand **Entrance** (`<header>`) welcoming guests with the sign "FLAMES".
- He constructs a **Control Room** (`<div class="input-controls">`) where guests choose how to speak—by typing or using their voice.
- He designs the **Chamber of Names** (`<div id="input-section">`) with empty pedestals for "Your Name" and "Partner's Name".
- Finally, he builds a hidden **Hall of Destiny** (`<div id="result-section">`), currently dark and empty, waiting to be revealed.

## 🎨 The Decorator (CSS)
Next comes the **Interior Designer (CSS)** (`style.css`). The Architect's walls were plain and gray, so the Designer steps in.
- She paints the walls with a **Sunset Gradient** (`linear-gradient`) of soft pinks and reds.
- She adds **Glass Panels** (`glassmorphism`) to the cards, making them look like frosted glass floating in the air.
- She teaches the buttons how to **Pulse** (`@keyframes pulse`) when they are excited (listening to voice) and how the Hall of Destiny should **Fade In** (`@keyframes fadeIn`) dramatically when the truth is revealed.

## 🧠 The Wizard (JavaScript)
Finally, the house needs a brain. Enter the **Wizard (JavaScript)** (`script.js`). The house is beautiful but silent until he casts his spells.
1.  **The Spell of Listening**: When a guest presses the microphone, the Wizard summons the **Browser Spirit** (`SpeechRecognition`). He listens carefully, catches the words from the air, and magically inscribes them onto the pedestals.
2.  **The Ritual of Calculation**: When "Calculate" is pressed, the Wizard performs the ancient **FLAMES Ritual**:
    - He takes the two names and melts them down (`toLowerCase`).
    - He finds the common letters between them and makes them vanish into smoke (cancellation).
    - He counts the ashes (remaining letters) and chants "Friends, Love, Affection..." in a circle, removing one by one until only one destiny remains.
3.  **The Revelation**: With the answer in hand, the Wizard lights up the **Hall of Destiny**. He hangs the painting corresponding to the fate (e.g., a heart for Love) and reveals the prophecy to the guests.

---
*And so, the three work together: The Architect holds it up, the Designer makes it beautiful, and the Wizard brings it to life.*
