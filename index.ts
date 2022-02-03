// TicTacToe
import { BADRESP } from "dns";
import * as readline from "readline";

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

interface IBoard {
  size: number;
  cells: string[];
  state: string;
  turn: string;
  moves: number;
  lastMove: string;

  getCell(index: number): string;
  setCell(index: number, value: string): void;
  getState(): string;
  setState(state: string): void;
  getTurn(): string;
  setTurn(turn: string): void;
  getLastMove(): string;
  setLastMove(lastMove: string): void;
  getMoves(): number;
  incrementMoves(): void;
  draw(): void;
}

interface IPlayer {
  name: string;
  symbol: string;
  moves: number;

  getName(): string;
  setName(name: string): void;
  getSymbol(): string;
  setSymbol(symbol: string): void;
  getMoves(): number;
  setMoves(moves: number): void;
}

interface IGame {
  board: IBoard;
  players: IPlayer[];
  currentPlayer: IPlayer | null;
  winner: IPlayer | null;
  tie: boolean;
  over: boolean;

  start(): void;
  nextPlayer(): void;
  move(player: IPlayer, cell: number): void;
  isValidMove(cell: number): boolean;
  isWinner(player: IPlayer): boolean;
  isLoser(player: IPlayer): boolean;
  isDraw(): boolean;
}

class Board implements IBoard {
  size: number;
  cells: string[];
  state: string;
  turn: string;
  moves: number;
  lastMove: string;

  constructor(size: number) {
    this.cells = new Array(size * size).fill("-");
    this.size = size;
    this.state = "in-progress";
    this.turn = "X";
    this.moves = 0;
    this.lastMove = "";
  }

  draw(): void {
    // draw tick-tac-toe board
    let template = "";
    for (let i = 0; i < this.size; i++) {
      let row = "";
      for (let j = 0; j < this.size; j++) {
        row += `| ${this.cells[i * this.size + j]} `;
      }
      row += "|";
      template += `${row}\n`;
    }
    console.log(template);
  }

  getCell(cell: number): string {
    return this.cells[cell];
  }

  setCell(cell: number, value: string): void {
    this.cells[cell] = value;
  }

  getState(): string {
    return this.state;
  }

  setState(state: string): void {
    this.state = state;
  }

  getTurn(): string {
    return this.turn;
  }

  setTurn(turn: string): void {
    this.turn = turn;
  }

  getMoves(): number {
    return this.moves;
  }

  incrementMoves(): void {
    this.moves++;
  }

  getLastMove(): string {
    return this.lastMove;
  }

  setLastMove(lastMove: string): void {
    this.lastMove = lastMove;
  }
}

class Player implements IPlayer {
  name: string;
  symbol: string;
  moves: number;

  constructor(name: string, symbol: string) {
    this.name = name;
    this.symbol = symbol;
    this.moves = 0;
  }

  getName(): string {
    return this.name;
  }

  setName(name: string): void {
    this.name = name;
  }

  getSymbol(): string {
    return this.symbol;
  }

  setSymbol(symbol: string): void {
    this.symbol = symbol;
  }

  getMoves(): number {
    return this.moves;
  }

  setMoves(moves: number): void {
    this.moves = moves;
  }
}

class Game implements IGame {
  board: IBoard;
  players: IPlayer[];
  currentPlayer: IPlayer | null;
  winner: IPlayer | null;
  tie: boolean;
  over: boolean;

  constructor(size: number) {
    this.board = new Board(size);
    this.players = [];
    this.currentPlayer = null;
    this.winner = null;
    this.tie = false;
    this.over = false;
  }

  start(): void {
    const playerX = new Player("PlayerOne", "X");
    const playerO = new Player("PlayerTwo", "O");

    this.players = [playerX, playerO];
    this.currentPlayer = playerX;
  }

  nextPlayer(): void {
    if (this.currentPlayer) {
      const playerIndex = this.players.indexOf(this.currentPlayer);
      const nextPlayerIndex = (playerIndex % 2) + 1;

      this.currentPlayer = this.players[nextPlayerIndex];
    }
  }

  move(player: IPlayer, cell: number): void {
    this.board.setCell(cell, player.symbol);
    this.board.setLastMove(player.symbol);
    this.board.incrementMoves();

    player.setMoves(player.getMoves() + 1);
    this.nextPlayer();

    game.board.draw();
  }

  isValidMove(cell: number): boolean {
    if (this.board.getCell(cell) !== "") return true;
    return false;
  }

  isWinner(player: IPlayer): boolean {
    console.log(player);
    throw new Error("Method not implemented.");
  }

  isLoser(player: IPlayer): boolean {
    console.log(player);
    throw new Error("Method not implemented.");
  }

  isDraw(): boolean {
    if (this.board.getMoves() === this.board.size * this.board.size) {
      this.tie = true;
      this.over = true;
      return true;
    }

    return false;
  }
}

const game: IGame = new Game(3);

game.start();
game.board.draw();

const player = game.currentPlayer;
const playerName = player?.getName();
const playerSymbol = player?.getSymbol();

if (player && playerName && playerSymbol) {
  rl.question(`${playerName}'s move: `, (answer) => {
    const validMove = game.isValidMove(parseInt(answer));

    if (validMove) {
      game.move(player, parseInt(answer));
    }

    rl.close();
  });
}
