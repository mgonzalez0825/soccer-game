////////////////////////////////////////////////////////////
// PLAYERS
////////////////////////////////////////////////////////////
var fieldW = 2300;
var fieldH = 1300;

var soccerFieldData = {currentSide:'', condition:'kickoff', tackleTime:0, tackleHardTime:50, distanceArray:[], distanceArrayHome:[], distanceArrayAway:[], teamDistanceArray:[], playersHome_arr:[], playersAway_arr:[], playerGoalkeeper_arr:[], status:'', matchBegin:false, matchEnd:false, iconArray:[], soundMissTimer:0, soundBounceCon:false, possesion:'', shotFrom:'', shotTo:'', lastBallAction:'', lastTouchPlayer:'', continuePenalty:false, penalty:false, penaltyShot:false, penaltyCount:0, penaltyTotalCount:0, penaltyHomeArray:[], penaltyAwayArray:[], penaltyReady:false, unFollowMouseIdle:0};

var soccerPlayerData = {homeSpeed:{player:2.7, goalkeeper:2.7},
						awaySpeed:{player:2.7, goalkeeper:2.7},
						userSpeed:2.7,
						tackleSpeed:5,
						radius:20,
						radiusWall:55,
						radiusTackle:65,
						followMouse:false,
						oldX:0,
						oldY:0,
						currentPlayer:'',
						userPlayer:'',
						userSide:'',
						playerID:0,
						canTackle:false,
						forcePass:false};

var actionTimerData = {passDelay:30, kickDelay:20, tackleDelay:30, tackleHardTime:300, catchDelay:50, changeTime:10};
var timerData = {con:false, startDate:'', count:''};
var cameraData = {x:0, y:0, side:true};

var ballData = {radius:10, obj:'', action:'idle', actionTackle:false, actionTimer:0};
var ballBounceData = {gravity:0, drag:.99, drag2:.8, bounce:.8};
var ballBounceHighData = {gravity:1.5, drag:.99, bounce:.8};

//wall position
var wallData = [{x:239, y:1181, w:1824, h:10, pos:'bottom'},
				{x:239, y:110, w:1824, h:10, pos:'top'},
				
				{x:228, y:120, w:10, h:445, pos:'left'},
				{x:228, y:738, w:10, h:445, pos:'left'},
				
				{x:175, y:554, w:50, h:10, pos:'top'},
				{x:175, y:736, w:50, h:10, pos:'bottom'},
				{x:160, y:568, w:10, h:165, pos:'left'},
				
				{x:2063, y:120, w:10, h:443, pos:'right'},
				{x:2063, y:738, w:10, h:443, pos:'right'},
				
				{x:2075, y:554, w:50, h:10, pos:'top'},
				{x:2075, y:736, w:50, h:10, pos:'bottom'},
				{x:2130, y:568, w:10, h:165, pos:'right'},];

//area positions				
var areaData = [{x:175, y:568, w:62, h:165, pos:'postarea', side:'away'},
				{x:237, y:310, w:284, h:680, pos:'shotarea', side:'away'},
				{x:2063, y:568, w:62, h:165, pos:'postarea', side:'home'},
				{x:1779, y:310, w:284, h:680, pos:'shotarea', side:'home'}
				];

//players position				
var playerPos = [{x:875, y: 561, side:'home', pos:'forward', patrolStartX:583, patrolEndX:2050,},
				{x:875, y: 711, side:'home', pos:'forward', patrolStartX:583, patrolEndX:2050,},
				
				{x:780, y: 290, side:'home', pos:'midfield', patrolStartX:238, patrolEndX:1945,},
				{x:780, y: 510, side:'home', pos:'midfield', patrolStartX:238, patrolEndX:1945,},
				{x:780, y: 760, side:'home', pos:'midfield', patrolStartX:238, patrolEndX:1945,},
				{x:780, y: 970, side:'home', pos:'midfield', patrolStartX:238, patrolEndX:1945,},
				
				{x:545, y: 290, side:'home', pos:'back', patrolStartX:238, patrolEndX:1470,},
				{x:545, y: 510, side:'home', pos:'back', patrolStartX:238, patrolEndX:1470,},
				{x:545, y: 760, side:'home', pos:'back', patrolStartX:238, patrolEndX:1470,},
				{x:545, y: 970, side:'home', pos:'back', patrolStartX:238, patrolEndX:1470,},
				
				{x:1400, y: 561, side:'away', pos:'forward', patrolStartX:238, patrolEndX:1673,},
				{x:1400, y: 711, side:'away', pos:'forward', patrolStartX:238, patrolEndX:1673,},
				
				{x:1480, y: 626, side:'away', pos:'midfield', patrolStartX:238, patrolEndX:1673,},
				{x:1522, y: 420, side:'away', pos:'midfield', patrolStartX:339, patrolEndX:2050,},
				{x:1522, y: 860, side:'away', pos:'midfield', patrolStartX:339, patrolEndX:2050,},
				{x:1608, y: 626, side:'away', pos:'midfield', patrolStartX:339, patrolEndX:2050,},
				
				{x:1715, y: 290, side:'away', pos:'back', patrolStartX:780, patrolEndX:2050,},
				{x:1715, y: 510, side:'away', pos:'back', patrolStartX:780, patrolEndX:2050,},
				{x:1715, y: 760, side:'away', pos:'back', patrolStartX:780, patrolEndX:2050,},
				{x:1715, y: 970, side:'away', pos:'back', patrolStartX:780, patrolEndX:2050,}];

//goalkeeper positions
var playerGoalPos = [{x:286, y: 635, side:'home', patrolStartX:238, patrolEndX:482, patrolStartY:504, patrolEndY:788},
					{x:1994, y: 635, side:'away', patrolStartX:1870, patrolEndX:2060, patrolStartY:504, patrolEndY:788}];

//player forward start ball position			
var playerForwardPos = [{x:1120, y:620, side:'home'},
					  {x:1100, y:690, side:'home'},
					  {x:1166, y:620, side:'away'},
					  {x:1166, y:690, side:'away'}];
					  
var playerPenaltyData = {ballX:430,
						ballY:650,
						playerX:460,
						playerY:650,
						goalkeeprX:286,
						goalkeeprY:635,
						patrolStartX:238,
						patrolEndX:344,
						patrolStartY:504,
						patrolEndY:788,
						goalkeeprIdleX:1500,
						goalkeeprIdleY:830,
						homeX:750,
						homeY:550,
						awayX:750,
						awayY:800,
						scoreColor:'#00D900',
						missColor:'#D90000',
						bgColor:'#000'
						};
					  
var statisticData = {home:{score:0, goal:0, pos:0, passes:0, shots:0, shotsTarget:0, tackles:0, penalty:0},
					away:{score:0, goal:0, pos:0, passes:0, shots:0, shotsTarget:0, tackles:0, penalty:0}};

/*!
 * 
 * CREATE SOCCER FIELD - This is the function that runs to create soccer field
 * 
 */
function createSoccerField(){
	soccerPlayerData.userSpeed = playerSpeed.user;
	soccerPlayerData.tackleSpeed = playerSpeed.tackle;
	
	//goal
	for(var w=0; w<wallData.length; w++){
		var wallZone = new createjs.Shape();
		wallZone.graphics.setStrokeStyle(1).beginStroke('red').drawRect(0, 0, wallData[w].w, wallData[w].h);
		wallZone.x = wallData[w].x;
		wallZone.y = wallData[w].y;
		fieldGuideContainer.addChild(wallZone);
	}
	
	for(var w=0; w<areaData.length; w++){
		var wallZone = new createjs.Shape();
		wallZone.graphics.setStrokeStyle(1).beginStroke('red').drawRect(0, 0, areaData[w].w, areaData[w].h);
		wallZone.x = areaData[w].x;
		wallZone.y = areaData[w].y;
		fieldGuideContainer.addChild(wallZone);
	}
	
	gameData.teamHomeID = Math.floor(Math.random()*team_arr.length);
	chooseAwayTeam();
	createPlayers();chooseAwayTeam();
	createPlayers();
	createBall();
	fieldGuideContainer.visible = false;
}

function createBall(){
	itemBallDepth.xspeed = itemBallDepth.yspeed = 0;
	itemBallDepth.x = canvasW/100 * 10;
	itemBallDepth.y = canvasH/2;
	
	var newBall = new createjs.Bitmap(loader.getResult('itemBallTexture'));
	newBall.x = 0;
	newBall.y = 0;
	newBall.regX = (ballData.radius/2);
	newBall.regY = (ballData.radius/2);
	
	var ballMask = new createjs.Shape();
	ballMask.graphics.beginFill('red').drawCircle(0,0,(ballData.radius/2));
	newBall.mask = ballMask;
	
	ballData.obj = newBall;
	ballData.mask = ballMask;
	
	var gradient = itemBall.clone();
	ballContainer.removeAllChildren();
	ballContainer.addChild(newBall, gradient);
}

function createPlayers(){
	soccerFieldData.playersHome_arr = [];
	soccerFieldData.playersAway_arr = [];
	soccerFieldData.playerGoalkeeper_arr = [];
	playersContainer.removeAllChildren();
	
	for(var n=0; n<playerPos.length; n++){
		var newPlayer = '';
		if(playerPos[n].side =='home'){
			newPlayer = $.player[gameData.teamHomeID].clone();
			soccerFieldData.playersHome_arr.push(newPlayer);
		}else{
			newPlayer = $.player[gameData.teamAwayID].clone();
			soccerFieldData.playersAway_arr.push(newPlayer);
		}
		newPlayer.action = 'idle';
		newPlayer.gotoAndStop('down');
		newPlayer.visible = true;
		
		setPlayerValue(newPlayer, playerPos[n], 'player');
		playersContainer.addChild(newPlayer);
	}
	
	if(!computerMode){
		if(gameData.side == 'home'){
			soccerPlayerData.homeSpeed.player = playerSpeed.playerTeam.player;
			soccerPlayerData.homeSpeed.goalkeeper = playerSpeed.playerTeam.goalkeeper;
			soccerPlayerData.awaySpeed.player = playerSpeed.oppositeTeam.player;
			soccerPlayerData.awaySpeed.goalkeeper = playerSpeed.oppositeTeam.goalkeeper;
			soccerPlayerData.userSide = 'home';
			soccerPlayerData.userPlayer = soccerFieldData.playersHome_arr[soccerPlayerData.playerID];
		}else{
			soccerPlayerData.homeSpeed.player = playerSpeed.oppositeTeam.player;
			soccerPlayerData.homeSpeed.goalkeeper = playerSpeed.oppositeTeam.goalkeeper;
			soccerPlayerData.awaySpeed.player = playerSpeed.playerTeam.player;
			soccerPlayerData.awaySpeed.goalkeeper = playerSpeed.playerTeam.goalkeeper;
			soccerPlayerData.userSide = 'away';
			soccerPlayerData.userPlayer = soccerFieldData.playersAway_arr[soccerPlayerData.playerID];
		}
	}
	
	//goalkeeper
	for(var n=0; n<playerGoalPos.length; n++){
		var newPlayer = '';
		if(playerGoalPos[n].side =='home'){
			newPlayer = playerAnimateAGoalkeeper.clone();
			soccerFieldData.playerGoalkeeper_arr.push(newPlayer);
		}else{
			newPlayer = playerAnimateBGoalkeeper.clone();	
			soccerFieldData.playerGoalkeeper_arr.push(newPlayer);
		}
		newPlayer.action = 'idle';
		newPlayer.gotoAndStop('down');
		
		setPlayerValue(newPlayer, playerGoalPos[n], 'goalkeeper');
		playersContainer.addChild(newPlayer);
	}
	
	playersContainer.addChild(ballContainer);
}

