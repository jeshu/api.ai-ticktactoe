(function (ns) {
	
	function TickTacToe (options) {
		if(!options) {
			throw Error("[TickTacToe | options not passed]")
		}
		this._mDoc = options.document;
		this._mContainer = this._mDoc.getElementById("game");
		this._mPosArray = null;
		this._renderUI();
	}

	TickTacToe.prototype = {
		playerTurn : function (data) {
			var className = data.class;
			var box = this._getBox(data.position);
			box.classList.add(className);
		},

		_getBox : function (list) {
			var indexs = this._mapper(list);
			var box = this._mPosArray[indexs.row][indexs.col];
			return box;
		},

		_mapper : function (list) {
			var col = null;
			var row = null;
			if(list.indexOf("center") != -1) {
				return {
					row : 1,
					col : 1
				};
				
			}
			if(list.indexOf("right") != -1) {
				col = 2;
			}
			if(list.indexOf("left") != -1) {
				col = 0;
			}
			if(list.indexOf("top") != -1) {
				row = 0;
			}
			if(list.indexOf("bottom") != -1) {
				row = 2;
			}
			if(list.indexOf("middle") != -1) {
				if(col === null) {
					col = 1;
				} else {
					row = 1;
				}
			}
			return {
				row : row,
				col : col
			}
		},

		_winCheck : function () {
				
		},

		_renderUI : function () {
			var template = this._template();
			this._mContainer.appendChild(template);
		},

		_template : function () {
			var div = document.createElement("div");
			div.classList.add("tick-tac-toe")
			var rowCount = 0;
			this._mPosArray = [];
			while (rowCount < 3) {
				div.appendChild(this._rowTemplate())
				rowCount++;
			}
			return div;
		},

		_rowTemplate : function () {
			var div = document.createElement("div");
			div.classList.add("row")
			var rowCount = 0;
			var row = []
			while (rowCount < 3) {
				var box = this._boxTemplate()
				div.appendChild(box);
				row.push(box)
				rowCount++;
			}
			this._mPosArray.push(row);
			return div;
		},

		_boxTemplate : function () {
			var span = document.createElement("span");
			span.classList.add("tickTacToe-box");
			return span;
		},

		_applyCross: function () {
			
		},

		_applyCircle: function () {
			
		}
	};

	ns.TickTacToe = TickTacToe
}(window.CMB))