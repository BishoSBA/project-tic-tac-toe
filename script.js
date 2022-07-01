const players = (play) => {
	return {
		score: 0,
		play: play,
	};
};

const player1 = players("X");
const player2 = players("O");

const gameBoard = (() => {
	const board = new Array(9);

	const set = (index, play) => {
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

	return {
		set,
		get,
		reset,
		board,
	};
})();

const displayController = (() => {
	const cells = new Array(9);
	const player1Score = document.getElementById("player1");
	const player2Score = document.getElementById("player2");

	for (let i = 0; i < 9; i++) {
		cells[i] = document.getElementById("cell" + i);

		cells[i].addEventListener("click", (e) => {
			gameController.addPlay(e.target.id);
		});
	}

	const update = () => {
		const htmlBoard = document.querySelector("main");
		for (let i = 0; i < 9; i++) {
			cells[i].textContent = gameBoard.get(i);
			htmlBoard.append(cells[i]);
		}
	};

	//Stopped in connecting scoreboard to variables to update in endgame
	const updateScore = () => {
		player1Score.textContent = player1.score;
		player2Score.textContent = player2.score;
		update();
	};
	return {
		update,
		updateScore,
	};
})();

const gameController = (() => {
	let currentPlayer = player1;
	const board = gameBoard.board;

	const addPlay = (id) => {
		const index = id.slice(-1);
		if (!board[index]) {
			board[index] = currentPlayer.play;
		} else {
			return;
		}
		displayController.update();
		checkGameEnd();
		switchPlayer(currentPlayer);
	};

	const switchPlayer = (Player) => {
		Player == player1
			? (currentPlayer = player2)
			: (currentPlayer = player1);
	};

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

	const endGame = (player) => {
		player.score++;
		game();
		displayController.updateScore();
	};

	const game = () => {
		gameBoard.reset();
	};

	return {
		addPlay,
		checkGameEnd,
		endGame,
		game,
	};
})();
