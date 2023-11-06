////////////////////////////////////////////////////////////
// GAME v2.5
////////////////////////////////////////////////////////////

/*!
 * 
 * GAME SETTING CUSTOMIZATION START
 * 
 */
 
var soccerGameTime = 180000; //game total time
var gameStartSide = 'home'; //game start side (home / away)

var playerSpeed = {user:2.6, //user speed
					playerTeam:{player:2.5, goalkeeper:2.5}, //user player team speed
					oppositeTeam:{player:2.55, goalkeeper:2.6}, //opposite player team speed
					tackle:5}; //tackle speed
					
var computerMode = false; //enable for computer vs mode

//control settings
var controlSettings = {
	screenControl:false, // true to use screen control for desktop, false for using mouse to move
	screenMobileControl:true, // true to use screen control for mobile, false for using touch to move
	screenControlSide:true, //true for right, false for left
	screenControlAlpha:.6
};

//result title
var resultWinText = 'CONGRATULATION!\nYOU WON THE MATCH!';
var resultDrawText = 'YOU HAVE DRAW\nTHE MATCH!';
var resultLossText = 'BETTER LUCK\nNEXT TIME!';

//Social share, [SCORE] will replace with game score
var shareEnable = true; //toggle share
var shareText = 'SHARE THIS GAME'; //social share message
var shareTitle = 'My final score on New Soccer Game is Blu [HOMESCORE] VS [AWAYSCORE] Red.';//social share score title
var shareMessage = 'Blu [HOMESCORE] VS [AWAYSCORE] Red is mine new score on New Soccer Game! Try it now!'; //social share score message
				
/*!
 *
 * GAME SETTING CUSTOMIZATION END
 *
 */

var gameData = {paused:true, type:'', side:'home', chooseSide:true, teamHomeID:0, teamAwayID:1, teamFlip:false, move:{x:0, y:0}};


/*!
 * 
 * GAME BUTTONS - This is the function that runs to setup button event
 * 
 */
