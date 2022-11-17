// isloate records

const sleep = ms => new Promise(res => setTimeout(res, ms));

function setoverlay(el,ovl){
  ovl.style.top = el.offsetTop-6 +'px';
  ovl.style.left = el.offsetLeft-1 +'px';
  ovl.style.height = el.offsetHeight-17 +'px';
  ovl.style.width = el.offsetWidth+2 +'px';
}

function setoverlay2(el,ovl,left){
  ovl.style.top = el.offsetTop+5 +'px';
  ovl.style.left = (el.offsetLeft+window.innerWidth*left) +'px';
  ovl.style.height = el.offsetHeight-30 +'px';
  ovl.style.width = el.offsetWidth-1 +'px';
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
      //document.body.style.backgroundImage = 'linear-gradient(to bottom, rgb('+(bgfader/100*194)+', '+(bgfader/100*124)+', '+(bgfader/100*4)+'), rgb('+(bgfader/100*164)+', '+(bgfader/100*63)+', 0)';
    }

    //lets not
    // if (currentpage == 'mainpage'){
    //   settopborder('h00');
    // } else if (currentpage == 'aboutus'){
    //   settopborder('h01');
    // } else if (currentpage == 'artists'){
    //   settopborder('h02');
    // } else if (currentpage == 'ourteam'){
    //   settopborder('h03');
    // }

    counter2 += 6;

    showel('header0fade','rgb('+(window.scrollY-55)*10+','+(window.scrollY-55)*10+','+(window.scrollY-55)*10+')');
    showel('header1fade','rgb('+(window.scrollY-55)*10+','+(window.scrollY-55)*10+','+(window.scrollY-55)*10+')');
    showel('header2fade','rgb('+(window.scrollY-55)*10+','+(window.scrollY-55)*10+','+(window.scrollY-55)*10+')');
    showel('header3fade','rgb('+(window.scrollY-55)*10+','+(window.scrollY-55)*10+','+(window.scrollY-55)*10+')');
    
    await sleep(2);
  }
})();
