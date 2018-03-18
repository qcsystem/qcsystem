var express=require("express");
var app=express();
var server = require("http").createServer(app);
var mysql=require("mysql");
var bodyparser = require('body-parser');









var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');





// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/drive-nodejs-quickstart.json
var SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly'];
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'drive-nodejs-quickstart.json';

// Load client secrets from a local file.
fs.readFile('client_secret.json', function processClientSecrets(err, content) {
  if (err) {
    console.log('Error loading client secret file: ' + err);
    return;
  }
  // Authorize a client with the loaded credentials, then call the
  // Drive API.
  authorize(JSON.parse(content));
});
var oauth2Client;
function authorize(credentials) {
  var clientSecret = credentials.installed.client_secret;
  var clientId = credentials.installed.client_id;
  var redirectUrl = credentials.installed.redirect_uris[0];
  var auth = new googleAuth();
  oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, function(err, token) {
    if (err) {
      getNewToken(oauth2Client);
    } else {
      oauth2Client.credentials = JSON.parse(token);
      
    }
  });
}

function getNewToken(oauth2Client) {
  var authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  console.log('Authorize this app by visiting this url: ', authUrl);
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Enter the code from that page here: ', function(code) {
    rl.close();
    oauth2Client.getToken(code, function(err, token) {
      if (err) {
        console.log('Error while trying to retrieve access token', err);
        return;
      }
      oauth2Client.credentials = token;
      storeToken(token);
    });
  });
}

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
function storeToken(token) {
  try {
    fs.mkdirSync(TOKEN_DIR);
  } catch (err) {
    if (err.code != 'EEXIST') {
      throw err;
    }
  }
  fs.writeFile(TOKEN_PATH, JSON.stringify(token));
  console.log('Token stored to ' + TOKEN_PATH);
}

/**
 * Lists the names and IDs of up to 10 files.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */



var connection = mysql.createConnection({
  host     : 'sql11.freemysqlhosting.net',
  user     : 'sql11225940',
  password : 'pPHiUPf7KI',
  database:"sql11225940"
});
app.use(bodyparser.urlencoded({ extended: true }));
app.set("view engine","ejs");
app.use(express.static((__dirname, 'public'))); 
connection.connect(function(error){
if(error)throw error;
    console.log("connected database");
});
server.listen(process.env.PORT || 5000);
app.get("/employees",function(req,res){
    res.render("employees");
});
app.post("/getdata",function(req,res){



  var drive = google.drive('v3');
      var fileMetadata = {
        'name': 'photo.jpg'
      };
      var media = {
        mimeType: 'image/jpeg',
        body: req.body.id
      };
      drive.files.create({
        auth:oauth2Client,
        resource: fileMetadata,
        media: media,
        fields: 'id'
      }, function(err, file) {
        if(err) {
          // Handle error
          console.log(err);
        } else {
          console.log('File Id: ', file.id);
        }
      });





console.log(req.body.Personal);
    connection.query("INSERT INTO EMPLOYEE (EMPNO,NAME,ADDRESS,PHONENO,BIRTHDATE,IDNO,HIREDATE,JOB,EDLEVEL,SEX,NATIONALITY,MARSTAT,MILSTAT,SALARY,EMAIL,FACEBOOK,PERSONALPIC,IDPIC) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
                                            [req.body.num,req.body.name,req.body.Address,req.body.Phone,req.body.Birth,req.body.ID,req.body.Hiring,req.body.Job,req.body.Educational,req.body.Sex,req.body.Nationality,req.body.Martial,req.body.Military,req.body.Salary,req.body.Email,req.body.Facebook,req.body.id,req.body.Personal],function(err,result){
    if (err){
        res.json({error : "not uploaded", status : 400});
        throw err;
    }
    else{
     console.log("Added Employee");
     res.json({success : "Updated Successfully", status : 200});
    }
  });
});

/*
git add .>
git commit -m "test 2"
git push heroku master
*/