function buildGameButton(){
	$(window).focus(function() {
		if(!buttonSoundOn.visible){
			toggleSoundInMute(false);
		}

		if (typeof buttonMusicOn != "undefined") {
			if(!buttonMusicOn.visible){
				toggleMusicInMute(false);
			}
		}
	});
	
	$(window).blur(function() {
		if(!buttonSoundOn.visible){
			toggleSoundInMute(true);
		}

		if (typeof buttonMusicOn != "undefined") {
			if(!buttonMusicOn.visible){
				toggleMusicInMute(true);
			}
		}
	});

	itemInstructionDesktop.visible = itemInstructionMobile.visible = false
	if($.browser.mobile || isTablet){
		itemInstructionMobile.visible = true
	}else{
		itemInstructionDesktop.visible = true
	}
	
	buttonStart.cursor = "pointer";
	buttonStart.addEventListener("click", function(evt) {
		playSound('soundClick');
		goPage('gameplay');
	});
	
	
	buttonQuickMatch.cursor = "pointer";
	buttonQuickMatch.addEventListener("click", function(evt) {
		playSound('soundClick');
		gameData.type = 'quickmatch';
		gameData.chooseSide = true;
		goPage('select');
	});
	
	buttonChampionship.cursor = "pointer";
	buttonChampionship.addEventListener("click", function(evt) {
		playSound('soundClick');
		gameData.type = 'championship';
		gameData.chooseSide = false;

		if(gameData.champType == "prepare"){
			goPage('select');
		}else{
			goPage('championship');	
		}
	});
	
	buttonPenaltykick.cursor = "pointer";
	buttonPenaltykick.addEventListener("click", function(evt) {
		playSound('soundClick');
		gameData.type = 'penaltykick';
		gameData.chooseSide = true;
		goPage('select');
	});
	
	buttonInstructions.cursor = "pointer";
	buttonInstructions.addEventListener("click", function(evt) {
		playSound('soundClick');
		goPage('instruction');
	});
	
	buttonOk.cursor = "pointer";
	buttonOk.addEventListener("click", function(evt) {
		playSound('soundClick');
		goPage('gameplay');
	});
	
	buttonTeamContinue.cursor = "pointer";
	buttonTeamContinue.addEventListener("click", function(evt) {
		if(gameData.teamHomeID != -1){
			playSound('soundClick');
			if(gameData.type == 'championship'){
				goPage('championship');
			}else{
				goPage('game');
			}
		}
	});
	
	buttonChamReady.cursor = "pointer";
	buttonChamReady.addEventListener("click", function(evt) {
		playSound('soundClick');
		startChamGame();
	});
	
	buttonChamSimulate.cursor = "pointer";
	buttonChamSimulate.addEventListener("click", function(evt) {
		playSound('soundClick');
		simulateNextGame();
	});
	
	buttonChamPlay.cursor = "pointer";
	buttonChamPlay.addEventListener("click", function(evt) {
		playSound('soundClick');
		goPage('game');
	});
	
	buttonChamRestart.cursor = "pointer";
	buttonChamRestart.addEventListener("click", function(evt) {
		playSound('soundClick');
		
		resetSelectTeam()
		championshipData.score.round = -1;
		gameData.chooseSide = false;
		goPage('select');
	});
	
	buttonContinue.cursor = "pointer";
	buttonContinue.addEventListener("click", function(evt) {
		playSound('soundClick');
		
		if(gameData.type == 'championship'){
			goPage('championship');
		}else{
			goPage('main');	
		}
	});
	
	buttonFacebook.cursor = "pointer";
	buttonFacebook.addEventListener("click", function(evt) {
		share('facebook');
	});
	buttonTwitter.cursor = "pointer";
	buttonTwitter.addEventListener("click", function(evt) {
		share('twitter');
	});
	buttonWhatsapp.cursor = "pointer";
	buttonWhatsapp.addEventListener("click", function(evt) {
		share('whatsapp');
	});
	
	buttonSoundOff.cursor = "pointer";
	buttonSoundOff.addEventListener("click", function(evt) {
		toggleSoundMute(true);
	});
	
	buttonSoundOn.cursor = "pointer";
	buttonSoundOn.addEventListener("click", function(evt) {
		toggleSoundMute(false);
	});

	if (typeof buttonMusicOff != "undefined") {
		buttonMusicOff.cursor = "pointer";
		buttonMusicOff.addEventListener("click", function(evt) {
			toggleMusicMute(true);
		});
	}
	
	if (typeof buttonMusicOn != "undefined") {
		buttonMusicOn.cursor = "pointer";
		buttonMusicOn.addEventListener("click", function(evt) {
			toggleMusicMute(false);
		});
	}
	
	buttonFullscreen.cursor = "pointer";
	buttonFullscreen.addEventListener("click", function(evt) {
		toggleFullScreen();
		toggleOption();
	});
	
	buttonExit.cursor = "pointer";
	buttonExit.addEventListener("click", function(evt) {
		toggleConfirm(true);
		toggleOption();
	});
	
	buttonSettings.cursor = "pointer";
	buttonSettings.addEventListener("click", function(evt) {
		toggleOption();
	});
	
	buttonConfirm.cursor = "pointer";
	buttonConfirm.addEventListener("click", function(evt) {
		toggleConfirm(false);
		stopGame();
		goPage('main');
	});
	
	buttonCancel.cursor = "pointer";
	buttonCancel.addEventListener("click", function(evt) {
		toggleConfirm(false);
	});
	
	buttonNext.cursor = "pointer";
	buttonNext.addEventListener("click", function(evt) {
		toggleResult('share');
	});
	
	buttonStatistic.cursor = "pointer";
	buttonStatistic.addEventListener("click", function(evt) {
		toggleResult('stat');
	});
	
	buttonPenalty.cursor = "pointer";
	buttonPenalty.addEventListener("click", function(evt) {
		playSound('soundClick');
		soccerFieldData.continuePenalty = true;
		goPage('game');
	});
	
	for(var n=0; n<team_arr.length; n++){
		$.team[n].cursor = "pointer";
		$.team[n].addEventListener("click", function(evt) {
			selectTeam(evt.target.clickNum);
		});

		$.team["cham"+n].cursor = "pointer";
		$.team["cham"+n].addEventListener("click", function(evt) {
			if(evt.target.alpha == 1)
				replaceChamTeam(evt.target.clickNum);
		});
	}
	
	buttonSideHome.cursor = "pointer";
	buttonSideHome.addEventListener("click", function(evt) {
		playSound('soundClick');
		toggleSide('away');
	});
	
	buttonSideAway.cursor = "pointer";
	buttonSideAway.addEventListener("click", function(evt) {
		playSound('soundClick');
		toggleSide('home');
	});

	buttonKick.cursor = "pointer";
	buttonKick.addEventListener("mousedown", function(evt) {
		if(!computerMode){
			gameData.moveControl.kick = true;
			playerAction();
			toggleTouchAlpha(buttonKick, gameData.moveControl.kick);
		}
	});
	
	buttonKick.addEventListener("pressup", function(evt) {
		if(!computerMode){
			gameData.moveControl.kick = false;
			toggleTouchAlpha(buttonKick, gameData.moveControl.kick);
		}
	});

	buttonTeamLeft.cursor = "pointer";
	buttonTeamLeft.addEventListener("click", function(evt) {
		playSound('soundClick');
		toggleSelect(false);
	});

	buttonTeamRight.cursor = "pointer";
	buttonTeamRight.addEventListener("click", function(evt) {
		playSound('soundClick');
		toggleSelect(true);
	});

	buttonChamTeamLeft.cursor = "pointer";
	buttonChamTeamLeft.addEventListener("click", function(evt) {
		playSound('soundClick');
		toggleSelect(false);
	});

	buttonChamTeamRight.cursor = "pointer";
	buttonChamTeamRight.addEventListener("click", function(evt) {
		playSound('soundClick');
		toggleSelect(true);
	});

	itemDim.addEventListener("click", function(evt) {
	});

	setupTouchControl();
	buildSelectPagination();
}

