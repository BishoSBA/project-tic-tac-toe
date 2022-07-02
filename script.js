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
	const winnerDisplay = document.querySelector(".winnerDisplay");
	const playButton = document.querySelector(".buttonDiv button");

	for (let i = 0; i < 9; i++) {
		cells[i] = document.getElementById("cell" + i);

		cells[i].addEventListener("click", (e) => {
			gameController.addPlay(e.target.id);
		});
	}

	playButton.addEventListener("click", () => {
		gameController.game();
	});

	const update = () => {
		const htmlBoard = document.querySelector("main");
		for (let i = 0; i < 9; i++) {
			cells[i].textContent = gameBoard.get(i);
			htmlBoard.append(cells[i]);
		}
	};

	//Stopped in connecting scoreboard to variables to update in endgame
	const updateScore = (player) => {
		player1Score.textContent = player1.score;
		player2Score.textContent = player2.score;
		winnerDisplay.textContent = `player: ${player.play} Wins!`;
		update();
	};
	return {
		update,
		updateScore,
		winnerDisplay,
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
		switchPlayer(currentPlayer);
		checkGameEnd();
	};

	const switchPlayer = (Player) => {
		Player == player1
			? (currentPlayer = player2)
			: (currentPlayer = player1);
	};

	const checkGameEnd = () => {
		switchPlayer(currentPlayer);
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
		} else if (
			board[0] &&
			board[1] &&
			board[2] &&
			board[3] &&
			board[4] &&
			board[5] &&
			board[6] &&
			board[7] &&
			board[8]
		) {
			endGame("draw");
		}

		switchPlayer(currentPlayer);
	};

	const endGame = (player) => {
		if (player == "draw") {
			game();
			displayController.winnerDisplay.textContent = `Game ended in a Draw`;
			return;
		}
		player.score++;
		game();
		displayController.updateScore(player);
	};

	const game = () => {
		currentPlayer = player1;
		gameBoard.reset();
		displayController.winnerDisplay.textContent = "";
		displayController.update();
	};

	return {
		addPlay,
		checkGameEnd,
		endGame,
		game,
	};
})();
