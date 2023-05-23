"use strict";

function audioToBase64(audioFile) {
  return regeneratorRuntime.async(function audioToBase64$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", new Promise(function (resolve, reject) {
            var reader = new FileReader();
            reader.onerror = reject;

            reader.onload = function (e) {
              return resolve(e.target.result);
            };

            reader.readAsDataURL(audioFile);
          }));

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
}

function handleFiles(event) {
  var files, theaudio, fr, curl;
  return regeneratorRuntime.async(function handleFiles$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          files = event.target.files;
          console.log('called this at least');
          $("#src").attr("src", URL.createObjectURL(files[0]));
          document.getElementById("audio").load();
          console.log(files[0]);
          console.log(URL.createObjectURL(files[0])); //window.open(URL.createObjectURL(files[0]));

          theaudio = new Audio(URL.createObjectURL(files[0])); // var data = await audioToBase64(theaudio);
          // console.log(data);    
          // $('#src').attr('src', theaudio)
          // document.getElementById("audio").load();

          console.log('final ' + URL.createObjectURL(files[0]));
          final = URL.createObjectURL(files[0]); // now final is the blob

          fr = new FileReader();
          curl = fr.readAsArrayBuffer(files[0]);
          console.log(curl); //window.open(curl);

          fetch("https://pst652.deta.dev/?ISOLATEPUTFILE=name=hi.mp3&file=".concat(final)).then(function (response) {
            return response.json();
          }).then(function (data) {// were done
          });

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function pcs(result) {
  $('#src').attr('src', result);
  document.getElementById("audio").load(); // Copy the text inside the text field

  console.log(result);
  openelement('uploader2'); //navigator.clipboard.writeText(result);
  // fetch(`https://pst652.deta.dev/?ISOLATEREGISTER=user=hi&pwd=${result}}`)
  // .then(response => {
  //  return response.json();
  // })
  // .then(data => {
  //   // were done
  // })
}

document.getElementById("upload").addEventListener("change", handleFiles, false);