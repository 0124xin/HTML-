window.addEventListener("load",setTimer,false);
let p;
let button;
function setTimer(){
  p=document.getElementsByClassName('img-g')[0];
  button=document.querySelectorAll('.button-g span');
  for(let i=0;i<button.length;i++){
    button[i].style.backgroundColor='#eee';
    button[i].onclick=function(){
      p.style.left=-450*this.getAttribute('data-index')+'px'
      tog(this.getAttribute('data-index'))
      clearInterval(window.timer)
      window.timer=setInterval(move,3000);
    }
  
  }
  
  function tog(index){
    if(index>3){tog(0);return;}
    for(let i=0;i<button.length;i++){
      button[i].style.backgroundColor='#eee'
    }
    button[index].style.backgroundColor='rgb(215, 81, 15)';
  }
  p.onmouseover=function(){
    clearInterval(window.timer)
  }
  p.onmouseout=function(){
    window.timer=setInterval(move,3000);
  }
  window.timer=setInterval(move,3000);
}

function move(){
  if(parseInt(p.style.left)>-1800){
    p.style.left=parseInt(p.style.left)-450+'px'
    p.style.transition='left 1s';
    tog(-Math.round(parseInt(p.style.left)/450))
    if(parseInt(p.style.left)<=-1800){
        setTimeout(function(){
          tog(0)
          p.style.left='0px'
          p.style.transition='left 0s';
        },1000)
    }
  }else{
    p.style.left='0px'
    p.style.transition='left 0s';
  }
}



function tog(index){
  if(index>3){tog(0);return;}
  for(let i=0;i<button.length;i++){
    button[i].style.backgroundColor='#eee'
  }
  button[index].style.backgroundColor='rgb(215, 81, 15)';
}


