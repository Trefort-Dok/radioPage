var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var axios = require('axios');
var cron = require('node-cron');
var app = express();
var port = 3000;
var bcrypt = require('bcrypt');
var cookieParser = require('cookie-parser');
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
var PrismaClient = require('@prisma/client').PrismaClient;
var prisma = new PrismaClient();
app.get('/', function (req, res) {
    res.send("Hey!");
});
app.get('/checkfingerprint', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var generatedFingerprint, existingFingerprint, newFingerprint, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    generatedFingerprint = req.query.fingerprint;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, prisma.fingerprints.findFirst({
                            where: {
                                fingerprint: generatedFingerprint,
                            }
                        })];
                case 2:
                    existingFingerprint = _a.sent();
                    if (!existingFingerprint) return [3 /*break*/, 3];
                    res.json({ fingerprint: existingFingerprint });
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, prisma.fingerprints.create({
                        data: {
                            fingerprint: generatedFingerprint,
                        }
                    })];
                case 4:
                    newFingerprint = _a.sent();
                    res.json({ fingerprint: newFingerprint });
                    _a.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6:
                    error_1 = _a.sent();
                    console.error('Error during checking fingerprint:', error_1);
                    res.status(500).json({ error: 'Internal server error' });
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
});
app.get('/queryToken', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var access_token, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, getUserAccessToken()];
                case 1:
                    access_token = (_a.sent()).access_token;
                    console.log('Access Token:', access_token);
                    res.json({ accessToken: access_token });
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    console.error('Error obtaining access token:', error_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
});
var hasaccount = false;
var ismatch = false;
var refreshToken = '';
var clientId = 'eba7122fe5364784a2f4f85693df1c35';
var clientSecret = '4640bc74ae474c3bbafac17945167153';
var authtoken = '';
var tokenEndpoint = 'https://accounts.spotify.com/api/token';
var accessToken;
var msg;
var issucces;
app.post('/login', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var email, password, user, user_1, accesslvl, displayname, pfplink, error_3, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    email = req.body.email;
                    password = req.body.password;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 9, , 10]);
                    return [4 /*yield*/, prisma.felhasznalok.findFirst({
                            where: {
                                username: email,
                            }
                        })];
                case 2:
                    user = _a.sent();
                    if (!user) return [3 /*break*/, 7];
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, prisma.felhasznalok.findFirst({
                            where: {
                                username: email,
                                password: password
                            }
                        })];
                case 4:
                    user_1 = _a.sent();
                    if (user_1) {
                        accesslvl = user_1.accesslvl, displayname = user_1.displayname, pfplink = user_1.pfplink;
                        res.json({ ismatch: true, hasaccount: true, accesslvl: accesslvl, displayname: displayname, pfplink: pfplink });
                    }
                    else {
                        // Triggered if email is found but password does not match
                        res.json({ ismatch: false, hasaccount: true });
                    }
                    return [3 /*break*/, 6];
                case 5:
                    error_3 = _a.sent();
                    console.error('Error during querying password auth:', error_3);
                    res.status(500).json({ error: 'Internal server error' });
                    return [3 /*break*/, 6];
                case 6: return [3 /*break*/, 8];
                case 7:
                    // triggered if email != match
                    res.json({ message: "User does not have an account!", hasaccount: false });
                    _a.label = 8;
                case 8: return [3 /*break*/, 10];
                case 9:
                    error_4 = _a.sent();
                    console.error('Error during login:', error_4);
                    res.status(500).json({ error: 'Internal server error' });
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    });
});
var spotylink;
function checkdbfordupe(link) {
    return __awaiter(this, void 0, void 0, function () {
        var existingRecord;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prisma.zenek.findFirst({
                        where: {
                            Link: link
                        }
                    })];
                case 1:
                    existingRecord = _a.sent();
                    return [2 /*return*/, !!existingRecord];
            }
        });
    });
}
checkdbfordupe(spotylink)
    .then(function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })
    .catch(function (e) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.error(e);
                return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                process.exit(1);
                return [2 /*return*/];
        }
    });
}); });
function checkislimited1(email) {
    return __awaiter(this, void 0, void 0, function () {
        var existingRecord;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prisma.zenek.findFirst({
                        where: {
                            email: email
                        }
                    })];
                case 1:
                    existingRecord = _a.sent();
                    if (existingRecord) {
                        return [2 /*return*/, existingRecord.sentInAt];
                    }
                    else {
                        return [2 /*return*/, null];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
var email;
checkislimited1(email)
    .then(function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })
    .catch(function (e) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.error(e);
                return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                process.exit(1);
                return [2 /*return*/];
        }
    });
}); });
function checkifvalid(spotylink, accessToken) {
    return __awaiter(this, void 0, void 0, function () {
        var response, trackData, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, fetch("https://api.spotify.com/v1/tracks/".concat(spotylink), {
                            headers: {
                                'Authorization': 'Bearer ' + accessToken
                            }
                        })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) return [3 /*break*/, 3];
                    console.log('Track ID is valid');
                    return [4 /*yield*/, response.json()];
                case 2:
                    trackData = _a.sent();
                    return [2 /*return*/, true];
                case 3:
                    msg = "A link nem valós spotify link!";
                    return [2 /*return*/, false];
                case 4: return [3 /*break*/, 6];
                case 5:
                    error_5 = _a.sent();
                    console.error('Error:', error_5);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
function checkislimited2(email) {
    return __awaiter(this, void 0, void 0, function () {
        var sentInAt, twoHoursAgo, sentInAtDate;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, checkislimited1(email)];
                case 1:
                    sentInAt = _a.sent();
                    if (sentInAt) {
                        twoHoursAgo = new Date();
                        twoHoursAgo.setHours(twoHoursAgo.getHours() - 2);
                        sentInAtDate = new Date(sentInAt);
                        if (sentInAtDate > twoHoursAgo) {
                            msg = "Nem telt el az előző belküldés óta 2 óra!";
                            return [2 /*return*/, true];
                        }
                        else {
                            return [2 /*return*/, false];
                        }
                    }
                    else {
                        return [2 /*return*/, false];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
app.post('/zenesent', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        function checkforproblems(spotylink, email) {
            return __awaiter(this, void 0, void 0, function () {
                var link, doesexist, isratelimited, isvalid;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            link = spotylink.split('/track/')[1].split('?')[0];
                            return [4 /*yield*/, checkdbfordupe(spotylink)];
                        case 1:
                            doesexist = _a.sent();
                            return [4 /*yield*/, checkislimited2(email)];
                        case 2:
                            isratelimited = _a.sent();
                            return [4 /*yield*/, checkifvalid(link, accessToken)];
                        case 3:
                            isvalid = _a.sent();
                            console.log(doesexist, isratelimited, isvalid);
                            if (!doesexist && !isratelimited && isvalid) {
                                return [2 /*return*/, false];
                            }
                            else {
                                return [2 /*return*/, true];
                            }
                            return [2 /*return*/];
                    }
                });
            });
        }
        function main() {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, prisma.zenek.create({
                                data: {
                                    sentInAt: sentInAt_1,
                                    Link: spotylink,
                                    osztaly: osztaly,
                                    email: email,
                                },
                            })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        }
        var osztaly, email, errormsg, problems, now, timezoneOffsetInMinutes, sentInAt_1, error_6;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    spotylink = req.body.link;
                    osztaly = req.body.osztaly;
                    email = req.body.email;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 8, , 9]);
                    if (!(email === "" || osztaly === "" || spotylink === "")) return [3 /*break*/, 2];
                    errormsg = "Az egyik mező üres!";
                    triggerError(errormsg);
                    return [3 /*break*/, 7];
                case 2:
                    if (!spotylink.startsWith('https://open.spotify.com/track/')) return [3 /*break*/, 6];
                    if (!email.endsWith('@taszi.hu')) return [3 /*break*/, 4];
                    checkforproblems(spotylink, email)
                        .then(function () { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, prisma.$disconnect()];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })
                        .catch(function (e) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    console.error(e);
                                    return [4 /*yield*/, prisma.$disconnect()];
                                case 1:
                                    _a.sent();
                                    process.exit(1);
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [4 /*yield*/, checkforproblems(spotylink, email)];
                case 3:
                    problems = _a.sent();
                    if (problems === false) {
                        now = new Date();
                        timezoneOffsetInMinutes = now.getTimezoneOffset();
                        now.setMinutes(now.getMinutes() - timezoneOffsetInMinutes);
                        sentInAt_1 = now.toISOString();
                        main()
                            .then(function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, prisma.$disconnect()];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })
                            .catch(function (e) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        console.error(e);
                                        return [4 /*yield*/, prisma.$disconnect()];
                                    case 1:
                                        _a.sent();
                                        process.exit(1);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        console.log("Itt vagyok brooo!!!");
                        msg = "Sikeres beküldés!";
                        res.json({ issuccess: true, msg: msg });
                    }
                    else {
                        msg = "Nem jo";
                        res.json({ issuccess: false, msg: msg });
                    }
                    return [3 /*break*/, 5];
                case 4:
                    msg = "Nem taszis emailt adtál meg!";
                    res.json({ issuccess: false, msg: msg });
                    _a.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6:
                    msg = "A spotify link nem  https://open.spotify.com/track/-el kezdődik!";
                    res.json({ issuccess: false, msg: msg });
                    _a.label = 7;
                case 7: return [3 /*break*/, 9];
                case 8:
                    error_6 = _a.sent();
                    console.error('Error during sending:', error_6);
                    res.status(500).json({ error: 'Internal server error' });
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    });
});
function hashPassword(password) {
    return __awaiter(this, void 0, void 0, function () {
        var saltRounds, hashedPassword, error_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    saltRounds = 10;
                    return [4 /*yield*/, bcrypt.hash(password, saltRounds)];
                case 1:
                    hashedPassword = _a.sent();
                    return [2 /*return*/, hashedPassword];
                case 2:
                    error_7 = _a.sent();
                    console.error('Error hashing password:', error_7);
                    throw error_7;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function triggerError(errormsg) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            console.log(errormsg);
            return [2 /*return*/];
        });
    });
}
//!-----------------ReRequest access token every hour------------------------!\\
cron.schedule('0 * * * *', function () {
    console.log('Refreshing access token...');
    getAccessToken();
});
//!--------------------------------------------------------------------------!\\
getAccessToken();
getUserAccessToken();
//!-----------------Request token on startup---------------------------------!\\
var postData = new URLSearchParams();
postData.append('grant_type', 'client_credentials');
postData.append('client_id', 'eba7122fe5364784a2f4f85693df1c35');
postData.append('client_secret', '4640bc74ae474c3bbafac17945167153');
var config = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
};
function getAccessToken() {
    return __awaiter(this, void 0, void 0, function () {
        var postData, config, response, error_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    postData = new URLSearchParams();
                    postData.append('grant_type', 'client_credentials');
                    postData.append('client_id', clientId);
                    postData.append('client_secret', clientSecret);
                    config = {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios.post(tokenEndpoint, postData, config)];
                case 2:
                    response = _a.sent();
                    accessToken = response.data.access_token;
                    console.log('Access token:', accessToken);
                    return [2 /*return*/, accessToken];
                case 3:
                    error_8 = _a.sent();
                    console.error('Error obtaining access token:', error_8.response.data);
                    throw error_8;
                case 4: return [2 /*return*/];
            }
        });
    });
}
function getUserAccessToken() {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('https://accounts.spotify.com/api/token', {
                        method: 'POST',
                        body: new URLSearchParams({
                            'grant_type': 'client_credentials',
                            'scope': 'streaming', // Add the 'streaming' scope here
                        }),
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Authorization': 'Basic ' + (Buffer.from(clientId + ':' + clientSecret).toString('base64')),
                        },
                    })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
