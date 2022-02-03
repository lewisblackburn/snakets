// TicTacToe
var Board = /** @class */ (function () {
    function Board(size) {
        this.cells = new Array(size * size).fill("");
        this.size = size;
        this.state = "in-progress";
        this.turn = "X";
        this.moves = 0;
        this.lastMove = "";
    }
    Board.prototype.draw = function () {
        // draw board with cells
        this.setCell(0, "X");
        console.log(this.cells);
        for (var i = 0; i < this.size; i++) {
            for (var j = 0; j < this.size; j++) {
                console.log(this.cells[i * this.size + j]);
            }
        }
    };
    Board.prototype.getCell = function (cell) {
        return this.cells[cell];
    };
    Board.prototype.setCell = function (cell, value) {
        this.cells[cell] = value;
    };
    Board.prototype.getState = function () {
        return this.state;
    };
    Board.prototype.setState = function (state) {
        this.state = state;
    };
    Board.prototype.getTurn = function () {
        return this.turn;
    };
    Board.prototype.setTurn = function (turn) {
        this.turn = turn;
    };
    Board.prototype.getMoves = function () {
        return this.moves;
    };
    Board.prototype.incrementMoves = function () {
        this.moves++;
    };
    Board.prototype.getLastMove = function () {
        return this.lastMove;
    };
    Board.prototype.setLastMove = function (lastMove) {
        this.lastMove = lastMove;
    };
    return Board;
}());
var Player = /** @class */ (function () {
    function Player(name, symbol) {
        this.name = name;
        this.symbol = symbol;
        this.moves = 0;
    }
    Player.prototype.getName = function () {
        return this.name;
    };
    Player.prototype.setName = function (name) {
        this.name = name;
    };
    Player.prototype.getSymbol = function () {
        return this.symbol;
    };
    Player.prototype.setSymbol = function (symbol) {
        this.symbol = symbol;
    };
    Player.prototype.getMoves = function () {
        return this.moves;
    };
    Player.prototype.setMoves = function (moves) {
        this.moves = moves;
    };
    return Player;
}());
var Game = /** @class */ (function () {
    function Game(size) {
        this.start();
        this.board = new Board(size);
        this.players = [];
        this.currentPlayer = null;
        this.winner = null;
        this.tie = false;
        this.over = false;
    }
    Game.prototype.start = function () {
        var playerX = new Player("PlayerOne", "X");
        var playerO = new Player("PlayerTwo", "O");
        this.players = [playerX, playerO];
        this.currentPlayer = playerX;
    };
    Game.prototype.nextPlayer = function () {
        if (this.currentPlayer) {
            var playerIndex = this.players.indexOf(this.currentPlayer);
            var nextPlayerIndex = (playerIndex % 2) + 1;
            this.currentPlayer = this.players[nextPlayerIndex];
        }
    };
    Game.prototype.move = function (player, cell) {
        if (this.isValidMove(cell)) {
            this.board.setCell(cell, player.symbol);
            this.board.setLastMove(player.symbol);
            this.board.incrementMoves();
            player.setMoves(player.getMoves() + 1);
            this.nextPlayer();
        }
    };
    Game.prototype.isValidMove = function (cell) {
        if (this.board.getCell(cell) !== "")
            return true;
        return false;
    };
    Game.prototype.isWinner = function (player) {
        console.log(player);
        throw new Error("Method not implemented.");
    };
    Game.prototype.isLoser = function (player) {
        console.log(player);
        throw new Error("Method not implemented.");
    };
    Game.prototype.isDraw = function () {
        if (this.board.getMoves() === this.board.size * this.board.size) {
            this.tie = true;
            this.over = true;
            return true;
        }
        return false;
    };
    return Game;
}());
var game = new Game(3);
game.board.draw();