/*!
 * 
 * SELECT PAGE TEAMS - This is the function that runs to display teams page
 * 
 */
var teamPageData = {page:1, total:1, max:18};
function buildSelectPagination(){
	teamPageData.total=team_arr.length/teamPageData.max;
	if (String(teamPageData.total).indexOf('.') > -1){
		teamPageData.total=Math.floor(teamPageData.total)+1;
	}
	toggleSelect(false);
}

function toggleSelect(con){
	if(con){
		teamPageData.page++;
		teamPageData.page = teamPageData.page > teamPageData.total ? teamPageData.total : teamPageData.page;
	}else{
		teamPageData.page--;
		teamPageData.page = teamPageData.page < 1 ? 1 : teamPageData.page;
	}
	selectTeamPage(teamPageData.page);
}

function selectTeamPage(num){
	teamPageData.page = num;
	itemTeamSelect.visible = false;
	itemChamTeamSelect.visible = false;
	TweenMax.killAll();
	
	var startNum = (teamPageData.page-1) * teamPageData.max;
	var endNum = startNum + (teamPageData.max-1);
	
	for(var n=0;n<team_arr.length;n++){
		if(curPage == "select"){
			$.team[n].labelBg.visible = $.team[n].labelTxt.visible = false;
			$.player[n].visible = false;

			if(n >= startNum && n <= endNum){
				$.team[n].visible = true;
				if($.team[n].clickNum == gameData.teamHomeID){
					selectTeam($.team[n].clickNum);
				}
			}else{
				$.team[n].visible = false;
			}
		}else{
			$.team["cham"+n].labelBg.visible = $.team["cham"+n].labelTxt.visible = false;
			$.player["cham"+n].visible = false;

			if(n >= startNum && n <= endNum){
				$.team["cham"+n].visible = true;
				if($.team["cham"+n].clickNum == gameData.chamSelectID){
					selectChamTeam($.team[n].clickNum);
				}else{
					$.team["cham"+n].alpha = checkChamExistTeam(n);
				}
			}else{
				$.team["cham"+n].visible = false;
			}
		}
	}
	
	if(teamPageData.page == 1){
		buttonTeamLeft.visible = false;	
		buttonChamTeamLeft.visible = false;	
	}else{
		buttonTeamLeft.visible = true;	
		buttonChamTeamLeft.visible = true;	
	}
	
	if(teamPageData.page == teamPageData.total || teamPageData.total == 1){
		buttonTeamRight.visible = false;	
		buttonChamTeamRight.visible = false;	
	}else{
		buttonTeamRight.visible = true;	
		buttonChamTeamRight.visible = true;	
	}
}

