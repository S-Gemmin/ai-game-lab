const WORDS = [
    'about', 'above', 'abuse', 'actor', 'acute', 'admit', 'adopt', 'adult', 'after', 'again',
    'agent', 'agree', 'ahead', 'alarm', 'album', 'alert', 'alien', 'align', 'alike', 'alive',
    'allow', 'alone', 'along', 'alter', 'among', 'anger', 'angle', 'angry', 'apart', 'apple',
    'apply', 'arena', 'argue', 'arise', 'array', 'arrow', 'aside', 'ask', 'asset', 'atlas',
    'avoid', 'awake', 'award', 'aware', 'badly', 'baker', 'bases', 'basic', 'batch', 'beach',
    'began', 'begin', 'being', 'below', 'bench', 'billy', 'birth', 'black', 'blame', 'blank',
    'blast', 'blind', 'block', 'blood', 'bloom', 'blown', 'blues', 'blunt', 'blush', 'board',
    'boast', 'bobby', 'boost', 'booth', 'bound', 'brain', 'brake', 'brand', 'brass', 'brave',
    'bread', 'break', 'breed', 'brief', 'bring', 'broad', 'broke', 'brown', 'brush', 'build',
    'built', 'bunch', 'burke', 'burst', 'buyer', 'cable', 'calif', 'carry', 'catch', 'cause',
    'chain', 'chair', 'chaos', 'charm', 'chart', 'chase', 'cheap', 'check', 'chest', 'chief',
    'child', 'china', 'chose', 'civil', 'claim', 'class', 'clean', 'clear', 'click', 'climb',
    'clock', 'close', 'cloud', 'coach', 'coast', 'could', 'count', 'court', 'cover', 'craft',
    'crash', 'crazy', 'cream', 'crime', 'cross', 'crowd', 'crown', 'crude', 'curve', 'cycle',
    'daily', 'dairy', 'dance', 'dated', 'dealt', 'death', 'debut', 'delay', 'depth', 'doing',
    'doubt', 'dozen', 'draft', 'drama', 'drank', 'drawn', 'dream', 'dress', 'drill', 'drink',
    'drive', 'drove', 'dying', 'eager', 'early', 'earth', 'eight', 'elite', 'empty', 'enemy',
    'enjoy', 'enter', 'entry', 'equal', 'error', 'event', 'every', 'exact', 'exist', 'extra',
    'faith', 'false', 'fault', 'fiber', 'field', 'fifth', 'fifty', 'fight', 'final', 'first',
    'fixed', 'flash', 'fleet', 'floor', 'fluid', 'focus', 'force', 'forth', 'forty', 'forum',
    'found', 'frame', 'frank', 'fraud', 'fresh', 'front', 'fruit', 'fully', 'funny', 'giant',
    'given', 'glass', 'globe', 'going', 'grace', 'grade', 'grand', 'grant', 'grass', 'grave',
    'great', 'green', 'gross', 'group', 'grown', 'guard', 'guess', 'guest', 'guide', 'happy',
    'harry', 'heart', 'heavy', 'henry', 'horse', 'hotel', 'house', 'human', 'ideal', 'image',
    'index', 'inner', 'input', 'issue', 'japan', 'jimmy', 'joint', 'jones', 'judge', 'known',
    'label', 'large', 'laser', 'later', 'laugh', 'layer', 'learn', 'lease', 'least', 'leave',
    'legal', 'level', 'lewis', 'light', 'limit', 'links', 'lives', 'local', 'loose', 'lower',
    'lucky', 'lunch', 'lying', 'magic', 'major', 'maker', 'march', 'maria', 'match', 'maybe',
    'mayor', 'meant', 'media', 'metal', 'might', 'minor', 'minus', 'mixed', 'model', 'money',
    'month', 'moral', 'motor', 'mount', 'mouse', 'mouth', 'moved', 'movie', 'music', 'needs',
    'never', 'newly', 'night', 'noise', 'north', 'noted', 'novel', 'nurse', 'occur', 'ocean',
    'offer', 'often', 'order', 'other', 'ought', 'outer', 'owned', 'owner', 'paint', 'panel',
    'paper', 'party', 'peace', 'peter', 'phase', 'phone', 'photo', 'piano', 'piece', 'pilot',
    'pitch', 'place', 'plain', 'plane', 'plant', 'plate', 'point', 'pound', 'power', 'press',
    'price', 'pride', 'prime', 'print', 'prior', 'prize', 'proof', 'proud', 'prove', 'queen',
    'quick', 'quiet', 'quite', 'radio', 'raise', 'range', 'rapid', 'ratio', 'reach', 'ready',
    'realm', 'rebel', 'refer', 'relax', 'repay', 'reply', 'right', 'rigid', 'rival', 'river',
    'robin', 'roger', 'roman', 'rough', 'round', 'route', 'royal', 'rural', 'scale', 'scene',
    'scope', 'score', 'sense', 'serve', 'seven', 'shall', 'shape', 'share', 'sharp', 'sheet',
    'shelf', 'shell', 'shift', 'shine', 'shirt', 'shock', 'shoot', 'short', 'shown', 'sided',
    'sight', 'silly', 'since', 'sixth', 'sixty', 'sized', 'skill', 'sleep', 'slide', 'small',
    'smart', 'smile', 'smith', 'smoke', 'solid', 'solve', 'sorry', 'sound', 'south', 'space',
    'spare', 'speak', 'speed', 'spend', 'spent', 'split', 'spoke', 'sport', 'staff', 'stage',
    'stake', 'stand', 'start', 'state', 'steam', 'steel', 'steep', 'steer', 'stern', 'stick',
    'still', 'stock', 'stone', 'stood', 'store', 'storm', 'story', 'strip', 'stuck', 'study',
    'stuff', 'style', 'sugar', 'suite', 'super', 'sweet', 'swept', 'swing', 'sworn', 'table',
    'taken', 'taste', 'taxes', 'teach', 'tends', 'terry', 'texas', 'thank', 'theft', 'their',
    'theme', 'there', 'these', 'thick', 'thing', 'think', 'third', 'those', 'three', 'threw',
    'throw', 'thumb', 'tight', 'timed', 'tired', 'title', 'today', 'topic', 'total', 'touch',
    'tough', 'tower', 'track', 'trade', 'train', 'treat', 'trend', 'trial', 'tribe', 'trick',
    'tried', 'tries', 'truck', 'truly', 'trunk', 'trust', 'truth', 'twice', 'uncle', 'under',
    'undue', 'union', 'unity', 'until', 'upper', 'upset', 'urban', 'usage', 'usual', 'valid',
    'value', 'video', 'virus', 'visit', 'vital', 'vocal', 'voice', 'waste', 'watch', 'water',
    'wheel', 'where', 'which', 'while', 'white', 'whole', 'whose', 'woman', 'women', 'world',
    'worry', 'worse', 'worst', 'worth', 'would', 'write', 'wrong', 'wrote', 'yield', 'young',
    'youth'
];

