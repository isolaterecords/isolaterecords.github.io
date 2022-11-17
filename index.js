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

(async () => {
  let counter2 = 0;
  let head = document.getElementById('head');
  head.style.left = (window.innerWidth/2-head.offsetWidth/2)+"px";
  let pg = document.getElementById(currentpage);
  pg.style.display = 'none';

  setoverlay(g("i0"),g('mailhover'));

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
      if (y.offsetLeft > -50){
        y.style.left = y.offsetLeft-(y.offsetLeft+100)/50 + 'px';
      } else {
        hidemail1 = false;
      }
    }

    showel('header0fade','rgb('+(window.scrollY-55)*10+','+(window.scrollY-55)*10+','+(window.scrollY-55)*10+')');
    showel('header1fade','rgb('+(window.scrollY-55)*10+','+(window.scrollY-55)*10+','+(window.scrollY-55)*10+')');
    showel('header2fade','rgb('+(window.scrollY-55)*10+','+(window.scrollY-55)*10+','+(window.scrollY-55)*10+')');
    showel('header3fade','rgb('+(window.scrollY-55)*10+','+(window.scrollY-55)*10+','+(window.scrollY-55)*10+')');
    
    await sleep(2);
  }
})();
