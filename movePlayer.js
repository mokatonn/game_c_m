function possibleMove(s,pos,idxPl){
  // function that returns a all possible movements of a player at position pos

  var mat_move = Array(s).fill(0).map(()=>Array(s).fill(0));

  var x = pos[0]-1;
  var y = pos[1]-1;

  if(x > 0 && x < s-2 && y > 0 && y < s-2){ // selected character is not at the border
    for(j1=0;j1<=2;j1++){
      for(j2=0;j2<=2;j2++){

        if(map_movement[x + j1][y + j2] == 1 && map_player[x + j1][y + j2] != idxPl){
          if(map_player[x + j1][y + j2] == 0){ // no enemy on this field
            mat_move[x + j1][y + j2] = 1;
            map_player[x + j1][y + j2] = 5;
          }else{
            mat_move[x + j1][y + j2] = 1;
            map_player[x + j1][y + j2] = 6;
          }

        }
      }
    }
  }else{
    // implement cases if character is at border
  }


  mat_move[x][y] = 1; // current position of selected character

  return mat_move;
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
