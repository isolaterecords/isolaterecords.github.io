async function changepage(page){
  // basically we fade out the current content and then change it up\
  let pc = document.getElementById('pagecontent');
  const sleep = ms => new Promise(res => setTimeout(res, ms));

  let fader1 = 100;
  while (fader1 > 0){

    pc.style.opacity = fader1/100;

    await sleep(2);
    fader1 -= 1;
  }

  // now get the new content
  if (page == 'forms'){
    pc.innerHTML = `<h1>sh||o||t the f||a||cking hell||o|| up you ||bene||dic||t||cum||ber||b||a||tch</h1>`
  } else if (page == 'aboutus'){
    pc.innerHTML = `<h1>About us. Isolate records is a group of st||om||pi||ng b||a||tch||b||asses that do nothing all day</h1>`
  } else {
    pc.innerHTML = `<h1>ok i wont fill this up with spoiler jokes lmfao</h1>`
  }

  fader1 = 0;
  while (fader1 < 100){

    pc.style.opacity = fader1/100;

    await sleep(2);
    fader1 += 1;
  }

}