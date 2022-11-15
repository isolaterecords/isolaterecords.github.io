// isloate records

const sleep = ms => new Promise(res => setTimeout(res, ms));

function setoverlay(el,ovl){
  ovl.style.top = el.offsetTop +'px';
  ovl.style.left = el.offsetLeft +'px';
  ovl.style.height = el.offsetHeight-20 +'px';
  ovl.style.width = el.offsetWidth +'px';
}

function setoverlay2(el,ovl){
  ovl.style.top = el.offsetTop +'px';
  ovl.style.left = (el.offsetLeft+window.innerWidth*0.593) +'px';
  ovl.style.height = el.offsetHeight-20 +'px';
  ovl.style.width = el.offsetWidth+3 +'px';
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

  setoverlay(g('h'),g('emailoverlay'));
  setoverlay2(g('h2'),g('instaoverlay'));
  setoverlay2(g('e2'),g('linkoverlay'));
  setoverlay2(g('e3'),g('youtubeoverlay'));

  while (true){
    // hehe
    if (bgfader < 100){
      pg.style.display = 'block';
      bgfader += 0.5;
      //document.body.style.backgroundImage = 'linear-gradient(to bottom, rgb('+(bgfader/100*194)+', '+(bgfader/100*124)+', '+(bgfader/100*4)+'), rgb('+(bgfader/100*164)+', '+(bgfader/100*63)+', 0)';
    }

    counter2 += 6;

    showel('header0fade','rgb('+(window.scrollY-55)*10+','+(window.scrollY-55)*10+','+(window.scrollY-55)*10+')');
    showel('header1fade','rgb('+(window.scrollY-55)*10+','+(window.scrollY-55)*10+','+(window.scrollY-55)*10+')');
    showel('header2fade','rgb('+(window.scrollY-55)*10+','+(window.scrollY-55)*10+','+(window.scrollY-55)*10+')');
    showel('header3fade','rgb('+(window.scrollY-55)*10+','+(window.scrollY-55)*10+','+(window.scrollY-55)*10+')');
    
    await sleep(2);
  }
})();