function setPlayerValue(player, data, type){
	player.x = player.oriX = player.posX = data.x;
	player.y = player.oriY = player.posY = data.y;
	player.patrolStartX = data.patrolStartX;
	player.patrolEndX = data.patrolEndX;
	player.patrolStartY = data.patrolStartY;
	player.patrolEndY = data.patrolEndY;
	player.goalX = player.goalY = 0;
	player.extraX = player.extraY = 0;
	player.energy = 0;
	player.tackleTime = 0;
	player.passTimer = randomIntFromInterval(10,30);
	
	if(type == 'goalkeeper'){
		player.positionName = 'goalkeeper';
		player.goalkeeperTime = 0;
		player.collisionTime = 0;
		player.catchTime = 0;
		
		if(player.side == 'home'){
			player.moveSpeed = player.nextMoveSpeed = soccerPlayerData.homeSpeed.goalkeeper;
		}else{
			player.moveSpeed = player.nextMoveSpeed = soccerPlayerData.awaySpeed.goalkeeper;
		}
	}else{
		player.positionName = data.pos;
		
		if(player.side == 'home'){
			player.moveSpeed = player.nextMoveSpeed = soccerPlayerData.homeSpeed.player;
		}else{
			player.moveSpeed = player.nextMoveSpeed = soccerPlayerData.awaySpeed.player;	
		}
	}
	
	player.actionShoot = '';
	player.actionTimer = 0;
	player.actionChangeTime = 0;
	player.idleTime = 0;
	player.idlePosition = 0;
	player.side = data.side;
	
	findGoalArea(player);
}

/*!
 * 
 * CREATE NEW GAME - This is the function that runs to create new game
 * 
 */
function resetSoccerGame(){
	if(gameData.type != 'championship'){
		chooseAwayTeam();
		if(gameData.side == 'away'){
			var tempID = gameData.teamHomeID;
			gameData.teamHomeID = gameData.teamAwayID;
			gameData.teamAwayID = tempID;
		}
	}
	
	gameTeamHomeTxt.text = team_arr[gameData.teamHomeID].name.substring(0,3);
	gameTeamAwayTxt.text = team_arr[gameData.teamAwayID].name.substring(0,3);
	
	resultHomeTeamTxt.text = team_arr[gameData.teamHomeID].name.substring(0,3);
	resultAwayTeamTxt.text = team_arr[gameData.teamAwayID].name.substring(0,3);
	
	scoreContainer.removeChild(teamHomeLogo, teamAwayLogo);
	resultContainer.removeChild(teamHomeLogoResult, teamAwayLogoResult);
	
	teamHomeLogo = new createjs.Bitmap(loader.getResult('team_bracket'+gameData.teamHomeID));
	centerReg(teamHomeLogo);
	teamAwayLogo = new createjs.Bitmap(loader.getResult('team_bracket'+gameData.teamAwayID));
	centerReg(teamAwayLogo);
	
	teamHomeLogo.x = -118;
	teamAwayLogo.x = 118;
	teamHomeLogo.y = teamAwayLogo.y = -15;
	
	teamHomeLogo.scaleX = teamHomeLogo.scaleY = .75;
	teamAwayLogo.scaleX = teamAwayLogo.scaleY = .75;
	
	
	teamHomeLogoResult = new createjs.Bitmap(loader.getResult('team_bracket'+gameData.teamHomeID));
	centerReg(teamHomeLogoResult);
	teamAwayLogoResult = new createjs.Bitmap(loader.getResult('team_bracket'+gameData.teamAwayID));
	centerReg(teamAwayLogoResult);
	
	teamHomeLogoResult.x = (canvasW/2) - 215;
	teamAwayLogoResult.x = (canvasW/2) + 215;
	teamHomeLogoResult.y = teamAwayLogoResult.y = canvasH/100 * 31.5;
	
	teamHomeLogo.visible = teamAwayLogo.visible = true;
	teamHomeLogoResult.visible = teamAwayLogoResult.visible = true;
	
	scoreContainer.addChild(teamHomeLogo, teamAwayLogo);
	resultContainer.addChild(teamHomeLogoResult, teamAwayLogoResult);
	createPlayers();
	
	if(!soccerFieldData.continuePenalty){
		soccerFieldData.possesion = '';
		soccerFieldData.lastTouchPlayer = '';
		soccerFieldData.lastBallAction = '';
		soccerFieldData.shotFrom = 0;
		soccerFieldData.shotTo = 0;
		
		statisticData.home.score = 0;
		statisticData.home.goal = 0;
		statisticData.home.pos = 0;
		statisticData.home.passes = 0;
		statisticData.home.shots = 0;
		statisticData.home.shotsTarget = 0;
		statisticData.home.tackles = 0;
		statisticData.home.penalty = 0;
		
		statisticData.away.score = 0;
		statisticData.away.goal = 0;
		statisticData.away.pos = 0;
		statisticData.away.passes = 0;
		statisticData.away.shots = 0;
		statisticData.away.shotsTarget = 0;
		statisticData.away.tackles = 0;
		statisticData.away.penalty = 0;
	}
	
	itemGuideDirection.visible = true;
	soccerPlayerData.currentPlayer = '';
	soccerFieldData.matchBegin = false;
	
	soccerFieldData.iconArray = [];
	soccerFieldData.currentSide = gameStartSide;
	
	soccerFieldData.penalty = false;
	gameTimeTxt.text = millisecondsToTimeGame(soccerGameTime);
	if(gameData.type == 'penaltykick'){
		soccerFieldData.penalty = true;
		gameScoreTxt.text = '-';
	}else{
		if(soccerFieldData.continuePenalty){
			soccerFieldData.penalty = true;	
		}
		gameScoreTxt.text = statisticData.home.score+' - '+statisticData.away.score;
	}
	
	if(soccerFieldData.penalty){
		gameTimeTxt.text = millisecondsToTimeGame(0);
		scorePenaltyContainer.visible = true;
		soccerFieldData.penaltyCount = 0;
		soccerFieldData.penaltyTotalCount = 0;
		soccerFieldData.penaltyHomeArray = [];
		soccerFieldData.penaltyAwayArray = [];
		
		statisticData.home.penalty = 0;
		statisticData.away.penalty = 0;
		
		homePenaltyScoreTxt.text = statisticData.home.penalty;
		awayPenaltyScoreTxt.text = statisticData.away.penalty;
		
		for(var n=0; n<5;n++){
			$.stats['penaltyHomeScore'+n].visible = false;
			$.stats['penaltyHomeMiss'+n].visible = false;
			
			$.stats['penaltyAwayScore'+n].visible = false;
			$.stats['penaltyAwayMiss'+n].visible = false;
		}
	}else{
		scorePenaltyContainer.visible = false;	
	}
	
	prepareGameStart(false);
}

