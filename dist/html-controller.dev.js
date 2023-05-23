"use strict";

function changepage(page, header) {
  var pc, sleep, fader1;
  return regeneratorRuntime.async(function changepage$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!(currentpage == page)) {
            _context.next = 2;
            break;
          }

          return _context.abrupt("return");

        case 2:
          pc = document.getElementById(currentpage);

          sleep = function sleep(ms) {
            return new Promise(function (res) {
              return setTimeout(res, ms);
            });
          };

          window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
          });
          console.log('started changing process');
          disableheaders();

          if (header != null) {
            selectheader(header);
          }

          fader1 = 100;

        case 9:
          if (!(fader1 > 0)) {
            _context.next = 16;
            break;
          }

          pc.style.opacity = fader1 / 100;
          _context.next = 13;
          return regeneratorRuntime.awrap(sleep(2));

        case 13:
          fader1 -= 1;
          _context.next = 9;
          break;

        case 16:
          hideallpages();
          pc = document.getElementById(page);
          currentpage = page;
          pc.style.display = 'block';
          document.getElementById('backtotop').style.display = 'block';
          document.body.style.width = window.innerWidth + 'px';
          document.getElementById('aboutus').style.width = window.innerWidth * 1 + 'px';

          if (page == 'mainpage') {
            document.body.style.backgroundImage = "url('images/large-banner.png')";
            document.getElementById('ovl-t').style.display = 'block';
          } else if (page == 'aboutus') {
            document.body.style.backgroundImage = "url('images/orange.png')";
            document.getElementById('ovl-t').style.display = 'block';
            document.getElementById('ovl-t').style.zIndex = -1;

            if (mobileoverride) {
              document.getElementById('backtotop').style.display = 'none';
              document.getElementById('aboutus').style.background = "var(--bg)";
              document.getElementById('aboutus').style.marginLeft = window.innerWidth * 0 + 'px';
              document.getElementById('aboutus').style.width = window.innerWidth * 1.15 + 'px';
              document.getElementById('ouryt').style.background = 'rgba(0,0,0,0)';
              document.getElementById('ouryt').style.width = window.innerWidth * 0.8 + 'px';
              document.getElementById('ouryt').style.marginLeft = window.innerWidth * 0.15 + 'px';
              document.getElementById('b3').style.marginLeft = (window.innerWidth - document.getElementById('b3').offsetWidth) / 2 + 'px';
              document.body.style.width = window.innerWidth * 1.1 + 'px';
            }
          } else if (page == 'artists') {
            document.body.style.backgroundImage = "url('images/purple.png')";
            document.getElementById('ovl-t').style.display = 'block';
            document.getElementById('ovl-t').style.zIndex = -1;
          } else if (page == 'ourteam') {
            console.log('shud be changing to ourteam');
            document.body.style.backgroundImage = "url('images/lightblue.png')";
            document.getElementById('ovl-t').style.display = 'block';
            document.getElementById('ovl-t').style.zIndex = -1;
          } else if (page == 'account') {
            console.log('shud be changing to account');
            document.body.style.backgroundImage = "url('images/lightblue.png')";
            document.getElementById('ovl-t').style.display = 'none';
            document.getElementById('ovl-t').style.zIndex = -1;

            if (localStorage.getItem('isolateaccount') != null && localStorage.getItem('isolateaccount') != "loggedout") {
              document.getElementById('loggerin').style.display = 'none';
              document.getElementById('creator').style.display = 'none';
              document.getElementById('accessor').style.display = 'none';
              document.getElementById('inside').style.display = 'block';
              document.getElementById('dashdisp').textContent = 'Welcome, ' + localStorage.getItem('isolateaccount');
            } else {
              document.getElementById('loggerin').style.display = 'none';
              document.getElementById('creator').style.display = 'none';
              document.getElementById('inside').style.display = 'none';
              document.getElementById('accessor').style.display = 'block';
              document.getElementById("upload").addEventListener("change", handleFiles, false);
            }
          } else {
            console.log('got to it');
            document.getElementById('register').style.display = 'block';
          }

          fader1 = 0;

        case 25:
          if (!(fader1 < 100)) {
            _context.next = 32;
            break;
          }

          // if (page == 'mainpage'){
          //   document.body.style.backgroundImage = "linear-gradient(to bottom, transparent, rgba(0,0,0,"+(100-fader1)+")),url('images/large-banner.png')";
          // } else {
          //   document.body.style.backgroundImage = "linear-gradient(to bottom, transparent, rgba(255,255,255,"+(100-fader1)+")),url('images/large-banner.png')";
          // }
          pc.style.opacity = fader1 / 100;
          _context.next = 29;
          return regeneratorRuntime.awrap(sleep(2));

        case 29:
          fader1 += 1;
          _context.next = 25;
          break;

        case 32:
        case "end":
          return _context.stop();
      }
    }
  });
}

