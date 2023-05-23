async function changepage(page,header){
  // basically we fade out the current content and then change it up\

  //TH1M3c6V.qsE61RzeUgaNkzMFvUcGtU-zbbTN6cL7o
  
  // cancel if same
  if (currentpage == page){
    return; //terminate
  }
  let pc = document.getElementById(currentpage);
  const sleep = ms => new Promise(res => setTimeout(res, ms));

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
  
  console.log('started changing process');

  disableheaders();

  if (header != null){
    selectheader(header);
  }

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
  document.getElementById('backtotop').style.display = 'block';

  document.body.style.width = window.innerWidth+'px';
  document.getElementById('aboutus').style.width = window.innerWidth*1+'px';    

  if (page == 'mainpage'){
    document.body.style.backgroundImage = "url('images/large-banner.png')";
    document.getElementById('ovl-t').style.display = 'block';
  } else if (page == 'aboutus'){
    document.body.style.backgroundImage = "url('images/orange.png')";
    document.getElementById('ovl-t').style.display = 'block';
    document.getElementById('ovl-t').style.zIndex = -1;

    if (mobileoverride){
      document.getElementById('backtotop').style.display = 'none';
      document.getElementById('aboutus').style.background = "var(--bg)";
      document.getElementById('aboutus').style.marginLeft = window.innerWidth*0+'px';    
      document.getElementById('aboutus').style.width = window.innerWidth*1.15+'px';    
      document.getElementById('ouryt').style.background = 'rgba(0,0,0,0)';
      document.getElementById('ouryt').style.width = window.innerWidth*0.8+'px';
      document.getElementById('ouryt').style.marginLeft = window.innerWidth*0.15+'px';
      document.getElementById('b3').style.marginLeft = (window.innerWidth-document.getElementById('b3').offsetWidth)/2+'px';
      document.body.style.width = window.innerWidth*1.1+'px';
    }
  } else if (page == 'artists'){
    document.body.style.backgroundImage = "url('images/purple.png')";
    document.getElementById('ovl-t').style.display = 'block';
    document.getElementById('ovl-t').style.zIndex = -1;
  } else if (page == 'ourteam'){
    console.log('shud be changing to ourteam');
    document.body.style.backgroundImage = "url('images/lightblue.png')";
    document.getElementById('ovl-t').style.display = 'block';
    document.getElementById('ovl-t').style.zIndex = -1;
  } else if (page == 'account'){
    console.log('shud be changing to account');
    document.body.style.backgroundImage = "url('images/lightblue.png')";
    document.getElementById('ovl-t').style.display = 'none';
    document.getElementById('ovl-t').style.zIndex = -1;

    if (localStorage.getItem('isolateaccount') != null && localStorage.getItem('isolateaccount') != "loggedout"){
      document.getElementById('loggerin').style.display = 'none'; 
      document.getElementById('creator').style.display = 'none';
      document.getElementById('accessor').style.display = 'none';
      document.getElementById('inside').style.display = 'block';
      document.getElementById('dashdisp').textContent = 'Welcome, '+localStorage.getItem('isolateaccount');
    } else {
      document.getElementById('loggerin').style.display = 'none'; 
      document.getElementById('creator').style.display = 'none';
      document.getElementById('inside').style.display = 'none';
      document.getElementById('accessor').style.display = 'block';

      document.getElementById("upload").addEventListener("change", handleFiles, false);    }
  } else {
    console.log('got to it');
    document.getElementById('register').style.display = 'block';
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

function hashCode(string){
  var hash = 0;
  for (var i = 0; i < string.length; i++) {
      var code = string.charCodeAt(i);
      hash = ((hash<<5)-hash)+code;
      hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
}

function attemptlogin(){
  //attempts the login
  let user = document.getElementById('theusername').value;
  let pwd = document.getElementById('thepassword').value;

  document.getElementById('login').textContent = "Logging in...";

  (async () => {
    console.log('fetching');
    fetch(`https://newmicro-1-b9063375.deta.app/?ISOLATEAUTH=user=`+hashCode(user)+"&pwd="+hashCode(pwd))
      .then(response => {
          return response.json();
      })
      .then(data => {

          if (data){
            document.getElementById('loggerin').style.display = 'none'; 
            document.getElementById('creator').style.display = 'none';
            document.getElementById('inside').style.display = 'block';  
            localStorage.setItem('isolateaccount',user);
            document.getElementById('dashdisp').textContent = 'Welcome, '+user;
          
          } else {
            document.getElementById('wrongpwd').style.opacity = 1;
            document.getElementById('theusername').style.borderBottomColor = 'red';
            document.getElementById('thepassword').style.borderBottomColor = 'red';
            document.getElementById('login').textContent = "Log in...";  
          }
      })
  })();
}

function logout(){
  localStorage.setItem('isolateaccount','loggedout');
  document.getElementById('loggerin').style.display = 'block'; 
  document.getElementById('creator').style.display = 'none';
  document.getElementById('inside').style.display = 'none';
}

function checkusername(nm){
  if (nm.replaceAll(" ",'') == ''){
    document.getElementById('regfb').textContent = 'Username (Taken)';  
    return;
  }

  (async () => {
    console.log('fetching');
    fetch(`https://newmicro-1-b9063375.deta.app/?ISOLATEEXISTS=`+hashCode(nm))
      .then(response => {
          return response.json();
      })
      .then(data => {

          if (data){
            document.getElementById('regfb').textContent = 'Username (Taken)';
          } else {
            document.getElementById('regfb').textContent = 'Username (Available)';  
          }
      })
  })();
}

function tryenter(){
  let tpwd = document.getElementById('enterpassword').value;

  if (tpwd == 'arsunol'){
    // allowed
    document.getElementById('loggerin').style.display = 'block'; 
    document.getElementById('creator').style.display = 'none';
    document.getElementById('accessor').style.display = 'none';
    document.getElementById('inside').style.display = 'none';
  } else {
    document.getElementById('wrongpwd2').style.opacity = 1;
  }
}


function uploadfile(){
  const reader = new FileReader();
 

  let fileObj = document.getElementById('upload').value;

  console.log(document.getElementById('upload'));
  console.log(fileObj);
  // const objectURL = window.URL.createObjectURL(fileObj);

  // console.log('first'+objectURL);

  let ur = reader.readAsDataURL(fileObj);

  console.log('next'+ur);

  



}

function tryregister(){
  // make sure everything is met
  if (document.getElementById('regfb').textContent.includes('Taken')){
    // failed, username unavailable
    document.getElementById('wrongpwd1').textContent = 'Username taken, chose another one';
    document.getElementById('wrongpwd1').style.opacity = 1;
    return;
  }

  if (document.getElementById('thepassword1').value != document.getElementById('thepassword2').value){
    // failed, passwords dont match
    document.getElementById('wrongpwd1').textContent = "Passwords don't match";
    document.getElementById('wrongpwd1').style.opacity = 1;
    return;
  }

  // ready to register

  let user = document.getElementById('theusername22').value;
  let pwd = document.getElementById('thepassword1').value;

  document.getElementById('registering').textContent = "Creating...";

  (async () => {
    console.log('fetching');
    //       http://localhost:3000/?ISOLATEREGISTER=user=hi&pwd=hello
    fetch(`https://newmicro-1-b9063375.deta.app/?ISOLATEREGISTER=user=`+hashCode(user)+"&pwd="+hashCode(pwd))
      .then(response => {
          console.log('done with this');
          document.getElementById('loggerin').style.display = 'none'; 
          document.getElementById('creator').style.display = 'none';
          document.getElementById('inside').style.display = 'block';
          localStorage.setItem('isolateaccount', user);
          document.getElementById('dashdisp').textContent = 'Welcome, '+user;

          return response.json();
      })
      .then(data => {

        // were done
      })
  })();

}

function hideallpages(){
  document.getElementById('mainpage').style.display = 'none';
  document.getElementById('aboutus').style.display = 'none';
  document.getElementById('ourteam').style.display = 'none';
  document.getElementById('artists').style.display = 'none';
}

function selectheader(h){
  var r = document.querySelector(':root');
  var rs = getComputedStyle(r);
  let g = document.getElementById(h);
  g.style.borderBottom = '4px solid '+rs.getPropertyValue('--accent');;

  addreactor(h,true);
}


async function openelement(el){
  el = document.getElementById(el);
  el.style.display = 'block';
  let fullblock = document.getElementById('fullblock');
  fullblock.style.display = 'block';

  let i = 0;
  let ps = 100;
  while (i < 100){
      el.style.opacity = i/100;
      el.style.marginTop = (ps)+'px';
      fullblock.style.opacity = (i/100)*0.6;
      i += 1;
      ps = ps*0.95;
      await sleep();
  }
}

async function closeelement(el){
  el = document.getElementById(el);
  let fullblock = document.getElementById('fullblock');

  let i = 0;
  let ps = 1;
  while (i < 100){
      el.style.opacity = (1-i/100);
      el.style.marginTop = (ps)+'px';
      fullblock.style.opacity = (0.6-(i/100)*0.6);
      i += 1;
      ps = ps*1.05;
      await sleep();
  }

  fullblock.style.display = 'none';
  el.style.display = 'none';
}

function addreactor(el,selected){
  let g = document.getElementById(el);
  var r = document.querySelector(':root');
  var rs = getComputedStyle(r);
  g.addEventListener('mouseover', function(event) {
    let y = document.getElementById(el);
    y.style.borderBottom = '4px solid '+rs.getPropertyValue('--accent');
  });
  g.addEventListener('mouseleave', function(event) {
    let y = document.getElementById(el);
    if (!selected){
      y.style.borderBottom = '2px solid '+rs.getPropertyValue('--main');
    } else {
      y.style.borderBottom = '4px solid '+rs.getPropertyValue('--opposite');
    }
  });
}

function disableheaders(){
  var r = document.querySelector(':root');
  var rs = getComputedStyle(r);
  document.getElementById('header0fade').style.borderBottom = '2px solid '+rs.getPropertyValue('--main');
  document.getElementById('header1fade').style.borderBottom = '2px solid '+rs.getPropertyValue('--main');
  document.getElementById('header2fade').style.borderBottom = '2px solid '+rs.getPropertyValue('--main');
  document.getElementById('header3fade').style.borderBottom = '2px solid '+rs.getPropertyValue('--main');
  // document.getElementById('header4fade').style.borderBottom = '2px solid '+rs.getPropertyValue('--main');

  addreactor('header0fade',false);
  addreactor('header1fade',false);
  addreactor('header2fade',false);
  addreactor('header3fade',false);
  // addreactor('header4fade',false);
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
  document.getElementById("h04").style.borderTop = '0px solid orangered';
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
  let endtime = new Date();
  var timediff = endtime - lasttoggle; 
  lasttoggle = endtime;

  if (timediff > 333){// ms
    if (theme == 'light'){
      localStorage.setItem('theme','dark');
      theme = 'dark';
    } else {
      localStorage.setItem('theme','light');
      theme = 'light';
    }
  }

  return timediff;
}

function settheme(timediff){
  if (timediff > 333){// ms

    var r = document.querySelector(':root');
    var rs = getComputedStyle(r);
    console.log('set theme to '+theme);

    if (theme == 'dark'){
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
      holder = rs.getPropertyValue('--darkunderline')
      r.style.setProperty('--underline', holder);
      holder = rs.getPropertyValue('--lightmain')
      r.style.setProperty('--opposite', holder);
      r.style.setProperty('--oppositesolid', 'white');
    } else {
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
      holder = rs.getPropertyValue('--lightunderline')
      r.style.setProperty('--underline', holder);
      holder = rs.getPropertyValue('--darkaccent')
      r.style.setProperty('--opposite', holder);
      r.style.setProperty('--oppositesolid', 'black');

    }

  }
}