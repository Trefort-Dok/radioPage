document.addEventListener('DOMContentLoaded', function () {
    $('.szavazaszenebg, .profilebg, .loginformbg, .inputemail, .closelogin, .inputpassword, .loginbutton, .showpassword, .hidepassword, .errorsvg, .errormessage, .profileclick, .navshow, .navlayer, .navclose, .navopen, .zenebekuldes, .bekuldesgomb, .bekuldesemial, .bekuldesosztaly, .bekuldeslink, .bekuldesbg, .errormsg, .sucessmsg, .szavazasbg').hide();

    const login = document.getElementById('login');

     document.getElementById('login').addEventListener('click', function() {
        $('.loginformbg').fadeIn();
        document.getElementById('loginformbg').style.animation="loginformappear 1s forwards";
        document.getElementById('login').style.animation="centerandresize 1.5s forwards";
        setTimeout(() => {
            login.classList.remove("login");
            login.classList.add("nologin");
            $('.inputemail, .closelogin').fadeIn();
            setTimeout(() => {
                $('.inputpassword, .showpassword').fadeIn();
                setTimeout(() => {
                    $('.loginbutton').fadeIn();
                }, 200);
            }, 200);
        }, 1400);
    });

    document.getElementById('showpassword').addEventListener('click', function() {
        $('.showpassword').hide();
        $('.hidepassword').show();
        document.getElementById('inputpassword').type = "text";
    });

    document.getElementById('hidepassword').addEventListener('click', function() {
        $('.showpassword').show();
        $('.hidepassword').hide();
        document.getElementById('inputpassword').type = "password";
    });

    document.getElementById('closelogin').addEventListener('click', function() {
        document.getElementById('loginformbg').style.animation="loginformdisappear 1s forwards";
        document.getElementById('login').style.animation="loginmoveback 1s forwards";

        document.getElementById('inputemail').value = "";
        document.getElementById('inputpassword').value = "";


    setTimeout(() => {
        $('.loginbutton').fadeOut(25);
        $('.inputpassword, .showpassword, .hidepassword').fadeOut(25);
        $('.inputemail').fadeOut(50);
        $('.closelogin').fadeOut(100);
        $('.loginformbg').fadeOut(1000);
    }, 25);

    });

    
    document.getElementById('loginbutton').addEventListener('click', function() {

    });


});