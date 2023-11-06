////////////////////////////////////////////////////////////
// CHAMPIONSHIP
////////////////////////////////////////////////////////////

//championship placement name
var championshipPlace = ['1st','2nd','3rd'];

//championship brackets position
var championshipBracket_arr = {roundof16:[
											{homeX:204, homeY:200, awayX:204, awayY:249, homeS:'left', awayS:'left', homeP:'up', awayP:'down'},
											{homeX:1080, homeY:200, awayX:1080, awayY:249, homeS:'right', awayS:'right', homeP:'up', awayP:'down'},
											{homeX:204, homeY:322, awayX:204, awayY:370, homeS:'left', awayS:'left', homeP:'up', awayP:'down'},
											{homeX:1080, homeY:322, awayX:1080, awayY:370, homeS:'right', awayS:'right', homeP:'up', awayP:'down'},
											
											{homeX:204, homeY:444, awayX:204, awayY:492, homeS:'left', awayS:'left', homeP:'up', awayP:'down'},
											{homeX:1080, homeY:444, awayX:1080, awayY:492, homeS:'right', awayS:'right', homeP:'up', awayP:'down'},
											{homeX:204, homeY:566, awayX:204, awayY:614, homeS:'left', awayS:'left', homeP:'up', awayP:'down'},
											{homeX:1080, homeY:566, awayX:1080, awayY:614, homeS:'right', awayS:'right', homeP:'up', awayP:'down'}
										],
									
						quaterfinals:[
										{homeX:340, homeY:230, awayX:340, awayY:346, homeS:'left', awayS:'left', homeP:'up', awayP:'up'},
										{homeX:940, homeY:230, awayX:940, awayY:346, homeS:'right', awayS:'right', homeP:'up', awayP:'up'},
										{homeX:340, homeY:466, awayX:340, awayY:588, homeS:'left', awayS:'left', homeP:'up', awayP:'up'},
										{homeX:940, homeY:466, awayX:940, awayY:588, homeS:'right', awayS:'right', homeP:'up', awayP:'up'},
									],
										
						semifinals:[
										{homeX:470, homeY:290, awayX:470, awayY:528, homeS:'left', awayS:'left', homeP:'up', awayP:'up'},
										{homeX:810, homeY:290, awayX:810, awayY:528, homeS:'right', awayS:'right', homeP:'up', awayP:'up'}
									],
									
						finals:[
									{homeX:565, homeY:464, awayX:719, awayY:464, homeS:'left', awayS:'right', homeP:'up', awayP:'up'},
									{homeX:545, homeY:395, awayX:740, awayY:395, homeS:'left', awayS:'right', homeP:'up', awayP:'up'},
								
								]};

//championship settings						
var championshipData = {score:{
								round:-1,
								userID:0,
								roundof16:[
											{hID:0, aID:0, hS:0, aS:0, hPS:0, aPS:0},
											{hID:0, aID:0, hS:0, aS:0, hPS:0, aPS:0},
											{hID:0, aID:0, hS:0, aS:0, hPS:0, aPS:0},
											{hID:0, aID:0, hS:0, aS:0, hPS:0, aPS:0},
											{hID:0, aID:0, hS:0, aS:0, hPS:0, aPS:0},
											{hID:0, aID:0, hS:0, aS:0, hPS:0, aPS:0},
											{hID:0, aID:0, hS:0, aS:0, hPS:0, aPS:0},
											{hID:0, aID:0, hS:0, aS:0, hPS:0, aPS:0}
										],
								quaterfinals:[
											{hID:0, aID:0, hS:0, aS:0, hPS:0, aPS:0},
											{hID:0, aID:0, hS:0, aS:0, hPS:0, aPS:0},
											{hID:0, aID:0, hS:0, aS:0, hPS:0, aPS:0},
											{hID:0, aID:0, hS:0, aS:0, hPS:0, aPS:0},
										],
								semifinals:[
											{hID:0, aID:0, hS:0, aS:0, hPS:0, aPS:0},
											{hID:0, aID:0, hS:0, aS:0, hPS:0, aPS:0},
										],
								finals:[
											{hID:0, aID:0, hS:0, aS:0, hPS:0, aPS:0},
											{hID:0, aID:0, hS:0, aS:0, hPS:0, aPS:0},
										]
										
								}};
								