function findChamSelectTeamPage(){
	for(var f=1; f<=teamPageData.total; f++){
		var currentPage = f;
		var startNum = (currentPage-1) * teamPageData.max;
		var endNum = startNum + (teamPageData.max-1);
		
		for(var n=0;n<team_arr.length;n++){
			$.team["cham"+n].labelBg.visible = $.team["cham"+n].labelTxt.visible = false;
			$.player["cham"+n].visible = false;

			if(n >= startNum && n <= endNum){
				if($.team["cham"+n].clickNum == gameData.chamSelectID){
					teamPageData.page = f;
					selectTeamPage(teamPageData.page);
					f = teamPageData.total;
				}
			}
		}
	}
}

function selectTeam(id){
	gameData.teamFlip = false;
	gameData.teamHomeID = id;
	TweenLite.killTweensOf(itemTeamSelect);
	
	var startNum = (teamPageData.page-1) * teamPageData.max;
	var endNum = startNum + (teamPageData.max-1);

	for(var n=0; n<team_arr.length; n++){
		if(n >= startNum && n <= endNum){
			$.team[n].visible = true;
		}else{
			$.team[n].visible = false;
		}
		$.player[n].visible = false;
		$.team[n].labelBg.visible = $.team[n].labelTxt.visible = false;

		if(id == n){
			$.team[n].labelBg.visible = $.team[n].labelTxt.visible = true;	
			itemTeamSelect.visible = true;
			itemTeamSelect.x = $.team[n].x;
			itemTeamSelect.y = $.team[n].y;
			animateTeam(id);
		}
	}	
}

function selectChamTeam(id){
	gameData.teamFlip = false;
	TweenLite.killTweensOf(itemChamTeamSelect);
	
	var startNum = (teamPageData.page-1) * teamPageData.max;
	var endNum = startNum + (teamPageData.max-1);

	for(var n=0; n<team_arr.length; n++){
		if(n >= startNum && n <= endNum){
			$.team["cham"+n].visible = true;
		}else{
			$.team["cham"+n].visible = false;
		}
		$.player["cham"+n].visible = false;
		$.team["cham"+n].labelBg.visible = $.team["cham"+n].labelTxt.visible = false;

		if(id == n){
			$.team["cham"+n].labelBg.visible = $.team["cham"+n].labelTxt.visible = true;	
			itemChamTeamSelect.visible = true;
			itemChamTeamSelect.x = $.team[n].x;
			itemChamTeamSelect.y = $.team[n].y;
			animateChamTeam(id);
		}
	}
}

function animateTeam(id){
	TweenMax.to(itemTeamSelect, 1, {overwrite:true, onComplete:function(){
		if(!gameData.teamFlip){
			gameData.teamFlip = true;
			$.team[id].visible = false;	
			$.player[id].visible = true;
		}else{
			gameData.teamFlip = false;	
			$.team[id].visible = true;	
			$.player[id].visible = false;
		}
		animateTeam(id);
	}});	
}

function animateChamTeam(id){
	TweenMax.to(itemChamTeamSelect, 1, {overwrite:true, onComplete:function(){
		if(!gameData.teamFlip){
			gameData.teamFlip = true;
			$.team["cham"+id].visible = false;	
			$.player["cham"+id].visible = true;
		}else{
			gameData.teamFlip = false;	
			$.team["cham"+id].visible = true;	
			$.player["cham"+id].visible = false;
		}
		animateChamTeam(id);
	}});	
}

function appendFocusFrame(){
	$('#mainHolder').prepend('<div id="focus" style="position:absolute; width:100%; height:100%; z-index:1000;"></div');
	$('#focus').click(function(){
		$('#focus').remove();
	});	
}

/*!
 * 
 * DISPLAY PAGES - This is the function that runs to display pages
 * 
 */