function prepareGameStart(con){
	soccerFieldData.condition = 'kickoff';
	ballData.action = 'idle';
	ballData.actionTimer = 0;
	
	itemBall.xspeed = itemBall.yspeed = 0;
	itemBall.xrotate = itemBall.yrotate = 0;
	itemBall.ygap = 0;
	itemBall.x = itemBall.oriX = fieldW/2;
	itemBall.y = itemBall.oriY = fieldH/2;
	
	ballData.obj.mask = null;
	ballData.obj.x = ballData.obj.y = 0;
	ballData.obj.mask = ballData.mask;
	
	for(var n=0; n<soccerFieldData.playersHome_arr.length; n++){
		var curPlayer = soccerFieldData.playersHome_arr[n];
		curPlayer.x = curPlayer.posX = curPlayer.oriX;
		curPlayer.y = curPlayer.posY = curPlayer.oriY;
	}
	for(var n=0; n<soccerFieldData.playersAway_arr.length; n++){
		var curPlayer = soccerFieldData.playersAway_arr[n];
		curPlayer.x = curPlayer.posX = curPlayer.oriX;
		curPlayer.y = curPlayer.posY = curPlayer.oriY;
	}
	for(var n=0; n<soccerFieldData.playerGoalkeeper_arr.length; n++){
		var curGoalKeeper = soccerFieldData.playerGoalkeeper_arr[n];
		curGoalKeeper.action = 'idle';
		curGoalKeeper.goalkeeperTime = 0;
		curGoalKeeper.x = curGoalKeeper.oriX;
		curGoalKeeper.y = curGoalKeeper.oriY;
	}
	
	var playerArrays;
	if(soccerFieldData.currentSide == 'home'){
		playerArrays = soccerFieldData.playersHome_arr;
	}else{
		playerArrays = soccerFieldData.playersAway_arr;	
	}
	
	var startP = 0;
	var exludeArray = [];
	for(var n=0; n<playerArrays.length; n++){
		var curPlayer = playerArrays[n];
		if(curPlayer.positionName == 'forward'){
			for(var p = startP; p<playerForwardPos.length; p++){
				if(curPlayer.side == playerForwardPos[p].side && exludeArray.indexOf(p) == -1){
					tempPlayer = curPlayer;
					curPlayer.x = curPlayer.posX = playerForwardPos[p].x;
					curPlayer.y = curPlayer.posY = playerForwardPos[p].y;
					exludeArray.push(p);
					p = playerForwardPos.length;
				}
			}	
		}
	}
	
	if(soccerFieldData.penalty){
		soccerFieldData.condition = 'penalty';
		soccerFieldData.penaltyShot = false;
		soccerFieldData.penaltyReady = false;
		soccerFieldData.matchEnd = false;
		
		itemBall.x = itemBall.oriX = playerPenaltyData.ballX;
		itemBall.y = itemBall.oriY = playerPenaltyData.ballY;
		
		var rangeNum = 50;
		for(var n=0; n<soccerFieldData.playersHome_arr.length; n++){
			var curPlayer = soccerFieldData.playersHome_arr[n];
			curPlayer.x = curPlayer.posX = curPlayer.oriX = randomIntFromInterval(playerPenaltyData.homeX-rangeNum, playerPenaltyData.homeX+rangeNum);
			curPlayer.y = curPlayer.posY = curPlayer.oriY = randomIntFromInterval(playerPenaltyData.homeY-rangeNum, playerPenaltyData.homeY+rangeNum);
		}
		for(var n=0; n<soccerFieldData.playersAway_arr.length; n++){
			var curPlayer = soccerFieldData.playersAway_arr[n];
			curPlayer.x = curPlayer.posX = curPlayer.oriX = randomIntFromInterval(playerPenaltyData.awayX-rangeNum, playerPenaltyData.awayX+rangeNum);
			curPlayer.y = curPlayer.posY = curPlayer.oriY = randomIntFromInterval(playerPenaltyData.awayY-rangeNum, playerPenaltyData.awayY+rangeNum);
		}
		for(var n=0; n<soccerFieldData.playerGoalkeeper_arr.length; n++){
			var curPlayer = soccerFieldData.playerGoalkeeper_arr[n];
			curPlayer.x = curPlayer.posX = curPlayer.oriX = playerPenaltyData.goalkeeprIdleX;
			curPlayer.y = curPlayer.posY = curPlayer.oriY = playerPenaltyData.goalkeeprIdleY;
			curPlayer.patrolStartX = playerPenaltyData.goalkeeprIdleX;
			curPlayer.patrolEndX = playerPenaltyData.goalkeeprIdleX;
			curPlayer.patrolStartY = playerPenaltyData.goalkeeprIdleY;
			curPlayer.patrolEndY = playerPenaltyData.goalkeeprIdleY;
				
			if(soccerFieldData.currentSide == 'home' && curPlayer.side == 'away'){
				curPlayer.x = curPlayer.posX = curPlayer.oriX = playerPenaltyData.goalkeeprX;
				curPlayer.y = curPlayer.posY = curPlayer.oriY = playerPenaltyData.goalkeeprY;
				curPlayer.patrolStartX = playerPenaltyData.patrolStartX;
				curPlayer.patrolEndX = playerPenaltyData.patrolEndX;
				curPlayer.patrolStartY = playerPenaltyData.patrolStartY;
				curPlayer.patrolEndY = playerPenaltyData.patrolEndY;
			}else if(soccerFieldData.currentSide == 'away' && curPlayer.side == 'home'){
				curPlayer.x = curPlayer.posX = curPlayer.oriX = playerPenaltyData.goalkeeprX;
				curPlayer.y = curPlayer.posY = curPlayer.oriY = playerPenaltyData.goalkeeprY;
				curPlayer.patrolStartX = playerPenaltyData.patrolStartX;
				curPlayer.patrolEndX = playerPenaltyData.patrolEndX;
				curPlayer.patrolStartY = playerPenaltyData.patrolStartY;
				curPlayer.patrolEndY = playerPenaltyData.patrolEndY;
			}
		}
		
		if(soccerFieldData.currentSide == gameData.side && !computerMode){
			soccerPlayerData.currentPlayer = soccerPlayerData.userPlayer;
		}else{
			if(soccerFieldData.currentSide == 'home'){
				soccerPlayerData.currentPlayer = soccerFieldData.playersHome_arr[0];
			}else{
				soccerPlayerData.currentPlayer = soccerFieldData.playersAway_arr[0];	
			}
			soccerPlayerData.currentPlayer.actionTimer = 0;
			soccerPlayerData.currentPlayer.actionChangeTime = 0;
			TweenMax.to(playerPenaltyData, 3, {overwrite:true, onComplete:penaltyAIKick});
		}
		
		soccerPlayerData.currentPlayer.action = 'penalty';
		soccerPlayerData.currentPlayer.x = soccerPlayerData.currentPlayer.posX = soccerPlayerData.currentPlayer.oriX = playerPenaltyData.playerX;
		soccerPlayerData.currentPlayer.y = soccerPlayerData.currentPlayer.posY = soccerPlayerData.currentPlayer.oriY = playerPenaltyData.playerY;
		
		animateStatus('penalty');
	}else{
		animateStatus('kickoff');	
	}
	
	updateCamera(true);
	TweenMax.to(soccerFieldData, 2, {overwrite:true, onComplete:beginTheGame});
}

function beginTheGame(){
	soccerPlayerData.followMouse = true;
	if(soccerFieldData.penalty){
		soccerFieldData.penaltyReady = true;
		soccerFieldData.condition = 'penalty';
		playSound('soundWhistleStart');
	}else{
		soccerFieldData.condition = 'fight';
		
		if(!soccerFieldData.matchBegin){
			soccerFieldData.matchBegin = true;
			resetGameTimer();
		}
		
		soccerFieldData.matchEnd = false;
		playSound('soundWhistleStart');
		toggleGameTimer(true);
	}
}

function endSoccerMatch(con){
	TweenMax.killTweensOf(playerPenaltyData);
	
	if(gameData.type == 'penaltykick'){
		gameScoreTxt.text = '-';
		resultScoreTxt.text = statisticData.home.penalty+' - '+statisticData.away.penalty;
	}else{
		soccerFieldData.condition = 'kickoff';
		gameScoreTxt.text = statisticData.home.score+' - '+statisticData.away.score;
		resultScoreTxt.text = statisticData.home.score+' - '+statisticData.away.score;	
	}
	
	soccerFieldData.matchEnd = true;
	soccerPlayerData.followMouse = false;
	
	if(soccerFieldData.penalty){
		if(soccerFieldData.penaltyCount == 0){
			//if(statisticData.home.penalty == statisticData.away.penalty){
				//start over penalty
				for(var n=0; n<5;n++){
					$.stats['penaltyHomeScore'+n].visible = false;
					$.stats['penaltyHomeMiss'+n].visible = false;

					$.stats['penaltyAwayScore'+n].visible = false;
					$.stats['penaltyAwayMiss'+n].visible = false;
				}
				soccerFieldData.penaltyHomeArray = [];
				soccerFieldData.penaltyAwayArray = [];
			//}
		}
		
		soccerFieldData.penaltyCount++;
		soccerFieldData.penaltyTotalCount++;
		
		var penaltyScore = con == 'goal' ? 1 : 0;
		if(soccerFieldData.currentSide == 'home'){
			soccerFieldData.penaltyHomeArray.push(penaltyScore);	
		}else if(soccerFieldData.currentSide == 'away'){
			soccerFieldData.penaltyAwayArray.push(penaltyScore);	
		}
	}
	
	homePenaltyScoreTxt.text = statisticData.home.penalty;
	awayPenaltyScoreTxt.text = statisticData.away.penalty;
	
	if(soccerFieldData.currentSide == 'home'){
		soccerFieldData.currentSide = 'away';
	}else if(soccerFieldData.currentSide == 'away'){
		soccerFieldData.currentSide = 'home';
	}
	
	var endGame = false;
	if(soccerFieldData.penalty){
		var distanceScore = Math.abs(statisticData.home.penalty - statisticData.away.penalty);
		
		if(soccerFieldData.penaltyTotalCount >= 10){
			if(isEven(soccerFieldData.penaltyTotalCount) && distanceScore > 0){
				playSound('soundWhistleEnd');
				endGame = true;	
			}
		}else if(soccerFieldData.penaltyTotalCount > 7){
			if(distanceScore >= 2){
				playSound('soundWhistleEnd');
				endGame = true;	
			}
		}else if(soccerFieldData.penaltyTotalCount > 5){
			if(distanceScore >= 3){
				console.log('end1')
				playSound('soundWhistleEnd');
				endGame = true;	
			}
		}
		
		if(soccerFieldData.penaltyCount >= 10){
			soccerFieldData.penaltyCount = 0;
		}
	}
	
	for(var n=0; n<5;n++){
		if(n < soccerFieldData.penaltyHomeArray.length){
			if(soccerFieldData.penaltyHomeArray[n] == 0){
				$.stats['penaltyHomeMiss'+n].visible = true;
			}else{
				$.stats['penaltyHomeScore'+n].visible = true;	
			}
		}
		
		if(n < soccerFieldData.penaltyAwayArray.length){
			if(soccerFieldData.penaltyAwayArray[n] == 0){
				$.stats['penaltyAwayMiss'+n].visible = true;	
			}else{
				$.stats['penaltyAwayScore'+n].visible = true;	
			}
		}
	}
	
	if(con == 'goal'){
		animateStatus('goal');
		var goalNum = randomIntFromInterval(1,2);
		playSound('soundGoal'+goalNum);
	}else if(con == 'nogoal'){
		animateStatus('misses');
		playSound('soundMiss');
	}else if(con == 'fulltime'){
		itemGuideDirection.visible = false;
		toggleGameTimer(false);
		playSound('soundWhistleEnd');
		animateStatus('fulltime');
		endGame = true;
	}
	
	if(endGame){
		TweenMax.to(soccerFieldData, 3, {overwrite:true, onComplete:goPage, onCompleteParams:['result']});
	}else{
		TweenMax.to(soccerFieldData, 3, {overwrite:true, onComplete:prepareGameStart, onCompleteParams:[true]});	
	}
}

/*!
 * 
 * SOCCER GAME LOOP - This is the function that runs to loop game
 * 
 */
function updateSoccerField(){
	updateBall();
	updatePlayer();
	updateCamera(true);
	updateAIPlayers('home');
	updateAIPlayers('away');
	updateGoalkeeper();
	updateIndex();
	updateTimer();
	updateIcon();
}

/*!
 * 
 * SOCCER GAME TIMER - This is the function that runs for game timer
 * 
 */
function resetGameTimer(){
	timerData.startDate = new Date();
	updateTimer();
}
function toggleGameTimer(con){
	timerData.con = con;
}

function updateTimer(){
	if(timerData.con){
		if(soccerFieldData.possesion == 'home'){
			statisticData.home.pos++;
		}else if(soccerFieldData.possesion == 'away'){
			statisticData.away.pos++;
		}
		
		var nowDate = new Date();
		var elapsedTime = (nowDate.getTime() - timerData.startDate.getTime());
		timerData.count = (elapsedTime/1000)%60;
		
		var timerNum = soccerGameTime - elapsedTime;
		if(timerNum < 0){
			gameTimeTxt.text = millisecondsToTimeGame(0);
			endSoccerMatch('fulltime');
		}else{
			gameTimeTxt.text = millisecondsToTimeGame(timerNum);	
		}
	}
}

 /*!
 * 
 * BALL ACTION - This is the function that runs for ball action
 * 
 */