var qualifyData = {roundof16:[
								{array:'quaterfinals', index:0, side:'home'},
								{array:'quaterfinals', index:1, side:'home'},
								{array:'quaterfinals', index:0, side:'away'},
								{array:'quaterfinals', index:1, side:'away'},
								{array:'quaterfinals', index:2, side:'home'},
								{array:'quaterfinals', index:3, side:'home'},
								{array:'quaterfinals', index:2, side:'away'},
								{array:'quaterfinals', index:3, side:'away'}
							],
							
					quaterfinals:[
								{array:'semifinals', index:0, side:'home'},
								{array:'semifinals', index:1, side:'home'},
								{array:'semifinals', index:0, side:'away'},
								{array:'semifinals', index:1, side:'away'}
							],
							
					semifinals:[
								{array:'finals', index:1, side:'home', index2:0, side2:'home'},
								{array:'finals', index:1, side:'away', index2:0, side2:'away'},
							]};

var cookieName = 'newsoccer2018';

/*!
 * 
 * PREPARE CHAMPIONSHIP - This is the function that runs to prepare championship game
 * 
 */
function prepareChampionship(){
	toggleChamSelect(false);
	buttonChamRestart.x = canvasW/100 * 42;
	buttonChamSimulate.x = canvasW/100 * 58;
	buttonChamPlay.x = canvasW/100 * 58;
	soccerFieldData.continuePenalty = false;
	soccerFieldData.penalty = false;
						
	//random team
	if(championshipData.score.round == -1){
		championshipData.score.round = 0;
		championshipData.score.userID = gameData.teamHomeID;
		
		var teamArray = [];
		for(var n=0; n<team_arr.length; n++){
			if(gameData.teamHomeID != n){
				teamArray.push(n);
			}
		}
		shuffle(teamArray);
		teamArray.length = 15;
		teamArray.push(gameData.teamHomeID);
		shuffle(teamArray);
		
		var teamNum = 0;
		for(var n=0; n<championshipData.score.roundof16.length;n++){
			championshipData.score.roundof16[n].hID = teamArray[teamNum];
			teamNum++;
			championshipData.score.roundof16[n].aID = teamArray[teamNum];
			teamNum++;
			
			championshipData.score.roundof16[n].hS = '';
			championshipData.score.roundof16[n].aS = '';
			championshipData.score.roundof16[n].hPS = '';
			championshipData.score.roundof16[n].aPS = '';
		}
		
		for(var n=0; n<championshipData.score.quaterfinals.length;n++){
			championshipData.score.quaterfinals[n].hID = -1;
			championshipData.score.quaterfinals[n].aID = -1;
			championshipData.score.quaterfinals[n].hS = '';
			championshipData.score.quaterfinals[n].aS = '';
			championshipData.score.quaterfinals[n].hPS = '';
			championshipData.score.quaterfinals[n].aPS = '';
		}
		
		for(var n=0; n<championshipData.score.semifinals.length;n++){
			championshipData.score.semifinals[n].hID = -1;
			championshipData.score.semifinals[n].aID = -1;
			championshipData.score.semifinals[n].hS = '';
			championshipData.score.semifinals[n].aS = '';
			championshipData.score.semifinals[n].hPS = '';
			championshipData.score.semifinals[n].aPS = '';
		}
		
		for(var n=0; n<championshipData.score.finals.length;n++){
			championshipData.score.finals[n].hID = -1;
			championshipData.score.finals[n].aID = -1;
			championshipData.score.finals[n].hS = '';
			championshipData.score.finals[n].aS = '';
			championshipData.score.finals[n].hPS = '';
			championshipData.score.finals[n].aPS = '';
		}
	}
	
	var chamType = championshipData.score.round == 0 ? 'prepare' : 'gameplay';
	gameData.champType = chamType;

	saveChampionshipata();
	fillChampionshipDetails();
	checkCurrentRound(chamType);
}

