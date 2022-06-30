const gameBoard = (() => {
	const board = new Array(9);

	const set = (play, index) => {
		board[index] = play;
	};

	const get = (index) => {
		return board[index];
	};

	const reset = () => {
		for (let i = 0; i < 9; i++) {
			board[i] = "";
		}
	};

	const cells = [];
	for (let i = 0; i < 9; i++) {
		cells[i] = document.getElementById(i);
		cells[i].onClick((e) => {
			displayController.addPlay(e);
		});
	}
})();

const displayController = (() => {
	const cells = new Array(9);

	const addPlay = (e) => {
		currentPlayer.play;
	};

	const update = () => {
		const htmlBoard = document.querySelector("main");
		for (let i = 0; i < 9; i++) {
			cells[i].textContent = gameBoard.get(i);
			htmlBoard.append(cells[i]);
		}
	};

	//Stopped in connecting scoreboard to variables to update in endgame
	const updateScore = () => {};
})();

const gameController = () => {
	const currentPlayer = player1;
	const board = gameBoard.board;

	const checkGameEnd = () => {
		if (
			board[0] == board[1] &&
			board[1] == board[2] &&
			board[2] == currentPlayer.play
		) {
			endGame(currentPlayer);
		} else if (
			board[0] == board[1] &&
			board[1] == board[2] &&
			board[2] == currentPlayer.play
		) {
			endGame(currentPlayer);
		} else if (
			board[3] == board[4] &&
			board[4] == board[5] &&
			board[5] == currentPlayer.play
		) {
			endGame(currentPlayer);
		} else if (
			board[6] == board[7] &&
			board[7] == board[8] &&
			board[8] == currentPlayer.play
		) {
			endGame(currentPlayer);
		} else if (
			board[0] == board[3] &&
			board[3] == board[6] &&
			board[6] == currentPlayer.play
		) {
			endGame(currentPlayer);
		} else if (
			board[1] == board[4] &&
			board[4] == board[7] &&
			board[7] == currentPlayer.play
		) {
			endGame(currentPlayer);
		} else if (
			board[2] == board[5] &&
			board[5] == board[8] &&
			board[8] == currentPlayer.play
		) {
			endGame(currentPlayer);
		} else if (
			board[0] == board[4] &&
			board[4] == board[8] &&
			board[8] == currentPlayer.play
		) {
			endGame(currentPlayer);
		} else if (
			board[2] == board[4] &&
			board[4] == board[6] &&
			board[6] == currentPlayer.play
		) {
			endGame(currentPlayer);
		}
	};

	const endgame = (player) => {
		player.score++;
		displayController.updateScore();
	};
};

const players = (play) => {
	return {
		score: 0,
		play: play,
	};
};

const game = () => {
	gameBoard.reset();
};

const player1 = players("X");
const player2 = players("O");