function shootBall(type, dirX, dirY){
	var actionArray = ['dribbling','freekick','catchBall','tackle','penalty'];
	if(actionArray.indexOf(soccerPlayerData.currentPlayer.action) == -1){
		return;	
	}
	
	actionArray = ['freekick','throw','high'];
	if(soccerFieldData.penalty && actionArray.indexOf(soccerPlayerData.currentPlayer.action) >= 0){
		return;
	}
	
	if(soccerFieldData.penalty){
		soccerFieldData.condition = 'penalty';
		
		if(!soccerFieldData.penaltyShot){
			soccerFieldData.penaltyShot = true;
			TweenMax.to(playerPenaltyData, 1, {overwrite:true, onComplete:penaltyComplete});
		}else{
			return;
		}
	}else{
		soccerFieldData.condition = 'fight';	
	}
	
	if(soccerPlayerData.currentPlayer.action != 'tackle'){
		if(soccerPlayerData.currentPlayer.action != 'penalty'){
			soccerPlayerData.currentPlayer.action = 'idle';
		}
		soccerPlayerData.currentPlayer.idleTime = 50;
		soccerPlayerData.currentPlayer.actionShoot = 'kick';
	}
	
	soccerFieldData.lastBallAction = type;
	ballData.action = 'shoot';
	ballData.actionTimer = 20;
	itemBall.xspeed = itemBall.yspeed = 0;
	
	var shootType = type;
	var shootRange = 0;
	var shootHigh = 0;
	var ballHeight = canvasH;
	var countShots = false;
	if(shootType == 'pass'){
		countShots = false;
		if(soccerFieldData.shotFrom == 'home'){
			statisticData.home.passes++;
		}else if(soccerFieldData.shotFrom == 'away'){
			statisticData.away.passes++;	
		}
		shootRange = randomIntFromInterval(550,700);
		shootHigh = randomIntFromInterval(2,5)*.01;
	}else if(shootType == 'tackle'){
		ballData.action = 'idle';
		soccerPlayerData.currentPlayer.idleTime = 0;
		soccerPlayerData.currentPlayer.action = 'tackle';
		soccerPlayerData.currentPlayer.actionShoot = 'tackle';
		shootRange = randomIntFromInterval(350,500);
		shootHigh = randomIntFromInterval(2,5)*.01;
	}else if(shootType == 'shoot'){
		countShots = true;
		if(!soccerFieldData.penalty){
			if(soccerFieldData.shotFrom == 'home'){
				statisticData.home.shots++;
			}else if(soccerFieldData.shotFrom == 'away'){
				statisticData.away.shots++;	
			}
		}
		shootRange = randomIntFromInterval(700,900);
		shootHigh = randomIntFromInterval(2,8)*.01;
	}else if(shootType == 'passhigh'){
		countShots = false;
		if(soccerFieldData.shotFrom == 'home'){
			statisticData.home.passes++;
		}else if(soccerFieldData.shotFrom == 'away'){
			statisticData.away.passes++;	
		}
		shootRange = randomIntFromInterval(550,700);
		shootHigh = randomIntFromInterval(3,6)*.03;
	}else if(shootType == 'high'){
		shootRange = randomIntFromInterval(650,900);
		shootHigh = randomIntFromInterval(5,7)*.03;
	}else if(shootType == 'throw'){
		shootRange = randomIntFromInterval(400,500);
		shootHigh = randomIntFromInterval(3,5)*.08;
	}
	
	if(countShots){
		soccerFieldData.shotTo = soccerFieldData.shotFrom;
		soccerFieldData.shotFrom = '';	
	}
	
	var rotateNum = soccerPlayerData.currentPlayer.rotateNum-90;
	if(dirX != undefined && dirY != undefined){
		if(shootType == 'pass'){
			var ballDistance = getDistanceByValue(soccerPlayerData.currentPlayer.x, soccerPlayerData.currentPlayer.y, dirX, dirY);
			var percentRange = (fieldW - ballDistance)/fieldW*2.2;
			shootRange = ballDistance * percentRange;
			shootRange = shootRange > 800 ? 800 : shootRange;
		}
		rotateNum = getDirection(soccerPlayerData.currentPlayer.x, soccerPlayerData.currentPlayer.y, dirX, dirY)-90;
	}
	
	var ballDirection = getAnglePosition(soccerPlayerData.currentPlayer, shootRange, rotateNum);
	soccerPlayerData.currentPlayer = '';
	
	playSound('soundKick');
	itemBallTo.x = ballDirection.x;
	itemBallTo.y = ballDirection.y;
	
	var dragpercent = .02;
	itemBall.xspeed = (ballDirection.x - itemBall.x) * dragpercent;
	itemBall.yspeed = (ballDirection.y - itemBall.y) * dragpercent;
		
	var distanceNum = getDistanceByValue(itemBall.x, itemBall.y, ballDirection.x, ballDirection.y);
	itemBallDepth.x = canvasW/100 * 10;
	itemBallDepth.y = ballHeight;
	itemBallDepth.yspeed = distanceNum * shootHigh;
}


 /*!
 * 
 * UPDATE BALL - This is the function that runs to update ball
 * 
 */
function updateBall(){
	checkGoalkeeperDistance();
	checkPlayersDistance();
	
	if(ballData.action == 'shoot'){
		ballData.actionTimer--;
		if(ballData.actionTimer <= 0){
			ballData.action = 'idle';	
		}
	}
	
	if(soccerFieldData.tackleTime > 0){
		soccerFieldData.tackleTime--;	
	}
	
	if(soccerFieldData.soundMissTimer > 0){
		soccerFieldData.soundMissTimer--;	
	}
	
	if(soccerFieldData.tackleHardTime > 0){
		soccerFieldData.tackleHardTime--;	
	}else{
		ballData.actionTackle = false;	
	}
	
	 if(ballData.action == 'carry' && soccerFieldData.condition != 'kickoff' && !soccerFieldData.penalty){
		soccerPlayerData.currentPlayer.action = 'dribbling';
		soccerFieldData.possesion = soccerPlayerData.currentPlayer.side;
		var ballPos = getAnglePosition(soccerPlayerData.currentPlayer, 25, soccerPlayerData.currentPlayer.rotateNum-90);
		itemBall.carryX = ballPos.x;
		itemBall.carryY = ballPos.y;
		TweenMax.to(itemBall, .1, {scaleX:1, scaleY:1, oriX:ballPos.x, oriY:ballPos.y, x:ballPos.x, y:ballPos.y, overwrite:true, onUpdate:updateCarry});
	 }else{
		soccerFieldData.possesion = '';
		TweenMax.killTweensOf(itemBall);
		 
		itemBall.oriY = itemBall.oriY + itemBall.yspeed;
		itemBall.oriX = itemBall.oriX + itemBall.xspeed;
		itemBall.x = itemBall.oriX;
		itemBall.y = itemBall.oriY - itemBall.ygap;
		
		checkWallCollision(itemBall, ballData.radius, true);
		
		itemBall.yspeed = itemBall.yspeed * ballBounceData.drag + ballBounceData.gravity;
		itemBall.xspeed = itemBall.xspeed * ballBounceData.drag;
		itemBall.xrotate = itemBall.xspeed;
		itemBall.yrotate = itemBall.yspeed;
	 }
	 
	 var checkScore = false;
	 if(soccerFieldData.penalty){
		 if(!soccerFieldData.matchEnd){
			checkScore = true;
		 }
	 }else if(soccerFieldData.condition != 'kickoff'){
		checkScore = true; 
	 }
	 
	 
	 if(checkScore){
		 for(var w = 0; w<areaData.length; w++){
			if(areaData[w].pos == 'postarea'){
				if(itemBall.oriY + ballData.radius / 2 > areaData[w].y && itemBall.oriY - ballData.radius / 2 < areaData[w].y+areaData[w].h && itemBall.oriX + ballData.radius / 2 > areaData[w].x && itemBall.oriX - ballData.radius / 2 < areaData[w].x+areaData[w].w){
					if(checkBallHighLevel()){
						if(soccerFieldData.penalty){
							if(soccerFieldData.currentSide == 'home'){
								statisticData.home.penalty++;
							}else{
								statisticData.away.penalty++;	
							}
						}else{
							if(areaData[w].side == 'home'){
								if(soccerFieldData.lastBallAction != 'shoot'){
									statisticData.home.shots++;
								}
								soccerFieldData.currentSide = 'home';
								statisticData.home.score++;
								if(soccerFieldData.lastTouchPlayer.side == 'home'){
									statisticData.home.goal++;
								}
							}else{
								if(soccerFieldData.lastBallAction != 'shoot'){
									statisticData.away.shots++;
								}
								soccerFieldData.currentSide = 'away';
								statisticData.away.score++;
								if(soccerFieldData.lastTouchPlayer.side == 'away'){
									statisticData.away.goal++;
								}	
							}
						}
						endSoccerMatch('goal');
						w = areaData.length;
					}else{
						if(soccerFieldData.soundMissTimer <= 0){
							soccerFieldData.soundMissTimer = 50;
							playSound('soundHitpost');
							playSound('soundMiss');
						}
						itemBall.xspeed = -itemBall.xspeed * ballBounceData.bounce;
					}
				}	
			}
		}
	 }
	 
	itemBallShadow.x = itemBall.oriX;
	itemBallShadow.y = itemBall.oriY;
	updateBallRotate();
	 
	//ball depth
	itemBallDepth.y = itemBallDepth.y + itemBallDepth.yspeed;
	
	
	if (itemBallDepth.y - ballData.radius / 2 > canvasH) {
		itemBallDepth.y = canvasH - ballData.radius / 2;
		itemBallDepth.yspeed = -itemBallDepth.yspeed * ballBounceHighData.bounce;
		
		itemBall.yspeed = itemBall.yspeed * ballBounceData.drag2 + ballBounceData.gravity;
		itemBall.xspeed = itemBall.xspeed * ballBounceData.drag2;
		
		if(soccerFieldData.soundBounceCon){
			soccerFieldData.soundBounceCon = false;
			playSound('soundHitwall');
		}
	}
	
	if(Math.floor(itemBallDepth.y) < 720){
		soccerFieldData.soundBounceCon = true;	
	}
	
	var scaleNum = (canvasH - itemBallDepth.y)/100 * .05;
	var gapNum = (canvasH - itemBallDepth.y)/100 * 5;
	itemBall.scaleX = itemBall.scaleY = 1 + scaleNum;
	itemBall.ygap = gapNum;
	
	itemBallDepth.yspeed = itemBallDepth.yspeed * ballBounceHighData.drag + ballBounceHighData.gravity;
}