function hashCode(string) {
  var hash = 0;

  for (var i = 0; i < string.length; i++) {
    var code = string.charCodeAt(i);
    hash = (hash << 5) - hash + code;
    hash = hash & hash; // Convert to 32bit integer
  }

  return hash;
}

function attemptlogin() {
  //attempts the login
  var user = document.getElementById('theusername').value;
  var pwd = document.getElementById('thepassword').value;
  document.getElementById('login').textContent = "Logging in...";

  (function _callee() {
    return regeneratorRuntime.async(function _callee$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            console.log('fetching');
            fetch("https://newmicro-1-b9063375.deta.app/?ISOLATEAUTH=user=" + hashCode(user) + "&pwd=" + hashCode(pwd)).then(function (response) {
              return response.json();
            }).then(function (data) {
              if (data) {
                document.getElementById('loggerin').style.display = 'none';
                document.getElementById('creator').style.display = 'none';
                document.getElementById('inside').style.display = 'block';
                localStorage.setItem('isolateaccount', user);
                document.getElementById('dashdisp').textContent = 'Welcome, ' + user;
              } else {
                document.getElementById('wrongpwd').style.opacity = 1;
                document.getElementById('theusername').style.borderBottomColor = 'red';
                document.getElementById('thepassword').style.borderBottomColor = 'red';
                document.getElementById('login').textContent = "Log in...";
              }
            });

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    });
  })();
}

function logout() {
  localStorage.setItem('isolateaccount', 'loggedout');
  document.getElementById('loggerin').style.display = 'block';
  document.getElementById('creator').style.display = 'none';
  document.getElementById('inside').style.display = 'none';
}

function checkusername(nm) {
  if (nm.replaceAll(" ", '') == '') {
    document.getElementById('regfb').textContent = 'Username (Taken)';
    return;
  }

  (function _callee2() {
    return regeneratorRuntime.async(function _callee2$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            console.log('fetching');
            fetch("https://newmicro-1-b9063375.deta.app/?ISOLATEEXISTS=" + hashCode(nm)).then(function (response) {
              return response.json();
            }).then(function (data) {
              if (data) {
                document.getElementById('regfb').textContent = 'Username (Taken)';
              } else {
                document.getElementById('regfb').textContent = 'Username (Available)';
              }
            });

          case 2:
          case "end":
            return _context3.stop();
        }
      }
    });
  })();
}

function tryenter() {
  var tpwd = document.getElementById('enterpassword').value;

  if (tpwd == 'arsunol') {
    // allowed
    document.getElementById('loggerin').style.display = 'block';
    document.getElementById('creator').style.display = 'none';
    document.getElementById('accessor').style.display = 'none';
    document.getElementById('inside').style.display = 'none';
  } else {
    document.getElementById('wrongpwd2').style.opacity = 1;
  }
}

function uploadfile() {
  var reader = new FileReader();
  var fileObj = document.getElementById('upload').value;
  console.log(document.getElementById('upload'));
  console.log(fileObj); // const objectURL = window.URL.createObjectURL(fileObj);
  // console.log('first'+objectURL);

  var ur = reader.readAsDataURL(fileObj);
  console.log('next' + ur);
}

