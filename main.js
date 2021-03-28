const gameBoard = (() => {
    let board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    let winner = 'none'
    let slices;
    const check = () => {
        slices = [board.slice(0, 3), board.slice(3, 6), board.slice(6, 9),
        [board[0], board[3], board[6]], [board[1], board[4], board[7]],
        [board[2], board[5], board[8]],
        [board[0], board[4], board[8]], [board[2], board[4], board[6]]]

        slices.forEach(slice => {
            if (slice.every(ele => ele === "X") || slice.every(ele => ele === "O")) {
                winner = slice[0] === "X" ? "X" : "O";
                document.querySelector("p").textContent = `Winner is player ${winner}`
            }
        })

    }

    const checkWinner = () => {
        check();
        if (winner !== 'none') {
            btns = document.getElementById("board").getElementsByTagName("button");
            for (let i = 0; i < btns.length; i++) {
                btns[i].disabled = true;
            }
        }

    }

    const update = (x, value, location, turns) => {

        if (board[x] === 0) {
            board[x] = value;
            location.style.fontSize = "58px";
            location.textContent = value;
        }

        if (turns === 8) {
            document.querySelector("p").textContent = `Tie`

        }

    }

    document.getElementById("reset").addEventListener('click', () => {
        board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        btns = document.getElementById("board").getElementsByTagName("button");
        winner = 'none';
        checkWinner()
        for (let i = 0; i < btns.length; i++) {
            btns[i].disabled = false;
            btns[i].textContent = '';
            turns = 0;
        }
        document.querySelector("p").textContent = ''

    })

    let turns = 0;
    Array.from(document.getElementById("board").getElementsByTagName("button")).forEach((item, i) => {
        item.addEventListener('click', () => {
            letter = turns % 2 == 0 ? "X" : "O";
            update(i, letter, item, turns);
            checkWinner();
            ++turns;
        })
    })
    return { board, update, checkWinner, winner };
})();