function checkGoalkeeperDistance(){
	if(soccerFieldData.condition == 'kickoff'){
		return;	
	}
	
	for(var n=0; n<soccerFieldData.playerGoalkeeper_arr.length; n++){
		var goalKeeper = soccerFieldData.playerGoalkeeper_arr[n];
		
		if(goalKeeper.collisionTime > 0){
			goalKeeper.collisionTime--;	
		}
		
		var goalKeeperDistance = getDistance(goalKeeper, itemBallShadow);
		var ballDistanceY = itemBallShadow.y - goalKeeper.y;
		if(ballData.action != 'goalkeeper' && goalKeeperDistance < 80 && goalKeeper.action != 'saveBall' && getBallSpeed() > 3 && Math.abs(ballDistanceY) > 20 && goalKeeper.catchTime <= 0){
			var safeDistance = 8;
			if(ballDistanceY > 0){
				goalKeeper.catchDistance = ballDistanceY + randomIntFromInterval(safeDistance, safeDistance*2);
			}else{
				goalKeeper.catchDistance = ballDistanceY + randomIntFromInterval(-(safeDistance),-(safeDistance*2));
			}
			goalKeeper.ballX = itemBallShadow.x;
			goalKeeper.ballY = itemBallShadow.y;
			goalKeeper.catchX = goalKeeper.x;
			goalKeeper.catchY = goalKeeper.y;
			goalKeeper.goalkeeperTime = 50;
			goalKeeper.catchTime = 100;
			goalKeeper.action = 'saveBall';
			
			goalKeeper.actionChangeTime = actionTimerData.changeTime;
			goalKeeper.actionTimer = 0;
			
			if(ballDistanceY < 0){
				goalKeeper.actionShoot = goalKeeper.side+'saveup';
			}else{
				goalKeeper.actionShoot = goalKeeper.side+'savedown';
			}
		}
		
		if(itemBallShadow.x >= goalKeeper.x-soccerPlayerData.radius && itemBallShadow.x <= goalKeeper.x+soccerPlayerData.radius && itemBallShadow.y >= goalKeeper.y-soccerPlayerData.radius && itemBallShadow.y <= goalKeeper.y+soccerPlayerData.radius && checkBallHighLevel() && goalKeeper.collisionTime <= 0 && ballData.action != 'goalkeeper'){
			goalKeeper.collisionTime = randomIntFromInterval(20,30);
			
			if(randomBoolean()){
				if(soccerPlayerData.currentPlayer != ''){
					resetPlayerAction();
				}
				
				setIcon(goalKeeper, 'safe');
				goalKeeper.goalkeeperTime = randomIntFromInterval(50,80);
				goalKeeper.collisionTime = randomIntFromInterval(80,100);
				
				if(!soccerFieldData.penalty){
					soccerFieldData.condition = 'neutral';
					soccerPlayerData.currentPlayer = goalKeeper;
					soccerPlayerData.currentPlayer.action = 'catchBall';
					ballData.action = 'goalkeeper';
					setShotsTarget();
				}
			}else{
				var directionFrom = Math.abs(getDirection(goalKeeper.x, goalKeeper.y, itemBallShadow.x, itemBallShadow.y));
				if(directionFrom > 45 && directionFrom < 135){
					//right
					itemBall.xspeed = -itemBall.xspeed * ballBounceData.bounce;
					playSound('soundHitwall');
					if(soccerFieldData.soundMissTimer <= 0){
						soccerFieldData.soundMissTimer = 50
						playSound('soundMiss');
					}
					setShotsTarget();
				}else if(directionFrom >= 135 && directionFrom < 225){
					//bottom
					itemBall.yspeed = -itemBall.yspeed * ballBounceData.bounce;
					playSound('soundHitwall');
					if(soccerFieldData.soundMissTimer <= 0){
						soccerFieldData.soundMissTimer = 50
						playSound('soundMiss');
					}
					setShotsTarget();
				}else if(directionFrom >= 225 && directionFrom < 315){
					//left
					itemBall.xspeed = -itemBall.xspeed * ballBounceData.bounce;
					playSound('soundHitwall');
					if(soccerFieldData.soundMissTimer <= 0){
						soccerFieldData.soundMissTimer = 50
						playSound('soundMiss');
					}
					setShotsTarget();
				}else{
					//top
					itemBall.yspeed = -itemBall.yspeed * ballBounceData.bounce;
					playSound('soundHitwall');
					if(soccerFieldData.soundMissTimer <= 0){
						soccerFieldData.soundMissTimer = 50
						playSound('soundMiss');
					}
					setShotsTarget();
				}
			}
		}else{
			goalKeeper.collision = true;	
		}
		
		if(goalKeeperDistance < soccerPlayerData.radius && checkBallHighLevel() && checkBallSpeed()){
			if(ballData.action == 'idle'){
				setIcon(goalKeeper, 'safe');
				goalKeeper.goalkeeperTime = randomIntFromInterval(80,100);
				
				if(!soccerFieldData.penalty){
					soccerFieldData.condition = 'neutral';
					soccerPlayerData.currentPlayer = goalKeeper;
					soccerPlayerData.actionTimer = 0;
					soccerPlayerData.currentPlayer.action = 'freekick';
					ballData.action = 'goalkeeper';
					setShotsTarget();
				}
			}else if(ballData.action == 'carry'){
				//reset carry
				if(soccerPlayerData.currentPlayer != ''){
					resetPlayerAction();
				}
				
				setIcon(goalKeeper, 'safe');
				
				if(!soccerFieldData.penalty){
					soccerPlayerData.currentPlayer = goalKeeper;
					soccerPlayerData.actionTimer = 0;
					soccerPlayerData.currentPlayer.action = 'freekick';
					ballData.action = 'goalkeeper';
					setShotsTarget();
				}
			}
		}
	}	
}

function setShotsTarget(){
	if(soccerFieldData.shotTo == 'home'){
		statisticData.home.shotsTarget++;
	}else if(soccerFieldData.shotTo == 'away'){
		statisticData.away.shotsTarget++;	
	}
	soccerFieldData.shotTo = '';
}

function checkPlayersDistance(){
	if(soccerFieldData.condition == 'kickoff'){
		return;	
	}
	
	if(soccerFieldData.condition == 'penalty'){
		return;	
	}
	
	soccerFieldData.distanceArray = [];
	for(var n=0; n<soccerFieldData.playersHome_arr.length; n++){
		var ballDistance = getDistance(itemBallShadow, soccerFieldData.playersHome_arr[n]);
		soccerFieldData.distanceArray.push({obj:soccerFieldData.playersHome_arr[n], dis:ballDistance});
	}
	for(var n=0; n<soccerFieldData.playersAway_arr.length; n++){
		var ballDistance = getDistance(itemBallShadow, soccerFieldData.playersAway_arr[n]);
		soccerFieldData.distanceArray.push({obj:soccerFieldData.playersAway_arr[n], dis:ballDistance});
	}
	
	sortOnObject(soccerFieldData.distanceArray,'dis');
	
	for(var n=0; n<soccerFieldData.distanceArray.length; n++){
		var userPlayer = soccerFieldData.distanceArray[n].obj;
		if(soccerFieldData.distanceArray[n].dis > soccerPlayerData.radius && soccerFieldData.distanceArray[n].dis < soccerPlayerData.radiusTackle && checkBallHighLevel() && ballData.action == 'carry' && soccerPlayerData.currentPlayer.side != userPlayer.side && !ballData.actionTackle){
			if(userPlayer == soccerPlayerData.userPlayer){
				userPlayer.hardTackle = true;
			}else if(userPlayer.action == 'chaseBall'){
				userPlayer.hardTackle = true;
			}
		}else{
			userPlayer.hardTackle = false;	
		}
		
		if(ballData.actionTackle && soccerFieldData.distanceArray[n].dis < soccerPlayerData.radius && userPlayer.action == 'tackle'){
			ballData.actionTackle = false;
			
			if(soccerPlayerData.currentPlayer != '' && soccerPlayerData.currentPlayer != userPlayer && soccerPlayerData.currentPlayer != soccerPlayerData.userPlayer){
				resetPlayerAction();
				if(soccerPlayerData.currentPlayer.side != userPlayer.side){
					setIcon(userPlayer, 'tackle');
				}
			}
			
			soccerPlayerData.currentPlayer = userPlayer;
			soccerFieldData.lastTouchPlayer = userPlayer;
			shootBall('tackle', itemBall.x, itemBall.y);
			soccerFieldData.tackleHardTime = actionTimerData.tackleHardTime//randomIntFromInterval(300,400);
		}
		
		if(userPlayer.hardTackle && soccerFieldData.tackleHardTime <= 0 && userPlayer != soccerPlayerData.currentPlayer && userPlayer != soccerPlayerData.userPlayer){
			userPlayer.action = 'tackle';
			userPlayer.tackleX = soccerPlayerData.currentPlayer.x;
			userPlayer.tackleY = soccerPlayerData.currentPlayer.y;
			userPlayer.takleHardTime = 100;
			userPlayer.idleTime = 0;
			userPlayer.action = 'tackle';
			userPlayer.actionShoot = 'tackle';
			ballData.actionTackle = true;
			soccerFieldData.tackleHardTime = actionTimerData.tackleHardTime//randomIntFromInterval(300,400);
			
		}else if(soccerFieldData.distanceArray[n].dis < soccerPlayerData.radius && checkBallHighLevel() && checkBallSpeed()){
			if(ballData.action == 'idle' || ballData.action == 'carry'){
				var canTackle = false;
				var canTackleHard = true;
				if(userPlayer == soccerPlayerData.userPlayer && soccerPlayerData.userPlayer.tackleTime <= 0){
					canTackle = true;
				}else if(soccerFieldData.tackleTime <= 0){
					if(userPlayer.tackleTime <= 0){
						canTackle = true;
					}
				}else if(soccerFieldData.tackleTime <= 0){
					if(userPlayer.tackleTime <= 0){
						canTackle = true;
					}
				}
				if(canTackle){
					//if(soccerPlayerData.currentPlayer != '' && soccerPlayerData.currentPlayer != userPlayer){
					if(soccerPlayerData.currentPlayer != ''){
						resetPlayerAction();
						
						if(soccerPlayerData.currentPlayer.side != userPlayer.side){
							setIcon(userPlayer, 'tackle');
						}
					}
					
					soccerPlayerData.currentPlayer = userPlayer;
					soccerPlayerData.currentPlayer.idleTime = 0;
					
					if(soccerPlayerData.currentPlayer.side == 'home'){
						soccerFieldData.condition = 'strike';
					}else if(soccerPlayerData.currentPlayer.side == 'away'){
						soccerFieldData.condition = 'defense';
					}
					soccerFieldData.tackleTime = randomIntFromInterval(10,15);
					ballData.action = 'carry';
				}
			}
		}else if(soccerFieldData.distanceArray[n].dis < soccerPlayerData.radius && itemBall.ygap > 30 && itemBall.ygap < 40){
			soccerFieldData.lastTouchPlayer = userPlayer;
			itemBall.yspeed = -itemBall.yspeed * ballBounceData.bounce;
			itemBall.xspeed = -itemBall.xspeed * ballBounceData.bounce;
		}
	}	
}

function resetPlayerAction(){
	soccerPlayerData.forcePass = false;
	soccerPlayerData.currentPlayer.tackleTime = randomIntFromInterval(80,100);
	soccerPlayerData.currentPlayer.idleTime = randomIntFromInterval(80,100);
	soccerPlayerData.currentPlayer.actionChangeTime = 0;
	soccerPlayerData.currentPlayer.action = 'idle';	
}