module.exports = getAccessToken;
//!--------------------------------------------------------------------------!\\
console.log("running");
console.log(getUserAccessToken());
app.post('/linksent', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var link, trackName, coverURL, errormsg, errormsg, error_9;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    link = req.body.link;
                    console.log(link);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 8, , 9]);
                    if (!(link !== "")) return [3 /*break*/, 6];
                    if (!link.startsWith('https://open.spotify.com/track/')) return [3 /*break*/, 4];
                    return [4 /*yield*/, checkSongName(link)];
                case 2:
                    trackName = _a.sent();
                    return [4 /*yield*/, checkSongCover(link)];
                case 3:
                    coverURL = _a.sent();
                    console.log("Song name is: ", trackName, "Cover URl is: ", coverURL);
                    res.json({ trackName: trackName, coverURL: coverURL });
                    return [3 /*break*/, 5];
                case 4:
                    errormsg = "A link nem https://open.spotify.com/track/-el kezdődik!";
                    triggerError(errormsg);
                    _a.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6:
                    errormsg = "Üres a link!";
                    triggerError(errormsg);
                    _a.label = 7;
                case 7: return [3 /*break*/, 9];
                case 8:
                    error_9 = _a.sent();
                    console.error('Error during sending:', error_9);
                    res.status(500).json({ error: 'Internal server error' });
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    });
});
function checkSongName(link) {
    return __awaiter(this, void 0, void 0, function () {
        var trackId, response, data, trackName, error_10;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    trackId = link.split('/track/')[1].split('?')[0];
                    return [4 /*yield*/, fetch("https://api.spotify.com/v1/tracks/".concat(trackId), {
                            headers: {
                                'Authorization': 'Bearer ' + accessToken
                            }
                        })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("Failed to fetch track data: ".concat(response.statusText));
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    trackName = data.name;
                    console.log('Track Name:', trackName);
                    return [2 /*return*/, trackName];
                case 3:
                    error_10 = _a.sent();
                    console.error('Error fetching track data:', error_10.message);
                    throw error_10;
                case 4: return [2 /*return*/];
            }
        });
    });
}
function checkSongCover(link) {
    return __awaiter(this, void 0, void 0, function () {
        var trackId, response, data, coverURL, error_11;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    trackId = link.split('/track/')[1].split('?')[0];
                    return [4 /*yield*/, fetch("https://api.spotify.com/v1/tracks/".concat(trackId), {
                            headers: {
                                'Authorization': 'Bearer ' + accessToken
                            }
                        })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("Failed to fetch track data: ".concat(response.statusText));
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    coverURL = data.album.images[0].url;
                    console.log('Track Name:', coverURL);
                    return [2 /*return*/, coverURL];
                case 3:
                    error_11 = _a.sent();
                    console.error('Error fetching track data:', error_11.message);
                    throw error_11;
                case 4: return [2 /*return*/];
            }
        });
    });
}
app.listen(port, function () {
    console.log("Server is listening on port ".concat(port));
});