function resetBrackets(type, n){
	$.championship[type+n+'h_txt'].text = '';
	$.championship[type+n+'a_txt'].text = '';
	$.championship[type+n+'h_PenaltyTxt'].text = '';
	$.championship[type+n+'a_PenaltyTxt'].text = '';
	$.championship[type+n+'h_focus'].visible = $.championship[type+n+'a_focus'].visible = false;
	$.championship[type+n+'h_penalty'].visible = $.championship[type+n+'a_penalty'].visible = false;
	
	if(type == 'finals'){
		$.championship[type+n+'h_position'].text = '';
		$.championship[type+n+'a_position'].text = '';
	}
	
	TweenMax.killTweensOf($.championship[type+n+'h_focus']);
	TweenMax.killTweensOf($.championship[type+n+'a_focus']);
}


/*!
 * 
 * CHAMPIONSIP TEAM SELECT - This is the function that runs to select team
 * 
 */
function toggleChamSelect(con, side, index){
	champSelectContainer.visible = con;
	if(con){
		gameData.chamArraySide = side;
		gameData.chamArrayIndex = index;

		if(gameData.chamArraySide == "home"){
			gameData.chamSelectID = championshipData.score.roundof16[gameData.chamArrayIndex].hID;
		}else{
			gameData.chamSelectID = championshipData.score.roundof16[gameData.chamArrayIndex].aID;
		}
		findChamSelectTeamPage();
	}
}

function replaceChamTeam(id){
	if(gameData.chamArraySide == "home"){
		championshipData.score.roundof16[gameData.chamArrayIndex].hID = id;
	}else{
		championshipData.score.roundof16[gameData.chamArrayIndex].aID = id;
	}

	toggleChamSelect(false);
	saveChampionshipata();
	fillChampionshipDetails();
}

function checkChamExistTeam(id){
	var alphaNum = 1;
	for(var n=0; n<championshipData.score.roundof16.length;n++){
		if(championshipData.score.roundof16[n].hID == id){
			alphaNum = .2;
		}else if(championshipData.score.roundof16[n].hID == id){
			alphaNum = .2;
		}
	}
	return alphaNum;
}

/*!
 * 
 * FILL CHAMPIONSIP DETAILS - This is the function that runs to fill championship details in brackets
 * 
 */
function fillChampionshipDetails(){
	//reset score
	for(var n=0; n<championshipBracket_arr.roundof16.length;n++){
		resetBrackets('roundof16', n)
	}
	
	for(var n=0; n<championshipBracket_arr.quaterfinals.length;n++){
		resetBrackets('quaterfinals', n)
	}
	
	for(var n=0; n<championshipBracket_arr.semifinals.length;n++){
		resetBrackets('semifinals', n)
	}
	
	for(var n=0; n<championshipBracket_arr.finals.length;n++){
		resetBrackets('finals', n)
	}
	championshipTeamContainer.removeAllChildren();
	
	for(var n=0; n<championshipData.score.roundof16.length;n++){
		fillTeamDetails('roundof16', championshipData.score.roundof16, n);
	}
	
	for(var n=0; n<championshipData.score.quaterfinals.length;n++){
		fillTeamDetails('quaterfinals', championshipData.score.quaterfinals, n);
	}
	
	for(var n=0; n<championshipData.score.semifinals.length;n++){
		fillTeamDetails('semifinals', championshipData.score.semifinals, n);
	}
	
	for(var n=0; n<championshipData.score.finals.length;n++){
		fillTeamDetails('finals', championshipData.score.finals, n);
	}
}

