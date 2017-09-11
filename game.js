var clickr = {
	rows: 3,
	columns: 3,
	totalTime: 20,
	timeSwitch: 1,
	currentSelected: undefined,
	currentScore: 0,
	count: 0,

	randomNumGenerator: function(id) {
		var randomNumber;
		while(true) {
			randomNumber = Math.floor((Math.random() * (this.rows * this.columns)) + 1);
			if (randomNumber != id) {
				break;
			}
		}
		return randomNumber;
	},

	init: function() {
		this.createTable(this.rows, this.columns);

		var startButton = document.getElementById("start-button");
		startButton.addEventListener('click', this.startGame.bind(this))
	},

	createTable: function(r, c) {
		var fragment = document.createDocumentFragment();
		for (var i = 0; i < r; i++) {
			var row = document.createElement("tr");
			for (var j = 0; j < c; j++) {
				var column = document.createElement("td");
				column.setAttribute("id", i*c + (j+1));
				row.appendChild(column);
			}
			fragment.appendChild(row);
		}
		var gridElem = document.getElementById("grid");
		gridElem.appendChild(fragment);
	},

	gridClicked: function(event) {
		var idClicked = parseInt(event.target.id);
		if (idClicked == this.currentSelected) {
			this.currentScore++;
		} else {
			this.currentScore--;
		}
		document.getElementById('score-span').textContent = this.currentScore;
	},

	startGame: function() {
		this.currentScore = 0;
		this.count = 0;
		var gridElem = document.getElementById("grid");
		gridElem.addEventListener('click', this.gridClicked.bind(this));

		var fd = window.setInterval(function() {
			this.currentSelected = this.randomNumGenerator(this.currentSelected);
			var currElement = document.getElementById(this.currentSelected);
			currElement.classList.add("selected");
			window.setTimeout((function(id){
				return function(id) {
					var oldElement = document.getElementById(id);
					currElement.classList.remove("selected");
				}
			})(this.currentSelected), this.timeSwitch * 1000)
			this.count++;
			if (this.count == (this.totalTime/this.timeSwitch)) {
				clearInterval(fd);
				gridElem.removeEventListener('click', this.gridClicked.bind(this));
				this.currentSelected = undefined;
			}
		}.bind(this), this.timeSwitch * 1000)
	}
}

clickr.init();