class ReverseWordle {
    constructor() {
        this.possibleWords = [...WORDS];
        this.currentGuess = '';
        this.currentRow = 0;
        this.maxAttempts = 6;
        this.gameActive = false;
        this.feedback = [];

        this.initializeElements();
        this.createBoard();
        this.bindEvents();
    }

    initializeElements() {
        this.statusEl = document.getElementById('status');
        this.boardEl = document.getElementById('board');
        this.startBtn = document.getElementById('startBtn');
        this.submitBtn = document.getElementById('submitBtn');
        this.aiInfoBtn = document.getElementById('aiInfoBtn');
        this.aiInfo = document.getElementById('aiInfo');
        this.aiStats = document.getElementById('aiStats');
        this.modal = document.getElementById('gameModal');
        this.modalTitle = document.getElementById('modalTitle');
        this.modalText = document.getElementById('modalText');
        this.newGameBtn = document.getElementById('newGameBtn');
    }

    createBoard() {
        this.boardEl.innerHTML = '';
        for (let row = 0; row < this.maxAttempts; row++) {
            const rowEl = document.createElement('div');
            rowEl.className = 'row';

            for (let col = 0; col < 5; col++) {
                const tile = document.createElement('div');
                tile.className = 'tile';
                tile.dataset.row = row;
                tile.dataset.col = col;
                tile.addEventListener('click', () => this.cycleTile(row, col));
                rowEl.appendChild(tile);
            }

            this.boardEl.appendChild(rowEl);
        }
    }

    bindEvents() {
        this.startBtn.addEventListener('click', () => this.startGame());
        this.submitBtn.addEventListener('click', () => this.submitFeedback());
        this.aiInfoBtn.addEventListener('click', () => this.toggleAIInfo());
        this.newGameBtn.addEventListener('click', () => this.newGame());
    }

    startGame() {
        this.gameActive = true;
        this.possibleWords = [...WORDS];
        this.currentRow = 0;
        this.feedback = [];

        this.startBtn.style.display = 'none';
        this.submitBtn.style.display = 'block';
        this.aiInfoBtn.style.display = 'block';

        this.createBoard();
        this.statusEl.textContent = 'Let me think of my first guess...';

        setTimeout(() => this.makeGuess(), 1000);
    }

    makeGuess() {
        if (this.currentRow >= this.maxAttempts) {
            this.endGame(false);
            return;
        }

        if (this.possibleWords.length === 0) {
            this.statusEl.textContent = 'No valid words left! Please check your feedback.';
            return;
        }

        this.currentGuess = this.getBestGuess();
        this.displayGuess();
        this.updateAIStats();

        this.statusEl.textContent = `I guessed "${this.currentGuess.toUpperCase()}". Mark each letter and click Submit Feedback.`;
    }

    getBestGuess() {
        if (this.possibleWords.length === 1) {
            return this.possibleWords[0];
        }

        let bestGuess = this.possibleWords[0];
        let bestScore = -1;

        for (const guess of this.possibleWords) {
            const score = this.calculateInformationGain(guess);
            if (score > bestScore) {
                bestScore = score;
                bestGuess = guess;
            }
        }

        return bestGuess;
    }

