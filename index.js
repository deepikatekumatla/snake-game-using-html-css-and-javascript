var boxsize=25;
var rows=20; 
var cols=20;
var board;
var ctx;
var food;
var snake=[[1,1]];
var fx;
var fy;
var speed=1;
var score=0;
var snakex=0;
var snakey=0;
var dir_change = "false";
window.onload = function()
{
    board=document.getElementById("container");
    board.height = rows*boxsize;
    board.width = cols*boxsize;
    ctx = board.getContext("2d");
    food();
    ctx.fillStyle = "red";
    ctx.fillRect(snake[0][0],snake[0][1],boxsize,boxsize);

};
var mymove;
var mycheck;
var key;
function move(){
  
    ctx.fillStyle = "red";
    var i;
   if(snake.length>1)
   {
        ctx.clearRect(snake[0][0], snake[0][1], boxsize,boxsize);
        for(i=1 ; i<snake.length ; i++)
        {
            
            snake[i-1][0]=snake[i][0];
            snake[i-1][1]=snake[i][1];
            ctx.fillRect(snake[i-1][0], snake[i-1][1], boxsize, boxsize);
        }
         snake[snake.length-1][0]+=snakex*boxsize;
        snake[snake.length-1][1]+=snakey*boxsize;
        ctx.fillRect(snake[snake.length-1][0], snake[snake.length-1][1], boxsize, boxsize);
        stopsound("music_music");
        playsound("music_move");
        gameover();
       
   }
   else
   {
      ctx.clearRect(snake[0][0], snake[0][1], boxsize, boxsize);
       snake[snake.length-1][0]+=snakex*boxsize;
       snake[snake.length-1][1]+=snakey*boxsize;
       

        ctx.fillRect(snake[snake.length-1][0], snake[snake.length-1][1], boxsize, boxsize);
        stopsound("music_music");
        playsound("music_move");
        gameover();
   }
  
}
    

document.addEventListener("keydown",function(event){
    key=event.keyCode;
    document.querySelector("h1").innerHTML = "";
    window.clearInterval(mymove);
    mymove = window.setInterval(move,200);
    window.clearInterval(mycheck);
    mycheck = window.setInterval(check,100);
    //up key
   // ctx.clearRect(presentx,presenty, presentlenx,presentleny);
    if(key==38)
    {
       snakex=0;
       snakey=-1;
      
     move();
        
    }
    //down key
    if(key==40)
    {
       snakex=0;
       snakey=1; 
      
      
       move();
        
    }
    //eft key
    if(key==37)
    {
       snakex=-1;
       snakey=0;
     
       move();
    }
    //right key
    if(key==39)
    {
       snakex=1;
       snakey=0;
       move();
    }
});
function food(){
  
   var x=Math.random();
    fx=Math.floor(x*rows*(boxsize-5))+5;
    var y=Math.random();
    fy=Math.floor(y*cols*(boxsize-5))+5;
   //var fd = myCanvas.getContext("2d");
    var m;
    var d;
    for(var i=0 ; i<snake.length; i++)
    {
        if(snake[i][0]>fx)
        {
            m=snake[i][0]-fx;
        }
        else
        {
            m=fx-snake[i][0];
        }
        if(snake[i][1]>fy)
        {
            m+=snake[i][1]-fy;
        }
        else
        {
            m+=fy-snake[i][1];
        }
    //  var x=(snake[snake.length-1][0]-snake[i][0])+(snake[snake.length-1][1]-snake[i][1]);
        if(m>2)
        {
            d="true";
            ctx.fillStyle = "yellow";
          ctx.fillRect(fx,fy, boxsize, boxsize);
          break;
        }
        else
        {
           d="false";
        }
    }
    if(d=="false")
    {
        food();
    }

    
    //ctx.clearRect(wid,hei,20,10);
}
function check(){
    var m=snake.length;
    var d;
    if(fx>snake[m-1][0])
    {
       d=fx-(snake[m-1][0]);
    }
    else
    {
        d=(snake[m-1][0])-fx;
    }
    if(fy>snake[m-1][1])
    {
       d+=fy-(snake[m-1][1]);
    }
    else
    {
        d+=(snake[m-1][1])-fy;
    }

    if(d<=50)
    {
       // snake[m][0]=fx;
       // snake[m][1]=fy;
        ctx.clearRect(fx,fy,boxsize,boxsize);
       
       // var m=snake[snake.length-1][0]+1;
       // var n=snake[snake.length-1][1];
       // var r=[m,n];
        playsound("music_food");
        if(key==38)
        {
            score+=1;
            document.querySelector("h3").innerHTML="Score : "+score;
            snake.push([snake[snake.length-1][0],snake[snake.length-1][1]-boxsize]);
            ctx.fillRect(snake[snake.length-1][0],snake[snake.length-1][1],boxsize,boxsize);
            food();
        }
        if(key==40)
        {
            score+=1;
            document.querySelector("h3").innerHTML="Score : "+score;
            snake.push([snake[snake.length-1][0],snake[snake.length-1][1]+boxsize]);
            ctx.fillRect(snake[snake.length-1][0],snake[snake.length-1][1],boxsize,boxsize);
            food();
        }
        if(key==37)
        {
            score+=1;
            document.querySelector("h3").innerHTML="Score : "+score;
            snake.push([snake[snake.length-1][0]-boxsize,snake[snake.length-1][1]]);
            ctx.fillRect(snake[snake.length-1][0],snake[snake.length-1][1],boxsize,boxsize);
            food();
        }
        if(key==39)
        {
            score+=1;
            document.querySelector("h3").innerHTML="Score : "+score;
            snake.push([snake[snake.length-1][0]+boxsize,snake[snake.length-1][1]]);
            ctx.fillRect(snake[snake.length-1][0],snake[snake.length-1][1],boxsize,boxsize);
            food();
        }
    }
}
function gameover(){
    var x;
    if(snake[snake.length-1][0]+boxsize>=rows*boxsize||snake[snake.length-1][0]+boxsize<=0||snake[snake.length-1][1]+boxsize>=cols*boxsize||snake[snake.length-1][1]+boxsize<=0)
    {
        window.clearInterval(mymove);
        window.clearInterval(mycheck);
            document.querySelector("h1").innerHTML="Game Over!!!!!!!";
            playsound("music_gameover");

       
        setTimeout(function(){
            location.reload();
        },3000);
    }
    if(snake.length>4)
    {
        for(var i=0 ; i<snake.length/2+1; i++)
        {
            if(snake[snake.length-1][0]>snake[i][0])
            {
                x=snake[snake.length-1][0]-snake[i][0];
            }
            else
            {
                x=snake[i][0]-snake[snake.length-1][0];
            }
            if(snake[snake.length-1][1]>snake[i][1])
            {
                x+=snake[snake.length-1][1]-snake[i][1];
            }
            else
            {
                x+=snake[i][1]-snake[snake.length-1][1];
            }
        //  var x=(snake[snake.length-1][0]-snake[i][0])+(snake[snake.length-1][1]-snake[i][1]);
            if(x<=2 )
            {
                window.clearInterval(mymove);
                window.clearInterval(mycheck);
                    document.querySelector("h1").innerHTML="Game Over!!!!!!!";
                    playsound("music_gameover");
                
                setTimeout(function(){
                    location.reload();
                },3000);
              
            
            }
        }
    }
    

}
function playsound(x)
{

      var audio = new Audio("./sounds/"+x+".mp3");
      audio.play();

}
function stopsound(x)
{

      var audio1 = new Audio("./sounds/"+x+".mp3");
      audio1.pause();

}


