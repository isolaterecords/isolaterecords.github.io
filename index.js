// isloate records

const sleep = ms => new Promise(res => setTimeout(res, ms));

function setoverlay(el,ovl){
  ovl.style.top = el.offsetTop +'px';
  ovl.style.left = el.offsetLeft-51 +'px';
  ovl.style.height = el.offsetHeight +'px';
  ovl.style.width = el.offsetWidth+ 50 +'px';
}

//vars
var currentpage = 'mainpage';
var showmail1 = false;
var hidemail1 = false;
var theme = localStorage.getItem('theme');
if (theme == null){
  theme = 'light';
  localStorage.setItem('theme','light');
}

let lasttoggle = new Date();

settheme(1000);

var ur = window.location.href;
if (ur.includes('#aboutus')){
  hideallpages();
  changepage('aboutus','header1fade');
} else if (ur.includes('#artists')){
  hideallpages();
  changepage('artists','header2fade');
} else if (ur.includes('#ourteam')){
  hideallpages();
  changepage('ourteam','header3fade');
}

let ovt = document.getElementById('ovl-t');
let vbox = document.getElementById('vbox');
let tbox = document.getElementById('tbox');
let pc = document.getElementById('pc');
let ouryt = document.getElementById('ouryt');
let starter1 = document.getElementById('starter1');
let starter2 = document.getElementById('starter2');

console.log(vbox.offsetTop);

vbox.style.marginTop = window.innerHeight-tbox.offsetHeight+'px';
ouryt.style.marginTop = window.innerHeight-tbox.offsetHeight+100+'px';
starter1.style.marginTop = window.innerHeight-tbox.offsetHeight+100+'px';
starter2.style.marginTop = window.innerHeight-tbox.offsetHeight+100+'px';

ovt.style.top = vbox.offsetTop+tbox.marginTop+150+'px';

(async () => {
  let counter2 = 0;
  let head = document.getElementById('head');
  head.style.left = (window.innerWidth/2-head.offsetWidth/2)+"px";
  let pg = document.getElementById(currentpage);
  pg.style.display = 'none';

  let e = 0;

  setoverlay(g("i0"),g('mailhover'));
  g('mailhover').style.left = '-200px';

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

    if (window.scrollY <= 100){
      document.getElementById('backtotop').style.top = ((100-window.scrollY)/100*15)+85+'%'; //85 max
    }

    counter2 += 6;

    // mail animations
    if (showmail1){
      let y = g('mailhover');

      console.log('showing', y.offsetLeft);

      if (y.offsetLeft < 75){
        y.style.left = y.offsetLeft+(90-y.offsetLeft)/25 + 'px';
      } else {
        showmail1 = false;
      }
    } else if (hidemail1){
      let y = g('mailhover');
    
      console.log('hiding');
      if (y.offsetLeft > -160){
        y.style.left = y.offsetLeft-(y.offsetLeft+200)/50 + 'px';
      } else {
        hidemail1 = false;
      }
    }

    showel('header0fade','rgb('+(window.scrollY-55)*10+','+(window.scrollY-55)*10+','+(window.scrollY-55)*10+')');
    showel('header1fade','rgb('+(window.scrollY-55)*10+','+(window.scrollY-55)*10+','+(window.scrollY-55)*10+')');
    showel('header2fade','rgb('+(window.scrollY-55)*10+','+(window.scrollY-55)*10+','+(window.scrollY-55)*10+')');
    showel('header3fade','rgb('+(window.scrollY-55)*10+','+(window.scrollY-55)*10+','+(window.scrollY-55)*10+')');
    
    if (e % 10 == 0){
      let h = Math.max( document.body.scrollHeight, document.body.offsetHeight);

      //pc.offsetheight+pc.offsettop is the total height we want it at
      ovt.style.height = ((h-ovt.offsetTop)+50)+'px';

    }

    e += 1;

    await sleep(2);
  }
})();
