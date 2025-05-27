const GAME_CONFIG = {
    DEFAULT_STONES: 21,
    DEFAULT_MOVES: [1, 2, 3],
    MIN_STONES: 1,
    MAX_STONES: 50,
    AI_MOVE_DELAY: 3000,
    MOVE_PROCESSING_DELAY: 3000,
    AI_WIN_PROBABILITY: 0.25
};

const GAME_STATES = {
    SETUP: 'setup',
    COIN_TOSS: 'coin_toss',
    PLAYER_TURN: 'player_turn',
    AI_TURN: 'ai_turn',
    GAME_OVER: 'game_over'
};

const PLAYERS = {
    HUMAN: 'human',
    AI: 'ai'
};

class GameState {
    constructor() {
        this.reset();
    }

    reset() {
        this.totalStones = GAME_CONFIG.DEFAULT_STONES;
        this.currentStones = GAME_CONFIG.DEFAULT_STONES;
        this.allowedMoves = [...GAME_CONFIG.DEFAULT_MOVES];
        this.currentPlayer = null;
        this.gameState = GAME_STATES.SETUP;
        this.winner = null;
        this.lastMove = null;
    }

    initializeGame(stoneCount, moves) {
        this.totalStones = stoneCount;
        this.currentStones = stoneCount;
        this.allowedMoves = moves.sort((a, b) => a - b);
        this.gameState = GAME_STATES.COIN_TOSS;
    }

    makeMove(stones, player) {
        this.currentStones -= stones;
        this.lastMove = { stones, player };
        
        if (this.isGameOver()) {
            this.winner = player;
            this.gameState = GAME_STATES.GAME_OVER;
        } else {
            this.switchPlayer();
        }
    }

    switchPlayer() {
        this.currentPlayer = this.currentPlayer === PLAYERS.HUMAN ? PLAYERS.AI : PLAYERS.HUMAN;
        this.gameState = this.currentPlayer === PLAYERS.HUMAN ? GAME_STATES.PLAYER_TURN : GAME_STATES.AI_TURN;
    }

    setFirstPlayer(player) {
        this.currentPlayer = player;
        this.gameState = player === PLAYERS.HUMAN ? GAME_STATES.PLAYER_TURN : GAME_STATES.AI_TURN;
    }

    isGameOver() {
        return this.currentStones === 0 || !this.hasValidMoves();
    }

    hasValidMoves() {
        return this.allowedMoves.some(move => move <= this.currentStones);
    }

    getValidMoves() {
        return this.allowedMoves.filter(move => move <= this.currentStones);
    }
}

class GameStrategyCalculator {
    constructor() {
        this.winningPositions = new Map();
    }

    calculateWinningPositions(totalStones, allowedMoves) {
        this.winningPositions.clear();
        
        for (let stones = 1; stones <= totalStones; stones++) {
            let isWinning = false;
            
            for (const move of allowedMoves) {
                if (move <= stones && !this.winningPositions.get(stones - move)) {
                    isWinning = true;
                    break;
                }
            }
            
            this.winningPositions.set(stones, isWinning);
        }
    }

    isWinningPosition(stones) {
        return this.winningPositions.get(stones) || false;
    }

    calculateOptimalMove(currentStones, allowedMoves) {
        for (const move of allowedMoves) {
            if (move <= currentStones && !this.winningPositions.get(currentStones - move))
                return move;
        }
        
        return allowedMoves.find(move => move <= currentStones) || allowedMoves[0];
    }
}

class StonesGameAI {
    constructor() {
        this.strategy = new GameStrategyCalculator();
    }

    determineFirstPlayer(totalStones, allowedMoves) {
        if (Math.random() < GAME_CONFIG.AI_WIN_PROBABILITY)
            return Math.random() < 0.5 ? PLAYERS.AI : PLAYERS.HUMAN;
        
        this.strategy.calculateWinningPositions(totalStones, allowedMoves);
        return this.strategy.isWinningPosition(totalStones) ? PLAYERS.AI : PLAYERS.HUMAN;
    }