function updateCarry(){
	itemBall.xrotate = (itemBall.carryX - itemBall.oriX) * 4.5;
	itemBall.yrotate = (itemBall.carryY - itemBall.oriY) * 4.5;
	itemBall.xrotate = itemBall.xrotate > 0 ? -itemBall.xrotate : Math.abs(itemBall.xrotate);
	
	itemBall.carryX = itemBall.oriX;
	itemBall.carryY = itemBall.oriY;
}

function checkBallHighLevel(){
	var canInteract = false;
	if(itemBall.ygap < 30){
		canInteract = true;
	}
	
	return canInteract;	
}

function checkBallSpeed(){
	var canInteract = false;
	if(Math.abs(itemBall.xspeed) < 3 && Math.abs(itemBall.yspeed) < 3){
		canInteract = true;	
	}
	return canInteract;
}

function getBallSpeed(){
	var ballSpeed = Math.abs(itemBall.xspeed);
	
	if(Math.abs(itemBall.yspeed) > ballSpeed){
		ballSpeed = Math.abs(itemBall.yspeed);	
	}
	return ballSpeed;
}

 /*!
 * 
 * UPDATE CAMERA - This is the function that runs to update camera
 * 
 */
function updateCamera(con){
	var camX, camY;
	if(curPage == 'main' || curPage == 'gameplay' || curPage == 'select' || curPage == 'instruction' || curPage == 'championship'){
		camX = (canvasW/2) - (cameraData.x);
		camY = (canvasH/2) - (cameraData.y);
		
		if(cameraData.side){
			cameraData.x++;
		}else{
			cameraData.x--;	
		}
		if(camX <= -((fieldW-canvasW))){
			if(cameraData.side){
				cameraData.side = false;	
			}
		}
		
		if(camX >= 0){
			if(!cameraData.side){
				cameraData.side = true;	
			}
		}
		
		TweenMax.to(fieldContainer, 1, {x:camX, y:camY, overwrite:true});	
	}else{
		var newPos = getCenterPosition(soccerPlayerData.userPlayer.x, soccerPlayerData.userPlayer.y, itemBall.oriX, itemBall.oriY);
		if(computerMode){
			newPos = {x:itemBall.oriX, y:itemBall.oriY};
		}
		camX = (canvasW/2) - (newPos.x);
		camY = (canvasH/2) - (newPos.y);
		
		camX = camX >= 0 ? 0 : camX;
		camX = camX <= -((fieldW-canvasW)) ? -((fieldW-canvasW)) : camX;
		camY = camY >= 0 ? 0 : camY;
		camY = camY <= -((fieldH-canvasH)) ? -((fieldH-canvasH)) : camY;
		
		var panSpeed = con == true ? .5 : 0;
		TweenMax.to(fieldContainer, panSpeed, {x:camX, y:camY, overwrite:true});
	}
}

 /*!
 * 
 * UPDATE PLAYER - This is the function that runs to update player
 * 
 */
function updatePlayer(){
	var pt = fieldContainer.globalToLocal(gameData.move.x, gameData.move.y);
	var distanceMoveRange = 30;
	if(!soccerPlayerData.followMouse){
		distanceMoveRange = 0;
		if(soccerFieldData.condition == 'kickoff'){
			pt = {x:soccerPlayerData.userPlayer.posX, y:soccerPlayerData.userPlayer.posY};
		}else{
			pt = {x:soccerPlayerData.userPlayer.oriX, y:soccerPlayerData.userPlayer.oriY};
		}
		
		if(soccerFieldData.penalty){
			pt = {x:itemBall.x, y:itemBall.y};
		}
	}
	
	var distanceMove = getDistanceByValue(pt.x, pt.y, soccerPlayerData.oldX, soccerPlayerData.oldY);
	updatePlayerDirection(soccerPlayerData.userPlayer, pt.x, pt.y);
	
	var moveUserPlayer = true;
	if(soccerFieldData.penalty){
		moveUserPlayer = false;	
	}
	
	if(soccerPlayerData.userPlayer.takleHardTime > 0){
		soccerPlayerData.userPlayer.takleHardTime--;
		
		var tackleSpeed = 0;
		soccerPlayerData.tackleSpeed;
		pt.x = soccerPlayerData.userPlayer.tackleX;
		pt.y = soccerPlayerData.userPlayer.tackleY;
		
		var yDistance = pt.y - soccerPlayerData.userPlayer.y;
		var xDistance = pt.x - soccerPlayerData.userPlayer.x;
		
		if (Math.sqrt(yDistance*yDistance +  xDistance*xDistance) < tackleSpeed){
			soccerPlayerData.userPlayer.x = pt.x;
			soccerPlayerData.userPlayer.y = pt.y;
		}else{
			var radian = Math.atan2(yDistance, xDistance);
			soccerPlayerData.userPlayer.x += Math.cos(radian) * tackleSpeed;
			soccerPlayerData.userPlayer.y += Math.sin(radian) * tackleSpeed;
		}
		
		checkWallCollision(soccerPlayerData.userPlayer, soccerPlayerData.radiusWall, false);
	}else if(distanceMove > distanceMoveRange && moveUserPlayer){
		var yDistance = pt.y - soccerPlayerData.userPlayer.y;
		var xDistance = pt.x - soccerPlayerData.userPlayer.x;
		
		if (Math.sqrt(yDistance*yDistance +  xDistance*xDistance) < soccerPlayerData.userSpeed){
			soccerPlayerData.userPlayer.x = pt.x;
			soccerPlayerData.userPlayer.y = pt.y;
		}else{
			var radian = Math.atan2(yDistance, xDistance);
			soccerPlayerData.userPlayer.x += Math.cos(radian) * soccerPlayerData.userSpeed;
			soccerPlayerData.userPlayer.y += Math.sin(radian) * soccerPlayerData.userSpeed;
		}
		
		checkWallCollision(soccerPlayerData.userPlayer, soccerPlayerData.radiusWall, false);
		
		soccerPlayerData.oldX = soccerPlayerData.userPlayer.x;
		soccerPlayerData.oldY = soccerPlayerData.userPlayer.y;
	}
	
	itemGuideDirection.x = soccerPlayerData.userPlayer.x;
	itemGuideDirection.y = soccerPlayerData.userPlayer.y;
	itemGuideDirection.rotation = soccerPlayerData.userPlayer.rotateNum;
	
	checkFollowMouse();
}

 /*!
 * 
 * UPDATE AI PLAYERS - This is the function that runs to update AI players
 * 
 */
function updateAIPlayers(side){
	var targetArray;
	var targetDisArray;
	
	if(side == 'home'){
		soccerFieldData.distanceArrayHome = [];
		targetArray = soccerFieldData.playersHome_arr;
		targetDisArray = soccerFieldData.distanceArrayHome;
	}else if(side == 'away'){
		soccerFieldData.distanceArrayAway = [];
		targetArray = soccerFieldData.playersAway_arr;
		targetDisArray = soccerFieldData.distanceArrayAway;
	}
	
	var playerExcludeNum = side == soccerPlayerData.userSide ? soccerPlayerData.playerID : -1;
	var defendMode = side == 'home' ? 'strike' : 'defense';
	
	var actionArray = ['dribbling','tackle'];
	for(var n=0; n<targetArray.length; n++){
		if(n != playerExcludeNum){
			if(soccerFieldData.condition == 'penalty'){
				if(targetArray[n].action != 'penalty'){
					targetArray[n].action = 'neutral';
				}
			}else if(soccerFieldData.condition == 'kickoff'){
				targetArray[n].action = 'kickoff';
			}else if(soccerFieldData.condition == 'neutral'){
				targetArray[n].action = 'neutral';
			}else if(soccerFieldData.condition == defendMode && targetArray[n].action == 'chaseBall'){
				targetArray[n].action = 'idle';
			}else if(actionArray.indexOf(targetArray[n].action) == -1){
				targetArray[n].action = 'idle';
			}
		}
	}
	
	//sort distance
	for(var n=0; n<targetArray.length; n++){
		var ballDistance = getDistance(itemBallShadow, targetArray[n]);
		targetDisArray.push({obj:targetArray[n], dis:ballDistance});
	}
	sortOnObject(targetDisArray,'dis');
	
	var countDefender = 0;
	var defendMode = side == 'home' ? 'defense' : 'strike';
	var ballPercent = 0;
	if(side == 'home'){
		ballPercent = itemBall.oriX/fieldW * 100;
	}else if(side == 'away'){
		ballPercent = (fieldW-itemBall.oriX)/fieldW * 100;
	}
	var totalDefender = 2;
	if(ballPercent < 40){
		totalDefender = 3;	
	}
	
	var actionArray = ['fight',defendMode];
	if(actionArray.indexOf(soccerFieldData.condition) != -1){
		for(var n=0; n<targetDisArray.length; n++){
			if(countDefender < totalDefender){
				if(targetDisArray[n].obj != soccerPlayerData.userPlayer){
					if(targetDisArray[n].obj.action != 'tackle'){
						targetDisArray[n].obj.action = 'chaseBall';
						countDefender++;
					}
				}
			}else{
				if(targetDisArray[n].obj.action == 'chaseBall'){
					targetDisArray[n].obj.action = 'idle';	
				}
			}
		}
	}
	
	var defendMode = side == 'home' ? 'strike' : 'defense';
	for(var n=0; n<targetArray.length; n++){
		var curPlayer = targetArray[n];
		if(curPlayer.tackleTime > 0){
			curPlayer.tackleTime--;	
		}
		
		if(n != playerExcludeNum){
			if(curPlayer.idleTime > 0){
				curPlayer.idleTime--;
				updatePlayerAIMovements(curPlayer, 'idle');
			}else{
				if(curPlayer.action == 'penalty'){
					updatePlayerAIMovements(curPlayer, "penalty");
				}else if(curPlayer.action == 'tackle'){
					updatePlayerAIMovements(curPlayer, "tackle");
				}else if(curPlayer.action == 'chaseBall'){
					updatePlayerAIMovements(curPlayer, "chaseBall");
				}else if(curPlayer.action == 'dribbling'){
					if(soccerFieldData.condition != defendMode){
						curPlayer.action = 'idle';
					}else{
						updatePlayerAIMovements(curPlayer, "followGoal");	
					}
				}else if(curPlayer.action == 'idle'){
					updatePlayerAIMovements(curPlayer, "followBall");
				}else if(curPlayer.action == 'neutral'){
					updatePlayerAIMovements(curPlayer, "backposition");
				}else if(curPlayer.action == 'kickoff'){
					updatePlayerAIMovements(curPlayer, "position");
				}
			}
		}
	}
}