function fillTeamDetails(type, array, n){
	if(array[n].hID != -1){
		var homeTeam = new createjs.Bitmap(loader.getResult('team_bracket'+array[n].hID));
		centerReg(homeTeam);

		var teamGapHome = 30;
		var playerX = 25;
		if($.championship[type+n+'h'].side == 'left'){
			teamGapHome = -(teamGapHome);
			playerX = -(playerX);
		}
		
		homeTeam.x = $.championship[type+n+'h'].x+teamGapHome;
		homeTeam.y = $.championship[type+n+'h'].y;
		
		if($.championship[type+n+'h'].animate){
			$.championship[type+n+'h'].animate = false;
			TweenMax.from(homeTeam, .5, {x:$.championship[type+n+'h'].animateX, y:$.championship[type+n+'h'].animateY, overwrite:true});
		}
		$.championship[type+n+'h'].teamX = homeTeam.x;
		$.championship[type+n+'h'].teamY = homeTeam.y;
		championshipTeamContainer.addChild(homeTeam);
		
		if(array[n].hID == championshipData.score.userID){
			itemChamPlayer.x = $.championship[type+n+'h'].x-playerX;
			
			if($.championship[type+n+'h'].playerSide == 'up'){
				itemChamPlayer.y = $.championship[type+n+'h'].y-29;	
			}else{
				itemChamPlayer.y = $.championship[type+n+'h'].y+29;	
			}
		}
		
		if(gameData.champType == "prepare"){
			homeTeam.clickNum = n;
			homeTeam.cursor = "pointer";
			homeTeam.addEventListener("click", function(evt) {
				toggleChamSelect(true, "home", evt.target.clickNum);
			});
		}
	}
	
	if(array[n].aID != -1){
		var awayTeam = new createjs.Bitmap(loader.getResult('team_bracket'+array[n].aID));
		centerReg(awayTeam);
		
		var teamGapAway = 30;
		var playerX = 25;
		if($.championship[type+n+'a'].side == 'left'){
			teamGapAway = -(teamGapAway);
			playerX = -(playerX);
		}
		
		awayTeam.x = $.championship[type+n+'a'].x+teamGapAway;
		awayTeam.y = $.championship[type+n+'a'].y;
		
		if($.championship[type+n+'a'].animate){
			$.championship[type+n+'a'].animate = false;
			TweenMax.from(awayTeam, .5, {x:$.championship[type+n+'a'].animateX, y:$.championship[type+n+'a'].animateY, overwrite:true});
		}
		
		$.championship[type+n+'a'].teamX = awayTeam.x;
		$.championship[type+n+'a'].teamY = awayTeam.y;
		championshipTeamContainer.addChild(awayTeam);
		
		if(array[n].aID == championshipData.score.userID){
			itemChamPlayer.x = $.championship[type+n+'a'].x-playerX;
			
			if($.championship[type+n+'a'].playerSide == 'up'){
				itemChamPlayer.y = $.championship[type+n+'a'].y-29;	
			}else{
				itemChamPlayer.y = $.championship[type+n+'a'].y+29;	
			}
		}

		if(gameData.champType == "prepare"){
			awayTeam.clickNum = n;
			awayTeam.cursor = "pointer";
			awayTeam.addEventListener("click", function(evt) {
				toggleChamSelect(true, "away", evt.target.clickNum);
			});
		}
	}
	
	$.championship[type+n+'h_txt'].text = array[n].hS;
	$.championship[type+n+'a_txt'].text = array[n].aS;

	if(array[n].hS > array[n].aS && array[n].hS != ''){
		$.championship[type+n+'h_focus'].visible = true;
		$.championship[type+n+'h_focus'].alpha = 1;
	}else if(array[n].hS < array[n].aS && array[n].aS != ''){
		$.championship[type+n+'a_focus'].visible = true;
		$.championship[type+n+'a_focus'].alpha = 1;
	}
	
	if(array[n].hS == array[n].aS && array[n].hPS != '' && array[n].aPS != ''){
		$.championship[type+n+'h_penalty'].visible = true;
		$.championship[type+n+'a_penalty'].visible = true;
		$.championship[type+n+'h_PenaltyTxt'].text = array[n].hPS;
		$.championship[type+n+'a_PenaltyTxt'].text = array[n].aPS;

		if(array[n].hPS > array[n].aPS && array[n].hPS != ''){
			$.championship[type+n+'h_focus'].visible = true;
			$.championship[type+n+'h_focus'].alpha = 1;
		}else if(array[n].hPS < array[n].aPS && array[n].aPS != ''){
			$.championship[type+n+'a_focus'].visible = true;
			$.championship[type+n+'a_focus'].alpha = 1;
		}
	}
	
	if(type == 'finals' && championshipData.score.round >= 15){
		var winID;
		var lossID;
		if(array[n].hS > array[n].aS){
			winID = array[n].hID;
			lossID = array[n].aID;
		}else if(array[n].hS < array[n].aS){
			winID = array[n].aID;
			lossID = array[n].hID;
		}else{
			if(array[n].hPS > array[n].aPS){
				winID = array[n].hID;
				lossID = array[n].aID;
			}else if(array[n].hPS < array[n].aPS){
				winID = array[n].aID;
				lossID = array[n].hID;
			}	
		}
		
		if(n == 0 && championshipData.score.round >= 15){
			if(winID == array[n].hID){
				$.championship[type+n+'h_position'].text = championshipPlace[2];
			}else{
				$.championship[type+n+'a_position'].text = championshipPlace[2];
			}
		}else if(n == 1 && championshipData.score.round == 16){
			if(winID == array[n].hID){
				$.championship[type+n+'h_position'].text = championshipPlace[0];
				$.championship[type+n+'a_position'].text = championshipPlace[1];
			}else{
				$.championship[type+n+'h_position'].text = championshipPlace[1];
				$.championship[type+n+'a_position'].text = championshipPlace[0];
			}
		}
	}
}