    calculateMove(currentStones, allowedMoves) {
        return this.strategy.calculateOptimalMove(currentStones, allowedMoves);
    }

    setupStrategy(totalStones, allowedMoves) {
        this.strategy.calculateWinningPositions(totalStones, allowedMoves);
    }
}

class GameUI {
    constructor() {
        this.elements = this.cacheElements();
    }

    cacheElements() {
        return {
            setupSection: document.getElementById('setup-section'),
            gameSection: document.getElementById('game-section'),
            coinTossSection: document.getElementById('coin-toss-section'),
            playerTurnSection: document.getElementById('player-turn'),
            lastMoveSection: document.getElementById('last-move'),
            
            stoneCountInput: document.getElementById('stone-count'),
            allowedMovesInput: document.getElementById('allowed-moves'),
            moveSelect: document.getElementById('move-select'),
            
            stonePile: document.getElementById('stone-pile'),
            stoneCounter: document.getElementById('stone-counter'),
            gameStatus: document.getElementById('game-status'),
            lastMoveText: document.getElementById('last-move-text'),
            
            startGameBtn: document.getElementById('start-game-btn'),
            coinTossBtn: document.getElementById('coin-toss-btn'),
            makeMoveBtn: document.getElementById('make-move-btn'),
            newGameBtn: document.getElementById('new-game-btn')
        };
    }

    showSetupScreen() {
        this.hideAllSections();
        this.elements.setupSection.classList.remove('hidden');
    }

    showGameScreen() {
        this.hideAllSections();
        this.elements.gameSection.classList.remove('hidden');
        this.elements.coinTossSection.classList.remove('hidden');
    }

    showPlayerTurn() {
        this.elements.coinTossSection.classList.add('hidden');
        this.elements.playerTurnSection.classList.remove('hidden');
        this.elements.lastMoveSection.classList.remove('hidden');
    }

    hidePlayerTurn() {
        this.elements.playerTurnSection.classList.add('hidden');
    }

    hideAllSections() {
        this.elements.setupSection.classList.add('hidden');
        this.elements.gameSection.classList.add('hidden');
        this.elements.coinTossSection.classList.add('hidden');
        this.elements.playerTurnSection.classList.add('hidden');
        this.elements.lastMoveSection.classList.add('hidden');
    }

    updateStatus(message) {
        this.elements.gameStatus.textContent = message;
    }

    updateLastMove(message) {
        this.elements.lastMoveText.textContent = message;
    }

    updateStonePile(stoneCount) {
        this.elements.stoneCounter.textContent = `Stones: ${stoneCount}`;
        
        this.elements.stonePile.innerHTML = '';
        for (let i = 0; i < stoneCount; i++) {
            const stone = document.createElement('div');
            stone.className = 'stone';
            this.elements.stonePile.appendChild(stone);
        }
    }

    updateMoveOptions(validMoves) {
        this.elements.moveSelect.innerHTML = '';
        
        validMoves.forEach(move => {
            const option = document.createElement('option');
            option.value = move;
            option.textContent = move;
            this.elements.moveSelect.appendChild(option);
        });
    }

    getGameSetup() {
        const stoneCount = parseInt(this.elements.stoneCountInput.value);
        const movesInput = this.elements.allowedMovesInput.value;
        const moves = movesInput
            .split(',')
            .map(x => parseInt(x.trim()))
            .filter(x => x > 0 && x <= stoneCount);

        return { stoneCount, moves };
    }

    getSelectedMove() {
        return parseInt(this.elements.moveSelect.value);
    }
}

class StonesGameController {
    constructor() {
        this.gameState = new GameState();
        this.ai = new StonesGameAI();
        this.ui = new GameUI();
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        this.ui.elements.startGameBtn.addEventListener('click', () => this.startGame());
        this.ui.elements.coinTossBtn.addEventListener('click', () => this.performCoinToss());
        this.ui.elements.makeMoveBtn.addEventListener('click', () => this.handlePlayerMove());
        this.ui.elements.newGameBtn.addEventListener('click', () => this.resetGame());
    }

