"use strict";

import { error } from "console";
import { isSetIterator } from "util/types";


document.addEventListener('DOMContentLoaded', function () {
    var isMatch;
    var hasAccount;
    let username;
    var sucess;
    let msg;
    var displayname;
    var pfplink;
    let ipv4const;
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
    const obj = {};
    fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
        const ipv4 = data.ip;
        console.log('IPv4 Address:', ipv4);
        ipv4const = ipv4;
        Object.defineProperty(window, 'ipv4const', {
            writable: false
        });
        console.log('Fingerprint:', ipv4const);

        // Now that you have the IPv4 address, make the fetch request to check the fingerprint
        const fingerprint = generateFingerprint(ipv4const);
        return fetch(`http://localhost:3000/checkfingerprint?fingerprint=${fingerprint}`);
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
    console.log("HELP")
    // User-Agent string
    const userAgent = navigator.userAgent;

    // Screen resolution
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;

    // Timezone offset
    const timezoneOffset = new Date().getTimezoneOffset();

    // Generate a unique fingerprint using the collected information, including the IPv4 address
    const fingerprint = `${ipv4const}-${userAgent}-${screenWidth}-${screenHeight}-${timezoneOffset}`;

    return fingerprint;
}

    document.getElementById('loginbutton').addEventListener('click', function () {
        var emailInput = document.getElementById('inputemail') as HTMLInputElement;
        var passwordInput = document.getElementById('inputpassword') as HTMLInputElement;
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
                    else if (hasAccount === true && isMatch === false){
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
                    $('.szavazas, .kovetkezik, .bekuldes, .zene, .kovetkezik1cim, .kovetkezik1kep, .kovetkezik1iro, .kovetkezik1hossz, .mostjatszodiktxt, .mostjatszodikpic, .mostjatszodikprogress, .mostjatszodikiro, .mostjatszodikzenecim, .mostjatszodik, .mostjatszodiktos, .mostjatszodiktoe, .profileclick').hide().promise().done(function() {
                    }).fail(function() {
                        $('.szavazas, .kovetkezik, .bekuldes, .zene, .kovetkezik1cim, .kovetkezik1kep, .kovetkezik1iro, .kovetkezik1hossz, .mostjatszodiktxt, .mostjatszodikpic, .mostjatszodikprogress, .mostjatszodikiro, .mostjatszodikzenecim, .mostjatszodik, .mostjatszodiktos, .mostjatszodiktoe, .profileclick').hide();
                    });
                    $('.navlayer, .navclose, .erkezettzenek, .szavazaskiertekeles, .profilebg').show();
                });

                document.getElementById('navclose').addEventListener('click', function () {
                    const navlayer = document.getElementById('navlayer');
                    navlayer.style.animation = "slidenavback 1s forwards";
                    setTimeout(() => {
                        $('.navclose').hide();
                        $('.navshow').show();
                    }, 1000);
                });

                
                document.getElementById('navshow').addEventListener('click', function () {
                    const navlayer = document.getElementById('navlayer');
                    navlayer.style.animation = "slidenavout 1s forwards";
                    setTimeout(() => {
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
                        console.log("Access granted!")
                    }
                    else {
                        alert("Access denied!");
                    }
                });                

                document.getElementById('bekuldesgomb').addEventListener('click', function () {
                    let osztaly = document.getElementById('bekuldesosztaly') as HTMLInputElement;
                    let email = document.getElementById('bekuldesemail') as HTMLInputElement;
                    let link = document.getElementById('bekuldeslink') as HTMLInputElement;

                    let osztalyval = osztaly.value;
                    let emailval = email.value;
                    let linkval = link.value;

                    

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
                                const errormsg = document.getElementById('errormsg');
                                errormsg.innerText = msg;
                                console.log("fail: ", msg)
                                $('.bekuldesgomb, .bekuldesemial, .bekuldesosztaly, .bekuldeslink').fadeOut();
                                $('.errormsg').fadeIn();
                            }
                            else {
                                const sucessmsg = document.getElementById('sucessmsg');
                                sucessmsg.innerText = msg;
                                console.log("success: ", msg)
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


let canmanagevote;
let canhire;
let canmodprofile;
let accesslvl;

function loggedIn(username, accesslvl, pfplink) {
    var emailInput = document.getElementById('inputemail') as HTMLInputElement;
    var passwordInput = document.getElementById('inputpassword') as HTMLInputElement;
    var emailValue = emailInput.value;
    var passwordValue = passwordInput.value;
    var displayusername = document.getElementById('username') as HTMLDivElement;
    displayusername.innerText = username;
    
    const child = document.createElement('div');
    const child2 = document.createElement('div');
    const child3 = document.createElement('div');



    switch (accesslvl) {
        case 1:
            child.textContent = 'Csak megtekintés';
            document.getElementById('jogosultbase')?.appendChild(child);
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
            document.getElementById('jogosultbase')?.appendChild(child);
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
            document.getElementById('jogosultbase')?.appendChild(child);
            document.getElementById('jogosultbase')?.appendChild(child2);
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
            child3.textContent = 'Tagok profiljának módosítása'
            document.getElementById('jogosultbase')?.appendChild(child);
            document.getElementById('jogosultbase')?.appendChild(child2);
            document.getElementById('jogosultbase')?.appendChild(child3);
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
            document.getElementById('jogosultbase')?.appendChild(child);
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
    document.getElementById('loginformbg').style.animation="loginformdisappear 1s forwards";
    document.getElementById('login').classList.remove('nologin');
    document.getElementById('login').classList.add('login');
    document.getElementById('login').innerText = username;
    document.getElementById('login').style.animation="loginmoveback 1s forwards";
    $('.profileclick').show();

    emailValue = "";
    passwordValue = "";


setTimeout(() => {
    $('.loginbutton').fadeOut(25);
    $('.inputpassword, .showpassword, .hidepassword').fadeOut(25);
    $('.inputemail').fadeOut(50);
    $('.closelogin').fadeOut(100);
    $('.loginformbg').fadeOut(1000);
}, 25);
}

