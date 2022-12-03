const { locals } = require("../../../../first_micro");

async function changepage(page,header){
  // basically we fade out the current content and then change it up\

  // cancel if same
  if (currentpage == page){
    return; //terminate
  }
  let pc = document.getElementById(currentpage);
  const sleep = ms => new Promise(res => setTimeout(res, ms));

  disableheaders();
  selectheader(header);

  let fader1 = 100;
  while (fader1 > 0){

    pc.style.opacity = fader1/100;

    await sleep(2);
    fader1 -= 1;
  }
  hideallpages();

  pc = document.getElementById(page);
  currentpage = page;
  pc.style.display = 'block';

  if (page == 'mainpage'){
    document.body.style.backgroundImage = "url('images/large-banner.png')";
    document.getElementById('ovl-t').style.display = 'block';
  } else if (page == 'aboutus'){
    document.body.style.backgroundImage = "url('images/orange.png')";
    document.getElementById('ovl-t').style.display = 'block';
    document.getElementById('ovl-t').style.zIndex = -1;
  } else if (page == 'artists'){
    document.body.style.backgroundImage = "url('images/purple.png')";
    document.getElementById('ovl-t').style.display = 'block';
    document.getElementById('ovl-t').style.zIndex = -1;
  } else if (page == 'ourteam'){
    document.body.style.backgroundImage = "url('images/lightblue.png')";
    document.getElementById('ovl-t').style.display = 'block';
    document.getElementById('ovl-t').style.zIndex = -1;
  }

  fader1 = 0;
  while (fader1 < 100){

    // if (page == 'mainpage'){
    //   document.body.style.backgroundImage = "linear-gradient(to bottom, transparent, rgba(0,0,0,"+(100-fader1)+")),url('images/large-banner.png')";
    // } else {
    //   document.body.style.backgroundImage = "linear-gradient(to bottom, transparent, rgba(255,255,255,"+(100-fader1)+")),url('images/large-banner.png')";
    // }
    
    pc.style.opacity = fader1/100;

    await sleep(2);
    fader1 += 1;
  }
}

function hideallpages(){
  document.getElementById('mainpage').style.display = 'none';
  document.getElementById('aboutus').style.display = 'none';
  document.getElementById('ourteam').style.display = 'none';
  document.getElementById('artists').style.display = 'none';
}

function selectheader(h){
  let g = document.getElementById(h);
  g.style.borderBottom = '4px solid rgb(0,0,0)';

  addreactor(h,true);
}

function addreactor(el,selected){
  let g = document.getElementById(el);
  g.addEventListener('mouseover', function(event) {
    let y = document.getElementById(el);
    y.style.borderBottom = '4px solid rgb(255, 42, 0)';
  });
  g.addEventListener('mouseleave', function(event) {
    let y = document.getElementById(el);
    if (!selected){
      y.style.borderBottom = '2px solid rgb(255, 128, 0)';
    } else {
      y.style.borderBottom = '4px solid black';
    }
  });
}

function disableheaders(){
  document.getElementById('header0').style.borderBottom = '2px solid rgb(255, 128, 0)';
  document.getElementById('header1').style.borderBottom = '2px solid rgb(255, 128, 0)';
  document.getElementById('header2').style.borderBottom = '2px solid rgb(255, 128, 0)';
  document.getElementById('header3').style.borderBottom = '2px solid rgb(255, 128, 0)';

  addreactor('header0',false);
  addreactor('header1',false);
  addreactor('header2',false);
  addreactor('header3',false);
}

function showel(el,clr){
  document.getElementById(el).style.color = clr;
}

function g(el){
  return document.getElementById(el);
}

function setbg(el,bg){
  document.getElementById(el).style.backgroundColor = bg;
}

function changesrc(el,src){
  document.getElementById(el).src = src;
}

function resetborders(){
  document.getElementById("h00").style.borderTop = '0px solid orangered';
  document.getElementById("h01").style.borderTop = '0px solid orangered';
  document.getElementById("h02").style.borderTop = '0px solid orangered';
  document.getElementById("h03").style.borderTop = '0px solid orangered';
}

function settopborder(el){
  resetborders();
  document.getElementById(el).style.borderTop = '3px solid orangered';
}

function showmail(){
  showmail1 = true;
}

function hidemail(){
  hidemail1 = true;
}

function toggletheme(){
  if (theme == 'light'){
    theme = 'dark';
    localStorage.setItem('theme','dark');
    var r = document.querySelector(':root');
    var rs = getComputedStyle(r);
    let holder = rs.getPropertyValue('--darkbg')
    r.style.setProperty('--bg', holder);
    holder = rs.getPropertyValue('--darkmain')
    r.style.setProperty('--main', holder);
    holder = rs.getPropertyValue('--darkaccent')
    r.style.setProperty('--accent', holder);
    holder = rs.getPropertyValue('--darkcontrast')
    r.style.setProperty('--contrast', holder);
    holder = rs.getPropertyValue('--darkslight')
    r.style.setProperty('--slight', holder);
    
  } else {
    theme = 'light';
    localStorage.setItem('theme','light');
    var r = document.querySelector(':root');
    var rs = getComputedStyle(r);
    let holder = rs.getPropertyValue('--lightbg')
    r.style.setProperty('--bg', holder);
    holder = rs.getPropertyValue('--lightmain')
    r.style.setProperty('--main', holder);
    holder = rs.getPropertyValue('--lightaccent')
    r.style.setProperty('--accent', holder);
    holder = rs.getPropertyValue('--lightcontrast')
    r.style.setProperty('--contrast', holder);
    holder = rs.getPropertyValue('--lightslight')
    r.style.setProperty('--slight', holder);
  }
}