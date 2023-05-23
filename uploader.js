
async function audioToBase64(audioFile) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.onerror = reject;
    reader.onload = (e) => resolve(e.target.result);
    reader.readAsDataURL(audioFile);
  });
}

async function handleFiles(event) {
  var files = event.target.files;
  console.log('called this at least');
  $("#src").attr("src", URL.createObjectURL(files[0]));
  document.getElementById("audio").load();

  console.log(files[0]);
  console.log(URL.createObjectURL(files[0]));

  //window.open(URL.createObjectURL(files[0]));

  let theaudio = new Audio(URL.createObjectURL(files[0]));

  // var data = await audioToBase64(theaudio);
  // console.log(data);    

  // $('#src').attr('src', theaudio)
  // document.getElementById("audio").load();


  console.log('final '+URL.createObjectURL(files[0]));

  final = URL.createObjectURL(files[0]);

  // now final is the blob

  let fr = new FileReader();

  let curl = fr.readAsArrayBuffer(files[0]);

  console.log(curl);
  //window.open(curl);

  fetch(`https://pst652.deta.dev/?ISOLATEPUTFILE=name=hi.mp3&file=${final}`)
  .then(response => {
   return response.json();
  })
  .then(data => {

    // were done
  })
}

function pcs(result){
  $('#src').attr('src', result)
  document.getElementById("audio").load();

  

  // Copy the text inside the text field
  console.log(result);

  openelement('uploader2');
  //navigator.clipboard.writeText(result);

  // fetch(`https://pst652.deta.dev/?ISOLATEREGISTER=user=hi&pwd=${result}}`)
  // .then(response => {
  //  return response.json();
  // })
  // .then(data => {

  //   // were done
  // })
}

document.getElementById("upload").addEventListener("change", handleFiles, false);
