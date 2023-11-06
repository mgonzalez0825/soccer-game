////////////////////////////////////////////////////////////
// CANVAS
////////////////////////////////////////////////////////////
var stage
var canvasW=0;
var canvasH=0;

/*!
 * 
 * START GAME CANVAS - This is the function that runs to setup game canvas
 * 
 */
function initGameCanvas(w,h){
	var gameCanvas = document.getElementById("gameCanvas");
	gameCanvas.width = w;
	gameCanvas.height = h;
	
	canvasW=w;
	canvasH=h;
	stage = new createjs.Stage("gameCanvas");
	
	createjs.Touch.enable(stage);
	stage.enableMouseOver(20);
	stage.mouseMoveOutside = true;
	
	createjs.Ticker.framerate = 60;
	createjs.Ticker.addEventListener("tick", tick);	
}

var guide = false;
var canvasContainer, mainContainer, gameContainer, confirmContainer, resultContainer, ballsContainer;
var guideline, bg, logo, buttonStart, buttonContinue, buttonFacebook, buttonTwitter, buttonWhatsapp, buttonFullscreen, buttonSoundOn, buttonSoundOff;

$.stats = {};
$.team = {};
$.player = {};
$.championship = {};
$.touch = {};

/*!
 * 
 * BUILD GAME CANVAS ASSERTS - This is the function that runs to build game canvas asserts
 * 
 */
