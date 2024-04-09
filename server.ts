var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
const axios = require('axios');
const cron = require('node-cron');

var app = express();
var port = 3000;

const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

app.get('/', function (req, res) {
    res.send(`Hey!`);
});


app.get('/checkfingerprint', async function (req, res) {
    const generatedFingerprint = req.query.fingerprint;

    try {
        const existingFingerprint = await prisma.fingerprints.findFirst({
            where: {
                fingerprint: generatedFingerprint,
            }
        });

        if (existingFingerprint) {
            res.json({ fingerprint: existingFingerprint })
        } else {
            const newFingerprint = await prisma.fingerprints.create({
                data: {
                    fingerprint: generatedFingerprint,
                }
            });
            
            res.json({ fingerprint: newFingerprint });
        }
    } catch (error) {
        console.error('Error during checking fingerprint:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/queryToken', async function (req, res) {

    try {
        const { access_token } = await getUserAccessToken();
        console.log('Access Token:', access_token);
        res.json({ accessToken: access_token });
    } catch (error) {
        console.error('Error obtaining access token:', error);
    }
    
});


const hasaccount = false;
const ismatch = false;

const refreshToken = '';
const clientId = 'eba7122fe5364784a2f4f85693df1c35';
const clientSecret = '4640bc74ae474c3bbafac17945167153';
let authtoken = '';

const tokenEndpoint = 'https://accounts.spotify.com/api/token';

let accessToken;

let msg;
let issucces;



app.post('/login', async function(req, res) {
  var email = req.body.email;
  var password = req.body.password;

  try {
      const user = await prisma.felhasznalok.findFirst({
          where: {
              username: email,
          }
      });

      if (user) {
        try {
            const user = await prisma.felhasznalok.findFirst({
                where: {
                    username: email,
                    password: password
                }
            });
      
            if (user) {
                const { accesslvl, displayname, pfplink } = user;
                res.json({ ismatch: true, hasaccount: true, accesslvl: accesslvl, displayname: displayname, pfplink: pfplink});
            } else {
                // Triggered if email is found but password does not match
                res.json({ ismatch: false, hasaccount: true });
            }
        } catch (error) {
            console.error('Error during querying password auth:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
      } else {
        // triggered if email != match
          res.json({message: "User does not have an account!", hasaccount: false });
      }
  } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

let spotylink;

async function checkdbfordupe(link) {
    const existingRecord = await prisma.zenek.findFirst({
        where: {
            Link: link
        }
    });

    return !!existingRecord;
}

checkdbfordupe(spotylink)
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })



  async function checkislimited1(email) {
    const existingRecord = await prisma.zenek.findFirst({
        where: {
            email: email
        }
    });

    if (existingRecord) {
        return existingRecord.sentInAt;
    } else {
        return null;
    }
}

let email;

checkislimited1(email)
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

  async function checkifvalid(spotylink, accessToken) {

    try {
        const response = await fetch(`https://api.spotify.com/v1/tracks/${spotylink}`, {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        });

        if (response.ok) {
            console.log('Track ID is valid');
            const trackData = await response.json();
            return true;
        } else {
            msg = "A link nem valós spotify link!";
            return false;
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

  async function checkislimited2(email) {
    const sentInAt = await checkislimited1(email);

    if (sentInAt) {
        const twoHoursAgo = new Date();
        twoHoursAgo.setHours(twoHoursAgo.getHours() - 2);

        const sentInAtDate = new Date(sentInAt);

        if (sentInAtDate > twoHoursAgo) {
            msg = "Nem telt el az előző belküldés óta 2 óra!";
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}



app.post('/zenesent', async function (req, res) {
    spotylink = req.body.link;
    var osztaly = req.body.osztaly;
    var email = req.body.email;


    try {
        if (email === "" || osztaly === "" || spotylink === "") {
            var errormsg = "Az egyik mező üres!";
            triggerError(errormsg);
        }
        else {
            if (spotylink.startsWith('https://open.spotify.com/track/')) {
                if (email.endsWith('@taszi.hu')) {

                    async function checkforproblems(spotylink, email) {
                        const link = spotylink.split('/track/')[1].split('?')[0];
                        const doesexist = await checkdbfordupe(spotylink);
                        const isratelimited = await checkislimited2(email);
                        const isvalid = await checkifvalid(link, accessToken);
                        console.log(doesexist, isratelimited, isvalid);
                        if (!doesexist && !isratelimited && isvalid) {
                            return false;
                        }
                        else {
                            return true;
                        }
                    }

                    checkforproblems(spotylink, email)
                    .then(async () => {
                      await prisma.$disconnect()
                    })
                    .catch(async (e) => {
                      console.error(e)
                      await prisma.$disconnect()
                      process.exit(1)
                    })

                    const problems = await checkforproblems(spotylink, email)
                    if (problems === false) {

                    
                        const now = new Date();
                        const timezoneOffsetInMinutes = now.getTimezoneOffset();
                        now.setMinutes(now.getMinutes() - timezoneOffsetInMinutes);
                        const sentInAt = now.toISOString();
                        async function main() {
                            await prisma.zenek.create({
                              data: {
                                sentInAt: sentInAt,
                                Link: spotylink,
                                osztaly: osztaly,
                                email: email,
                              },
                            })
                        }
                        main()
                          .then(async () => {
                            await prisma.$disconnect()
                          })
                          .catch(async (e) => {
                            console.error(e)
                            await prisma.$disconnect()
                            process.exit(1)
                          })
                          console.log("Itt vagyok brooo!!!")
                          msg = "Sikeres beküldés!";
                          res.json({issuccess: true, msg: msg});
                        }
                        else {
                            msg = "Nem jo";
                            res.json({issuccess: false, msg: msg});
                        }
                }   
                else {
                    msg = "Nem taszis emailt adtál meg!";
                    res.json({issuccess: false, msg: msg});
                }
            
            }
            else {
                msg = "A spotify link nem  https://open.spotify.com/track/-el kezdődik!";
                res.json({issuccess: false, msg: msg});
            }
        }

    } catch (error) {
        console.error('Error during sending:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})



async function hashPassword(password) {
    try {
        const saltRounds = 10; // Number of salt rounds for bcrypt
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.error('Error hashing password:', error);
        throw error;
    }
}

async function triggerError(errormsg) {
    console.log(errormsg);
}

//!-----------------ReRequest access token every hour------------------------!\\
cron.schedule('0 * * * *', () => {
    console.log('Refreshing access token...');
    getAccessToken();
});
//!--------------------------------------------------------------------------!\\
getAccessToken();
getUserAccessToken();
//!-----------------Request token on startup---------------------------------!\\
const postData = new URLSearchParams();
postData.append('grant_type', 'client_credentials');
postData.append('client_id', 'eba7122fe5364784a2f4f85693df1c35');
postData.append('client_secret', '4640bc74ae474c3bbafac17945167153');

const config = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
};

    async function getAccessToken() {
        const postData = new URLSearchParams();
        postData.append('grant_type', 'client_credentials');
        postData.append('client_id', clientId);
        postData.append('client_secret', clientSecret);
    
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
    
        try {
            const response = await axios.post(tokenEndpoint, postData, config);
            accessToken = response.data.access_token;
            console.log('Access token:', accessToken);
            return accessToken;
        } catch (error) {
            console.error('Error obtaining access token:', error.response.data);
            throw error;
        }
    }

    async function getUserAccessToken() {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            body: new URLSearchParams({
                'grant_type': 'client_credentials',
                'scope': 'streaming', // Add the 'streaming' scope here
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + (Buffer.from(clientId + ':' + clientSecret).toString('base64')),
            },
        });
    
        return await response.json();
    }
    
    module.exports = getAccessToken;
  //!--------------------------------------------------------------------------!\\


console.log("running");
console.log(getUserAccessToken());


app.post('/linksent', async function (req, res) {
    var link = req.body.link;
    console.log(link);

    try {
        if (link !== "") {
            if (link.startsWith('https://open.spotify.com/track/')) {
                // Call checkSongName and await its result
                const trackName = await checkSongName(link);
                const coverURL = await checkSongCover(link);
                console.log("Song name is: ", trackName, "Cover URl is: ", coverURL);
                res.json({ trackName: trackName, coverURL: coverURL});
            } else {
                let errormsg = "A link nem https://open.spotify.com/track/-el kezdődik!";
                triggerError(errormsg);
            }
        } else {
            let errormsg = "Üres a link!";
            triggerError(errormsg);
        }
    } catch (error) {
        console.error('Error during sending:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

async function checkSongName(link) {
    try {
        const trackId = link.split('/track/')[1].split('?')[0];
        const response = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch track data: ${response.statusText}`);
        }

        const data = await response.json();
        const trackName = data.name;
        console.log('Track Name:', trackName);
        return trackName;
    } catch (error) {
        console.error('Error fetching track data:', error.message);
        throw error;
    }
}

async function checkSongCover(link) {
    try {
        const trackId = link.split('/track/')[1].split('?')[0];
        const response = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch track data: ${response.statusText}`);
        }

        const data = await response.json();
        const coverURL = data.album.images[0].url;
        console.log('Track Name:', coverURL);
        return coverURL;
    } catch (error) {
        console.error('Error fetching track data:', error.message);
        throw error;
    }
    
}

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});