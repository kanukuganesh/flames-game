document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const manualBtn = document.getElementById('manual-mode-btn');
    const voiceBtn = document.getElementById('voice-mode-btn');
    const name1Input = document.getElementById('name1');
    const name2Input = document.getElementById('name2');
    const voiceTriggers = document.querySelectorAll('.voice-trigger');
    const calculateBtn = document.getElementById('calculate-btn');
    const resultSection = document.getElementById('result-section');
    const inputSection = document.getElementById('input-section');
    const resultTitle = document.getElementById('result-title');
    const resultImage = document.getElementById('result-image');
    const resultDesc = document.getElementById('result-description');
    const resetBtn = document.getElementById('reset-btn');
    const statusMsg = document.getElementById('status-msg');

    // FLAMES Data
    const flamesData = {
        'F': { title: 'Friends', image: 'assets/images/friends.png', desc: 'A bond that lasts forever!' },
        'L': { title: 'Love', image: 'assets/images/love.png', desc: 'True love is in the air!' },
        'A': { title: 'Affection', image: 'assets/images/affection.png', desc: 'Sweet and caring affection.' },
        'M': { title: 'Marriage', image: 'assets/images/marriage.png', desc: 'Destined to be together!' },
        'E': { title: 'Enemy', image: 'assets/images/enemy.png', desc: 'Ideally, keep some distance!' },
        'S': { title: 'Siblings', image: 'assets/images/siblings.png', desc: 'Like a brother or sister.' }
    };

    // Mode Switching
    manualBtn.addEventListener('click', () => {
        manualBtn.classList.add('active');
        voiceBtn.classList.remove('active');
        voiceTriggers.forEach(btn => btn.classList.add('hidden'));
    });

    voiceBtn.addEventListener('click', () => {
        voiceBtn.classList.add('active');
        manualBtn.classList.remove('active');
        voiceTriggers.forEach(btn => btn.classList.remove('hidden'));

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert('Voice input is not supported in this browser. Please use Chrome or a supported mobile browser.');
        }
    });

    // Voice Input Logic
    voiceTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (!SpeechRecognition) return;

            const targetId = trigger.getAttribute('data-target');
            const targetInput = document.getElementById(targetId);
            const recognition = new SpeechRecognition();

            recognition.lang = 'en-US';
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.start();

            trigger.classList.add('listening');
            statusMsg.textContent = "Listening...";
            statusMsg.classList.remove('hidden');

            recognition.onresult = (event) => {
                let transcript = event.results[0][0].transcript;
                // Clean up punctuation often added by voice input (e.g. "Alex.")
                transcript = transcript.replace(/[.,!?;:]+$/, '');
                targetInput.value = transcript;
                trigger.classList.remove('listening');
                statusMsg.classList.add('hidden');
            };

            recognition.onerror = (event) => {
                console.error('Voice error:', event.error);
                trigger.classList.remove('listening');
                statusMsg.textContent = "Did not hear clearly. Please try again.";
            };

            recognition.onend = () => {
                trigger.classList.remove('listening');
            };
        });
    });

    // Calculate FLAMES
    calculateBtn.addEventListener('click', () => {
        const name1 = name1Input.value.trim();
        const name2 = name2Input.value.trim();

        if (!name1 || !name2) {
            alert("Please enter both names!");
            return;
        }

        const resultKey = calculateFlames(name1, name2);
        showResult(resultKey);
    });

    function calculateFlames(n1, n2) {
        let name1 = n1.toLowerCase().replace(/\s/g, '').split('');
        let name2 = n2.toLowerCase().replace(/\s/g, '').split('');

        // Remove common letters (1-to-1 cancellation)
        for (let i = 0; i < name1.length; i++) {
            for (let j = 0; j < name2.length; j++) {
                if (name1[i] === name2[j] && name1[i] !== '*') {
                    name1[i] = '*'; // Mark as removed
                    name2[j] = '*'; // Mark as removed
                    break;
                }
            }
        }

        // Count remaining characters
        let count = name1.filter(c => c !== '*').length + name2.filter(c => c !== '*').length;

        if (count === 0) return 'E';

        let flames = ['F', 'L', 'A', 'M', 'E', 'S'];

        while (flames.length > 1) {
            let idx = (count % flames.length) - 1;

            if (idx < 0) {
                idx = flames.length - 1;
            }

            flames.splice(idx, 1);

            // Rotate list so scanning starts from next element
            let right = flames.slice(idx);
            let left = flames.slice(0, idx);
            flames = right.concat(left);
        }

        return flames[0];
    }

    function showResult(key) {
        const data = flamesData[key];
        resultTitle.textContent = data.title;
        resultImage.src = data.image;
        resultDesc.textContent = data.desc;

        inputSection.classList.add('hidden');
        resultSection.classList.remove('hidden');
    }

    resetBtn.addEventListener('click', () => {
        resultSection.classList.add('hidden');
        inputSection.classList.remove('hidden');
        name1Input.value = '';
        name2Input.value = '';
    });
});
