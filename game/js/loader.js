////////////////////////////////////////////////////////////
// CANVAS LOADER
////////////////////////////////////////////////////////////

 /*!
 * 
 * START CANVAS PRELOADER - This is the function that runs to preload canvas asserts
 * 
 */
function initPreload(){
	toggleLoader(true);
	
	checkMobileEvent();
	
	$(window).resize(function(){
		resizeGameFunc();
	});
	resizeGameFunc();
	
	loader = new createjs.LoadQueue(false);
	manifest=[
			{src:'assets/background.png', id:'background'},
			{src:'assets/logo.png', id:'logo'},
			{src:'assets/button_start.png', id:'buttonStart'},
			
			{src:'assets/item_gameplay.png', id:'itemGameplay'},
			{src:'assets/button_quickmatch.png', id:'buttonQuickMatch'},
			{src:'assets/button_championship.png', id:'buttonChampionship'},
			{src:'assets/button_penaltykick.png', id:'buttonPenaltykick'},
			{src:'assets/button_instructions.png', id:'buttonInstructions'},
			{src:'assets/button_arrow.png', id:'buttonArrow'},
			
			{src:'assets/button_side_home.png', id:'buttonSideHome'},
			{src:'assets/button_side_away.png', id:'buttonSideAway'},
			
			{src:'assets/button_ok.png', id:'buttonOk'},
			{src:'assets/item_instruction.png', id:'itemInstruction'},
			{src:'assets/item_instruction_mobile.png', id:'itemInstructionMobile'},
			{src:'assets/item_instruction_desktop.png', id:'itemInstructionDesktop'},
			
			{src:'assets/item_ball.png', id:'itemBall'},
			{src:'assets/item_shadow_ball.png', id:'itemBallShadow'},
			{src:'assets/item_field.png', id:'itemField'},
			{src:'assets/item_goalpost.png', id:'itemGoalpost'},
			{src:'assets/item_ball_texture.png', id:'itemBallTexture'},
			{src:'assets/goalkeeperA_Spritesheet6x5.png', id:'itemPlayerAGoalkeeper'},
			{src:'assets/goalkeeperB_Spritesheet6x5.png', id:'itemPlayerBGoalkeeper'},
			{src:'assets/item_guide_direction.png', id:'itemGuideDirection'},
			{src:'assets/item_scoreboard.png', id:'itemScoreboard'},
			{src:'assets/item_scoreboard_penalty.png', id:'itemScoreboardPenalty'},
			{src:'assets/item_statistic.png', id:'itemStatistic'},
			{src:'assets/button_next.png', id:'buttonNext'},
			{src:'assets/button_statistic.png', id:'buttonStatistic'},
			{src:'assets/button_penalty.png', id:'buttonPenalty'},
			
			{src:'assets/item_status_bar1.png', id:'itemStatusBar1'},
			{src:'assets/item_status_bar2.png', id:'itemStatusBar2'},
			{src:'assets/item_status_kickoff.png', id:'itemStatusKickoff'},
			{src:'assets/item_status_goal.png', id:'itemStatusGoal'},
			{src:'assets/item_status_fulltime.png', id:'itemStatusFulltime'},
			{src:'assets/item_status_misses.png', id:'itemStatusMisses'},
			{src:'assets/item_status_penalty.png', id:'itemStatusPenalty'},
			{src:'assets/item_icon_tackle.png', id:'itemIconTackle'},
			{src:'assets/item_icon_safe.png', id:'itemIconSafe'},
			
			{src:'assets/item_select.png', id:'itemSelect'},
			{src:'assets/item_team_select.png', id:'itemTeamSelect'},
			
			{src:'assets/item_championship.png', id:'itemChampionship'},
			{src:'assets/item_bracket.png', id:'itemBracket'},
			{src:'assets/item_bracket_high.png', id:'itemBracketH'},
			{src:'assets/item_bracket_penalty.png', id:'itemBracketP'},
			{src:'assets/button_restart.png', id:'buttonChamRestart'},
			{src:'assets/button_simulate.png', id:'buttonChamSimulate'},
			{src:'assets/button_play.png', id:'buttonChamPlay'},
			{src:'assets/item_championship_player.png', id:'itemChamPlayer'},
			{src:'assets/item_dim.png', id:'itemDim'},
			{src:'assets/item_championship_desc.png', id:'itemChamDesc'},
			{src:'assets/button_ready.png', id:'buttonReady'},
			
			{src:'assets/button_confirm.png', id:'buttonConfirm'},
			{src:'assets/button_cancel.png', id:'buttonCancel'},
			{src:'assets/item_exit.png', id:'itemExit'},
			
			{src:'assets/item_result.png', id:'itemResult'},
			{src:'assets/item_result_title_game.png', id:'itemResultTitleGame'},
			{src:'assets/item_result_title_penalty.png', id:'itemResultTitlePenalty'},

			{src:'assets/button_kick.png', id:'buttonKick'},
			{src:'assets/button_touch.png', id:'buttonTouch'},
			{src:'assets/button_touch_move.png', id:'buttonTouchMove'},
			{src:'assets/button_touch_arrow.png', id:'buttonTouchArrow'},
			{src:'assets/button_touch_press.png', id:'buttonTouchPress'},
		
			{src:'assets/button_continue.png', id:'buttonContinue'},
			{src:'assets/button_facebook.png', id:'buttonFacebook'},
			{src:'assets/button_twitter.png', id:'buttonTwitter'},
			{src:'assets/button_whatsapp.png', id:'buttonWhatsapp'},
			{src:'assets/button_fullscreen.png', id:'buttonFullscreen'},
			{src:'assets/button_sound_on.png', id:'buttonSoundOn'},
			{src:'assets/button_sound_off.png', id:'buttonSoundOff'},
			{src:'assets/button_music_on.png', id:'buttonMusicOn'},
			{src:'assets/button_music_off.png', id:'buttonMusicOff'},
			{src:'assets/button_exit.png', id:'buttonExit'},
			{src:'assets/button_option.png', id:'buttonSettings'}];
	
	sortOnObject(team_arr, "name");
	for(var n=0; n<team_arr.length; n++){
		manifest.push({src:team_arr[n].icon, id:'team'+n});
		manifest.push({src:team_arr[n].bracket, id:'team_bracket'+n});
		manifest.push({src:team_arr[n].player, id:'player'+n});
	}
	
	if ( typeof addScoreboardAssets == 'function' ) { 
		addScoreboardAssets();
	}
	
	soundOn = true;
	if($.browser.mobile || isTablet){
		if(!enableMobileSound){
			soundOn=false;
		}
	}else{
		if(!enableDesktopSound){
			soundOn=false;
		}
	}
	
	if(soundOn){
		manifest.push({src:'assets/sounds/music1.ogg', id:'musicGame'});
		manifest.push({src:'assets/sounds/music2.ogg', id:'musicGameEnd'});
		manifest.push({src:'assets/sounds/ambience.ogg', id:'soundAmbience'});
		manifest.push({src:'assets/sounds/goal1.ogg', id:'soundGoal1'});
		manifest.push({src:'assets/sounds/goal2.ogg', id:'soundGoal2'});
		manifest.push({src:'assets/sounds/whistle_start.ogg', id:'soundWhistleStart'});
		manifest.push({src:'assets/sounds/whistle_end.ogg', id:'soundWhistleEnd'});
		manifest.push({src:'assets/sounds/tackle.ogg', id:'soundTackle'});
		manifest.push({src:'assets/sounds/kick.ogg', id:'soundKick'});
		manifest.push({src:'assets/sounds/miss.ogg', id:'soundMiss'});
		manifest.push({src:'assets/sounds/hitpost.ogg', id:'soundHitpost'});
		manifest.push({src:'assets/sounds/hitwall.ogg', id:'soundHitwall'});
		manifest.push({src:'assets/sounds/click.ogg', id:'soundClick'});
		manifest.push({src:'assets/sounds/complete.ogg', id:'soundComplete'});
		
		createjs.Sound.alternateExtensions = ["mp3"];
		loader.installPlugin(createjs.Sound);
	}
	
	loader.addEventListener("complete", handleComplete);
	loader.addEventListener("fileload", fileComplete);
	loader.addEventListener("error",handleFileError);
	loader.on("progress", handleProgress, this);
	loader.loadManifest(manifest);
}

/*!
 * 
 * CANVAS FILE COMPLETE EVENT - This is the function that runs to update when file loaded complete
 * 
 */
function fileComplete(evt) {
	var item = evt.item;
	//console.log("Event Callback file loaded ", evt.item.id);
}

/*!
 * 
 * CANVAS FILE HANDLE EVENT - This is the function that runs to handle file error
 * 
 */
function handleFileError(evt) {
	console.log("error ", evt);
}

/*!
 * 
 * CANVAS PRELOADER UPDATE - This is the function that runs to update preloder progress
 * 
 */
function handleProgress() {
	$('#mainLoader span').html(Math.round(loader.progress/1*100)+' %');
}

/*!
 * 
 * CANVAS PRELOADER COMPLETE - This is the function that runs when preloader is complete
 * 
 */
function handleComplete() {
	toggleLoader(false);
	initMain();
};

/*!
 * 
 * TOGGLE LOADER - This is the function that runs to display/hide loader
 * 
 */
function toggleLoader(con){
	if(con){
		$('#mainLoader').show();
	}else{
		$('#mainLoader').hide();
	}
}