var curPage=''
function goPage(page){
	curPage=page;
	
	mainContainer.visible = false;
	gamePlayContainer.visible = false;
	selectContainer.visible = false;
	instructionContainer.visible = false;
	championshipContainer.visible = false;
	gameContainer.visible = false;
	resultContainer.visible = false;

	toggleTouchCon(false);
	
	var targetContainer = null;
	switch(page){
		case 'main':
			stopMusicLoop('musicGameEnd');
			playMusicLoop('musicGame');
			targetContainer = mainContainer;
			setMainCamera();
		break;
		
		case 'gameplay':
			targetContainer = gamePlayContainer;
			soccerFieldData.continuePenalty = false;
			soccerFieldData.penalty = false;
		break;
		
		case 'select':
			targetContainer = selectContainer;
			if(gameData.type != 'championship'){
				stopMusicLoop('musicGame');		
			}
			
			resetSelectTeam();
			
			buttonTeamContinue.x = canvasW/2;
			if(gameData.chooseSide){
				buttonSideHome.visible = buttonSideAway.visible = true;
				buttonSideHome.x = canvasW/100 * 42;
				buttonSideHome.y = buttonTeamContinue.y;
				buttonSideAway.x = canvasW/100 * 42;
				buttonSideAway.y = buttonTeamContinue.y;
				buttonTeamContinue.x = canvasW/100 * 58;
				
				toggleSide('home');
			}
		break;
		
		case 'championship':
			stopMusicLoop('musicGameEnd');
			playMusicLoop('musicGame');
			targetContainer = championshipContainer;
			prepareChampionship();
		break;
		
		case 'instruction':
			targetContainer = instructionContainer;
		break;
		
		case 'game':
			stopMusicLoop('musicGameEnd');
			stopMusicLoop('musicGame');
			targetContainer = gameContainer;
			startGame();
		break;
		
		case 'result':
			playMusicLoop('musicGameEnd');
			targetContainer = resultContainer;
			playSound('soundComplete');
			stopGame();
			
			itemResultTitleGame.visible = false;
			itemResultTitlePenalty.visible = false;
			
			if(gameData.type == 'penaltykick'){
				itemResultTitlePenalty.visible = true;
				toggleResult('result');
				
				if(statisticData.home.penalty > statisticData.away.penalty){
					resultTitleTxt.text = resultWinText;
				}else if(statisticData.home.penalty == statisticData.away.penalty){
					resultTitleTxt.text = resultDrawText;
				}else{
					resultTitleTxt.text = resultLossText;
				}	
			}else{
				itemResultTitleGame.visible = true;
				toggleResult('stat');
				
				if(gameData.side == 'away'){
					saveGame(statisticData.away.score);
				}else{
					saveGame(statisticData.home.score);	
				}
				
				var saveChampionship = false;
				if(!soccerFieldData.continuePenalty){
					var totalPossesion = statisticData.home.pos+statisticData.away.pos;
					var homePossesion = Math.floor(statisticData.home.pos/totalPossesion * 100)+' %';
					var awayPossesion = Math.floor(statisticData.away.pos/totalPossesion * 100)+' %';
					
					$.stats[0+'Left'].text = statisticData.home.goal;
					$.stats[1+'Left'].text = statisticData.home.shots;
					$.stats[2+'Left'].text = statisticData.home.shotsTarget;
					$.stats[3+'Left'].text = statisticData.home.passes;
					$.stats[4+'Left'].text = statisticData.home.tackles;
					$.stats[5+'Left'].text = homePossesion;
					
					$.stats[0+'Right'].text = statisticData.away.goal;
					$.stats[1+'Right'].text = statisticData.away.shots;
					$.stats[2+'Right'].text = statisticData.away.shotsTarget;
					$.stats[3+'Right'].text = statisticData.away.passes;
					$.stats[4+'Right'].text = statisticData.away.tackles;
					$.stats[5+'Right'].text = awayPossesion;
					
					$.stats[6+'Left'].text = $.stats[6+'Right'].text = '-';
					
					var homeScore = statisticData.home.score;
					var awayScore = statisticData.away.score;
					if(gameData.side == 'away'){
						homeScore = statisticData.away.score;
						awayScore = statisticData.home.score;
					}
					
					if(homeScore > awayScore){
						resultTitleTxt.text = resultWinText;
						saveChampionship = true;
					}else if(homeScore == awayScore){
						resultTitleTxt.text = resultDrawText;
					}else{
						resultTitleTxt.text = resultLossText;
						saveChampionship = true;
					}
					
					saveGame(statisticData.home.score);
				}else{
					$.stats[6+'Left'].text = statisticData.home.penalty;
					$.stats[6+'Right'].text = statisticData.away.penalty;
					
					var homeScore = statisticData.home.penalty;
					var awayScore = statisticData.away.penalty;
					if(gameData.side == 'away'){
						homeScore = statisticData.away.penalty;
						awayScore = statisticData.home.penalty;
					}
					
					if(homeScore > awayScore){
						resultTitleTxt.text = resultWinText;
					}else if(homeScore == awayScore){
						resultTitleTxt.text = resultDrawText;
					}else{
						resultTitleTxt.text = resultLossText;
					}
					
					saveChampionship = true;
				}
				
				if(saveChampionship && gameData.type == 'championship'){
					saveChampPlay();	
				}
			}
		break;
	}
	
	if(targetContainer != null){
		targetContainer.visible = true;
		targetContainer.alpha = 0;
		TweenMax.to(targetContainer, .5, {alpha:1, overwrite:true});
	}
	
	resizeCanvas();
}

