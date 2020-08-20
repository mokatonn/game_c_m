function possibleMove(s,charObj){
  // function that returns a all possible movements of a player at position pos

  var mat_move = [];
  var tmp = charObj.position;

  mat_move[0] = tmp;
  mat_move[0].type = "current";
  var x = charObj.position.x;
  var y = charObj.position.y;

  if(x > 0 && x < s-2 && y > 0 && y < s-2){ // selected character is not at the border
    //tmp = { x: x, y: y-1};
    checkMoveAttack(tmp = { x: x, y: y-1},charObj);
    if(tmp.type != "false"){
      mat_move[1] = tmp;
    }

    checkMoveAttack(tmp = { x: x, y: y+1},charObj);
    if(tmp.type != "false"){
      mat_move[2] = tmp;
    }

    checkMoveAttack(tmp = { x: x-1, y: y},charObj);
    if(tmp.type != "false"){
      mat_move[3] = tmp;
    }

    checkMoveAttack(tmp = { x: x+1, y: y},charObj);
    if(tmp.type != "false"){
      mat_move[4] = tmp;
    }
  }else{
    // implement cases if character is at border
  }


  //mat_move[x][y] = 1; // current position of selected character

  return mat_move;
}

function checkMoveAttack(posObj,charObj){
  if(map_movement[posObj.x][posObj.y] == 1 && map_player[posObj.x][posObj.y].playerId != charObj.playerId){
    if(map_player[posObj.x][posObj.y] == 0){ // no enemy in field
      posObj.type = "movement";
    }else{
      posObj.type = "attack";
    }
  }else{
      posObj.type = "false";
  }
}

function getNeighbours(mat,i1,i2){
  // add corner etc!!
  matNeighbour = Array(3).fill(0).map(()=>Array(3).fill(0));
  // matNeighbour[0][0] = mat[i1-1,i2-1];
  sumN = 0;
  for(j1=0;j1<=2;j1++){
    for(j2=0;j2<=2;j2++){
      matNeighbour[j1][j2] = mat[i1-1+j1][i2-1+j2];
      sumN += matNeighbour[j1][j2];
    }
  }
  return [matNeighbour, sumN];
}