/*!
 * 
 * SIMULATE GAME - This is the function that runs to simulate next game
 * 
 */
function startChamGame(){
	saveChampionshipata();
	fillChampionshipDetails();
	checkCurrentRound('gameplay');
}

function simulateNextGame(){
	var score = getRandomScore();
	var penalty = {h:'', a:''};
	
	if(score.h == score.a){
		penalty = getRandomPenaltyScore();	
	}
	
	checkCurrentRound('simulate', score, penalty);
	saveChampionshipata();
	fillChampionshipDetails();
	checkCurrentRound('gameplay');
}

function saveChampPlay(){
	checkCurrentRound('save');
	
	saveChampionshipata();
	fillChampionshipDetails();
	checkCurrentRound('gameplay');	
}

/*!
 * 
 * ADDITIONAL FUNC - This is the function that runs to for additional func
 * 
 */
function checkCurrentRound(type, score, penalty){
	var isUser = false;
	var curRound = championshipData.score.round;
	var curRoundCheck = curRound;
	var targetArray = 0;
	var targetRound = 0;
	var targetType = '';
	
	if(curRound <= 7){
		for(var n=0; n<championshipData.score.roundof16.length;n++){
			if(n == curRoundCheck){
				targetType = 'roundof16';
				targetRound = n;
				targetArray = championshipData.score.roundof16;
			}
		}
	}else if(curRound <= 11){
		curRoundCheck = curRound - 8;
		for(var n=0; n<championshipData.score.quaterfinals.length;n++){
			if(n == curRoundCheck){
				targetType = 'quaterfinals';
				targetRound = n;
				targetArray = championshipData.score.quaterfinals;
			}
		}
	}else if(curRound <= 13){
		curRoundCheck = curRound - 12;
		for(var n=0; n<championshipData.score.semifinals.length;n++){
			if(n == curRoundCheck){
				targetType = 'semifinals';
				targetRound = n;
				targetArray = championshipData.score.semifinals;
			}
		}
	}else if(curRound <= 15){
		curRoundCheck = curRound - 14;
		for(var n=0; n<championshipData.score.finals.length;n++){
			if(n == curRoundCheck){
				targetType = 'finals';
				targetRound = n;
				targetArray = championshipData.score.finals;
			}
		}
	}
	
	buttonChamReady.visible = false;
	itemChamDesc.visible = false;
	if(championshipData.score.round >= 16){
		buttonChamRestart.x = canvasW/2;
		buttonChamSimulate.visible = buttonChamPlay.visible = false;
	}
	
	if(type == 'prepare'){
		buttonChamRestart.visible = false;
		buttonChamSimulate.visible = false;
		buttonChamPlay.visible = false;
		buttonChamReady.visible = true;
		itemChamDesc.visible = true;
	}else if(type == 'gameplay' && targetType!= ''){
		if(championshipData.score.userID == targetArray[targetRound].hID || championshipData.score.userID == targetArray[targetRound].aID){
			isUser = true;
			gameData.teamHomeID = targetArray[targetRound].hID;
			gameData.teamAwayID = targetArray[targetRound].aID;
			
			if(championshipData.score.userID == targetArray[targetRound].hID){
				gameData.side = 'home';
			}else{
				gameData.side = 'away';
			}
		}
		
		buttonChamPlay.visible = false;
		buttonChamSimulate.visible = false;
		buttonChamRestart.visible = true;
		if(isUser){
			buttonChamPlay.visible = true;
		}else{
			buttonChamSimulate.visible = true;	
		}	
	}else if(type == 'simulate'){
		
		targetArray[targetRound].hS = score.h;
		targetArray[targetRound].aS = score.a;
		targetArray[targetRound].hPS = penalty.h;
		targetArray[targetRound].aPS = penalty.a;
		
		fillNextRound(targetArray, targetRound, targetType, targetRound);
		championshipData.score.round++;	
		
		var goalNum = randomIntFromInterval(1,2);
		playSound('soundGoal'+goalNum);
		
	}else if(type == 'save'){
		
		targetArray[targetRound].hS = statisticData.home.score;
		targetArray[targetRound].aS = statisticData.away.score;
		if(statisticData.home.score == statisticData.away.score){
			targetArray[targetRound].hPS = statisticData.home.penalty;
			targetArray[targetRound].aPS = statisticData.away.penalty;
		}
		
		fillNextRound(targetArray, targetRound, targetType, targetRound);
		championshipData.score.round++;
			
	}
	
	if(type != 'prepare' && targetType != '' && championshipData.score.round <= 15){
		TweenMax.to(championshipTeamContainer, 1, {overwrite:true, onComplete:function(){
			$.championship[targetType+targetRound+'h_focus'].visible = true;
			$.championship[targetType+targetRound+'a_focus'].visible = true;
			animateHighlight($.championship[targetType+targetRound+'h_focus']);
			animateHighlight($.championship[targetType+targetRound+'a_focus']);
		}});
	}
}

