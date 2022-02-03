class Board {
    constructor(size) {
        this.cells = new Array(size * size).fill("");
        this.size = size;
        this.state = "in-progress";
        this.turn = "X";
        this.moves = 0;
        this.lastMove = "";
    }
    draw() {
        this.setCell(0, "X");
        console.log(this.cells);
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                console.log(this.cells[i * this.size + j]);
            }
        }
    }
    getCell(cell) {
        return this.cells[cell];
    }
    setCell(cell, value) {
        this.cells[cell] = value;
    }
    getState() {
        return this.state;
    }
    setState(state) {
        this.state = state;
    }
    getTurn() {
        return this.turn;
    }
    setTurn(turn) {
        this.turn = turn;
    }
    getMoves() {
        return this.moves;
    }
    incrementMoves() {
        this.moves++;
    }
    getLastMove() {
        return this.lastMove;
    }
    setLastMove(lastMove) {
        this.lastMove = lastMove;
    }
}
class Player {
    constructor(name, symbol) {
        this.name = name;
        this.symbol = symbol;
        this.moves = 0;
    }
    getName() {
        return this.name;
    }
    setName(name) {
        this.name = name;
    }
    getSymbol() {
        return this.symbol;
    }
    setSymbol(symbol) {
        this.symbol = symbol;
    }
    getMoves() {
        return this.moves;
    }
    setMoves(moves) {
        this.moves = moves;
    }
}
class Game {
    constructor(size) {
        this.start(size);
    }
    start(size) {
        const board = new Board(size);
        const playerX = new Player("PlayerOne", "X");
        const playerO = new Player("PlayerTwo", "O");
        this.board = board;
        this.players = [playerX, playerO];
        this.currentPlayer = playerX;
        this.winner = null;
        this.tie = false;
        this.over = false;
    }
    nextPlayer() {
        const playerIndex = this.players.indexOf(this.currentPlayer);
        const nextPlayerIndex = (playerIndex % 2) + 1;
        this.currentPlayer = this.players[nextPlayerIndex];
    }
    move(player, cell) {
        if (this.isValidMove(cell)) {
            this.board.setCell(cell, player.symbol);
            this.board.setLastMove(player.symbol);
            this.board.incrementMoves();
            player.setMoves(player.getMoves() + 1);
            this.nextPlayer();
        }
    }
    isValidMove(cell) {
        if (this.board.getCell(cell) !== "")
            return true;
        return false;
    }
    isWinner(player) {
        console.log(player);
        throw new Error("Method not implemented.");
    }
    isLoser(player) {
        console.log(player);
        throw new Error("Method not implemented.");
    }
    isDraw() {
        if (this.board.getMoves() === this.board.size * this.board.size) {
            this.tie = true;
            this.over = true;
            return true;
        }
        return false;
    }
}
const game = new Game(3);
console.log("balls");
game.board.draw();
//# sourceMappingURL=index.js.map