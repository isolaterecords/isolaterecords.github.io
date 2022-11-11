// isloate records

const sleep = ms => new Promise(res => setTimeout(res, ms));

function setoverlay(el,ovl){
  ovl.style.top = el.offsetTop +'px';
  ovl.style.left = el.offsetLeft +'px';
  ovl.style.height = el.offsetHeight +'px';
  ovl.style.width = el.offsetWidth +'px';
}

//vars
var currentpage = 'mainpage';

(async () => {
  let counter2 = 0;
  let head = document.getElementById('head');
  head.style.left = (window.innerWidth/2-head.offsetWidth/2)+"px";
  let pg = document.getElementById(currentpage);
  pg.style.display = 'none';

  let bgfader = 0;

  while (true){
    // hehe
    if (bgfader < 100){
      pg.style.display = 'block';
      bgfader += 0.5;
      document.body.style.backgroundImage = 'linear-gradient(to bottom, rgb('+(bgfader/100*194)+', '+(bgfader/100*124)+', '+(bgfader/100*4)+'), rgb('+(bgfader/100*164)+', '+(bgfader/100*63)+', 0)';
    }

    counter2 += 6;
    
    await sleep(2);
  }
})();