function resetSelectTeam(){
	TweenMax.killAll();
	
	for(var n=0; n<team_arr.length; n++){
		$.player[n].visible = false;
		$.team[n].labelBg.visible = $.team[n].labelTxt.visible = false;
	}
	gameData.teamHomeID = -1;
	teamPageData.page = 1;

	itemTeamSelect.visible = false;
	buttonSideHome.visible = false;
	buttonSideAway.visible = false;
	selectTeamPage(teamPageData.page);
}

function toggleSide(con){
	buttonSideHome.visible = false;	
	buttonSideAway.visible = false;	
	
	if(con == 'home'){
		buttonSideHome.visible = true;	
		gameData.side = 'home';
	}else{
		buttonSideAway.visible = true;	
		gameData.side = 'away';	
	}
}

function toggleResult(con){
	resultShareTxt.visible = buttonFacebook.visible = buttonTwitter.visible = buttonWhatsapp.visible = false;
	resultTitleTxt.visible = false;
	statsContainer.visible = false;
	buttonStatistic.visible = buttonNext.visible = buttonContinue.visible = buttonPenalty.visible = false;
	
	if(con == 'stat'){
		statsContainer.visible = true;
		buttonNext.visible = true;
	}else{
		buttonContinue.visible = true;
		
		resultTitleTxt.visible = true;
		resultShareTxt.visible = buttonFacebook.visible = buttonTwitter.visible = buttonWhatsapp.visible = true;	
		
		if(gameData.type == 'penaltykick'){
			buttonContinue.x = canvasW/2;
		}else if(gameData.type == 'penaltykick'){
			buttonStatistic.visible = true;
			
			if(statisticData.home.score == statisticData.away.score && !soccerFieldData.continuePenalty){
				buttonContinue.visible = false;
				buttonPenalty.visible = true;
				
				buttonStatistic.x = canvasW/100 * 42;
				buttonPenalty.x = canvasW/100 * 58;
			}else{
				buttonStatistic.x = canvasW/100 * 42;
				buttonContinue.x = canvasW/100 * 58;
			}
		}else{
			buttonStatistic.visible = true;
			
			if(statisticData.home.score == statisticData.away.score && !soccerFieldData.continuePenalty){
				buttonPenalty.visible = true;
				buttonContinue.visible = false;
				
				if(gameData.type == 'championship'){
					buttonStatistic.x = canvasW/100 * 42;
					buttonPenalty.x = canvasW/100 * 58;	
				}else{
					buttonContinue.visible = true;
					buttonStatistic.x = canvasW/100 * 35;
					buttonPenalty.x = canvasW/2;
					buttonContinue.x = canvasW/100 * 65;	
				}
			}else{
				buttonContinue.visible = true;
				buttonStatistic.x = canvasW/100 * 42;
				buttonContinue.x = canvasW/100 * 58;	
			}
		}
		
	}
}

function toggleConfirm(con){
	confirmContainer.visible = con;
	
	if(con){
		gameData.paused = true;
		TweenMax.pauseAll(true, true);
	}else{
		gameData.paused = false;
		TweenMax.resumeAll(true, true);
	}
}

function toggleOption(){
	if(optionsContainer.visible){
		optionsContainer.visible = false;
	}else{
		optionsContainer.visible = true;
	}
}

/*!
 * 
 * START GAME - This is the function that runs to start play game
 * 
 */

function startGame(){
	gameData.paused = false;
	resetSoccerGame();

	gameData.moveControl = {
		left:false,
		right:false,
		up:false,
		down:false,
		kick:false
	}
	toggleTouchCon(true);
}


 /*!
 * 
 * STOP GAME - This is the function that runs to stop play game
 * 
 */
function stopGame(){
	toggleGameTimer(false);
	TweenMax.killAll();
	
	iconContainer.removeAllChildren();
	TweenMax.killTweensOf(playerPenaltyData);
	soccerFieldData.matchEnd = true;
	soccerPlayerData.followMouse = false;
	itemGuideDirection.visible = false;
}

