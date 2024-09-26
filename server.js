const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const session = require('express-session');

const app = express();
const port = 5244;

app.use(
    express.urlencoded({ extended: true }),
    express.json(),
    express.static(__dirname + '/public'),
    session({
        secret: 'secret_key',
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false }
    })
);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});
app.get('/index.html', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});
app.get('/cat.html', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/cat.html'));
});
app.get('/find.html', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/find.html'));
});
app.get('/giveaway.html', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/giveaway.html'));
});
app.get('/contact.html', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/contact.html'));
});
app.get('/account.html', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/account.html'));
});
app.get('/dog.html', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/dog.html'));
});
app.get('/disclaimer.html', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/disclaimer.html'));
});

//Login post request
app.post('/login', (req, res) => {
    
    const { username, password } = req.body;
    const filePath = path.join(__dirname, 'files', 'login.txt');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).json({ message: 'Error reading user data' });
        }

        const users = data.split('\n')
                          .map(line => line.trim())  
                          .map(line => line.split(':'));

        const user = users.find(([storedUsername, storedPassword]) => storedUsername === username && storedPassword === password);

        if (!user) {
            return res.status(401).json({ message: 'Invalid Username or Password' });
        }

        req.session.username = username;
        console.log(username, 'logged in!');
        res.status(200).json({ message: 'Login Successful' });
    });
});

// Signup post request
app.post('/signup' , (req, res) => {
    const { username, password } = req.body;
    const user = `${username}:${password}`;

    console.log(req.body);

    if(usernameAvailable(username)) {    
        if (validateSignupForm(username, password)) {
            fs.appendFile(path.join(__dirname, 'files', 'login.txt'), user +'\n', 'utf8', (err) => {
                if(err) {
                    console.error('Error writing file:', err);
                    res.status(500).json({ message: 'Internal Server Error' });
                } 
                else {
                    console.log('File written succesfully.');
                    res.status(200).json({ message: 'Account created successfuly. You can now log in.' });
                }
            });
        }
        else {
            console.log('invalid username or password format');
            res.status(400).json({ message: 'Invalid username or password format.' });
        };
    }
    else {
        console.log('username taken');
        res.status(400).json({ message: 'Username already in use. Please choose a different one.' });
    };
});

app.post('/giveaway', (req, res) => {
    
    if(!req.session.username) {
        return res.status(401).json({ message: 'Unauthorized. Must Log In before submitting.' })
    }
    
    const { pet, breed, age, gender, dogs, cats, children, comment, owner, email  } = req.body;
    
    if (!pet || !breed || !age || !gender || !dogs || !cats || !children || !comment || !owner || !email) {
         return res.status(400).json({ message: 'Please fill in all fields.' });
    }
    
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        return res.status(400).json({ message: 'Invalid email pattern.' });
    }

    const petInfo = `${getAvailablePetId()}:${req.session.username}:${pet}:${breed}:${age}:${gender}:Gets along with dogs (${dogs}):cats (${cats}):children (${children}):${comment}:${owner}:${email}`;

    fs.appendFile(path.join(__dirname, 'files', 'available.txt'), petInfo + '\n', 'utf8', (err) => {
        if (err) {
            console.error('Error writing file:', err);
            res.status(500).json({ message: 'Internal Server Error' });  
        } 

        console.log('Pet information added successfully.');
        res.status(200).json({ message: 'Pet information added successfully.' });
    });
});

app.get('/find', (req, res) => {
    const { pet, breed, age, gender, dogs, cats, children } = req.query;
    // const criteria = { pet, breed, age, gender, dogs, cats, children };
    
    fs.readFile(path.join(__dirname, 'files','available.txt'),'utf8', (err, data) => {
        if(err) {
            console.error('Error reading file:', err)
            return res.status(500).send('Inernal Server Error')
        }
        
        let availablePets = data.trim().split('\n').map(line => line.split(':'))

        if (pet !== 'any') availablePets = availablePets.filter(p => p[2] === pet);
        if (breed !== 'any') availablePets = availablePets.filter(p => p[3] === breed);
        if (age !== 'any') availablePets = availablePets.filter(p => p[4] === age);
        if (gender !== 'any') availablePets = availablePets.filter(p => p[5] === gender);
        if (dogs !== 'any') availablePets = availablePets.filter(p => p[6] === dogs);
        if (cats !== 'any') availablePets = availablePets.filter(p => p[7] === cats);
        if (children !== 'any') availablePets = availablePets.filter(p => p[8] === children);
        
        res.json(availablePets)
    }); 
});


app.get('/logout', (req,res) => {
    if(req.session.username) {
        console.log(req.session.username, ' logging out...');
        req.session.destroy((err) => {
            if (err) {
                console.log('Logout error: ', err);
                res.status(500).json({ success: false, message: 'Logout failed', redirect: '/' });
            }
            else {
                console.log('Logout succesful');
                res.json({ success: true, message: 'Logged out successfully', redirect: '/' });
            }
        });
    }
    else {
        console.log('No active session');
        res.json({ success: false, message: 'No active session', redirect: '/' });
    }
    
});

function usernameAvailable(user) {
    const usernames = fs.readFileSync(path.join(__dirname, 'files', 'login.txt'), 'utf8').split('\n').map(line => line.split(':')[0]);
    return !usernames.includes(user);
}

function validateSignupForm(user, pass) {
    const userPattern = /^[a-zA-Z0-9]+$/;
    const passPattern = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{4,}$/;

    return userPattern.test(user) && passPattern.test(pass);
}

function getAvailablePetId() {
    const availablePets = fs.readFileSync(path.join(__dirname, 'files', 'available.txt'), 'utf8').trim().split('\n').filter(line => line);
    return availablePets.length + 1;
}

app.listen(port, () =>{
    console.log(`Server listening on port ${port}`)
})