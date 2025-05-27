class CheckersGame {
    constructor() {
        this.board = [];
        this.currentPlayer = 'red'; // Player is always red
        this.selectedPiece = null;
        this.selectedSquare = null;
        this.validMoves = [];
        this.turnCount = 0;
        this.redPieces = 12;
        this.blackPieces = 12;
        this.mustJump = false;
        this.jumpingPiece = null;
        this.isAITurn = false;
        this.aiThinking = false;

        this.initializeBoard();
        this.renderBoard();
        this.updateUI();

        document.getElementById('new-game').addEventListener('click', () => this.newGame());
    }

    initializeBoard() {
        this.board = Array(8).fill().map(() => Array(8).fill(null));

        for (let row = 0; row < 3; row++)
            for (let col = 0; col < 8; col++)
                if ((row + col) % 2 === 1)
                    this.board[row][col] = { color: 'black', king: false };

        for (let row = 5; row < 8; row++)
            for (let col = 0; col < 8; col++)
                if ((row + col) % 2 === 1)
                    this.board[row][col] = { color: 'red', king: false };
    }

    renderBoard() {
        const boardElement = document.getElementById('board');
        boardElement.innerHTML = '';

        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const square = document.createElement('div');
                square.className = `square ${(row + col) % 2 === 0 ? 'light' : 'dark'}`;
                square.dataset.row = row;
                square.dataset.col = col;

                if (this.board[row][col]) {
                    const piece = document.createElement('div');
                    piece.className = `piece ${this.board[row][col].color}${this.board[row][col].king ? ' king' : ''}`;
                    square.appendChild(piece);
                }

                square.addEventListener('click', (e) => this.handleSquareClick(row, col));
                boardElement.appendChild(square);
            }
        }
    }

    handleSquareClick(row, col) {
        if (this.isAITurn || this.aiThinking) return;

        const clickedPiece = this.board[row][col];

        if (this.jumpingPiece && (this.selectedSquare.row !== row || this.selectedSquare.col !== col)) {
            if (this.isValidMove(this.selectedSquare.row, this.selectedSquare.col, row, col)) {
                this.makeMove(this.selectedSquare.row, this.selectedSquare.col, row, col);
                return;
            }
        }

        if (clickedPiece && clickedPiece.color === 'red' && !this.jumpingPiece)
            this.selectPiece(row, col);
        else if (!clickedPiece && this.selectedPiece)
            if (this.isValidMove(this.selectedSquare.row, this.selectedSquare.col, row, col))
                this.makeMove(this.selectedSquare.row, this.selectedSquare.col, row, col);
            else if (!this.jumpingPiece)
                this.deselectPiece();
    }

    selectPiece(row, col) {
        this.deselectPiece();
        this.selectedPiece = this.board[row][col];
        this.selectedSquare = { row, col };
        this.validMoves = this.getValidMoves(row, col);
        this.highlightSquares();
    }

    deselectPiece() {
        this.selectedPiece = null;
        this.selectedSquare = null;
        this.validMoves = [];
        this.clearHighlights();
    }

    highlightSquares() {
        this.clearHighlights();

        if (this.selectedSquare) {
            const selectedElement = document.querySelector(`[data-row="${this.selectedSquare.row}"][data-col="${this.selectedSquare.col}"]`);
            selectedElement.classList.add('selected');
        }

        this.validMoves.forEach(move => {
            const element = document.querySelector(`[data-row="${move.row}"][data-col="${move.col}"]`);
            element.classList.add('valid-move');
        });
    }

    clearHighlights() {
        document.querySelectorAll('.square').forEach(square => {
            square.classList.remove('selected', 'valid-move');
        });
    }

    getValidMoves(row, col) {
        const piece = this.board[row][col];
        if (!piece) return [];

        const moves = [];
        const directions = piece.king ?
            [[-1, -1], [-1, 1], [1, -1], [1, 1]] :
            piece.color === 'red' ? [[-1, -1], [-1, 1]] : [[1, -1], [1, 1]];

        const jumps = [];
        directions.forEach(([dRow, dCol]) => {
            const jumpRow = row + dRow * 2;
            const jumpCol = col + dCol * 2;

            if (this.isValidJump(row, col, jumpRow, jumpCol)) {
                jumps.push({ row: jumpRow, col: jumpCol, isJump: true });
            }
        });

        if (jumps.length > 0) return jumps;

        directions.forEach(([dRow, dCol]) => {
            const newRow = row + dRow;
            const newCol = col + dCol;

            if (this.isValidPosition(newRow, newCol) && !this.board[newRow][newCol])
                moves.push({ row: newRow, col: newCol, isJump: false });
        });

        return moves;
    }

    isValidMove(fromRow, fromCol, toRow, toCol) {
        return this.validMoves.some(move => move.row === toRow && move.col === toCol);
    }

    isValidJump(fromRow, fromCol, toRow, toCol) {
        if (!this.isValidPosition(toRow, toCol) || this.board[toRow][toCol]) {
            return false;
        }

        const midRow = fromRow + (toRow - fromRow) / 2;
        const midCol = fromCol + (toCol - fromCol) / 2;
        const middlePiece = this.board[midRow][midCol];

        return middlePiece && middlePiece.color !== this.currentPlayer;
    }

    isValidPosition(row, col) {
        return row >= 0 && row < 8 && col >= 0 && col < 8;
    }

    makeMove(fromRow, fromCol, toRow, toCol) {
        const piece = this.board[fromRow][fromCol];
        const isJump = Math.abs(toRow - fromRow) === 2;

        this.board[toRow][toCol] = piece;
        this.board[fromRow][fromCol] = null;

        if (isJump) {
            const midRow = fromRow + (toRow - fromRow) / 2;
            const midCol = fromCol + (toCol - fromCol) / 2;
            const capturedPiece = this.board[midRow][midCol];

            this.board[midRow][midCol] = null;

            if (capturedPiece.color === 'red')
                this.redPieces--;
            else
                this.blackPieces--;

            this.selectedSquare = { row: toRow, col: toCol };
            const additionalJumps = this.getValidMoves(toRow, toCol).filter(move => move.isJump);

            if (additionalJumps.length > 0) {
                this.jumpingPiece = piece;
                this.validMoves = additionalJumps;
                if (this.currentPlayer === 'red')
                    this.highlightSquares();

                this.renderBoard();
                this.updateUI();

                if (this.currentPlayer === 'black')
                    setTimeout(() => this.makeAIMove(), 1000);

                return;
            } else {
                this.jumpingPiece = null;
            }
        }

        if ((piece.color === 'red' && toRow === 0) || (piece.color === 'black' && toRow === 7))
            piece.king = true;

        this.deselectPiece();
        this.switchTurns();
        this.renderBoard();
        this.updateUI();
        this.checkGameOver();
    }

    switchTurns() {
        this.currentPlayer = this.currentPlayer === 'red' ? 'black' : 'red';
        this.turnCount++;
        this.jumpingPiece = null;
        this.isAITurn = this.currentPlayer === 'black';

        if (this.isAITurn)
            setTimeout(() => this.makeAIMove(), 1000);
    }

    updateUI() {
        const turnText = this.isAITurn ?
            (this.aiThinking ? "AI is thinking..." : "AI's Turn") :
            "Your Turn";
        document.getElementById('current-player').textContent = turnText;
        document.getElementById('red-pieces').textContent = this.redPieces;
        document.getElementById('black-pieces').textContent = this.blackPieces;
        document.getElementById('turn-count').textContent = this.turnCount;
    }

    checkGameOver() {
        if (this.redPieces === 0) {
            this.gameOver('Black');
        } else if (this.blackPieces === 0) {
            this.gameOver('Red');
        } else {
            let hasValidMoves = false;
            for (let row = 0; row < 8 && !hasValidMoves; row++) {
                for (let col = 0; col < 8 && !hasValidMoves; col++) {
                    const piece = this.board[row][col];
                    if (piece && piece.color === this.currentPlayer) {
                        const moves = this.getValidMoves(row, col);
                        if (moves.length > 0) {
                            hasValidMoves = true;
                        }
                    }
                }
            }

            if (!hasValidMoves) {
                const winner = this.currentPlayer === 'red' ? 'Black' : 'Red';
                this.gameOver(winner);
            }
        }
    }

    gameOver(winner) {
        const winnerText = winner === 'Red' ? 'You Win!' : 'AI Wins!';
        const message = winner === 'Red' ? 'Congratulations!' : 'Better luck next time!';
        document.getElementById('winner-text').textContent = winnerText;
        document.getElementById('winner-message').textContent = message;
        document.getElementById('game-over').classList.remove('hidden');
    }

    newGame() {
        this.currentPlayer = 'red';
        this.selectedPiece = null;
        this.selectedSquare = null;
        this.validMoves = [];
        this.turnCount = 0;
        this.redPieces = 12;
        this.blackPieces = 12;
        this.mustJump = false;
        this.jumpingPiece = null;
        this.isAITurn = false;
        this.aiThinking = false;

        this.initializeBoard();
        this.renderBoard();
        this.updateUI();
        document.getElementById('game-over').classList.add('hidden');
    }

    makeAIMove() {
        if (this.currentPlayer !== 'black' || this.aiThinking) return;

        this.aiThinking = true;
        this.updateUI();

        setTimeout(() => {
            const bestMove = this.alphaBetaSearch(4);

            this.aiThinking = false;

            if (bestMove) {
                this.makeMove(bestMove.fromRow, bestMove.fromCol, bestMove.toRow, bestMove.toCol);
            } else {
                this.gameOver('Red');
            }
        }, 500 + Math.random() * 1000);
    }

    alphaBetaSearch(depth) {
        const result = this.alphaBeta(depth, -Infinity, Infinity, true);
        return result.move;
    }

    alphaBeta(depth, alpha, beta, maximizingPlayer) {
        if (depth === 0 || this.isGameOver()) {
            return {
                score: this.evaluateBoard(),
                move: null
            };
        }

        const color = maximizingPlayer ? 'black' : 'red';
        const moves = this.getAllPossibleMoves(color);

        if (moves.length === 0) {
            return {
                score: maximizingPlayer ? -1000 : 1000,
                move: null
            };
        }

        let bestMove = null;

        if (maximizingPlayer) {
            let maxScore = -Infinity;

            for (const move of moves) {
                const boardState = this.makeTemporaryMove(move);

                const result = this.alphaBeta(depth - 1, alpha, beta, false);
                const score = result.score;

                this.undoTemporaryMove(boardState);

                if (score > maxScore) {
                    maxScore = score;
                    bestMove = move;
                }

                alpha = Math.max(alpha, score);
                if (beta <= alpha) break;
            }

            return { score: maxScore, move: bestMove };
        } else {
            let minScore = Infinity;

            for (const move of moves) {
                const boardState = this.makeTemporaryMove(move);

                const result = this.alphaBeta(depth - 1, alpha, beta, true);
                const score = result.score;

                this.undoTemporaryMove(boardState);

                if (score < minScore) {
                    minScore = score;
                    bestMove = move;
                }

                beta = Math.min(beta, score);
                if (beta <= alpha) break;
            }

            return { score: minScore, move: bestMove };
        }
    }

    evaluateBoard() {
        let score = 0;

        let redPieces = 0, blackPieces = 0;
        let redKings = 0, blackKings = 0;

        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = this.board[row][col];
                if (piece) {
                    if (piece.color === 'red') {
                        redPieces++;
                        if (piece.king) {
                            redKings++;
                            score -= 5; // king = 5 points
                        } else {
                            score -= 1; // regular = 1 point
                            score -= (7 - row) * 0.1; // pieces closer to promotions
                        }
                    } else {
                        blackPieces++;
                        if (piece.king) {
                            blackKings++;
                            score += 5;
                        } else {
                            score += 1;
                            score += row * 0.1;
                        }
                    }
                }
            }
        }

        const blackMoves = this.getAllPossibleMoves('black').length;
        const redMoves = this.getAllPossibleMoves('red').length;
        score += (blackMoves - redMoves) * 0.1; // having more moves is better
        score += this.getCenterControlScore(); // center control

        return score;
    }

    getCenterControlScore() {
        let score = 0;
        const centerSquares = [
            [2, 1], [2, 3], [2, 5], [2, 7],
            [3, 0], [3, 2], [3, 4], [3, 6],
            [4, 1], [4, 3], [4, 5], [4, 7],
            [5, 0], [5, 2], [5, 4], [5, 6]
        ];

        centerSquares.forEach(([row, col]) => {
            const piece = this.board[row][col];
            if (piece) {
                if (piece.color === 'black')
                    score += 0.2;
                else
                    score -= 0.2;
            }
        });

        return score;
    }

    makeTemporaryMove(move) {
        const boardState = {
            board: this.board.map(row => row.map(cell => cell ? { ...cell } : null)),
            redPieces: this.redPieces,
            blackPieces: this.blackPieces,
            currentPlayer: this.currentPlayer
        };

        const piece = this.board[move.fromRow][move.fromCol];
        const isJump = Math.abs(move.toRow - move.fromRow) === 2;

        this.board[move.toRow][move.toCol] = piece;
        this.board[move.fromRow][move.fromCol] = null;

        if (isJump) {
            const midRow = move.fromRow + (move.toRow - move.fromRow) / 2;
            const midCol = move.fromCol + (move.toCol - move.fromCol) / 2;
            const capturedPiece = this.board[midRow][midCol];

            this.board[midRow][midCol] = null;

            if (capturedPiece.color === 'red')
                this.redPieces--;
            else
                this.blackPieces--;
        }

        if ((piece.color === 'red' && move.toRow === 0) || (piece.color === 'black' && move.toRow === 7))
            piece.king = true;

        this.currentPlayer = this.currentPlayer === 'red' ? 'black' : 'red';
        return boardState;
    }

    undoTemporaryMove(boardState) {
        this.board = boardState.board;
        this.redPieces = boardState.redPieces;
        this.blackPieces = boardState.blackPieces;
        this.currentPlayer = boardState.currentPlayer;
    }

    isGameOver() {
        return this.redPieces === 0 || this.blackPieces === 0 ||
            this.getAllPossibleMoves('red').length === 0 ||
            this.getAllPossibleMoves('black').length === 0;
    }

    getAllPossibleMoves(color) {
        const moves = [];

        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = this.board[row][col];
                if (piece && piece.color === color) {
                    const validMoves = this.getValidMoves(row, col);
                    validMoves.forEach(move => {
                        moves.push({
                            fromRow: row,
                            fromCol: col,
                            toRow: move.row,
                            toCol: move.col,
                            isJump: move.isJump
                        });
                    });
                }
            }
        }

        return moves;
    }
}

function newGame() {
    game.newGame();
}

let game;
window.addEventListener('load', () => {
    game = new CheckersGame();
});