/*!
 * 
 * SAVE GAME - This is the function that runs to save game
 * 
 */
function saveGame(score){
	if ( typeof toggleScoreboardSave == 'function' ) { 
		$.scoreData.score = score;
		if(typeof type != 'undefined'){
			$.scoreData.type = type;	
		}
		toggleScoreboardSave(true);
	}

	/*$.ajax({
      type: "POST",
      url: 'saveResults.php',
      data: {score:score},
      success: function (result) {
          console.log(result);
      }
    });*/
}

function setupStageEvents(){
	stage.on("stagemousedown", stageClick);
}

function stageClick(evt) {
	if(!gameData.touchCon && !computerMode){
		playerAction();
	}
}

 /*!
 * 
 * GAME LOOP - This is the function that runs to loop game
 * 
 */
function updateGame(){
	updateSoccerField();
	updateControl();
}

/*!
 * 
 * GAME CONTROL - This is the function that runs for game control
 * 
 */
function updateControl(){
	if(gameData.touchCon){
		if(buttonTouchMove.x == 0 && buttonTouchMove.y == 0){
			
		}else{
			var radiance = 180/Math.PI;
			var movedirection = -(Math.atan2(buttonTouchMove.x-0, buttonTouchMove.y-0)) * radiance;
			movedirection += 90;

			var pt = getAnglePositionByValue(canvasW/2, canvasH/2, 1200, movedirection);
			gameData.move.x = pt.x;
			gameData.move.y = pt.y;
		}
	}else{
		gameData.move.x = stage.mouseX;
		gameData.move.y = stage.mouseY;
	}
}

function toggleTouchCon(con){
	if(con){
		if($.browser.mobile || isTablet){
			if(controlSettings.screenMobileControl && !computerMode){
				gameData.touchCon = true;
				touchContainer.visible = true;
				touchContainer.alpha = controlSettings.screenControlAlpha;
			}
		}else{
			if(controlSettings.screenControl && !computerMode){
				gameData.touchCon = true;
				touchContainer.visible = true;
				touchContainer.alpha = controlSettings.screenControlAlpha;
			}
		}
	}else{
		gameData.touchCon = false;
		touchContainer.visible = false;
	}
}

function toggleTouchAlpha(obj, con){
	if(con){
		obj.alpha = .6;
	}else{
		obj.alpha = 1;
	}
}

function setupTouchControl(){
	var buttonArr = ["Up","Right","Down","Left"];
	for(var n=0; n<buttonArr.length; n++){
		$.touch["arrow"+buttonArr[n]].id = buttonArr[n].toLowerCase();
		$.touch["arrow"+buttonArr[n]].addEventListener("mousedown", function(evt) {
			toggleTouchArrow(evt.target.id, true);
			gameData.moveControl[evt.target.id] = true;
		});
		
		$.touch["arrow"+buttonArr[n]].addEventListener("pressup", function(evt) {
			toggleTouchArrow(evt.target.id, false);
			gameData.moveControl[evt.target.id] = false;
		});
	}

	buttonTouchMove.cursor = "pointer";
	buttonTouchMove.addEventListener("mousedown", function(evt) {
		toggleMoveEvent(evt, 'drag');
	});
	buttonTouchMove.addEventListener("pressmove", function(evt) {
		toggleMoveEvent(evt, 'move')
	});
	buttonTouchMove.addEventListener("pressup", function(evt) {
		toggleMoveEvent(evt, 'drop')
	});
}

