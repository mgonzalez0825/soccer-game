////////////////////////////////////////////////////////////
// FUNC
////////////////////////////////////////////////////////////

function findGoalArea(player){
	var goalX = 0;
	var goalY = 0;
	var gapNum = 20;
	
	player.shootRangeX = randomIntFromInterval(-150,150);
	player.shootRangeY = randomIntFromInterval(-150,150);
	
	for(var w=0; w<areaData.length; w++){
		if(soccerFieldData.penalty && areaData[w].side == 'away' && areaData[w].pos == 'postarea'){
			goalX = areaData[w].x;
			goalY = randomIntFromInterval(areaData[w].y-gapNum, (areaData[w].y+areaData[w].h)+gapNum);
			w = areaData.length;
		}else if(player.side == areaData[w].side && areaData[w].pos == 'postarea'){
			goalX = areaData[w].x;
			goalY = randomIntFromInterval(areaData[w].y-gapNum, (areaData[w].y+areaData[w].h)+gapNum);
			w = areaData.length;
		}
	}
	
	player.goalX = goalX;
	player.goalY = goalY;
}

function findGoalkeeperArea(player){
	var goalX = 0;
	var goalY = 0;
	
	if(player.side == 'home'){
		goalX = randomIntFromInterval(fieldW/2,fieldW);
		goalY = randomIntFromInterval(0,fieldH);	
	}else if(player.side == 'away'){
		goalX = randomIntFromInterval(0,fieldW/2);
		goalY = randomIntFromInterval(0,fieldH);	
	}
	
	player.goalX = goalX;
	player.goalY = goalY;
}

function checkWithinStrikeZone(player){
	var isWithin = false;
	
	for(var w=0; w<areaData.length; w++){
		if(player.side == areaData[w].side && areaData[w].pos == 'shotarea'){
			if(player.x >= (areaData[w].x+player.shootRangeX) && player.x <= (areaData[w].x+player.shootRangeX) + areaData[w].w){
				if(player.y >= (areaData[w].y+player.shootRangeY)&& player.y <= (areaData[w].y+player.shootRangeY) + areaData[w].h){
					isWithin = true;
				}		
			}
		}
	}
	return isWithin;
}

function checkWithinGoalkeeperZone(player){
	var isWithin = false;
	var patrolStartX = player.patrolStartX;
	var patrolEndX = player.patrolEndX;
	var patrolStartY = player.patrolStartY;
	var patrolEndY = player.patrolEndY;
	
	if(soccerFieldData.penalty){
		patrolStartX = playerPenaltyData.patrolStartX;
		patrolEndX = playerPenaltyData.patrolEndX;
		patrolStartY = playerPenaltyData.patrolStartY;
		patrolEndY = playerPenaltyData.patrolEndY;
	}
	
	if(itemBallShadow.x >= patrolStartX && itemBallShadow.x <= patrolEndX && itemBallShadow.y >= patrolStartY && itemBallShadow.y <= patrolEndY){
		isWithin = true;
	}
	
	return isWithin;
}

function updateEaseMove(pt, player){
	var yDistance = pt.y - player.y;
	var xDistance = pt.x - player.x;
	
	if (Math.sqrt(yDistance*yDistance+xDistance*xDistance)<player.moveSpeed){
		player.x = pt.x;
		player.y = pt.y;
	}else{
		var radian = Math.atan2(yDistance, xDistance);
		player.x += Math.cos(radian) * player.moveSpeed;
		player.y += Math.sin(radian) * player.moveSpeed;
	}	
}

function updatePlayerSpeed(player, moveSpeed){
	player.energy--;
	if(player.energy <= 0){
		player.nextMoveSpeed = moveSpeed+(randomIntFromInterval(-5,5)*.1);
		player.energy = 50;	
	}
	player.moveSpeed -= (player.moveSpeed-player.nextMoveSpeed)/5;
}

function checkWallCollision(target, radius, bounce){
	var currentX = target.x;
	var currentY = target.y;
	
	if(bounce){
		currentX = target.oriX;
		currentY = target.oriY;	
	}
	
	for(var w = 0; w<wallData.length; w++){
		if(wallData[w].pos == 'bottom'){
			if(currentY + radius / 2 > wallData[w].y && currentY - radius / 2 < wallData[w].y+wallData[w].h && currentX + radius / 2 > wallData[w].x && currentX - radius / 2 < wallData[w].x+wallData[w].w ){
				if(bounce){
					playSound('soundHitwall');
					target.oriY = wallData[w].y - radius / 2;
					itemBall.yspeed = -itemBall.yspeed * ballBounceData.bounce;
				}else{
					target.y = wallData[w].y - radius / 2;	
				}
			}	
		}else if(wallData[w].pos == 'top'){
			if(currentY + radius / 2 > wallData[w].y && currentY - radius / 2 < wallData[w].y+wallData[w].h && currentX + radius / 2 > wallData[w].x && currentX - radius / 2 < wallData[w].x+wallData[w].w ){
				if(bounce){
					playSound('soundHitwall');
					target.oriY = (wallData[w].y+wallData[w].h) + radius / 2;
					itemBall.yspeed = -itemBall.yspeed * ballBounceData.bounce;
				}else{
					target.y = (wallData[w].y+wallData[w].h) + radius / 2;	
				}
			}
		}else if(wallData[w].pos == 'left'){
			if(currentX + radius / 2 > wallData[w].x && currentX - radius / 2 < wallData[w].x+wallData[w].w && currentY + radius / 2 > wallData[w].y && currentY - radius / 2 < wallData[w].y+wallData[w].h ){
				if(bounce){
					playSound('soundHitwall');
					target.oriX = (wallData[w].x+wallData[w].w) + radius / 2;
					itemBall.xspeed = -itemBall.xspeed * ballBounceData.bounce;
				}else{
					target.x = (wallData[w].x+wallData[w].w) + radius / 2;	
				}
			}
		}else if(wallData[w].pos == 'right'){
			if(currentX + radius / 2 > wallData[w].x && currentX - radius / 2 < wallData[w].x+wallData[w].w && currentY + radius / 2 > wallData[w].y && currentY - radius / 2 < wallData[w].y+wallData[w].h ){
				if(bounce){
					playSound('soundHitwall');
					target.oriX = wallData[w].x - radius / 2;
					itemBall.xspeed = -itemBall.xspeed * ballBounceData.bounce;
				}else{
					target.x = wallData[w].x - radius / 2;	
				}
			}
		}
	}	
}

function checkPlayerBallRange(){
	var ballDistance = getDistance(soccerPlayerData.userPlayer, itemBallShadow);
	
	if(ballDistance > 500){
		soccerPlayerData.followMouse = true;
	}else{
		soccerPlayerData.followMouse = false;
	}
}

function checkFollowMouse(){
	if(soccerFieldData.penalty){
		return;
	}
}

function chooseAwayTeam(){
	var teamArray = [];
	for(var n=0; n<team_arr.length; n++){
		if(gameData.teamHomeID != n){
			teamArray.push(n);
		}
	}
	shuffle(teamArray);
	gameData.teamAwayID = teamArray[0];
}