function tryregister() {
  // make sure everything is met
  if (document.getElementById('regfb').textContent.includes('Taken')) {
    // failed, username unavailable
    document.getElementById('wrongpwd1').textContent = 'Username taken, chose another one';
    document.getElementById('wrongpwd1').style.opacity = 1;
    return;
  }

  if (document.getElementById('thepassword1').value != document.getElementById('thepassword2').value) {
    // failed, passwords dont match
    document.getElementById('wrongpwd1').textContent = "Passwords don't match";
    document.getElementById('wrongpwd1').style.opacity = 1;
    return;
  } // ready to register


  var user = document.getElementById('theusername22').value;
  var pwd = document.getElementById('thepassword1').value;
  document.getElementById('registering').textContent = "Creating...";

  (function _callee3() {
    return regeneratorRuntime.async(function _callee3$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            console.log('fetching'); //       http://localhost:3000/?ISOLATEREGISTER=user=hi&pwd=hello

            fetch("https://newmicro-1-b9063375.deta.app/?ISOLATEREGISTER=user=" + hashCode(user) + "&pwd=" + hashCode(pwd)).then(function (response) {
              console.log('done with this');
              document.getElementById('loggerin').style.display = 'none';
              document.getElementById('creator').style.display = 'none';
              document.getElementById('inside').style.display = 'block';
              localStorage.setItem('isolateaccount', user);
              document.getElementById('dashdisp').textContent = 'Welcome, ' + user;
              return response.json();
            }).then(function (data) {// were done
            });

          case 2:
          case "end":
            return _context4.stop();
        }
      }
    });
  })();
}

function hideallpages() {
  document.getElementById('mainpage').style.display = 'none';
  document.getElementById('aboutus').style.display = 'none';
  document.getElementById('ourteam').style.display = 'none';
  document.getElementById('artists').style.display = 'none';
}

function selectheader(h) {
  var r = document.querySelector(':root');
  var rs = getComputedStyle(r);
  var g = document.getElementById(h);
  g.style.borderBottom = '4px solid ' + rs.getPropertyValue('--accent');
  ;
  addreactor(h, true);
}

function openelement(el) {
  var fullblock, i, ps;
  return regeneratorRuntime.async(function openelement$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          el = document.getElementById(el);
          el.style.display = 'block';
          fullblock = document.getElementById('fullblock');
          fullblock.style.display = 'block';
          i = 0;
          ps = 100;

        case 6:
          if (!(i < 100)) {
            _context5.next = 16;
            break;
          }

          el.style.opacity = i / 100;
          el.style.marginTop = ps + 'px';
          fullblock.style.opacity = i / 100 * 0.6;
          i += 1;
          ps = ps * 0.95;
          _context5.next = 14;
          return regeneratorRuntime.awrap(sleep());

        case 14:
          _context5.next = 6;
          break;

        case 16:
        case "end":
          return _context5.stop();
      }
    }
  });
}

function closeelement(el) {
  var fullblock, i, ps;
  return regeneratorRuntime.async(function closeelement$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          el = document.getElementById(el);
          fullblock = document.getElementById('fullblock');
          i = 0;
          ps = 1;

        case 4:
          if (!(i < 100)) {
            _context6.next = 14;
            break;
          }

          el.style.opacity = 1 - i / 100;
          el.style.marginTop = ps + 'px';
          fullblock.style.opacity = 0.6 - i / 100 * 0.6;
          i += 1;
          ps = ps * 1.05;
          _context6.next = 12;
          return regeneratorRuntime.awrap(sleep());

        case 12:
          _context6.next = 4;
          break;

        case 14:
          fullblock.style.display = 'none';
          el.style.display = 'none';

        case 16:
        case "end":
          return _context6.stop();
      }
    }
  });
}

function addreactor(el, selected) {
  var g = document.getElementById(el);
  var r = document.querySelector(':root');
  var rs = getComputedStyle(r);
  g.addEventListener('mouseover', function (event) {
    var y = document.getElementById(el);
    y.style.borderBottom = '4px solid ' + rs.getPropertyValue('--accent');
  });
  g.addEventListener('mouseleave', function (event) {
    var y = document.getElementById(el);

    if (!selected) {
      y.style.borderBottom = '2px solid ' + rs.getPropertyValue('--main');
    } else {
      y.style.borderBottom = '4px solid ' + rs.getPropertyValue('--opposite');
    }
  });
}

