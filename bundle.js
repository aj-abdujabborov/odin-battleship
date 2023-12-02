(()=>{"use strict";const t=document.querySelector("dialog.winner-announcement"),e={player:document.querySelector("div.player-board"),opponent:document.querySelector("div.opponent-board"),playerBeingAttacked:document.querySelector(".player-container .receiving-attack"),opponentBeingAttacked:document.querySelector(".opponent-container .receiving-attack"),resetButton:document.querySelector(".reset-button"),winnerDialog:{dialog:t,emoji:t.querySelector(".emoji"),emoji2:t.querySelector(".emoji2"),text:t.querySelector(".announcement"),close:t.querySelector(".close-button")}},n=function(){function t(t,e,n,o){function r(t,e){return Object.keys(t).find((n=>t[n]===e))}o.textContent="";const i=t.length;for(let s=i-1;s>=0;s-=1)for(let a=0;a<i;a+=1){const i=document.createElement("div");i.dataset.x=a,i.dataset.y=s,i.classList.add(n[r(e,t[a][s])],"cell"),o.appendChild(i)}}function n(t){return t[Math.floor(Math.random()*t.length)]}return{refreshView:function(n){var o;t(n.opponentBoard,n.opponentBoardKey,{unknown:"empty",noShip:"hit",hitShip:"hit-ship",sunkShip:"sunk-ship"},e.opponent),t(n.playerBoard,n.playerBoardKey,{unhitEmpty:"empty",hitEmpty:"hit",unhitShip:"unhit-ship",hitShip:"sunk-ship"},e.player),n.turn&&(o=n.turn,e.playerBeingAttacked.classList.remove("active"),e.opponentBeingAttacked.classList.remove("active"),"player"===o?e.opponentBeingAttacked.classList.add("active"):e.playerBeingAttacked.classList.add("active"))},announceWinner:function(t){e.winnerDialog.emoji.classList.remove("winner","loser"),e.winnerDialog.emoji2.classList.remove("winner","loser"),e.winnerDialog.emoji2.textContent="","player"===t?(e.winnerDialog.emoji.textContent="🥳",e.winnerDialog.emoji.classList.add("winner"),e.winnerDialog.emoji2.textContent="🌈",e.winnerDialog.emoji2.classList.add("winner"),e.winnerDialog.text.textContent=n(["Ummm, should you... be a general? You won!","Winner winner, blueberry pie dinner","How to account for you defeating the bot? Man you are nooooon-stop!","You won! ...Oh don't worry about the AI. It probably can't feel anything..."])):(e.winnerDialog.emoji.textContent="😕",e.winnerDialog.emoji.classList.add("loser"),e.winnerDialog.emoji2.classList.add("loser"),e.winnerDialog.text.textContent=n(["Wouldn't be fun if you never lost :)","You lost... but it's ok","You lost the game, but you can win at life","You lost. That doesn't mean you didn't have fun!"])),e.winnerDialog.dialog.showModal()}}}();class o{constructor(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;if(!Number.isInteger(t)||t<0)throw Error("Length must be a non-negative integer.");this.numHits=0,this.length=t}hit(){this.numHits+=1}isSunk(){return this.numHits>=this.length}}const r={plus:(t,e)=>t.map(((t,n)=>t+e[n])),mult:(t,e)=>t.map(((t,n)=>t*e[n])),minus:(t,e)=>t.map(((t,n)=>t-e[n]))},i={directionToArray:{left:[-1,0],right:[1,0],up:[0,1],down:[0,-1]},areCoordsEqual:(t,e)=>t.length===e.length&&t.every(((t,n)=>t===e[n])),doesListIncludeCoord(t,e){return t.some((t=>this.areCoordsEqual(t,e)))},areCoordsWithinRange:(t,e,n)=>t.every((t=>t>=e&&t<=n)),get2DBoard(t,e){const n=[];for(let o=0;o<t;o+=1){n.push([]);for(let r=0;r<t;r+=1)n[o].push(e(o,r))}return n},getBoxCoordinates(t,e,n,o){const i=[];for(let s=0;s<o;s+=1){const o=r.plus([t,e],r.mult(this.directionToArray[n],[s,s]));i.push(o)}return i},get4Neighbors(t,e,n){const o=Object.keys(this.directionToArray).sort((()=>Math.random()-.5)),i=[];return o.forEach((o=>{const s=r.plus([t,e],this.directionToArray[o]);this.areCoordsWithinRange(s,0,n-1)&&i.push(s)})),i},getOrthogonalNeighbors(t,e){const n=this.directionToArray[e].map((t=>Math.abs(t))).map((t=>!t)),o=[];return o.push(r.plus(t,n)),o.push(r.minus(t,n)),o},getSurroundingValues(t,e,n,o,i){const{areCoordsWithinRange:s}=this,a={list:[],save(t){s(t,0,i-1)&&this.list.push(t)}},u=this.directionToArray[o];a.save(r.minus([t,e],u)),a.save(r.plus([t,e],r.mult(u,[n,n])));const l=r.minus([t,e],u);return this.getBoxCoordinates(l[0],l[1],o,n+2).forEach((t=>this.getOrthogonalNeighbors(t,o).forEach((t=>{a.save(t)})))),a.list}};class s{constructor(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:10;this.dim=t,this.board=s.buildBoard(this.dim),this.ships=[]}areAllShipsDown(){for(let t=0;t<this.ships.length;t+=1)if(!this.ships[t].ship.isSunk())return!1;return!0}isShipDown(t,e){return this.board[t][e].ship?this.board[t][e].ship.isSunk():null}isShipHitAtCoord(t,e){return this.board[t][e].ship&&this.board[t][e].attacked}isAttacked(t,e){return this.board[t][e].attacked}receiveAttack(t,e){if(!this.board[t][e].attacked&&(this.board[t][e].attacked=!0,this.board[t][e].ship&&this.board[t][e].ship.hit(),this.isShipDown(t,e))){const n=this.ships.find((n=>n.ship===this.board[t][e].ship)),o=i.getSurroundingValues(n.x,n.y,n.length,n.dir,this.dim);console.log(o),o.forEach((t=>{this.board[t[0]][t[1]].attacked=!0}))}}static getInsiderKey(){return{unhitEmpty:1,hitEmpty:2,unhitShip:3,hitShip:4}}getInsiderKnowledge(){const t=s.getInsiderKey();return this.iterator((e=>e.ship?e.attacked?t.hitShip:t.unhitShip:e.attacked?t.hitEmpty:t.unhitEmpty))}static getOutsiderKey(){return{unknown:1,noShip:2,hitShip:3,sunkShip:4}}getOutsiderKnowledge(){const t=s.getOutsiderKey();return this.iterator((e=>e.attacked?e.ship?e.ship.isSunk()?t.sunkShip:t.hitShip:t.noShip:t.unknown))}placeShip(t,e,n,r){const s=i.getBoxCoordinates(t,e,r,n);s.forEach((t=>{if(!i.areCoordsWithinRange(t,0,this.dim-1))throw Error("Ship is out of board range");if(this.board[t[0]][t[1]].ship)throw Error("Ship overlaps with existing ship")}));const a=new o(n);this.ships.push({ship:a,x:t,y:e,length:n,dir:r}),s.forEach((t=>{this.board[t[0]][t[1]].ship=a}))}iterator(t){return this.board.map((e=>e.map(t)))}static buildBoard(t){return i.get2DBoard(t,(()=>({attacked:!1})))}}function a(t,e){const n=[...e].sort(),o=i.get2DBoard(t,(()=>!1)),s=[];for(;n.length;){const e=["up","right"],a=e[Math.floor(Math.random()*e.length)],u=i.directionToArray[a],l=n[n.length-1],h=t-l;if(h<0)throw Error(`Ship of size ${l} is too large to fit into board with dimension ${t}`);const c=Math.floor(Math.random()*t),p=Math.floor(Math.random()*(h+1));let d;d="up"===a?[c,p]:[p,c];const g=[];for(let t=0;t<l;t+=1){const e=r.plus(d,r.mult(u,[t,t]));o[e[0]][e[1]]||g.push(e)}g.length===l&&(s.push({x:d[0],y:d[1],dir:a,length:l}),n.pop(),[...i.getSurroundingValues(d[0],d[1],l,a,t),...g].forEach((t=>{o[t[0]][t[1]]=!0})))}return s}const u=function(){let t,e,n,o;function u(){o="player"===o?"opponent":"player"}function l(){const u=[5,4,4,3,3,2,2,1];t={player:new s(10),opponent:new s(10)},Object.keys(t).forEach((e=>{let o;"player"===e?o=a(10,u):(n=function(){let t=null,e=null,n=null;return{getMove:function(o,s){const a=o.length;function u(){return n&&o[n[0]][n[1]]===s.hitShip}var l,h;t&&o[t[0]][t[1]]===s.hitShip&&u()?(l=n,h=t,r.minus(l,h).find((t=>0!==t))>0?e=n:t=n):u()&&(t=n,e=n);let c=function(){if(!t)return;const n=r.minus(e,t).map((t=>0===t?0:1));if(i.areCoordsEqual(n,[0,0]))return i.get4Neighbors(t[0],t[1],a).find((t=>o[t[0]][t[1]]===s.unknown));const u=[r.plus(e,n),r.minus(t,n)];u.sort((()=>Math.random-.5));for(let t=0;t<u.length;t+=1){const e=u[t];if(i.areCoordsWithinRange(e,0,a-1)&&o[e[0]][e[1]]===s.unknown)return e}}();return c||(c=function(){const t=[];o.forEach(((e,n)=>e.forEach(((e,o)=>{e===s.unknown&&t.push([n,o])}))));const e=Math.floor(Math.random()*t.length);return t[e]}(),t=null,e=null),n=c,c},getShipPlacements:function(t,e){return a(t,e)}}}(),o=n.getShipPlacements(10,u)),o.forEach((n=>{t[e].placeShip(n.x,n.y,n.length,n.dir)}))})),o="player",e=null}function h(){return null!==e}return l(),{restart:l,applyPlayerMove:function(n,r){return"opponent"!==o&&null===e&&!t.opponent.isAttacked(n,r)&&(t.opponent.receiveAttack(n,r),t.opponent.areAllShipsDown()&&(e=!0),u(),!0)},requestAIMove:function(){if("player"===o||null!==e)return!1;const[r,i]=n.getMove(t.player.getOutsiderKnowledge(),s.getOutsiderKey());return t.player.receiveAttack(r,i),t.player.areAllShipsDown()&&(e=!1),u(),!0},whoseTurn:function(){return o},getGameFromPlayerPOV:function(){return{playerBoard:t.player.getInsiderKnowledge(),playerBoardKey:s.getInsiderKey(),opponentBoard:t.opponent.getOutsiderKnowledge(),opponentBoardKey:s.getOutsiderKey()}},isGameOver:h,didPlayerWin:function(){return h()?e:null}}}(),l=function(){function t(t){n.refreshView({...u.getGameFromPlayerPOV(),turn:t||u.whoseTurn()}),u.isGameOver()&&n.announceWinner(u.didPlayerWin()?"player":"opponent")}let e=!0;return t(),{playerMoves:function(n,o){e&&u.applyPlayerMove(n,o)&&(e=!1,t(),u.isGameOver()?e=!0:(u.requestAIMove(),setTimeout((()=>t("opponent")),300),setTimeout((()=>{t(),e=!0}),500)))},resetGame:function(){u.restart(),t()}}}();e.opponent.addEventListener("click",(t=>{if(!t.target.classList.contains("cell"))return;const{x:e,y:n}=t.target.dataset;l.playerMoves(e,n)})),e.resetButton.addEventListener("click",(()=>{l.resetGame()})),e.winnerDialog.close.addEventListener("click",(()=>{e.winnerDialog.dialog.close()}))})();