"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
document.addEventListener('DOMContentLoaded', function () {
    var isMatch;
    var hasAccount;
    var username;
    var sucess;
    var msg;
    var displayname;
    var pfplink;
    var ipv4const;
    fetch('http://localhost:3000')
        .then(function (response) {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
        .then(function (data) {
        console.log(JSON.stringify(data)); // Output: Hello from the backend!
    })
        .catch(function (error) {
        console.error('Error fetching data:', error);
    });
    var obj = {};
    fetch('https://api.ipify.org?format=json')
        .then(function (response) { return response.json(); })
        .then(function (data) {
        var ipv4 = data.ip;
        console.log('IPv4 Address:', ipv4);
        ipv4const = ipv4;
        Object.defineProperty(window, 'ipv4const', {
            writable: false
        });
        console.log('Fingerprint:', ipv4const);
        // Now that you have the IPv4 address, make the fetch request to check the fingerprint
        var fingerprint = generateFingerprint(ipv4const);
        return fetch("http://localhost:3000/checkfingerprint?fingerprint=".concat(fingerprint));
    })
        .then(function (response) {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // Parse response as JSON
    })
        .then(function (data) {
        console.log(JSON.stringify(data));
    })
        .catch(function (error) {
        console.error('Error fetching data:', error);
    });
    function generateFingerprint(ipv4const) {
        console.log(ipv4const);
        console.log("HELP");
        // User-Agent string
        var userAgent = navigator.userAgent;
        // Screen resolution
        var screenWidth = window.screen.width;
        var screenHeight = window.screen.height;
        // Timezone offset
        var timezoneOffset = new Date().getTimezoneOffset();
        // Generate a unique fingerprint using the collected information, including the IPv4 address
        var fingerprint = "".concat(ipv4const, "-").concat(userAgent, "-").concat(screenWidth, "-").concat(screenHeight, "-").concat(timezoneOffset);
        return fingerprint;
    }
    document.getElementById('loginbutton').addEventListener('click', function () {
        var emailInput = document.getElementById('inputemail');
        var passwordInput = document.getElementById('inputpassword');
        var errormessage;
        var emailValue = emailInput.value;
        var passwordValue = passwordInput.value;
        if (emailValue === "" || passwordValue === "") {
            errormessage = "A mezők nem maradhatnak üresen!";
        }
        else if (!emailValue.endsWith("@taszi.hu")) {
            errormessage = "Az email nem a taszi.hu domainhez tartozik!";
        }
        else {
            fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: emailValue,
                    password: passwordValue
                })
            })
                .then(function (response) {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // Parse JSON response
            })
                .then(function (data) {
                isMatch = data.ismatch;
                hasAccount = data.hasaccount;
                accesslvl = data.accesslvl;
                Object.defineProperty(window, 'accesslvl', {
                    writable: false
                });
                displayname = data.displayname;
                pfplink = data.pfplink;
                console.log('ismatch:', isMatch);
                console.log('hasaccount:', hasAccount);
                console.log("Access level: ", accesslvl, "display name: ", displayname, "pfplink: ", pfplink);
                if (isMatch === true) {
                    username = displayname;
                    console.log("username:", username);
                    loggedIn(username, accesslvl, pfplink);
                }
                else if (hasAccount === true && isMatch === false) {
                    errormessage = 'A felhasználónév és jelszó nem egyezik!';
                    displayErrorMessage(errormessage);
                }
                else {
                    errormessage = 'Nem tartozik fiók a megadott email-címhez!';
                    displayErrorMessage(errormessage);
                }
            })
                .catch(function (error) {
                console.error('Error sending login data:', error);
                // Handle error
            });
        }
        if (errormessage) {
            displayErrorMessage(errormessage);
        }
    });
    document.getElementById('profileclick').addEventListener('click', function () {
        $('.szavazas, .kovetkezik, .bekuldes, .zene, .kovetkezik1cim, .kovetkezik1kep, .kovetkezik1iro, .kovetkezik1hossz, .mostjatszodiktxt, .mostjatszodikpic, .mostjatszodikprogress, .mostjatszodikiro, .mostjatszodikzenecim, .mostjatszodik, .mostjatszodiktos, .mostjatszodiktoe, .profileclick').hide().promise().done(function () {
        }).fail(function () {
            $('.szavazas, .kovetkezik, .bekuldes, .zene, .kovetkezik1cim, .kovetkezik1kep, .kovetkezik1iro, .kovetkezik1hossz, .mostjatszodiktxt, .mostjatszodikpic, .mostjatszodikprogress, .mostjatszodikiro, .mostjatszodikzenecim, .mostjatszodik, .mostjatszodiktos, .mostjatszodiktoe, .profileclick').hide();
        });
        $('.navlayer, .navclose, .erkezettzenek, .szavazaskiertekeles, .profilebg').show();
    });
    document.getElementById('navclose').addEventListener('click', function () {
        var navlayer = document.getElementById('navlayer');
        navlayer.style.animation = "slidenavback 1s forwards";
        setTimeout(function () {
            $('.navclose').hide();
            $('.navshow').show();
        }, 1000);
    });
    document.getElementById('navshow').addEventListener('click', function () {
        var navlayer = document.getElementById('navlayer');
        navlayer.style.animation = "slidenavout 1s forwards";
        setTimeout(function () {
            $('.navclose').show();
            $('.navshow').hide();
        }, 1000);
    });
    document.getElementById('szavazas').addEventListener('click', function () {
        $('.mostjatszodik, .mostjatszodiktxt, .mostjatszodikpic, .mostjatszodikzenecim, .mostjatszodikiro, .mostjatszodikprogress, .mostjatszodiktos, .mostjatszodiktoe, .zene, .kovetkezik, .kovetkeziktxt, .kovetkezik1kep, .kovetkezik1cim, .kovetkezik1iro, .kovetkezik1hossz, .szavazas, .bekuldes').hide();
        $('.szavazaszenebg').show();
    });
    document.getElementById('bekuldes').addEventListener('click', function () {
        $('.mostjatszodik, .mostjatszodiktxt, .mostjatszodikpic, .mostjatszodikzenecim, .mostjatszodikiro, .mostjatszodikprogress, .mostjatszodiktos, .mostjatszodiktoe, .zene, .kovetkezik, .kovetkeziktxt, .kovetkezik1kep, .kovetkezik1cim, .kovetkezik1iro, .kovetkezik1hossz, .szavazas, .bekuldes').hide();
        $('.zenebekuldes, .bekuldesgomb, .bekuldesemial, .bekuldesosztaly, .bekuldeslink, .bekuldesbg').show();
    });
    document.getElementById('erkezettzenek').addEventListener('click', function () {
        if (accesslvl >= 1) {
            console.log("Access granted!");
        }
        else {
            alert("Access denied!");
        }
    });
    document.getElementById('bekuldesgomb').addEventListener('click', function () {
        var osztaly = document.getElementById('bekuldesosztaly');
        var email = document.getElementById('bekuldesemail');
        var link = document.getElementById('bekuldeslink');
        var osztalyval = osztaly.value;
        var emailval = email.value;
        var linkval = link.value;
        console.log(osztalyval, emailval, linkval);
        fetch('http://localhost:3000/zenesent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: emailval,
                osztaly: osztalyval,
                link: linkval
            })
        })
            .then(function (response) {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse JSON response
        })
            .then(function (data) {
            console.log("got result");
            msg = data.msg;
            sucess = data.issuccess;
            console.log(sucess, msg);
            if (sucess === false) {
                var errormsg = document.getElementById('errormsg');
                errormsg.innerText = msg;
                console.log("fail: ", msg);
                $('.bekuldesgomb, .bekuldesemial, .bekuldesosztaly, .bekuldeslink').fadeOut();
                $('.errormsg').fadeIn();
            }
            else {
                var sucessmsg = document.getElementById('sucessmsg');
                sucessmsg.innerText = msg;
                console.log("success: ", msg);
                $('.bekuldesgomb, .bekuldesemial, .bekuldesosztaly, .bekuldeslink').fadeOut();
                $('.sucessmsg').fadeIn();
            }
        })
            .catch(function (error) {
            console.error('Error sending login data:', error);
            // Handle error
        });
    });
    document.getElementById('back').addEventListener('click', function () {
        $('.mostjatszodik, .mostjatszodiktxt, .mostjatszodikpic, .mostjatszodikzenecim, .mostjatszodikiro, .mostjatszodikprogress, .mostjatszodiktos, .mostjatszodiktoe, .zene, .kovetkezik, .kovetkeziktxt, .kovetkezik1kep, .kovetkezik1cim, .kovetkezik1iro, .kovetkezik1hossz, .szavazas, .bekuldes').show();
        $('.zenebekuldes, .bekuldesgomb, .bekuldesemial, .bekuldesosztaly, .bekuldeslink, .bekuldesbg').hide();
    });
});
function displayErrorMessage(message) {
    $('.errorsvg').fadeIn();
    $('.errormessage').fadeIn();
    document.getElementById('errormessage').innerText = message;
    setTimeout(function () {
        $('.errormessage, .errorsvg').fadeOut();
    }, 2000);
    setTimeout(function () {
        document.getElementById('errormessage').innerText = "";
    }, 2200);
}
var canmanagevote;
var canhire;
var canmodprofile;
var accesslvl;
function loggedIn(username, accesslvl, pfplink) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    var emailInput = document.getElementById('inputemail');
    var passwordInput = document.getElementById('inputpassword');
    var emailValue = emailInput.value;
    var passwordValue = passwordInput.value;
    var displayusername = document.getElementById('username');
    displayusername.innerText = username;
    var child = document.createElement('div');
    var child2 = document.createElement('div');
    var child3 = document.createElement('div');
    switch (accesslvl) {
        case 1:
            child.textContent = 'Csak megtekintés';
            (_a = document.getElementById('jogosultbase')) === null || _a === void 0 ? void 0 : _a.appendChild(child);
            Object.defineProperty(window, 'canmanagevote', {
                value: false,
                writable: false
            });
            Object.defineProperty(window, 'canhire', {
                value: false,
                writable: false
            });
            Object.defineProperty(window, 'canmodprofile', {
                value: false,
                writable: false
            });
            console.log("Perms:", canmanagevote, canhire, canmodprofile);
            break;
        case 2:
            child.textContent = 'Zeneszavazás elbírálás';
            (_b = document.getElementById('jogosultbase')) === null || _b === void 0 ? void 0 : _b.appendChild(child);
            Object.defineProperty(window, 'canmanagevote', {
                value: true,
                writable: false
            });
            Object.defineProperty(window, 'canhire', {
                value: false,
                writable: false
            });
            Object.defineProperty(window, 'canmodprofile', {
                value: false,
                writable: false
            });
            console.log("Perms:", canmanagevote, canhire, canmodprofile);
            break;
        case 3:
            child.textContent = 'Zeneszavazás elbírálás';
            child2.textContent = 'Tagok felvétele';
            (_c = document.getElementById('jogosultbase')) === null || _c === void 0 ? void 0 : _c.appendChild(child);
            (_d = document.getElementById('jogosultbase')) === null || _d === void 0 ? void 0 : _d.appendChild(child2);
            Object.defineProperty(window, 'canmanagevote', {
                value: true,
                writable: false
            });
            Object.defineProperty(window, 'canhire', {
                value: true,
                writable: false
            });
            Object.defineProperty(window, 'canmodprofile', {
                value: false,
                writable: false
            });
            console.log("Perms:", canmanagevote, canhire, canmodprofile);
            break;
        case 4:
            child.textContent = 'Zeneszavazás elbírálás';
            child2.textContent = 'Tagok felvétele';
            child3.textContent = 'Tagok profiljának módosítása';
            (_e = document.getElementById('jogosultbase')) === null || _e === void 0 ? void 0 : _e.appendChild(child);
            (_f = document.getElementById('jogosultbase')) === null || _f === void 0 ? void 0 : _f.appendChild(child2);
            (_g = document.getElementById('jogosultbase')) === null || _g === void 0 ? void 0 : _g.appendChild(child3);
            Object.defineProperty(window, 'canmanagevote', {
                value: true,
                writable: false
            });
            Object.defineProperty(window, 'canhire', {
                value: true,
                writable: false
            });
            Object.defineProperty(window, 'canmodprofile', {
                value: true,
                writable: false
            });
            console.log("Perms:", canmanagevote, canhire, canmodprofile);
            break;
        case 100:
            child.textContent = 'Konkrétan minden';
            (_h = document.getElementById('jogosultbase')) === null || _h === void 0 ? void 0 : _h.appendChild(child);
            Object.defineProperty(window, 'canmanagevote', {
                value: true,
                writable: false
            });
            Object.defineProperty(window, 'canhire', {
                value: true,
                writable: false
            });
            Object.defineProperty(window, 'canmodprofile', {
                value: true,
                writable: false
            });
            console.log("Perms:", canmanagevote, canhire, canmodprofile);
            break;
        default:
            break;
    }
    document.getElementById('loginformbg').style.animation = "loginformdisappear 1s forwards";
    document.getElementById('login').classList.remove('nologin');
    document.getElementById('login').classList.add('login');
    document.getElementById('login').innerText = username;
    document.getElementById('login').style.animation = "loginmoveback 1s forwards";
    $('.profileclick').show();
    emailValue = "";
    passwordValue = "";
    setTimeout(function () {
        $('.loginbutton').fadeOut(25);
        $('.inputpassword, .showpassword, .hidepassword').fadeOut(25);
        $('.inputemail').fadeOut(50);
        $('.closelogin').fadeOut(100);
        $('.loginformbg').fadeOut(1000);
    }, 25);
}