function updatePlayerAIMovements(player, con){
	if(soccerFieldData.matchEnd && con != 'position'){
		return;
	}
	
	var defaultSpeed = 0;
	if(player.side == 'home'){
		defaultSpeed = soccerPlayerData.homeSpeed.player;
	}else{
		defaultSpeed = soccerPlayerData.awaySpeed.player;	
	}
	var moveSpeed = defaultSpeed;
	var pt = {x:player.x, y:player.y};
	var extraRange = 30;
	
	if(player.lastAction != con){
		if(player.lastAction == 'tackle'){
			con = 'tackle';
		}else if(player.lastAction != 'tackle'){
			player.lastAction = con;
		}
	}
	
	if(con == 'tackle'){
		player.energy = 0;
		moveSpeed = soccerPlayerData.tackleSpeed;
		pt.x = player.tackleX;
		pt.y = player.tackleY;
		
		if(player.takleHardTime > 0){
			player.takleHardTime--;
		}else{
			player.energy = 0;
			player.moveSpeed = player.nextMoveSpeed = defaultSpeed;
			updatePlayerSpeed(player, defaultSpeed);
			player.action = player.lastAction = 'idle';	
		}
	}else if(con == 'chaseBall'){
		pt = itemBallShadow;
	}else if(con == 'followGoal'){
		moveSpeed = defaultSpeed*.9;
		pt = {x:player.goalX, y:player.goalY};
		
		if(soccerPlayerData.forcePass && player.side == soccerPlayerData.userPlayer.side){
			soccerPlayerData.forcePass = false;
			
			soccerFieldData.shotFrom = player.side;
			soccerFieldData.lastTouchPlayer = player;
			shootBall('pass', soccerPlayerData.userPlayer.x, soccerPlayerData.userPlayer.y);
			player.action = 'idle';
		}else if(checkWithinStrikeZone(player)){
			findGoalArea(player);
			
			soccerFieldData.shotFrom = player.side;
			soccerFieldData.lastTouchPlayer = player;
			shootBall('shoot', player.goalX, player.goalY);
			player.action = 'idle';
		}else if(checkEnemyApproch(player)){
			if(player.passTimer <= 0){
				lookNearbyTeam(player);
			}else{
				player.passTimer--;	
			}
		}
	}else if(con == 'followBall'){
		var ballDistance = getDistance(player, itemBallShadow);
		if(ballDistance > 500){
			moveSpeed = defaultSpeed * .3;
		}
		
		var ballPercent = Math.floor(itemBallShadow.x / fieldW * 100);
		var totalPercentX = player.patrolEndX - player.patrolStartX;
		player.newY = player.oriY + player.extraY;
		player.newX = (player.patrolStartX + (totalPercentX / 100 * ballPercent))+player.extraX;
		
		pt = {x:player.newX, y:player.newY};
	}else if(con == 'backposition'){
		pt = {x:player.oriX+player.extraX, y:player.oriY+player.extraY};
	}else if(con == 'position'){
		extraRange = 15;
		pt = {x:player.posX+player.extraX, y:player.posY+player.extraY};
	}else if(con == 'penalty'){
		pt = {x:player.x, y:player.y};
	}
	
	if(player.idlePosition <= 0){
		player.idlePosition = randomIntFromInterval(40,50);
		player.extraX = randomIntFromInterval(-extraRange,extraRange);
		player.extraY = randomIntFromInterval(-extraRange,extraRange);
	}else{
		player.idlePosition--;
	}
	
	updateEaseMove(pt, player);
	updatePlayerDirection(player, pt.x, pt.y);
	updatePlayerSpeed(player, moveSpeed);
	checkWallCollision(player, soccerPlayerData.radius, false);
}

 /*!
 * 
 * NEARBY PLAYERS - This is the function that runs to detect nearby players
 * 
 */
function lookNearbyTeam(player){
	soccerFieldData.teamDistanceArray = [];
	
	if(player.side == 'home'){
		for(var n=0; n<soccerFieldData.playersHome_arr.length; n++){
			soccerFieldData.teamDistanceArray.push({obj:soccerFieldData.playersHome_arr[n], dis:soccerFieldData.playersHome_arr[n].x});
		}
		sortOnObject(soccerFieldData.teamDistanceArray,'dis', true);
	}else if(player.side == 'away'){
		for(var n=0; n<soccerFieldData.playersAway_arr.length; n++){
			soccerFieldData.teamDistanceArray.push({obj:soccerFieldData.playersAway_arr[n], dis:soccerFieldData.playersAway_arr[n].x});
		}
		sortOnObject(soccerFieldData.teamDistanceArray,'dis', false);
	}
	
	for(var n=0; n<soccerFieldData.teamDistanceArray.length; n++){
		var nearByPlayer = soccerFieldData.teamDistanceArray[n].obj;
		if(nearByPlayer != player){
			var shootType = 'pass';
			var passX = nearByPlayer.x;
			var passY = nearByPlayer.y;
			if(player.side == 'away' && nearByPlayer.x > player.x){
				passX = player.goalX;
				passY = player.goalY;
			}else if(player.side == 'home' && nearByPlayer.x < player.x){
				passX = player.goalX;
				passY = player.goalY;	
			}
			
			if(randomBoolean()){
				shootType = 'passhigh';
			}
			soccerFieldData.shotFrom = player.side;
			soccerFieldData.lastTouchPlayer = player;
			shootBall(shootType, passX, passY);
			player.action = 'idle';	
			player.passTimer = randomIntFromInterval(actionTimerData.passDelay,actionTimerData.passDelay+10);
			n = soccerFieldData.teamDistanceArray.length;
		}
	}
}

function checkEnemyApproch(player){
	var isNearby = false;
	if(player.side == 'home'){
		if(soccerFieldData.distanceArrayAway.length > 0){
			if(soccerFieldData.distanceArrayAway[0].dis < 80){
				isNearby = true;
			}
		}
	}else{
		if(soccerFieldData.distanceArrayHome.length > 0){
			if(soccerFieldData.distanceArrayHome[0].dis < 80){
				isNearby = true;	
			}
		}
	}
	return isNearby;
}

/*!
 * 
 * UPDATE GOALKEEPERS - This is the function that runs to update goalkeepers
 * 
 */
function updateGoalkeeper(){
	for(var n=0; n<soccerFieldData.playerGoalkeeper_arr.length; n++){
		var curPlayer = soccerFieldData.playerGoalkeeper_arr[n];
		
		if(curPlayer.catchTime > 0){
			curPlayer.catchTime--;
		}
		
		if(curPlayer.idleTime > 0){
			curPlayer.idleTime--;
		}else{
			if(curPlayer.action == 'freekick'){
				updateGoalKeeperMovement(curPlayer, 'freekick');
			}else if(curPlayer.action == 'saveBall'){
				updateGoalKeeperMovement(curPlayer, 'saveBall');
			}else if(curPlayer.action == 'catchBall'){
				updateGoalKeeperMovement(curPlayer, 'catchBall');
			}else if(checkWithinGoalkeeperZone(curPlayer) && curPlayer.action == 'idle'){
				updateGoalKeeperMovement(curPlayer, 'chaseBall');
			}else if(curPlayer.action == 'idle'){
				updateGoalKeeperMovement(curPlayer, 'followBall');
			}
		}
	}
}

function updateGoalKeeperMovement(player, con){
	if(soccerFieldData.matchEnd && con != 'followBall'){
		return;	
	}
	
	var defaultSpeed = 0;
	if(player.side == 'home'){
		defaultSpeed = soccerPlayerData.homeSpeed.goalkeeper;
	}else{
		defaultSpeed = soccerPlayerData.awaySpeed.goalkeeper;	
	}
	var moveSpeed = defaultSpeed;
	var pt = {x:0, y:0};
	var face = {x:itemBallShadow.x, y:itemBallShadow.y};
	
	if(con == 'saveBall'){
		player.energy = 0;
		moveSpeed = defaultSpeed * 2;
		pt = {x:player.catchX, y:player.catchY+player.catchDistance};
		
		if(player.goalkeeperTime > 0){
			player.goalkeeperTime--	
		}else{
			player.energy = 0;
			moveSpeed = defaultSpeed;
			player.action = 'idle';
		}
	}else if(con == 'catchBall'){
		itemBall.xspeed = itemBall.yspeed = 0;
		if(player.side == 'away'){
			pt = {x:itemBallShadow.x+10, y:itemBallShadow.y};
		}else{
			pt = {x:itemBallShadow.x-10, y:itemBallShadow.y};	
		}
		
		if(player.goalkeeperTime > 0){
			player.goalkeeperTime--;
			checkPlayerBallRange();
		}else{
			soccerPlayerData.followMouse = true;
			player.idleTime = randomIntFromInterval(60,80);
			findGoalkeeperArea(player);
			shootBall('throw', player.goalX, player.goalY);
			player.action = 'idle';
		}
	}else if(con == 'chaseBall'){
		moveSpeed = defaultSpeed * 1.2;
		pt = itemBallShadow;
	}else if(con == 'followBall'){
		var ballDistance = getDistance(player, itemBallShadow);
		if(ballDistance > 500){
			moveSpeed = defaultSpeed * .3;
		}
		
		if(player.idlePosition <= 0){
			player.idlePosition = randomIntFromInterval(30,50);
			player.extraX = randomIntFromInterval(-50,50);
			player.extraY = randomIntFromInterval(-50,50);
		}else {
			player.idlePosition--;
		}
		
		var ballPercent = Math.floor(itemBallShadow.x / fieldW * 100);
		var totalPercentX = player.patrolEndX - player.patrolStartX;
		var followBallY = itemBallShadow.y;
		followBallY = followBallY < player.patrolStartY ? player.patrolStartY : followBallY;
		followBallY = followBallY > player.patrolEndY ? player.patrolEndY : followBallY;
		
		player.newY = followBallY+player.extraY;
		player.newX = (player.patrolStartX + (totalPercentX / 100 * ballPercent))+player.extraX;
		
		pt = {x:player.newX, y:player.newY};
	}else if(con == 'freekick'){
		if(player.goalkeeperTime > 0){
			checkPlayerBallRange();
			player.goalkeeperTime--	
		}else{
			soccerPlayerData.followMouse = true;
			player.idleTime = randomIntFromInterval(60,80);
			findGoalkeeperArea(player);
			shootBall('high', player.goalX, player.goalY);
			player.action = 'idle';
		}
		
		face.x = player.goalX;
		face.y = player.goalY;
		
		//gap infront
		if(player.side == 'away'){
			pt = {x:itemBallShadow.x+30, y:itemBallShadow.y};
		}else{
			pt = {x:itemBallShadow.x-30, y:itemBallShadow.y};	
		}
	}
	
	updateEaseMove(pt, player);
	updatePlayerDirection(player, face.x, face.y);
	updatePlayerSpeed(player, moveSpeed);
}

/*!
 * 
 * UPDATE BALL ROTATION - This is the function that runs to update ball rotation
 * 
 */