function buildGameCanvas(){
	var _frameW = 25;
	var _frameH = 45;
	
	var _frame = {"regX": 12, "regY": 35, "height": _frameH, "count": 26, "width": _frameW};
	var _animations = {down:{frames: [0], speed:1},
					downrun:{frames: [1,2], speed:.3, next:'downrun'},
					downkick:{frames: [3], speed:.3},
					downtackle:{frames: [4], speed:.3},
					up:{frames: [5], speed:1},
					uprun:{frames: [6,7], speed:.3, next:'uprun'},
					upkick:{frames: [8], speed:.3},
					uptackle:{frames: [9], speed:.3},
					left:{frames: [10], speed:1},
					leftrun:{frames: [11,12], speed:.3, next:'leftrun'},
					leftkick:{frames: [13], speed:.3},
					lefttackle:{frames: [14], speed:.3},
					right:{frames: [15], speed:1},
					rightrun:{frames: [16,17], speed:.3, next:'rightrun'},
					rightkick:{frames: [18], speed:.3},
					righttackle:{frames: [19], speed:.3},
					homesave:{frames: [20], speed:.3},
					homesaveup:{frames: [21], speed:.3},
					homesavedown:{frames: [22], speed:.3},
					awaysave:{frames: [23], speed:.3},
					awaysaveup:{frames: [24], speed:.3},
					awaysavedown:{frames: [25], speed:.3}};
					
	canvasContainer = new createjs.Container();
	mainContainer = new createjs.Container();
	gamePlayContainer = new createjs.Container();
	selectContainer = new createjs.Container();
	championshipContainer = new createjs.Container();
	champSelectContainer = new createjs.Container();
	instructionContainer = new createjs.Container();
	gameContainer = new createjs.Container();
	
	scoreContainer = new createjs.Container();
	scorePenaltyContainer = new createjs.Container();
	ballContainer = new createjs.Container();
	fieldContainer = new createjs.Container();
	fieldGuideContainer = new createjs.Container();
	shadowContainer = new createjs.Container();
	playersContainer = new createjs.Container();
	optionsContainer = new createjs.Container();
	statusContainer = new createjs.Container();
	iconContainer = new createjs.Container();
	championshipTeamContainer = new createjs.Container();
	
	confirmContainer = new createjs.Container();
	resultContainer = new createjs.Container();
	statsContainer = new createjs.Container();

	touchContainer = new createjs.Container();
	touchMoveContainer = new createjs.Container();
	
	bg = new createjs.Bitmap(loader.getResult('background'));
	logo = new createjs.Bitmap(loader.getResult('logo'));
	
	buttonStart = new createjs.Bitmap(loader.getResult('buttonStart'));
	centerReg(buttonStart);
	buttonStart.x = canvasW/2;
	buttonStart.y = canvasH/100 * 77;
	
	buttonSideHome = new createjs.Bitmap(loader.getResult('buttonSideHome'));
	centerReg(buttonSideHome);
	buttonSideAway = new createjs.Bitmap(loader.getResult('buttonSideAway'));
	centerReg(buttonSideAway);
	
	itemGameplay = new createjs.Bitmap(loader.getResult('itemGameplay'));
	
	var spacing = 80;
	buttonQuickMatch = new createjs.Bitmap(loader.getResult('buttonQuickMatch'));
	centerReg(buttonQuickMatch);
	buttonQuickMatch.x = canvasW/2;
	buttonQuickMatch.y = canvasH/100 * 45;
	
	buttonChampionship = new createjs.Bitmap(loader.getResult('buttonChampionship'));
	centerReg(buttonChampionship);
	buttonChampionship.x = canvasW/2;
	buttonChampionship.y = buttonQuickMatch.y + spacing;
	
	buttonPenaltykick = new createjs.Bitmap(loader.getResult('buttonPenaltykick'));
	centerReg(buttonPenaltykick);
	buttonPenaltykick.x = canvasW/2;
	buttonPenaltykick.y = buttonChampionship.y + spacing;
	
	buttonInstructions = new createjs.Bitmap(loader.getResult('buttonInstructions'));
	centerReg(buttonInstructions);
	buttonInstructions.x = canvasW/2;
	buttonInstructions.y = buttonPenaltykick.y + spacing;
	
	//instruction
	itemInstruction = new createjs.Bitmap(loader.getResult('itemInstruction'));
	itemInstructionMobile = new createjs.Bitmap(loader.getResult('itemInstructionMobile'));
	itemInstructionDesktop = new createjs.Bitmap(loader.getResult('itemInstructionDesktop'));
	
	buttonOk = new createjs.Bitmap(loader.getResult('buttonOk'));
	centerReg(buttonOk);
	buttonOk.x = canvasW/2;
	buttonOk.y = canvasH/100 * 80;
	
	//select
	buttonTeamLeft = new createjs.Bitmap(loader.getResult('buttonArrow'));
	centerReg(buttonTeamLeft);
	buttonTeamRight = new createjs.Bitmap(loader.getResult('buttonArrow'));
	centerReg(buttonTeamRight);
	buttonTeamLeft.x = canvasW/2 - 380;
	buttonTeamRight.x = canvasW/2 + 380;
	buttonTeamLeft.y = buttonTeamRight.y = canvasH/100 * 52;
	buttonTeamLeft.scaleX = -1;

	buttonChamTeamLeft = new createjs.Bitmap(loader.getResult('buttonArrow'));
	centerReg(buttonChamTeamLeft);
	buttonChamTeamRight = new createjs.Bitmap(loader.getResult('buttonArrow'));
	centerReg(buttonChamTeamRight);
	buttonChamTeamLeft.x = canvasW/2 - 380;
	buttonChamTeamRight.x = canvasW/2 + 380;
	buttonChamTeamLeft.y = buttonChamTeamRight.y = canvasH/100 * 52;
	buttonChamTeamLeft.scaleX = -1;

	itemSelect = new createjs.Bitmap(loader.getResult('itemSelect'));
	itemChamSelect = new createjs.Bitmap(loader.getResult('itemSelect'));
	itemDim = new createjs.Bitmap(loader.getResult('itemDim'));

	itemTeamSelect = new createjs.Bitmap(loader.getResult('itemTeamSelect'));
	centerReg(itemTeamSelect);
	itemTeamSelect.x = -200;
	itemChamTeamSelect = new createjs.Bitmap(loader.getResult('itemTeamSelect'));
	centerReg(itemChamTeamSelect);
	itemChamTeamSelect.x = -200;
	
	buttonTeamContinue = new createjs.Bitmap(loader.getResult('buttonContinue'));
	centerReg(buttonTeamContinue);
	createHitarea(buttonTeamContinue);
	buttonTeamContinue.x = canvasW/2;
	buttonTeamContinue.y = canvasH/100 * 81;
	
	champSelectContainer.addChild(itemDim, itemChamSelect, itemChamTeamSelect, buttonChamTeamLeft, buttonChamTeamRight);
	selectContainer.addChild(itemSelect, itemTeamSelect, buttonTeamContinue, buttonSideHome, buttonSideAway, buttonTeamLeft, buttonTeamRight);
	
	var teamStartX = 370;
	var teamStartY = 290;
	var teamX = teamStartX;
	var teamY = teamStartY;
	var teamSpaceX = 110;
	var teamSpaceY = 100;
	var teamColumnCount = 0;
	var teamRowCount = 0;
	var teamCount = 0;
	
	var labelW = 120;
	var labelH = 30;
	
	for(var n=0; n<team_arr.length; n++){
		$.team[n] = new createjs.Bitmap(loader.getResult('team'+n));
		centerReg($.team[n]);
		$.team["cham" + n] = new createjs.Bitmap(loader.getResult('team'+n));
		centerReg($.team["cham" + n]);
		
		$.team[n].x = $.team["cham" + n].x = teamX;
		$.team[n].y = $.team["cham" + n].y = teamY;
		$.team[n].clickNum = $.team["cham" + n].clickNum = n;
		
		var teamLabelBg = new createjs.Shape();
		teamLabelBg.graphics.beginFill('#0f3848').drawRect(-(labelW/2), -(labelH/2), labelW, labelH);
		teamLabelBg.x = teamX;
		teamLabelBg.y = teamY+33;
		
		var teamLabelTxt = new createjs.Text();
		teamLabelTxt.font = "22px kroftsmannregular";
		teamLabelTxt.color = "#fff";
		teamLabelTxt.textAlign = "center";
		teamLabelTxt.textBaseline='alphabetic';
		teamLabelTxt.text = team_arr[n].name;
		teamLabelTxt.lineHeight = 40;
		teamLabelTxt.x = teamLabelBg.x;
		teamLabelTxt.y = teamLabelBg.y+8;
		
		$.team[n].labelBg = teamLabelBg;
		$.team[n].labelTxt = teamLabelTxt;
		$.team[n].labelBg.visible = $.team[n].labelTxt.visible = false;

		var chamTeamLabelBg = new createjs.Shape();
		chamTeamLabelBg.graphics.beginFill('#0f3848').drawRect(-(labelW/2), -(labelH/2), labelW, labelH);
		chamTeamLabelBg.x = teamX;
		chamTeamLabelBg.y = teamY+33;
		
		var chamTeamLabelTxt = new createjs.Text();
		chamTeamLabelTxt.font = "22px kroftsmannregular";
		chamTeamLabelTxt.color = "#fff";
		chamTeamLabelTxt.textAlign = "center";
		chamTeamLabelTxt.textBaseline='alphabetic';
		chamTeamLabelTxt.text = team_arr[n].name;
		chamTeamLabelTxt.lineHeight = 40;
		chamTeamLabelTxt.x = chamTeamLabelBg.x;
		chamTeamLabelTxt.y = chamTeamLabelBg.y+8;
		
		$.team["cham" + n].labelBg = chamTeamLabelBg;
		$.team["cham" + n].labelTxt = chamTeamLabelTxt;
		$.team["cham" + n].labelBg.visible = $.team["cham" + n].labelTxt.visible = false;
		
		teamX += teamSpaceX;
		teamColumnCount++;
		if(teamColumnCount > 5){
			teamColumnCount = 0;
			teamX = teamStartX;
			teamY += teamSpaceY;
			teamRowCount++;
		}

		teamCount++;
		if(teamCount > teamPageData.max-1){
			teamColumnCount = 0;
			teamCount = 0;
			teamX = teamStartX;
			teamY = teamStartY;
		}
		
		champSelectContainer.addChild($.team["cham" + n], chamTeamLabelBg, chamTeamLabelTxt);
		selectContainer.addChild($.team[n], teamLabelBg, teamLabelTxt);
		
		//				
		var playerAnimateData = new createjs.SpriteSheet({
			"images": [loader.getResult('player'+n).src],
			"frames": _frame,
			"animations": _animations
		});
		
		$.player[n] = new createjs.Sprite(playerAnimateData, "rightrun");
		$.player[n].framerate = 20;
		$.player[n].x = $.team[n].x;
		$.player[n].y = $.team[n].y+11;
		$.player[n].visible = false;

		$.player["cham"+n] = new createjs.Sprite(playerAnimateData, "rightrun");
		$.player["cham"+n].framerate = 20;
		$.player["cham"+n].x = $.team["cham"+n].x;
		$.player["cham"+n].y = $.team["cham"+n].y+11;
		$.player["cham"+n].visible = false;
		
		champSelectContainer.addChild($.player["cham"+n]);
		selectContainer.addChild($.player[n]);
	}
	
	//game
	itemBall = new createjs.Bitmap(loader.getResult('itemBall'));
	centerReg(itemBall);
	
	itemBallTo = new createjs.Bitmap(loader.getResult('itemBall'));
	centerReg(itemBallTo);
	itemBallTo.alpha = 1;
	
	itemBallShadow = new createjs.Bitmap(loader.getResult('itemBallShadow'));
	centerReg(itemBallShadow);
	
	itemBallDepth = new createjs.Bitmap(loader.getResult('itemBall'));
	centerReg(itemBallDepth);
	itemBallDepth.visible = false;
	
	itemGuideDirection = new createjs.Bitmap(loader.getResult('itemGuideDirection'));
	centerReg(itemGuideDirection);
	
	itemShot = new createjs.Bitmap(loader.getResult('itemShot'));
	
	itemField = new createjs.Bitmap(loader.getResult('itemField'));
	
	itemScoreboard = new createjs.Bitmap(loader.getResult('itemScoreboard'));
	centerReg(itemScoreboard);
	
	itemGoalpost = new createjs.Bitmap(loader.getResult('itemGoalpost'));
	
	itemStatusBar1 = new createjs.Bitmap(loader.getResult('itemStatusBar1'));
	centerReg(itemStatusBar1);
	itemStatusBar2 = new createjs.Bitmap(loader.getResult('itemStatusBar2'));
	centerReg(itemStatusBar2);
	itemStatusKickoff = new createjs.Bitmap(loader.getResult('itemStatusKickoff'));
	centerReg(itemStatusKickoff);
	itemStatusGoal = new createjs.Bitmap(loader.getResult('itemStatusGoal'));
	centerReg(itemStatusGoal);
	itemStatusFulltime = new createjs.Bitmap(loader.getResult('itemStatusFulltime'));
	centerReg(itemStatusFulltime);
	itemStatusMisses = new createjs.Bitmap(loader.getResult('itemStatusMisses'));
	centerReg(itemStatusMisses);
	itemStatusPenalty = new createjs.Bitmap(loader.getResult('itemStatusPenalty'));
	centerReg(itemStatusPenalty);
	itemStatusKickoff.visible = itemStatusGoal.visible = itemStatusFulltime.visible = itemStatusMisses.visible = itemStatusPenalty.visible = false;
	statusContainer.addChild(itemStatusBar1, itemStatusBar2, itemStatusKickoff, itemStatusGoal, itemStatusFulltime, itemStatusMisses, itemStatusPenalty);
	
	itemIconTackle = new createjs.Bitmap(loader.getResult('itemIconTackle'));
	centerReg(itemIconTackle);
	itemIconTackle.visible = false;
	
	itemIconSafe = new createjs.Bitmap(loader.getResult('itemIconSafe'));
	centerReg(itemIconSafe);
	itemIconSafe.visible = false;
	
	gameScoreTxt = new createjs.Text();
	gameScoreTxt.font = "30px kroftsmannregular";
	gameScoreTxt.color = "#fff";
	gameScoreTxt.textAlign = "center";
	gameScoreTxt.textBaseline='alphabetic';
	gameScoreTxt.text = '1 - 3';
	gameScoreTxt.lineHeight = 40;
	gameScoreTxt.y = -5;
	
	gameTeamHomeTxt = new createjs.Text();
	gameTeamHomeTxt.font = "30px kroftsmannregular";
	gameTeamHomeTxt.color = "#000";
	gameTeamHomeTxt.textAlign = "right";
	gameTeamHomeTxt.textBaseline='alphabetic';
	gameTeamHomeTxt.text = 'BLU';
	gameTeamHomeTxt.lineHeight = 40;
	gameTeamHomeTxt.x = -53;
	gameTeamHomeTxt.y = -5;
	
	gameTeamAwayTxt = new createjs.Text();
	gameTeamAwayTxt.font = "30px kroftsmannregular";
	gameTeamAwayTxt.color = "#000";
	gameTeamAwayTxt.textAlign = "left";
	gameTeamAwayTxt.textBaseline='alphabetic';
	gameTeamAwayTxt.text = 'RED';
	gameTeamAwayTxt.lineHeight = 40;
	gameTeamAwayTxt.x = 53;
	gameTeamAwayTxt.y = -5;
	
	gameTimeTxt = new createjs.Text();
	gameTimeTxt.font = "24px kroftsmannregular";
	gameTimeTxt.color = "#fff";
	gameTimeTxt.textAlign = "center";
	gameTimeTxt.textBaseline='alphabetic';
	gameTimeTxt.text = '00:00';
	gameTimeTxt.y = 29;
	
	teamHomeLogo = $.team[0].clone();
	teamAwayLogo = $.team[0].clone();
	
	itemScoreboardPenalty = new createjs.Bitmap(loader.getResult('itemScoreboardPenalty'));
	centerReg(itemScoreboardPenalty);
	
	homePenaltyScoreTxt = new createjs.Text();
	homePenaltyScoreTxt.font = "22px kroftsmannregular";
	homePenaltyScoreTxt.color = "#000";
	homePenaltyScoreTxt.textAlign = "right";
	homePenaltyScoreTxt.textBaseline='alphabetic';
	homePenaltyScoreTxt.text = '0';
	homePenaltyScoreTxt.lineHeight = 22;
	homePenaltyScoreTxt.x = -160;
	homePenaltyScoreTxt.y = 5;
	
	awayPenaltyScoreTxt = new createjs.Text();
	awayPenaltyScoreTxt.font = "22px kroftsmannregular";
	awayPenaltyScoreTxt.color = "#000";
	awayPenaltyScoreTxt.textAlign = "left";
	awayPenaltyScoreTxt.textBaseline='alphabetic';
	awayPenaltyScoreTxt.text = '0';
	awayPenaltyScoreTxt.lineHeight = 22;
	awayPenaltyScoreTxt.x = 160;
	awayPenaltyScoreTxt.y = 5;
	
	scorePenaltyContainer.addChild(itemScoreboardPenalty, homePenaltyScoreTxt, awayPenaltyScoreTxt);
	
	var startX = 62;
	var bulletRadius = 7;
	for(var n=0; n<5;n++){
		$.stats['penaltyHomeBg'+n] = new createjs.Shape();
		$.stats['penaltyHomeBg'+n].graphics.beginFill(playerPenaltyData.bgColor).drawCircle(0,0,bulletRadius);
		$.stats['penaltyHomeScore'+n] = new createjs.Shape();
		$.stats['penaltyHomeScore'+n].graphics.beginFill(playerPenaltyData.scoreColor).drawCircle(0,0,bulletRadius);
		$.stats['penaltyHomeMiss'+n] = new createjs.Shape();
		$.stats['penaltyHomeMiss'+n].graphics.beginFill(playerPenaltyData.missColor).drawCircle(0,0,bulletRadius);
		
		$.stats['penaltyAwayBg'+n] = new createjs.Shape();
		$.stats['penaltyAwayBg'+n].graphics.beginFill(playerPenaltyData.bgColor).drawCircle(0,0,bulletRadius);
		$.stats['penaltyAwayScore'+n] = new createjs.Shape();
		$.stats['penaltyAwayScore'+n].graphics.beginFill(playerPenaltyData.scoreColor).drawCircle(0,0,bulletRadius);
		$.stats['penaltyAwayMiss'+n] = new createjs.Shape();
		$.stats['penaltyAwayMiss'+n].graphics.beginFill(playerPenaltyData.missColor).drawCircle(0,0,bulletRadius);
		
		$.stats['penaltyHomeBg'+n].x = $.stats['penaltyHomeScore'+n].x = $.stats['penaltyHomeMiss'+n].x = -(startX);
		$.stats['penaltyAwayBg'+n].x = $.stats['penaltyAwayScore'+n].x = $.stats['penaltyAwayMiss'+n].x = (startX);
		
		startX += 17;
		$.stats['penaltyHomeBg'+n].y = $.stats['penaltyAwayBg'+n].y = $.stats['penaltyHomeScore'+n].y = $.stats['penaltyAwayScore'+n].y = $.stats['penaltyHomeMiss'+n].y = $.stats['penaltyAwayMiss'+n].y = -2;
		
		scorePenaltyContainer.addChild($.stats['penaltyHomeBg'+n], $.stats['penaltyAwayBg'+n], $.stats['penaltyHomeScore'+n], $.stats['penaltyAwayScore'+n], $.stats['penaltyHomeMiss'+n], $.stats['penaltyAwayMiss'+n]);
	}
	
	scorePenaltyContainer.y = 22;
	scoreContainer.addChild(scorePenaltyContainer, itemScoreboard, gameScoreTxt, gameTeamHomeTxt, gameTeamAwayTxt, gameTimeTxt, teamHomeLogo, teamAwayLogo);
	
	//goalkeeper
	playerAnimateData = new createjs.SpriteSheet({
		"images": [loader.getResult('itemPlayerAGoalkeeper').src],
		"frames": _frame,
		"animations": _animations
	});
	
	playerAnimateAGoalkeeper = new createjs.Sprite(playerAnimateData, "animate");
	playerAnimateAGoalkeeper.framerate = 20;
	playerAnimateAGoalkeeper.x = -200;
	
	playerAnimateData = new createjs.SpriteSheet({
		"images": [loader.getResult('itemPlayerBGoalkeeper').src],
		"frames": _frame,
		"animations": _animations
	});
	
	playerAnimateBGoalkeeper = new createjs.Sprite(playerAnimateData, "animate");
	playerAnimateBGoalkeeper.framerate = 20;
	playerAnimateBGoalkeeper.x = -200;
	
	//championship
	itemChampionship = new createjs.Bitmap(loader.getResult('itemChampionship'));
	championshipContainer.addChild(itemChampionship);
	
	for(var n=0; n<championshipBracket_arr.roundof16.length;n++){
		buildBrackets('roundof16', championshipBracket_arr.roundof16, n)
	}
	
	for(var n=0; n<championshipBracket_arr.quaterfinals.length;n++){
		buildBrackets('quaterfinals', championshipBracket_arr.quaterfinals, n)
	}
	
	for(var n=0; n<championshipBracket_arr.semifinals.length;n++){
		buildBrackets('semifinals', championshipBracket_arr.semifinals, n)
	}
	
	for(var n=0; n<championshipBracket_arr.finals.length;n++){
		buildBrackets('finals', championshipBracket_arr.finals, n)
	}
	
	buttonChamRestart = new createjs.Bitmap(loader.getResult('buttonChamRestart'));
	centerReg(buttonChamRestart);
	buttonChamSimulate = new createjs.Bitmap(loader.getResult('buttonChamSimulate'));
	centerReg(buttonChamSimulate);
	buttonChamPlay = new createjs.Bitmap(loader.getResult('buttonChamPlay'));
	centerReg(buttonChamPlay);
	buttonChamReady = new createjs.Bitmap(loader.getResult('buttonReady'));
	centerReg(buttonChamReady);
	itemChamDesc = new createjs.Bitmap(loader.getResult('itemChamDesc'));
	centerReg(itemChamDesc);

	buttonChamReady.x = canvasW/2;
	itemChamDesc.x = canvasW/2;
	
	buttonChamRestart.y = buttonChamSimulate.y = buttonChamPlay.y = buttonChamReady.y = canvasH/100 * 81;
	itemChamDesc.y = canvasH/100 * 88;
	
	itemChamPlayer = new createjs.Bitmap(loader.getResult('itemChamPlayer'));
	centerReg(itemChamPlayer);
	championshipContainer.addChild(buttonChamRestart, buttonChamSimulate, buttonChamPlay, buttonChamReady, itemChamDesc, championshipTeamContainer, itemChamPlayer, champSelectContainer);

	//touch
	buttonKick = new createjs.Bitmap(loader.getResult('buttonKick'));
	centerReg(buttonKick);
	buttonTouch = new createjs.Bitmap(loader.getResult('buttonTouch'));
	centerReg(buttonTouch);
	buttonTouchMove = new createjs.Bitmap(loader.getResult('buttonTouchMove'));
	centerReg(buttonTouchMove);

	var buttonArr = ["Up","Right","Down","Left"];
	var rotation = [0,90,180,270];
	touchMoveContainer.addChild(buttonTouch);

	for(var n=0; n<buttonArr.length; n++){
		$.touch[buttonArr[n]] = new createjs.Bitmap(loader.getResult('buttonTouchPress'));
		centerReg($.touch[buttonArr[n]]);
		$.touch[buttonArr[n]].visible = false;

		$.touch["arrow"+buttonArr[n]] = new createjs.Bitmap(loader.getResult('buttonTouchArrow'));
		centerReg($.touch["arrow"+buttonArr[n]]);

		$.touch[buttonArr[n]].regY = $.touch["arrow"+buttonArr[n]].regY = $.touch[buttonArr[n]].image.naturalHeight;
		$.touch["arrow"+buttonArr[n]].rotation = $.touch[buttonArr[n]].rotation = rotation[n];
		
		createHitarea($.touch["arrow"+buttonArr[n]]);
		touchMoveContainer.addChild($.touch[buttonArr[n]], $.touch["arrow"+buttonArr[n]]);
	}

	touchMoveContainer.addChild(buttonTouchMove);
	touchContainer.addChild(buttonKick,touchMoveContainer);
	
	
	//result
	itemResult = new createjs.Bitmap(loader.getResult('itemResult'));
	
	itemResultTitleGame = new createjs.Bitmap(loader.getResult('itemResultTitleGame'));
	centerReg(itemResultTitleGame);
	itemResultTitleGame.x = canvasW/2;
	itemResultTitleGame.y = canvasH/100 * 20;
	
	itemResultTitlePenalty = new createjs.Bitmap(loader.getResult('itemResultTitlePenalty'));
	centerReg(itemResultTitlePenalty);
	itemResultTitlePenalty.x = canvasW/2;
	itemResultTitlePenalty.y = canvasH/100 * 20;
	
	resultTitleTxt = new createjs.Text();
	resultTitleTxt.font = "50px kroftsmannregular";
	resultTitleTxt.color = "#666";
	resultTitleTxt.textAlign = "center";
	resultTitleTxt.textBaseline='alphabetic';
	resultTitleTxt.text = '';
	resultTitleTxt.x = canvasW/2;
	resultTitleTxt.y = canvasH/100 * 48;
	
	resultShareTxt = new createjs.Text();
	resultShareTxt.font = "23px kroftsmannregular";
	resultShareTxt.color = "#999";
	resultShareTxt.textAlign = "center";
	resultShareTxt.textBaseline='alphabetic';
	resultShareTxt.text = shareText;
	resultShareTxt.x = canvasW/2;
	resultShareTxt.y = canvasH/100 * 61;
	
	resultScoreTxt = new createjs.Text();
	resultScoreTxt.font = "57px kroftsmannregular";
	resultScoreTxt.color = "#fff";
	resultScoreTxt.textAlign = "center";
	resultScoreTxt.textBaseline='alphabetic';
	resultScoreTxt.text = '1 - 3';
	resultScoreTxt.x = canvasW/2;
	resultScoreTxt.y = canvasH/100 * 34;
	
	resultHomeTeamTxt = new createjs.Text();
	resultHomeTeamTxt.font = "57px kroftsmannregular";
	resultHomeTeamTxt.color = "#000";
	resultHomeTeamTxt.textAlign = "right";
	resultHomeTeamTxt.textBaseline='alphabetic';
	resultHomeTeamTxt.text = 'BLU';
	resultHomeTeamTxt.x = (canvasW/2) - 100;
	resultHomeTeamTxt.y = canvasH/100 * 34;
	
	resultAwayTeamTxt = new createjs.Text();
	resultAwayTeamTxt.font = "57px kroftsmannregular";
	resultAwayTeamTxt.color = "#000";
	resultAwayTeamTxt.textAlign = "left";
	resultAwayTeamTxt.textBaseline='alphabetic';
	resultAwayTeamTxt.text = 'RED';
	resultAwayTeamTxt.x = (canvasW/2) + 100;
	resultAwayTeamTxt.y = canvasH/100 * 34;
	
	buttonFacebook = new createjs.Bitmap(loader.getResult('buttonFacebook'));
	buttonTwitter = new createjs.Bitmap(loader.getResult('buttonTwitter'));
	buttonWhatsapp = new createjs.Bitmap(loader.getResult('buttonWhatsapp'));
	centerReg(buttonFacebook);
	createHitarea(buttonFacebook);
	centerReg(buttonTwitter);
	createHitarea(buttonTwitter);
	centerReg(buttonWhatsapp);
	createHitarea(buttonWhatsapp);
	buttonFacebook.x = canvasW/100 * 46;
	buttonTwitter.x = canvasW/2;
	buttonWhatsapp.x = canvasW/100 * 54;
	buttonFacebook.y = buttonTwitter.y = buttonWhatsapp.y = canvasH/100*65;
	
	buttonNext = new createjs.Bitmap(loader.getResult('buttonNext'));
	centerReg(buttonNext);
	createHitarea(buttonNext);
	buttonNext.x = canvasW/2;
	buttonNext.y = canvasH/100 * 79;
	
	buttonStatistic = new createjs.Bitmap(loader.getResult('buttonStatistic'));
	centerReg(buttonStatistic);
	createHitarea(buttonStatistic);
	buttonStatistic.x = canvasW/100 * 42;
	buttonStatistic.y = canvasH/100 * 79;
	
	buttonPenalty = new createjs.Bitmap(loader.getResult('buttonPenalty'));
	centerReg(buttonPenalty);
	createHitarea(buttonPenalty);
	buttonPenalty.x = canvasW/100 * 42;
	buttonPenalty.y = canvasH/100 * 79;
	
	buttonContinue = new createjs.Bitmap(loader.getResult('buttonContinue'));
	centerReg(buttonContinue);
	createHitarea(buttonContinue);
	buttonContinue.x = canvasW/100 * 58;
	buttonContinue.y = canvasH/100 * 79;
	
	itemStatistic = new createjs.Bitmap(loader.getResult('itemStatistic'));
	itemStatistic.x = 427;
	itemStatistic.y = 305;
	statsContainer.addChild(itemStatistic);
	
	var rangeNum = 140;
	var startY = 358;
	var spaceY = 30.5;
	for(var n = 0; n < 7; n++){
		$.stats[n+'Left'] = new createjs.Text();
		$.stats[n+'Left'].font = "20px kroftsmannregular";
		$.stats[n+'Left'].color = "#fff";
		$.stats[n+'Left'].textAlign = "center";
		$.stats[n+'Left'].textBaseline='alphabetic';
		$.stats[n+'Left'].text = '50 %';
		$.stats[n+'Left'].x = (canvasW/2) - rangeNum;
		$.stats[n+'Left'].y = startY;
		
		$.stats[n+'Right'] = new createjs.Text();
		$.stats[n+'Right'].font = "20px kroftsmannregular";
		$.stats[n+'Right'].color = "#fff";
		$.stats[n+'Right'].textAlign = "center";
		$.stats[n+'Right'].textBaseline='alphabetic';
		$.stats[n+'Right'].text = '50 %';
		$.stats[n+'Right'].x = (canvasW/2) + rangeNum;
		$.stats[n+'Right'].y = startY;	
		
		startY += spaceY;
		statsContainer.addChild($.stats[n+'Left'], $.stats[n+'Right']);
	}
	
	teamHomeLogoResult = $.team[0].clone();
	teamAwayLogoResult = $.team[0].clone();
	
	//option
	buttonFullscreen = new createjs.Bitmap(loader.getResult('buttonFullscreen'));
	centerReg(buttonFullscreen);
	buttonSoundOn = new createjs.Bitmap(loader.getResult('buttonSoundOn'));
	centerReg(buttonSoundOn);
	buttonSoundOff = new createjs.Bitmap(loader.getResult('buttonSoundOff'));
	centerReg(buttonSoundOff);
	buttonSoundOn.visible = false;
	buttonMusicOn = new createjs.Bitmap(loader.getResult('buttonMusicOn'));
	centerReg(buttonMusicOn);
	buttonMusicOff = new createjs.Bitmap(loader.getResult('buttonMusicOff'));
	centerReg(buttonMusicOff);
	buttonMusicOn.visible = false;
	
	buttonExit = new createjs.Bitmap(loader.getResult('buttonExit'));
	centerReg(buttonExit);
	buttonSettings = new createjs.Bitmap(loader.getResult('buttonSettings'));
	centerReg(buttonSettings);
	
	createHitarea(buttonFullscreen);
	createHitarea(buttonSoundOn);
	createHitarea(buttonSoundOff);
	createHitarea(buttonMusicOn);
	createHitarea(buttonMusicOff);
	createHitarea(buttonExit);
	createHitarea(buttonSettings);
	optionsContainer = new createjs.Container();
	optionsContainer.addChild(buttonFullscreen, buttonSoundOn, buttonSoundOff, buttonMusicOn, buttonMusicOff, buttonExit);
	optionsContainer.visible = false;
	
	//exit
	itemExit = new createjs.Bitmap(loader.getResult('itemExit'));
	
	buttonConfirm = new createjs.Bitmap(loader.getResult('buttonConfirm'));
	centerReg(buttonConfirm);
	buttonConfirm.x = canvasW/100* 42;
	buttonConfirm.y = canvasH/100 * 67;
	
	buttonCancel = new createjs.Bitmap(loader.getResult('buttonCancel'));
	centerReg(buttonCancel);
	buttonCancel.x = canvasW/100 * 58;
	buttonCancel.y = canvasH/100 * 67;
	
	confirmMessageTxt = new createjs.Text();
	confirmMessageTxt.font = "35px kroftsmannregular";
	confirmMessageTxt.color = "#fff";
	confirmMessageTxt.textAlign = "center";
	confirmMessageTxt.textBaseline='alphabetic';
	confirmMessageTxt.text = '';
	confirmMessageTxt.lineHeight = 40;
	confirmMessageTxt.x = canvasW/2;
	confirmMessageTxt.y = canvasH/100 *47;
	
	confirmContainer.addChild(itemExit, buttonConfirm, buttonCancel, confirmMessageTxt);
	confirmContainer.visible = false;
	
	if(guide){
		guideline = new createjs.Shape();
		guideline.graphics.setStrokeStyle(2).beginStroke('red').drawRect((stageW-contentW)/2, (stageH-contentH)/2, contentW, contentH);
	}
	
	mainContainer.addChild(logo, buttonStart);
	gamePlayContainer.addChild(itemGameplay, buttonQuickMatch, buttonChampionship, buttonPenaltykick, buttonInstructions);
	instructionContainer.addChild(itemInstruction, itemInstructionDesktop, itemInstructionMobile, buttonOk);
	playersContainer.addChild(ballContainer);
	shadowContainer.addChild(itemBallShadow);
	fieldContainer.addChild(itemField, fieldGuideContainer, shadowContainer, itemGuideDirection, playersContainer, itemShot, iconContainer, itemGoalpost);
	gameContainer.addChild(itemIconTackle, itemIconSafe, playerAnimateAGoalkeeper, playerAnimateBGoalkeeper, itemBallDepth, scoreContainer, touchContainer, statusContainer);
	resultContainer.addChild(itemResult, itemResultTitleGame, itemResultTitlePenalty, resultTitleTxt, resultScoreTxt, resultHomeTeamTxt, resultAwayTeamTxt, teamHomeLogoResult, teamAwayLogoResult, statsContainer, buttonStatistic, buttonPenalty, buttonNext, buttonContinue);
	
	if(shareEnable){
		resultContainer.addChild(resultShareTxt, buttonFacebook, buttonTwitter, buttonWhatsapp);
	}
	
	canvasContainer.addChild(bg, fieldContainer, mainContainer, gamePlayContainer, selectContainer, championshipContainer, instructionContainer, gameContainer, resultContainer, confirmContainer, buttonSettings, optionsContainer, guideline);
	stage.addChild(canvasContainer);
	
	resizeCanvas();
}