/*!
 * 
 * FILL NEXT ROUND - This is the function that runs to fill next round bracket
 * 
 */
function fillNextRound(targetArray, targetRound, type, n){
	if(type == 'finals'){
		return;	
	}
	
	var nextRound = qualifyData[type][n].array;
	var nextRoundIndex = qualifyData[type][n].index;
	var nextRoundSide = qualifyData[type][n].side;
	var nextRoundIndex2 = qualifyData[type][n].index2;
	var nextRoundSide2 = qualifyData[type][n].side2;
	
	var winID;
	var lossID;
	var winTeamX = 0;
	var winTeamY = 0;
	var lossTeamX = 0;
	var lossTeamY = 0;
	
	if(targetArray[targetRound].hS > targetArray[targetRound].aS){
		winID = targetArray[targetRound].hID;
		lossID = targetArray[targetRound].aID;
		
		winTeamX = $.championship[type+n+'h'].teamX;
		winTeamY = $.championship[type+n+'h'].teamY;
		lossTeamX = $.championship[type+n+'a'].teamX;
		lossTeamY = $.championship[type+n+'a'].teamY;
	}else if(targetArray[targetRound].hS < targetArray[targetRound].aS){
		winID = targetArray[targetRound].aID;
		lossID = targetArray[targetRound].hID;
		
		winTeamX = $.championship[type+n+'a'].teamX;
		winTeamY = $.championship[type+n+'a'].teamY;
		lossTeamX = $.championship[type+n+'h'].teamX;
		lossTeamY = $.championship[type+n+'h'].teamY;
	}else{
		if(targetArray[targetRound].hPS > targetArray[targetRound].aPS){
			winID = targetArray[targetRound].hID;
			lossID = targetArray[targetRound].aID;
			
			winTeamX = $.championship[type+n+'h'].teamX;
			winTeamY = $.championship[type+n+'h'].teamY;
			lossTeamX = $.championship[type+n+'a'].teamX;
			lossTeamY = $.championship[type+n+'a'].teamY;
		}else if(targetArray[targetRound].hPS < targetArray[targetRound].aPS){
			winID = targetArray[targetRound].aID;
			lossID = targetArray[targetRound].hID;
			
			winTeamX = $.championship[type+n+'a'].teamX;
			winTeamY = $.championship[type+n+'a'].teamY;
			lossTeamX = $.championship[type+n+'h'].teamX;
			lossTeamY = $.championship[type+n+'h'].teamY;
		}	
	}
	
	if(nextRoundSide == 'home'){
		championshipData.score[nextRound][nextRoundIndex].hID = winID;
		$.championship[nextRound+nextRoundIndex+'h'].animate = true;
		$.championship[nextRound+nextRoundIndex+'h'].animateX = winTeamX;
		$.championship[nextRound+nextRoundIndex+'h'].animateY = winTeamY;
	}else{
		championshipData.score[nextRound][nextRoundIndex].aID = winID;
		$.championship[nextRound+nextRoundIndex+'a'].animate = true;
		$.championship[nextRound+nextRoundIndex+'a'].animateX = winTeamX;
		$.championship[nextRound+nextRoundIndex+'a'].animateY = winTeamY;
	}
	
	if(nextRound == 'finals'){
		if(nextRoundSide2 == 'home'){
			championshipData.score[nextRound][nextRoundIndex2].hID = lossID;
			$.championship[nextRound+nextRoundIndex2+'h'].animate = true;
			$.championship[nextRound+nextRoundIndex2+'h'].animateX = lossTeamX;
			$.championship[nextRound+nextRoundIndex2+'h'].animateY = lossTeamY;
		}else{
			championshipData.score[nextRound][nextRoundIndex2].aID = lossID;
			$.championship[nextRound+nextRoundIndex2+'a'].animate = true;
			$.championship[nextRound+nextRoundIndex2+'a'].animateX = lossTeamX;
			$.championship[nextRound+nextRoundIndex2+'a'].animateY = lossTeamY;
		}
	}
}

