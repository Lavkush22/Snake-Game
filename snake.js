
function init(){
   canvas=document.getElementById('mycanvas');
   W=canvas.width=800;
   H=canvas.height=600;
   pen=canvas.getContext('2d');
   cs=30;
   game_over=false;
   score=5;
   food_img=new Image();
   food_img.src="app.png";
   trophy =new Image();
   trophy.src="t.png";
   food=getRandomFood();
   snake={
         init_len:3,
         color:"blue",
         cells:[],
         direction:"right",

         creatSnake:function(){
         	for(var i=this.init_len;i>0;i--){
         		this.cells.push({x:i,y:0});
         	}
         },
         drawSnake:function(){
         	for(var i=0;i<this.cells.length;i++){
               pen.fillStyle=this.color;
         	   pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-3,cs-3);
           }
         },
         updateSnake:function(){
            var headX=this.cells[0].x;
            var headY=this.cells[0].y;

            if(headX==food.x && headY==food.y){
               food=getRandomFood();
               score++;
            }else{
            this.cells.pop();
            }

            var nextX,nextY;
            if(this.direction=="right"){
               nextX=headX+1;
               nextY=headY;
            }
            else if(this.direction=="left"){
               nextX=headX-1;
               nextY=headY;
            }
            else if(this.direction=="down"){
               nextX=headX;
               nextY=headY+1;
            }
            else{
               nextX=headX;
               nextY=headY-1;
            }
            this.cells.unshift({x:nextX,y:nextY});

            var last_x=Math.round(W/cs);
            var last_y=Math.round(H/cs);
            if(this.cells[0].y<0 || this.cells[0].x<0 || this.cells[0].x>last_x || this.cells[0].y>last_y){
               game_over=true;
            }

         }
   };
   snake.creatSnake();
   function KeyPressed(e){
      if(e.key=="ArrowRight"){
        snake.direction="right"; 
   }else if(e.key=="ArrowLeft"){
      snake.direction="left";
   }else if(e.key=="ArrowDown"){
      snake.direction="down";
   }else{
      snake.direction="up";
   }
}
   //Add a Event Listener on the document object
   document.addEventListener('keydown',KeyPressed);
}

function draw(){
//erase the old snake
pen.clearRect(0,0,W,H);
snake.drawSnake();
pen.fillStyle=food.color;
pen.drawImage(food_img,food.x*cs,food.y*cs,cs,cs);
pen.drawImage(trophy,700,10,cs+40,cs+30);

pen.fillStyle="black";
pen.font="20px roboto";
pen.fillText(score,730,35);
}

function update(){
snake.updateSnake();
}

function getRandomFood(){
   var foodX=Math.round(Math.random()*(W-cs)/cs);
   var foodY=Math.round(Math.random()*(H-cs)/cs);
   var food={
      x:foodX,
      y:foodY,
   }
    return food;
}

function gameLoop(){
   if(game_over==true){
      clearInterval(f);
      alert("Game Over");
   }
 draw();
 update();
}
init();
var f=setInterval(gameLoop,200);