    calculateInformationGain(guess) {
        const patterns = {};

        for (const word of this.possibleWords) {
            const pattern = this.getFeedbackPattern(guess, word);
            patterns[pattern] = (patterns[pattern] || 0) + 1;
        }

        let entropy = 0;
        const total = this.possibleWords.length;

        for (const count of Object.values(patterns)) {
            const probability = count / total;
            entropy += probability * Math.log2(1 / probability);
        }

        return entropy;
    }

    getFeedbackPattern(guess, target) {
        const result = Array(5).fill('absent');
        const targetChars = target.split('');
        const guessChars = guess.split('');

        // First pass: mark correct positions
        for (let i = 0; i < 5; i++) {
            if (guessChars[i] === targetChars[i]) {
                result[i] = 'correct';
                targetChars[i] = null; // Mark as used
                guessChars[i] = null;  // Mark as used
            }
        }

        // Second pass: mark present letters
        for (let i = 0; i < 5; i++) {
            if (guessChars[i] !== null) {
                const targetIndex = targetChars.indexOf(guessChars[i]);
                if (targetIndex !== -1) {
                    result[i] = 'present';
                    targetChars[targetIndex] = null; // Mark as used
                }
            }
        }

        return result.join(',');
    }

    displayGuess() {
        const tiles = this.boardEl.querySelectorAll(`.tile[data-row="${this.currentRow}"]`);
        for (let i = 0; i < 5; i++) {
            tiles[i].textContent = this.currentGuess[i].toUpperCase();
            tiles[i].classList.add('filled');
            tiles[i].classList.remove('correct', 'present', 'absent');
        }
        this.feedback = Array(5).fill('');
    }

    cycleTile(row, col) {
        if (row !== this.currentRow || !this.gameActive) return;

        const tile = this.boardEl.querySelector(`.tile[data-row="${row}"][data-col="${col}"]`);
        const states = ['', 'absent', 'present', 'correct'];
        const currentState = this.feedback[col];
        const currentIndex = states.indexOf(currentState);
        const nextIndex = (currentIndex + 1) % states.length;
        const nextState = states[nextIndex];

        // Remove all state classes
        tile.classList.remove('correct', 'present', 'absent');

        // Add new state class if not empty
        if (nextState) {
            tile.classList.add(nextState);
        }

        this.feedback[col] = nextState;
    }

    submitFeedback() {
        if (!this.gameActive) return;

        // Check if all tiles are marked
        if (this.feedback.includes('')) {
            this.statusEl.textContent = 'Please mark all letters before submitting!';
            return;
        }

        // Check if all correct (AI won)
        if (this.feedback.every(state => state === 'correct')) {
            this.endGame(true);
            return;
        }

        // Filter possible words based on feedback
        this.filterWordsByFeedback();

        this.currentRow++;

        if (this.currentRow >= this.maxAttempts) {
            this.endGame(false);
            return;
        }

        this.statusEl.textContent = 'Let me think about my next guess...';
        setTimeout(() => this.makeGuess(), 1000);
    }

    filterWordsByFeedback() {
        const previousCount = this.possibleWords.length;

        this.possibleWords = this.possibleWords.filter(word => {
            const pattern = this.getFeedbackPattern(this.currentGuess, word);
            const expectedPattern = this.feedback.join(',');
            return pattern === expectedPattern;
        });

        console.log(`Filtered from ${previousCount} to ${this.possibleWords.length} words`);
    }

    updateAIStats() {
        this.aiStats.textContent = `I'm considering ${this.possibleWords.length} possible words. My guess "${this.currentGuess.toUpperCase()}" should give me the most information to narrow down the possibilities.`;
    }

    toggleAIInfo() {
        const isVisible = this.aiInfo.classList.contains('show');
        this.aiInfo.classList.toggle('show');
        this.aiInfoBtn.textContent = isVisible ? 'Show AI Logic' : 'Hide AI Logic';
    }

    endGame(aiWon) {
        this.gameActive = false;

        if (aiWon) {
            this.modalTitle.textContent = 'I Got It!';
            this.modalText.textContent = `I guessed your word "${this.currentGuess.toUpperCase()}" in ${this.currentRow + 1} attempts!`;
        } else {
            this.modalTitle.textContent = 'You Stumped Me!';
            this.modalText.textContent = `I couldn't guess your word in ${this.maxAttempts} attempts. What was it?`;
        }

        this.modal.classList.add('show');
    }

    newGame() {
        this.modal.classList.remove('show');
        this.startBtn.style.display = 'block';
        this.submitBtn.style.display = 'none';
        this.aiInfoBtn.style.display = 'none';
        this.aiInfo.classList.remove('show');
        this.aiInfoBtn.textContent = 'Show AI Logic';
        this.statusEl.textContent = 'Click "Start Game" to begin. Think of any 5-letter word!';
        this.createBoard();
    }
}

// Initialize the game when page loads
document.addEventListener('DOMContentLoaded', () => {
    new ReverseWordle();
});