/*!
 * 
 * DATA UPDATE - This is the function that runs to update data
 * 
 */
function retrieveChampionshipData(){
	var championshipScoreRetrieve = Cookies.get(cookieName);
	if(championshipScoreRetrieve != undefined){
		championshipData = jQuery.parseJSON(championshipScoreRetrieve);

		var chamType = championshipData.score.round == 0 ? 'prepare' : 'gameplay';
		gameData.champType = chamType;
		if(gameData.champType == 'prepare'){
			championshipData.score.round = -1;
		}
	}
}

function saveChampionshipata(){
	Cookies.set(cookieName, championshipData, {expires:360});
}


/*!
 * 
 * ADDITIONAL FUNC - This is the function that runs to for additional func
 * 
 */

function getRandomScore(){
	var homeScore = randomIntFromInterval(0,5);
	var awayScore = randomIntFromInterval(0,5);
	return {h:homeScore, a:awayScore};
}

function getRandomPenaltyScore(){
	var homePenaltyScore = 0;
	var awayPenaltyScore = 0;

	for(var p=0; p<5; p++){
		if(randomBoolean()){
			homePenaltyScore++;
		}
		if(randomBoolean()){
			awayPenaltyScore++;
		}
		
		var distancePenalty = Math.abs(homePenaltyScore - awayPenaltyScore);
		if(p == 2 && distancePenalty >= 3){
			p = 5;
		}else if(p == 4 && distancePenalty >= 2){
			p = 5;
		}
	}
	
	//sudden death
	if(homePenaltyScore == awayPenaltyScore){
		for(var p=0; p<5; p++){
			if(randomBoolean()){
				homePenaltyScore++;
			}
			if(randomBoolean()){
				awayPenaltyScore++;
			}
			
			var distancePenalty = Math.abs(homePenaltyScore - awayPenaltyScore);
			if(!isEven(p) && distancePenalty > 0){
				p = 5;
			}
		}
	}
	
	//final death
	if(homePenaltyScore == awayPenaltyScore){
		if(randomBoolean()){
			homePenaltyScore++;
		}else{
			awayPenaltyScore++;	
		}
	}
	
	return {h:homePenaltyScore, a:awayPenaltyScore};
}

function animateHighlight(obj){
	TweenMax.to(obj, .3, {alpha:.2, overwrite:true, onComplete:function(){
		TweenMax.to(obj, .3, {alpha:1, overwrite:true, onComplete:animateHighlight, onCompleteParams:[obj]});
	}});
}