function disableheaders() {
  var r = document.querySelector(':root');
  var rs = getComputedStyle(r);
  document.getElementById('header0fade').style.borderBottom = '2px solid ' + rs.getPropertyValue('--main');
  document.getElementById('header1fade').style.borderBottom = '2px solid ' + rs.getPropertyValue('--main');
  document.getElementById('header2fade').style.borderBottom = '2px solid ' + rs.getPropertyValue('--main');
  document.getElementById('header3fade').style.borderBottom = '2px solid ' + rs.getPropertyValue('--main'); // document.getElementById('header4fade').style.borderBottom = '2px solid '+rs.getPropertyValue('--main');

  addreactor('header0fade', false);
  addreactor('header1fade', false);
  addreactor('header2fade', false);
  addreactor('header3fade', false); // addreactor('header4fade',false);
}

function showel(el, clr) {
  document.getElementById(el).style.color = clr;
}

function g(el) {
  return document.getElementById(el);
}

function setbg(el, bg) {
  document.getElementById(el).style.backgroundColor = bg;
}

function changesrc(el, src) {
  document.getElementById(el).src = src;
}

function resetborders() {
  document.getElementById("h00").style.borderTop = '0px solid orangered';
  document.getElementById("h01").style.borderTop = '0px solid orangered';
  document.getElementById("h02").style.borderTop = '0px solid orangered';
  document.getElementById("h03").style.borderTop = '0px solid orangered';
  document.getElementById("h04").style.borderTop = '0px solid orangered';
}

function settopborder(el) {
  resetborders();
  document.getElementById(el).style.borderTop = '3px solid orangered';
}

function showmail() {
  showmail1 = true;
}

function hidemail() {
  hidemail1 = true;
}

function toggletheme() {
  var endtime = new Date();
  var timediff = endtime - lasttoggle;
  lasttoggle = endtime;

  if (timediff > 333) {
    // ms
    if (theme == 'light') {
      localStorage.setItem('theme', 'dark');
      theme = 'dark';
    } else {
      localStorage.setItem('theme', 'light');
      theme = 'light';
    }
  }

  return timediff;
}

function settheme(timediff) {
  if (timediff > 333) {
    // ms
    var r = document.querySelector(':root');
    var rs = getComputedStyle(r);
    console.log('set theme to ' + theme);

    if (theme == 'dark') {
      var holder = rs.getPropertyValue('--darkbg');
      r.style.setProperty('--bg', holder);
      holder = rs.getPropertyValue('--darkmain');
      r.style.setProperty('--main', holder);
      holder = rs.getPropertyValue('--darkaccent');
      r.style.setProperty('--accent', holder);
      holder = rs.getPropertyValue('--darkcontrast');
      r.style.setProperty('--contrast', holder);
      holder = rs.getPropertyValue('--darkslight');
      r.style.setProperty('--slight', holder);
      holder = rs.getPropertyValue('--darkunderline');
      r.style.setProperty('--underline', holder);
      holder = rs.getPropertyValue('--lightmain');
      r.style.setProperty('--opposite', holder);
      r.style.setProperty('--oppositesolid', 'white');
    } else {
      var _holder = rs.getPropertyValue('--lightbg');

      r.style.setProperty('--bg', _holder);
      _holder = rs.getPropertyValue('--lightmain');
      r.style.setProperty('--main', _holder);
      _holder = rs.getPropertyValue('--lightaccent');
      r.style.setProperty('--accent', _holder);
      _holder = rs.getPropertyValue('--lightcontrast');
      r.style.setProperty('--contrast', _holder);
      _holder = rs.getPropertyValue('--lightslight');
      r.style.setProperty('--slight', _holder);
      _holder = rs.getPropertyValue('--lightunderline');
      r.style.setProperty('--underline', _holder);
      _holder = rs.getPropertyValue('--darkaccent');
      r.style.setProperty('--opposite', _holder);
      r.style.setProperty('--oppositesolid', 'black');
    }
  }
}