/*!
 * 
 * BUILD CHAMPIONSHIP BRACKETS - This is the function that runs to build championship brackets
 * 
 */
function buildBrackets(type, array, n){
	$.championship[type+n+'h'] = new createjs.Bitmap(loader.getResult('itemBracket'));
	centerReg($.championship[type+n+'h']);
	$.championship[type+n+'h'].x = array[n].homeX;
	$.championship[type+n+'h'].y = array[n].homeY;
	$.championship[type+n+'h'].side = array[n].homeS;
	$.championship[type+n+'h'].playerSide = array[n].homeP;
	$.championship[type+n+'h'].qualify = array[n].qualify;
	$.championship[type+n+'h'].qualifySide = array[n].qualifySide;
	$.championship[type+n+'h'].animate = false;
	
	$.championship[type+n+'h_focus'] = new createjs.Bitmap(loader.getResult('itemBracketH'));
	centerReg($.championship[type+n+'h_focus']);
	$.championship[type+n+'h_focus'].x = array[n].homeX;
	$.championship[type+n+'h_focus'].y = array[n].homeY;
	
	$.championship[type+n+'a'] = new createjs.Bitmap(loader.getResult('itemBracket'));
	centerReg($.championship[type+n+'a']);
	$.championship[type+n+'a'].x = array[n].awayX;
	$.championship[type+n+'a'].y = array[n].awayY;
	$.championship[type+n+'a'].side = array[n].awayS;
	$.championship[type+n+'a'].playerSide = array[n].awayP;
	$.championship[type+n+'a'].qualify = array[n].qualify;
	$.championship[type+n+'a'].qualifySide = array[n].qualifySide;
	$.championship[type+n+'a'].animate = false;
	
	$.championship[type+n+'a_focus'] = new createjs.Bitmap(loader.getResult('itemBracketH'));
	centerReg($.championship[type+n+'a_focus']);
	$.championship[type+n+'a_focus'].x = array[n].awayX;
	$.championship[type+n+'a_focus'].y = array[n].awayY;
	
	var scoreGapHome = 28;
	var scoreGapAway = 28;
	var scoreY = 8;
	if(array[n].homeS == 'right'){
		$.championship[type+n+'h'].scaleX = $.championship[type+n+'h_focus'].scaleX = -1;
		scoreGapHome = -(scoreGapHome);
	}
	if(array[n].awayS == 'right'){
		$.championship[type+n+'a'].scaleX = $.championship[type+n+'a_focus'].scaleX = -1;
		scoreGapAway = -(scoreGapAway);
	}
	
	$.championship[type+n+'h_txt'] = new createjs.Text();
	$.championship[type+n+'h_txt'].font = "25px kroftsmannregular";
	$.championship[type+n+'h_txt'].color = "#fff";
	$.championship[type+n+'h_txt'].textAlign = "center";
	$.championship[type+n+'h_txt'].textBaseline='alphabetic';
	$.championship[type+n+'h_txt'].text = '5';
	$.championship[type+n+'h_txt'].x = array[n].homeX+scoreGapHome;
	$.championship[type+n+'h_txt'].y = array[n].homeY+scoreY;
	
	$.championship[type+n+'a_txt'] = new createjs.Text();
	$.championship[type+n+'a_txt'].font = "25px kroftsmannregular";
	$.championship[type+n+'a_txt'].color = "#fff";
	$.championship[type+n+'a_txt'].textAlign = "center";
	$.championship[type+n+'a_txt'].textBaseline='alphabetic';
	$.championship[type+n+'a_txt'].text = '5';
	$.championship[type+n+'a_txt'].x = array[n].awayX+scoreGapAway;
	$.championship[type+n+'a_txt'].y = array[n].awayY+scoreY;
	
	var scoreGapHome = 60;
	var scoreGapAway = 60;
	var penaltyRoundGapHome = 60;
	var penaltyRoundGapAway = 60;
	var scoreY = 7;
	
	if(array[n].homeS == 'right'){
		scoreGapHome = -(scoreGapHome);
		penaltyRoundGapHome = -(penaltyRoundGapHome);
	}
	if(array[n].awayS == 'right'){
		scoreGapAway = -(scoreGapAway);
		penaltyRoundGapAway = -(penaltyRoundGapAway);
	}
	
	$.championship[type+n+'h_penalty'] = new createjs.Bitmap(loader.getResult('itemBracketP'));
	centerReg($.championship[type+n+'h_penalty']);
	$.championship[type+n+'h_penalty'].x = array[n].homeX+penaltyRoundGapHome;
	$.championship[type+n+'h_penalty'].y = array[n].homeY;
	$.championship[type+n+'h_penalty'].side = array[n].side;
	
	$.championship[type+n+'a_penalty'] = new createjs.Bitmap(loader.getResult('itemBracketP'));
	centerReg($.championship[type+n+'a_penalty']);
	$.championship[type+n+'a_penalty'].x = array[n].awayX+penaltyRoundGapAway;
	$.championship[type+n+'a_penalty'].y = array[n].awayY;
	$.championship[type+n+'a_penalty'].side = array[n].side;
	
	$.championship[type+n+'h_PenaltyTxt'] = new createjs.Text();
	$.championship[type+n+'h_PenaltyTxt'].font = "20px kroftsmannregular";
	$.championship[type+n+'h_PenaltyTxt'].color = "#0f3848";
	$.championship[type+n+'h_PenaltyTxt'].textAlign = "center";
	$.championship[type+n+'h_PenaltyTxt'].textBaseline='alphabetic';
	$.championship[type+n+'h_PenaltyTxt'].text = '5';
	$.championship[type+n+'h_PenaltyTxt'].x = array[n].homeX+scoreGapHome;
	$.championship[type+n+'h_PenaltyTxt'].y = array[n].homeY+scoreY;
	
	$.championship[type+n+'a_PenaltyTxt'] = new createjs.Text();
	$.championship[type+n+'a_PenaltyTxt'].font = "20px kroftsmannregular";
	$.championship[type+n+'a_PenaltyTxt'].color = "#0f3848";
	$.championship[type+n+'a_PenaltyTxt'].textAlign = "center";
	$.championship[type+n+'a_PenaltyTxt'].textBaseline='alphabetic';
	$.championship[type+n+'a_PenaltyTxt'].text = '5';
	$.championship[type+n+'a_PenaltyTxt'].x = array[n].awayX+scoreGapAway;
	$.championship[type+n+'a_PenaltyTxt'].y = array[n].awayY+scoreY;
	
	if(type == 'finals'){
		var scoreY = 9;
		$.championship[type+n+'h_position'] = new createjs.Text();
		$.championship[type+n+'h_position'].font = "30px kroftsmannregular";
		$.championship[type+n+'h_position'].color = "#fff";
		$.championship[type+n+'h_position'].textAlign = "left";
		$.championship[type+n+'h_position'].textBaseline='alphabetic';
		$.championship[type+n+'h_position'].text = '1ST';
		$.championship[type+n+'h_position'].y = array[n].awayY+scoreY;
		
		$.championship[type+n+'a_position'] = new createjs.Text();
		$.championship[type+n+'a_position'].font = "30px kroftsmannregular";
		$.championship[type+n+'a_position'].color = "#fff";
		$.championship[type+n+'a_position'].textAlign = "left";
		$.championship[type+n+'a_position'].textBaseline='alphabetic';
		$.championship[type+n+'a_position'].text = '1ST';
		$.championship[type+n+'a_position'].x = array[n].awayX;
		$.championship[type+n+'a_position'].y = array[n].awayY+scoreY;
		
		var positionGapHome = 70;
		if(array[n].homeS == 'left'){
			positionGapHome = -(positionGapHome);
			$.championship[type+n+'h_position'].textAlign = "right";
		}
		var positionGapAway = 70;
		if(array[n].awayS == 'left'){
			positionGapAway = -(positionGapAway);
			$.championship[type+n+'a_position'].textAlign = "right";
		}
		$.championship[type+n+'h_position'].x = array[n].homeX+positionGapHome;
		$.championship[type+n+'a_position'].x = array[n].awayX+positionGapAway;
	}
	
	championshipContainer.addChild($.championship[type+n+'h'], $.championship[type+n+'a'], $.championship[type+n+'h_focus'], $.championship[type+n+'a_focus'], $.championship[type+n+'h_txt'], $.championship[type+n+'a_txt'], $.championship[type+n+'h_penalty'], $.championship[type+n+'a_penalty'], $.championship[type+n+'h_PenaltyTxt'], $.championship[type+n+'a_PenaltyTxt'], $.championship[type+n+'h_position'], $.championship[type+n+'a_position']);	
}