    startGame() {
        const { stoneCount, moves } = this.ui.getGameSetup();
        
        if (!this.validateGameSetup(stoneCount, moves))
            return;

        this.gameState.initializeGame(stoneCount, moves);
        this.ai.setupStrategy(stoneCount, moves);
        
        this.ui.showGameScreen();
        this.ui.updateStonePile(stoneCount);
        this.ui.updateMoveOptions(moves);
        this.ui.updateStatus('Flip a coin to determine who goes first');
        this.ui.updateLastMove('');
    }

    validateGameSetup(stoneCount, moves) {
        if (!stoneCount || stoneCount < GAME_CONFIG.MIN_STONES || stoneCount > GAME_CONFIG.MAX_STONES) {
            alert(`Please enter a valid number of stones (${GAME_CONFIG.MIN_STONES}-${GAME_CONFIG.MAX_STONES})`);
            return false;
        }

        if (moves.length === 0) {
            alert('Please enter valid moves (e.g., 1,2,3)');
            return false;
        }

        return true;
    }

    performCoinToss() {
        const firstPlayer = this.ai.determineFirstPlayer(
            this.gameState.totalStones, 
            this.gameState.allowedMoves
        );

        this.gameState.setFirstPlayer(firstPlayer);
        
        const startMessage = firstPlayer === PLAYERS.AI ? 'AI goes first!' : 'You go first!';
        this.ui.updateLastMove('Game started!');

        if (firstPlayer === PLAYERS.AI) {
            this.ui.updateStatus('AI is making a move...');
            setTimeout(() => this.executeAIMove(), GAME_CONFIG.AI_MOVE_DELAY);
        } else {
            this.showPlayerTurn();
        }
    }

    handlePlayerMove() {
        const selectedMove = this.ui.getSelectedMove();
        
        if (!this.isValidMove(selectedMove)) {
            this.ui.updateStatus('Invalid move!');
            return;
        }

        this.executePlayerMove(selectedMove);
    }

    isValidMove(move) {
        return this.gameState.allowedMoves.includes(move) && move <= this.gameState.currentStones;
    }

    executePlayerMove(stones) {
        this.gameState.makeMove(stones, PLAYERS.HUMAN);
        
        const moveText = `You removed ${stones} stone${stones !== 1 ? 's' : ''}`;
        this.ui.updateLastMove(moveText);
        this.ui.updateStonePile(this.gameState.currentStones);
        this.ui.updateStatus('Move made! Processing...');

        setTimeout(() => {
            if (this.gameState.isGameOver()) {
                this.endGame();
                return;
            }

            this.ui.hidePlayerTurn();
            this.ui.updateStatus('AI is thinking...');
            setTimeout(() => this.executeAIMove(), GAME_CONFIG.AI_MOVE_DELAY);
        }, GAME_CONFIG.MOVE_PROCESSING_DELAY);
    }

    executeAIMove() {
        const optimalMove = this.ai.calculateMove(
            this.gameState.currentStones, 
            this.gameState.allowedMoves
        );

        this.gameState.makeMove(optimalMove, PLAYERS.AI);
        
        const moveText = `AI removed ${optimalMove} stone${optimalMove !== 1 ? 's' : ''}`;
        this.ui.updateLastMove(moveText);
        this.ui.updateStonePile(this.gameState.currentStones);
        this.ui.updateStatus('AI made its move! Processing...');

        setTimeout(() => {
            if (this.gameState.isGameOver()) {
                this.endGame();
                return;
            }

            this.showPlayerTurn();
        }, GAME_CONFIG.MOVE_PROCESSING_DELAY);
    }

    showPlayerTurn() {
        this.ui.updateMoveOptions(this.gameState.getValidMoves());
        this.ui.showPlayerTurn();
        this.ui.updateStatus('Your turn! Choose how many stones to remove.');
    }

    endGame() {
        const playerWon = this.gameState.winner === PLAYERS.HUMAN;
        this.ui.hidePlayerTurn();
        this.ui.updateStatus(playerWon ? 'You won!' : 'AI won!');
    }

    resetGame() {
        this.gameState.reset();
        this.ui.showSetupScreen();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new StonesGameController();
});