function updateBallRotate(){
	itemBall.visible = false;
	
	ballContainer.scaleX = ballContainer.scaleY = itemBall.scaleX;
	ballContainer.x = itemBall.x;
	ballContainer.y = itemBall.y;
	
	ballData.obj.x += itemBall.xrotate * .3;
	ballData.obj.y += itemBall.yrotate * .3;
	
	var end = -ballData.radius;
	ballData.obj.x = ballData.obj.x > 0 ? end : ballData.obj.x;
	ballData.obj.x = ballData.obj.x < end ? 0 : ballData.obj.x;
	
	ballData.obj.y = ballData.obj.y > 0 ? end : ballData.obj.y;
	ballData.obj.y = ballData.obj.y < end ? 0 : ballData.obj.y;
}

/*!
 * 
 * UPDATE PLAYER DIRECTION - This is the function that runs to update player direction
 * 
 */
function updatePlayerDirection(player, dirX, dirY){
	var radiance = 180/Math.PI;
	var walkdirection = -(Math.atan2(dirX-player.x, dirY-player.y))*radiance;
	walkdirection += 180;
	player.rotateNum = walkdirection;
	
	var distanceX = Math.abs(player.x - player.oldX);
	var distanceY = Math.abs(player.y - player.oldY);
	var additionalMode = '';
	var curAction = '';
	
	if(distanceX > .5 || distanceY > .5){
		additionalMode = 'run';
	}
	
	var goalAction = ["homesavedown", "homesaveup","awaysavedown", "awaysaveup"];
	if(player.actionShoot != ''){
		additionalMode = player.actionShoot;
		player.actionShoot = '';
	}
	
	if(goalAction.indexOf(additionalMode) != -1){
		curAction = additionalMode;
	}else{
		if(walkdirection > 45 && walkdirection < 135){
			curAction = 'right'+additionalMode;
		}else if(walkdirection >= 135 && walkdirection < 225){
			curAction = 'down'+additionalMode;
		}else if(walkdirection >= 225 && walkdirection < 315){
			curAction = 'left'+additionalMode;
		}else{
			curAction = 'up'+additionalMode;
		}
		
		if(player.action == 'penalty'){
			curAction = 'left'+additionalMode;	
		}
	}
	
	if(player.actionMode != curAction && player.actionTimer <= 0){
		if(additionalMode == 'kick'){
			player.actionTimer = actionTimerData.kickDelay;	
		}else if(additionalMode == 'tackle'){
			player.actionTimer = actionTimerData.tackleDelay;	
		}else if(goalAction.indexOf(curAction) != -1){
			player.actionTimer = actionTimerData.catchDelay;
		}
		
		if(player.actionChangeTime >= actionTimerData.changeTime){
			player.actionChangeTime = 0;
			player.gotoAndPlay(curAction);
			player.actionMode = curAction;
		}
	}
	
	if(player.actionChangeTime <= actionTimerData.changeTime){
		player.actionChangeTime++;	
	}
	
	if(player.actionTimer > 0){
		player.actionTimer--;	
	}
	
	player.oldX = player.x;
	player.oldY = player.y;
}

function updateIndex(){
	playersContainer.sortChildren(sortFunction);
}

/*!
 * 
 * UPDATE PLAYER ACTION - This is the function that runs to update player action
 * 
 */
function playerAction(){
	if(soccerFieldData.penalty && soccerFieldData.currentSide == soccerPlayerData.userPlayer.side && soccerFieldData.penaltyReady){
		var pt = fieldContainer.globalToLocal(gameData.move.x, gameData.move.y);
		updatePlayerDirection(soccerPlayerData.userPlayer, pt.x, pt.y);
		shootBall('shoot');
	}else{
		if(soccerPlayerData.userPlayer.hardTackle){
			soccerPlayerData.userPlayer.action = 'tackle';
			soccerPlayerData.userPlayer.tackleX = itemBall.x;
			soccerPlayerData.userPlayer.tackleY = itemBall.y;
			soccerPlayerData.userPlayer.takleHardTime = 100;
			soccerPlayerData.userPlayer.idleTime = 0;
			soccerPlayerData.userPlayer.action = 'tackle';
			soccerPlayerData.userPlayer.actionShoot = 'tackle';
			ballData.actionTackle = true;
			soccerFieldData.tackleHardTime = actionTimerData.tackleHardTime//randomIntFromInterval(300,400);
		}else if(soccerPlayerData.userPlayer.action == 'dribbling'){
			if(checkWithinStrikeZone(soccerPlayerData.userPlayer)){
				soccerFieldData.shotFrom = soccerPlayerData.userPlayer.side;
				soccerFieldData.lastTouchPlayer = soccerPlayerData.userPlayer;
				shootBall('shoot');
			}else{
				var shootType = 'pass';
				var currentArray;
				if(soccerPlayerData.userSide == 'home'){
					currentArray = soccerFieldData.playersHome_arr
				}else if(soccerPlayerData.userSide){
					currentArray = soccerFieldData.playersAway_arr	
				}
				
				for(var n=0; n<currentArray.length; n++){
					if(soccerPlayerData.userPlayer != currentArray[n]){
						soccerFieldData.teamDistanceArray.push({obj:currentArray[n], dis:currentArray[n].x});
					}
				}
				sortOnObject(soccerFieldData.teamDistanceArray,'dis', true);
				if(soccerFieldData.teamDistanceArray.length > 0){
					if(soccerFieldData.teamDistanceArray[0].dis < soccerPlayerData.userPlayer.x){
						shootType = 'shoot';
					}
				}
				soccerFieldData.shotFrom = soccerPlayerData.userPlayer.side;
				soccerFieldData.lastTouchPlayer = soccerPlayerData.userPlayer;
				shootBall(shootType);
			}
		}else{
			soccerPlayerData.forcePass = true;
		}
	}
}


/*!
 * 
 * ANIMATE STATUS - This is the function that runs to animate status
 * 
 */
function animateStatus(status){
	itemStatusBar1.x = 0;
	itemStatusBar1.y = canvasH/100 * 75;
	itemStatusBar1.alpha = 0;
	TweenMax.to(itemStatusBar1, .8, {alpha:1, x:canvasW/2, overwrite:true, ease:Expo.easeOut});
	
	itemStatusBar2.x = canvasW;
	itemStatusBar2.y = canvasH/100 * 80;
	itemStatusBar2.alpha = 0;
	TweenMax.to(itemStatusBar2, .8, {alpha:1, x:canvasW/2, overwrite:true, ease:Expo.easeOut});
	
	if(status == 'kickoff'){
		soccerFieldData.status = itemStatusKickoff;
	}else if(status == 'goal'){
		soccerFieldData.status = itemStatusGoal;
	}else if(status == 'fulltime'){
		soccerFieldData.status = itemStatusFulltime;
	}else if(status == 'misses'){
		soccerFieldData.status = itemStatusMisses;
	}else if(status == 'penalty'){
		soccerFieldData.status = itemStatusPenalty;
	}
	
	soccerFieldData.status.visible = true;
	soccerFieldData.status.x = 0;
	soccerFieldData.status.y = canvasH/100 * 75;
	soccerFieldData.status.alpha = 0;
	TweenMax.to(soccerFieldData.status, .8, {alpha:1, x:canvasW/2, overwrite:true, ease:Expo.easeOut, onComplete:animateStatusOutComplete});
}

function animateStatusOutComplete(){
	TweenMax.to(itemStatusBar1, .8, {alpha:0, x:canvasW, overwrite:true, ease:Expo.easeIn});
	TweenMax.to(itemStatusBar2, .7, {alpha:0, x:0, overwrite:true, ease:Expo.easeIn});
	TweenMax.to(soccerFieldData.status, .7, {alpha:0, x:canvasW, overwrite:true, ease:Expo.easeIn, onComplete:animateStatusInComplete});
}

function animateStatusInComplete(){
	itemStatusKickoff.visible = itemStatusGoal.visible = itemStatusFulltime.visible = false	
}

/*!
 * 
 * SET ICON - This is the function that runs to set player icon
 * 
 */
function setIcon(player, type){
	var newIcon;
	if(type == 'tackle'){
		if(player.side == 'home'){
			statisticData.home.tackles++;
		}else{
			statisticData.away.tackles++;	
		}
		playSound('soundTackle');
		newIcon = itemIconTackle.clone();
	}else{
		if(soccerFieldData.soundMissTimer <= 0){
			soccerFieldData.soundMissTimer = 50
			playSound('soundMiss');
		}
		newIcon = itemIconSafe.clone();	
	}
	newIcon.alpha = 1;
	newIcon.visible = true;
	newIcon.x = fieldW/2;
	newIcon.y = fieldH/2;
	
	iconContainer.addChild(newIcon);
	animateIcon(newIcon);
	
	soccerFieldData.iconArray.push({icon:newIcon, player:player});
}

function animateIcon(icon){
	TweenMax.to(icon, .5, {alpha:1, overwrite:true, onComplete:function(){
		TweenMax.to(icon, .5, {delay:1, alpha:0, overwrite:true, onComplete:function(){
			for(var n=0; n<soccerFieldData.iconArray.length; n++){
				var targetIcon = soccerFieldData.iconArray[n].icon;
				var targetPlayer = soccerFieldData.iconArray[n].player;
				
				if(targetIcon == icon){
					iconContainer.removeChild(targetIcon);
					soccerFieldData.iconArray.splice(n,1);
					n = soccerFieldData.iconArray.length;
				}
			}
		}});
	}});	
}

function updateIcon(){
	for(var n=0; n<soccerFieldData.iconArray.length; n++){
		var targetIcon = soccerFieldData.iconArray[n].icon;
		var targetPlayer = soccerFieldData.iconArray[n].player;
		targetIcon.x = targetPlayer.x;
		targetIcon.y = targetPlayer.y;
	}
}

/*!
 * 
 * MAIN CAMERA - This is the function that runs to set main camera
 * 
 */
function setMainCamera(){
	stopGame();
	itemBall.xspeed = itemBall.yspeed = 0;
	itemBall.xrotate = itemBall.yrotate = 0;
	itemBall.ygap = 0;
	itemBall.oriX = itemBall.x = itemBallShadow.x = ballContainer.x = fieldW/2;
	itemBall.oriY = itemBall.y = itemBallShadow.y = ballContainer.y = fieldH/2;
	
	cameraData.x = 	fieldW/2
	cameraData.y = 	fieldH/2
	cameraData.side = true;
	
	fieldContainer.x = (canvasW/2) - (cameraData.x);
	fieldContainer.y = (canvasH/2) - (cameraData.y);
	
	soccerFieldData.condition = 'kickoff';
	gameData.teamHomeID = Math.floor(Math.random()*team_arr.length);
	chooseAwayTeam();
	createPlayers();
}

function penaltyComplete(){
	endSoccerMatch('nogoal');	
}

function penaltyAIKick(){
	findGoalArea(soccerPlayerData.currentPlayer);
	shootBall('shoot', soccerPlayerData.currentPlayer.goalX, soccerPlayerData.currentPlayer.goalY);		
}