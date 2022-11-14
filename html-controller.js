async function changepage(page){
  // basically we fade out the current content and then change it up\

  // cancel if same
  if (currentpage == page){
    return; //terminate
  }
  let pc = document.getElementById(currentpage);
  const sleep = ms => new Promise(res => setTimeout(res, ms));

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

  fader1 = 0;
  while (fader1 < 100){

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
  document.getElementById('forms').style.display = 'none';
}