function toggleMoveEvent(obj, con){
	switch(con){
		case 'drag':
			var global = touchMoveContainer.localToGlobal(obj.currentTarget.x, obj.currentTarget.y);
			obj.currentTarget.offset = {x:global.x-(obj.stageX), y:global.y-(obj.stageY)};
		break;
		
		case 'move':
			var local = touchMoveContainer.globalToLocal(obj.stageX, obj.stageY);
			var moveX = ((local.x) + obj.currentTarget.offset.x);
			var moveY = ((local.y) + obj.currentTarget.offset.y);

			var posData = dragLimit(moveX, moveY);
			obj.currentTarget.x = posData.x;
			obj.currentTarget.y = posData.y;

			var range = 10;
			gameData.moveControl.up = false;
			gameData.moveControl.left = false;
			gameData.moveControl.right = false;
			gameData.moveControl.down = false;

			toggleTouchArrow("left", false);
			toggleTouchArrow("right", false);
			toggleTouchArrow("up", false);
			toggleTouchArrow("down", false);

			if(obj.currentTarget.x <= -range){
				gameData.moveControl.left = true;
				toggleTouchArrow("left", true);
			}

			if(obj.currentTarget.x >= range){
				gameData.moveControl.right = true;
				toggleTouchArrow("right", true);
			}

			if(obj.currentTarget.y <= -range){
				gameData.moveControl.up = true;
				toggleTouchArrow("up", true);
			}

			if(obj.currentTarget.y >= range){
				gameData.moveControl.down = true;
				toggleTouchArrow("down", true);
			}
		break;
		
		case 'drop':
			gameData.moveControl.up = false;
			gameData.moveControl.left = false;
			gameData.moveControl.right = false;
			gameData.moveControl.down = false;
			resetControlUI();
		break;
	}
}

function dragLimit(x, y) {
	var radius = 20;
    var dist = dragDistance([x, y], [0,0]);
    if (dist <= radius) {
        return {x: x, y: y};
    }else {
		x = x - 0;
		y = y - 0;
		var radians = Math.atan2(y, x)
		return {
			x: Math.cos(radians) * radius + 0,
			y: Math.sin(radians) * radius + 0
		}
	} 
}

function dragDistance(dot1, dot2) {
    var x1 = dot1[0],
        y1 = dot1[1],
        x2 = dot2[0],
        y2 = dot2[1];
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

function resetControlUI(){
	toggleTouchArrow("up", false);
	toggleTouchArrow("down", false);
	toggleTouchArrow("left", false);
	toggleTouchArrow("right", false);

	buttonTouchMove.x = buttonTouchMove.y = 0;
}

function toggleTouchArrow(dir, con){
	dir = capitalizeFirstLetter(dir);
	if(dir){
		if(!con){
			$.touch[dir].visible = false;
			$.touch["arrow"+dir].visible = true;
		}else{
			$.touch[dir].visible = true;
			$.touch["arrow"+dir].visible = false;
		}
	}
}

function capitalizeFirstLetter(string){
	return string.charAt(0).toUpperCase() + string.slice(1);
}

/*!
 * 
 * OPTIONS - This is the function that runs to mute and fullscreen
 * 
 */
function toggleSoundMute(con){
	buttonSoundOff.visible = false;
	buttonSoundOn.visible = false;
	toggleSoundInMute(con);
	if(con){
		buttonSoundOn.visible = true;
	}else{
		buttonSoundOff.visible = true;	
	}
}

function toggleMusicMute(con){
	buttonMusicOff.visible = false;
	buttonMusicOn.visible = false;
	toggleMusicInMute(con);
	if(con){
		buttonMusicOn.visible = true;
	}else{
		buttonMusicOff.visible = true;	
	}
}

function toggleFullScreen() {
  if (!document.fullscreenElement &&    // alternative standard method
      !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
}


/*!
 * 
 * SHARE - This is the function that runs to open share url
 * 
 */
function share(action){
	gtag('event','click',{'event_category':'share','event_label':action});
	
	var loc = location.href
	loc = loc.substring(0, loc.lastIndexOf("/") + 1);
	
	var title = shareTitle;
	var text = shareMessage;
	
	title = shareTitle.replace("[HOMESCORE]", statisticData.home.score);
	title = title.replace("[AWAYSCORE]", statisticData.away.score);
	
	text = shareMessage.replace("[HOMESCORE]", statisticData.home.score);
	text = text.replace("[AWAYSCORE]", statisticData.away.score);
	
	var shareurl = '';
	
	if( action == 'twitter' ) {
		shareurl = 'https://twitter.com/intent/tweet?url='+loc+'&text='+text;
	}else if( action == 'facebook' ){
		shareurl = 'https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(loc+'share.php?desc='+text+'&title='+title+'&url='+loc+'&thumb='+loc+'share.jpg&width=590&height=300');
	}else if( action == 'google' ){
		shareurl = 'https://plus.google.com/share?url='+loc;
	}else if( action == 'whatsapp' ){
		shareurl = "whatsapp://send?text=" + encodeURIComponent(text) + " - " + encodeURIComponent(loc);
	}
	
	window.open(shareurl);
}