// isloate records

const sleep = ms => new Promise(res => setTimeout(res, ms));

function setoverlay(el,ovl){
  ovl.style.top = el.offsetTop +'px';
  ovl.style.left = el.offsetLeft +'px';
  ovl.style.height = el.offsetHeight +'px';
  ovl.style.width = el.offsetWidth +'px';
}

(async () => {
  let counter2 = 0;
  let head = document.getElementById('head');
  head.style.left = (window.innerWidth/2-head.offsetWidth/2)+"px";
  let hol = document.getElementById('headoverlay');
  let hol2 = document.getElementById('headoverlay2');
  let pg = document.getElementById('pagecontent');
  pg.style.display = 'none';
  setoverlay(head,hol);
  setoverlay(head,hol2);

  let bgfader = 0;

  while (true){
    // hehe
    if (counter2 < window.innerWidth*2){
      hol.style.left = 0+'px';
      hol.style.width = counter2+'px';
      hol2.style.left = counter2+'px';
      hol2.style.width = window.innerWidth+"px";
    } else if (bgfader < 100){
      pg.style.display = 'block';
      head.style.display = 'none';
      hol.style.display = 'none';
      hol2.style.display = 'none';
      bgfader += 0.5;
      document.body.style.backgroundImage = 'linear-gradient(to bottom, rgb('+(bgfader/100*194)+', '+(bgfader/100*124)+', '+(bgfader/100*4)+'), rgb('+(bgfader/100*164)+', '+(bgfader/100*63)+', 0)';

    }

    counter2 += 6;
    
    await sleep(2);
  }
})();
