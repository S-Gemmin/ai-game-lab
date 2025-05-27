const MOVES = {
    ROCK: 'r',
    PAPER: 'p',
    SCISSORS: 's'
};

const MOVE_ARRAY = Object.values(MOVES);

const GAME_RESULTS = {
    PLAYER_WIN: 'p',
    AI_WIN: 'a',
    DRAW: 'd'
};

const MOVE_COUNTERS = {
    [MOVES.ROCK]: MOVES.PAPER,
    [MOVES.PAPER]: MOVES.SCISSORS,
    [MOVES.SCISSORS]: MOVES.ROCK
};

const WINNING_MOVES = {
    [MOVES.ROCK]: MOVES.SCISSORS,
    [MOVES.PAPER]: MOVES.ROCK,
    [MOVES.SCISSORS]: MOVES.PAPER
};

const MOVE_EMOJIS = {
    [MOVES.ROCK]: '✊',
    [MOVES.PAPER]: '✋',
    [MOVES.SCISSORS]: '✌️'
};

const RESULT_MESSAGES = {
    [GAME_RESULTS.PLAYER_WIN]: 'You win!',
    [GAME_RESULTS.AI_WIN]: 'AI wins!',
    [GAME_RESULTS.DRAW]: 'Draw!'
};

class GameState {
    constructor() {
        this.playerWins = 0;
        this.playerLosses = 0;
        this.draws = 0;
        this.totalRounds = 0;
    }

    updateStats(result) {
        switch (result) {
            case GAME_RESULTS.PLAYER_WIN:
                this.playerWins++;
                break;
            case GAME_RESULTS.AI_WIN:
                this.playerLosses++;
                break;
            case GAME_RESULTS.DRAW:
                this.draws++;
                break;
        }
        this.totalRounds++;
    }

    getWinRate() {
        const totalDecisiveGames = this.playerWins + this.playerLosses;
        return totalDecisiveGames > 0 ? (this.playerWins / totalDecisiveGames * 100).toFixed(1) : 0;
    }

    getStats() {
        return {
            wins: this.playerWins,
            losses: this.playerLosses,
            draws: this.draws,
            winRate: this.getWinRate()
        };
    }
}

class MarkovPredictor {
    constructor(order, focusLength) {
        this.order = order;
        this.focusLength = focusLength;
        this.stateTransitions = new Map();
        this.recentResults = [];
        this.moveHistory = '';
    }

    getSuccessRate() {
        if (this.recentResults.length === 0) return 0.5;
        const successes = this.recentResults.filter(result => result === GAME_RESULTS.AI_WIN).length;
        return successes / this.recentResults.length;
    }

    predictNextMove() {
        if (this.order >= this.moveHistory.length)
            return this.getRandomMove();

        const currentPattern = this.moveHistory.slice(-this.order);
        let bestMove = null;
        let maxOccurrences = 0;

        for (const move of MOVE_ARRAY) {
            const pattern = currentPattern + move;
            const occurrences = this.stateTransitions.get(pattern) || 0;

            if (occurrences > maxOccurrences) {
                maxOccurrences = occurrences;
                bestMove = move;
            }
        }

        return bestMove || this.getRandomMove();
    }

    updateHistory(playerMove) {
        this.moveHistory += playerMove;

        if (this.moveHistory.length > this.order) {
            const patternLength = this.order + 1;
            const pattern = this.moveHistory.slice(-patternLength);

            this.stateTransitions.set(
                pattern,
                (this.stateTransitions.get(pattern) || 0) + 1
            );
        }
    }

    updateResults(didAiWin) {
        if (this.recentResults.length >= this.focusLength)
            this.recentResults.shift();

        this.recentResults.push(didAiWin ? GAME_RESULTS.AI_WIN : GAME_RESULTS.PLAYER_WIN);
    }

    getRandomMove() {
        return MOVE_ARRAY[Math.floor(Math.random() * MOVE_ARRAY.length)];
    }
}

class RockPaperScissorsAI {
    constructor(focusLength = 7, initialExplorationRate = 0.8) {
        this.predictors = this.createPredictors(focusLength);
        this.explorationRate = initialExplorationRate;
        this.roundsPlayed = 0;
    }

    createPredictors(focusLength) {
        return [1, 2, 3, 4, 5].map(order => new MarkovPredictor(order, focusLength));
    }

    getCurrentExplorationRate() {
        return Math.max(0, this.explorationRate - this.roundsPlayed * 0.01);
    }

    predictAiMove() {
        if (Math.random() < this.getCurrentExplorationRate())
            return this.getRandomMove();

        const bestPredictor = this.getBestPredictor();
        if (!bestPredictor)
            return this.getRandomMove();

        const predictedPlayerMove = bestPredictor.predictNextMove();
        return MOVE_COUNTERS[predictedPlayerMove];
    }

    getBestPredictor() {
        let bestPredictor = null;
        let highestSuccessRate = 0;

        for (const predictor of this.predictors) {
            const successRate = predictor.getSuccessRate();
            if (successRate > highestSuccessRate) {
                highestSuccessRate = successRate;
                bestPredictor = predictor;
            }
        }

        return bestPredictor;
    }

    updatePredictors(playerMove) {
        this.predictors.forEach(predictor => {
            const prediction = predictor.predictNextMove();
            const aiCounterMove = MOVE_COUNTERS[prediction];
            const aiWon = WINNING_MOVES[aiCounterMove] === playerMove;

            predictor.updateResults(aiWon);
            predictor.updateHistory(playerMove);
        });

        this.roundsPlayed++;
    }

    getRandomMove() {
        return MOVE_ARRAY[Math.floor(Math.random() * MOVE_ARRAY.length)];
    }
}

class GameController {
    constructor() {
        this.gameState = new GameState();
        this.ai = new RockPaperScissorsAI();
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        document.addEventListener('DOMContentLoaded', () => {
            const choiceButtons = document.querySelectorAll('.choice');
            choiceButtons.forEach(button => {
                button.addEventListener('click', (event) => {
                    const playerMove = event.target.dataset.choice;
                    this.playRound(playerMove);
                });
            });
        });
    }

    playRound(playerMove) {
        const aiMove = this.ai.predictAiMove();
        this.ai.updatePredictors(playerMove);

        const result = this.determineWinner(playerMove, aiMove);
        this.gameState.updateStats(result);

        this.updateDisplay(playerMove, aiMove, result);
    }

    determineWinner(playerMove, aiMove) {
        if (WINNING_MOVES[aiMove] === playerMove)
            return GAME_RESULTS.AI_WIN;
        else if (WINNING_MOVES[playerMove] === aiMove)
            return GAME_RESULTS.PLAYER_WIN;
        else
            return GAME_RESULTS.DRAW;
    }

    updateDisplay(playerMove, aiMove, result) {
        this.showElement('moves-display');
        this.updateElement('player-move', MOVE_EMOJIS[playerMove]);
        this.updateElement('ai-move', MOVE_EMOJIS[aiMove]);

        this.updateElement('result-text', RESULT_MESSAGES[result]);

        const stats = this.gameState.getStats();
        this.updateElement('wins', stats.wins);
        this.updateElement('losses', stats.losses);
        this.updateElement('draws', stats.draws);
        this.updateElement('win-rate', `${stats.winRate}%`);
    }

    showElement(elementId) {
        const element = document.getElementById(elementId);
        if (element)
            element.classList.remove('hidden');
    }

    updateElement(elementId, content) {
        const element = document.getElementById(elementId);
        if (element)
            element.textContent = content;
    }
}

const game = new GameController();