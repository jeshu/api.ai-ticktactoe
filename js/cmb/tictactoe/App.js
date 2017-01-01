(function () {
	
	var tickTacToe = null
		apiAi = null;
		logger = document.getElementById("logger");
	window.addEventListener("load", onWindowLoadHandler);

	function log (msg) {
		logger.innerHTML += "<span>" + msg + "</span>"; 
	}
	function onWindowLoadHandler(evt) {
		initTickTacToe();
		initAiApi();
		initCommand();
	};
	function initCommand() {
		var form = document.getElementById("commandForm");
		form.addEventListener("submit", function formHandler(evt) {
			evt.preventDefault();
			var command = document.getElementById("commandText");
			var json = {
				"v": Config.SERVER_VERSION,
                "query": command.value,
                "lang": "en",
                "sessionId": apiAi.sessionId
			}
			apiAi.sendJson(json)
		}) 
	}

	function initTickTacToe() {
		tickTacToe = new CMB.TickTacToe({
			document : document
		});
	}

	function initAiApi() {
		apiAi = new ApiAi(getApiAiConfig());
		apiAi.onStartListening = function () {
			log("start listening")
            console.log("> ON START LISTENING");
        };

        apiAi.onStopListening = function () {
			log("stop listening")
            console.log("> ON STOP LISTENING");
			// apiAi.startListening();
        };
        apiAi.onOpen = function (evt) {
            console.log(evt);
	        apiAi.startListening();
        };
        apiAi.onClose = function (evt) {
        	log("processing...")
            console.log(evt);
	        apiAi.startListening();
        };
        apiAi.sessionId = "cmb-unique-client-"// + (Math.random() * 10000);
		apiAi.init();
		
	}

	function getApiAiConfig() {
		var apiAiConfig = {
            server: Config.SERVER_PROTO + '://' + Config.SERVER_DOMAIN + ':' + Config.SERVER_PORT + '/api/ws/query',
            serverVersion: Config.SERVER_VERSION,
            token: Config.ACCESS_TOKEN,// Use Client access token there (see agent keys).
            sessionId: ApiAi.generateRandomId(),
            lang: 'en',
            onInit: onInit,
            onResults: onResults,
            onError:onError
        }
		return apiAiConfig;
	};

	function onInit(evt) {
		console.log("AI API init", evt);
		apiAi.open();
	}

	function onResults (data) {
		console.log("AI API init" , data);
		// apiAi.stopListening();
		var status = data.status,
            code,
            speech;

        if (!(status && (code = status.code) && isFinite(parseFloat(code)) && code < 300 && code > 199)) {
            return;
        };

        var result = data.result;
        log("user said | " + result.resolvedQuery)
        console.log(result.resolvedQuery);
        console.log(result.parameters);
        var playerData = {
        	class : result.parameters["player-type"],
        	position : result.parameters["block"]
        }

        apiAi.close();
        try {
	        playerTurn(playerData);
        } catch(e) {
        	console.log(e);
        }

        setTimeout(apiAi.open.bind(this), 2000)

	}

	function onError (evt) {
		console.log("AI API init" , evt);
	}

	function playerTurn (data) {
		if(data.class && data.position) {

			tickTacToe.playerTurn(data);
		}
	}
}());