/*!
 * 
 * RESIZE GAME CANVAS - This is the function that runs to resize game canvas
 * 
 */
function resizeCanvas(){
 	if(canvasContainer!=undefined){
		scoreContainer.x = canvasW/2;
		scoreContainer.y = offset.y + 55;
		
		buttonSettings.x = (canvasW - offset.x) - 40;
		buttonSettings.y = offset.y + 35;
		
		var distanceNum = 50;
		var nextCount = 0;
		if(curPage != 'game'){
			buttonExit.visible = false;
			buttonSoundOn.x = buttonSoundOff.x = buttonSettings.x;
			buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y+distanceNum;
			buttonSoundOn.x = buttonSoundOff.x;
			buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y+distanceNum;

			if (typeof buttonMusicOn != "undefined") {
				buttonMusicOn.x = buttonMusicOff.x = buttonSettings.x;
				buttonMusicOn.y = buttonMusicOff.y = buttonSettings.y+(distanceNum*2);
				buttonMusicOn.x = buttonMusicOff.x;
				buttonMusicOn.y = buttonMusicOff.y = buttonSettings.y+(distanceNum*2);
				nextCount = 2;
			}else{
				nextCount = 1;
			}
			
			buttonFullscreen.x = buttonSettings.x;
			buttonFullscreen.y = buttonSettings.y+(distanceNum*(nextCount+1));
		}else{
			buttonExit.visible = true;
			buttonSoundOn.x = buttonSoundOff.x = buttonSettings.x;
			buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y+distanceNum;
			buttonSoundOn.x = buttonSoundOff.x;
			buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y+distanceNum;

			if (typeof buttonMusicOn != "undefined") {
				buttonMusicOn.x = buttonMusicOff.x = buttonSettings.x;
				buttonMusicOn.y = buttonMusicOff.y = buttonSettings.y+(distanceNum*2);
				buttonMusicOn.x = buttonMusicOff.x;
				buttonMusicOn.y = buttonMusicOff.y = buttonSettings.y+(distanceNum*2);
				nextCount = 2;
			}else{
				nextCount = 1;
			}
			
			buttonFullscreen.x = buttonSettings.x;
			buttonFullscreen.y = buttonSettings.y+(distanceNum*(nextCount+1));
			
			buttonExit.x = buttonSettings.x;
			buttonExit.y = buttonSettings.y+(distanceNum*(nextCount+2));

			if(controlSettings.screenControlSide){
				buttonKick.x = offset.x + 100;
				buttonKick.y = (canvasH - offset.y) - 130;
	
				touchMoveContainer.x = (canvasW - offset.x) - 130;
				touchMoveContainer.y = (canvasH - offset.y) - 130;
			}else{
				buttonKick.x = (canvasW + offset.x) - 100;
				buttonKick.y = (canvasH - offset.y) - 130;
	
				touchMoveContainer.x = (offset.x) + 130;
				touchMoveContainer.y = (canvasH - offset.y) - 130;
			}
		}
	}
}

/*!
 * 
 * REMOVE GAME CANVAS - This is the function that runs to remove game canvas
 * 
 */
 function removeGameCanvas(){
	 stage.autoClear = true;
	 stage.removeAllChildren();
	 stage.update();
	 createjs.Ticker.removeEventListener("tick", tick);
	 createjs.Ticker.removeEventListener("tick", stage);
 }

/*!
 * 
 * CANVAS LOOP - This is the function that runs for canvas loop
 * 
 */ 
function tick(event) {
	updateGame();
	stage.update(event);
}

/*!
 * 
 * CANVAS MISC FUNCTIONS
 * 
 */
function centerReg(obj){
	obj.regX=obj.image.naturalWidth/2;
	obj.regY=obj.image.naturalHeight/2;
}

function createHitarea(obj){
	obj.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#000").drawRect(0, 0, obj.image.naturalWidth, obj.image.naturalHeight));
}