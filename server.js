const express = require('express');
const app = express();
const PORT = 3000;
const MONGO_STRING = 'mongodb+srv://arolson87:td0%40b0ltwf@cluster0.do7vy.mongodb.net/hunters?retryWrites=true&w=majority';
const mongoose = require('mongoose');

app.use(express.urlencoded({extended: true}));

const bountiesSchema = new mongoose.Schema({
    name:{type: String, required: true},
    wantedFor: {type: String, required: true},
    client: {type: String, required: true},
    reward: {type: Number, required: true},
    ship: {type: String, required: true},
    hunters: {type: Array, required: true},
    captured: {type: Boolean, required: true}
});


mongoose.connect(MONGO_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const Bounties = mongoose.model("Bounties", bountiesSchema)


// Bounties.create([
    // {
    //     "name": "Han Solo",
    //     "wantedFor" : "Owing money",
    //     "client" : "Jabba the Hut",
    //     "reward" : 1000000,
    //     "ship": "Millennium Falcon",
    //     "hunters" : ["Bobba Fett", "Dengar", "IG-88", "Zuckuss", "Greedo", "Bossk", "4-LOM"],
    //     "captured": false
    // },

//     {
//       name: 'Rocket',
//       wantedFor : 'Stealing Batteries',
//       client : 'Ayesha High Priestess of the Sovereign',
//       reward : 1000000000,
//       ship: 'The Milano',
//       hunters :['Nebula', 'Ravagers'],
//       captured: false
//     },
//     {
//       name: 'Sara Lance',
//       wantedFor : 'Screwing up the timeline, causing anachronisms',
//       client : 'Time Bureau',
//       reward : 50000,
//       ship: 'Waverider',
//       hunters :['Chronos'],
//       captured: false
//     },
//     {
//       name: 'Malcolm Reynolds',
//       wantedFor : 'Aiming to misbehave',
//       client : 'The Alliance',
//       reward : 40000,
//       ship: 'Serenity',
//       hunters :['Jubal Early'],
//       captured: false
//     },
//     {
//       name: 'Starbuck',
//       wantedFor : "Disobeying Captain's orders",
//       client : 'Captain Adama',
//       ship: 'Demetrius',
//       reward : 1000,
//       hunters :['Apollo'],
//       captured: true
//     }
//   ])


// Create

app.post('/', (req, res)=>{
    Bounties.create(req.body, (err, createdBounty)=>{
        if(!err){
            res.send(createdBounty);
        }  else {
            res.send(err);
        }
    })
})

// Read

app.get('/', (req, res)=>{
    Bounties.find({}, (err, allBounties)=>{
        if (err){
            res.send(err)
        } else {
            res.send(allBounties)
        }
    })
})

// Update

app.put('/:id', (req, res)=>{
    Bounties.findByIdAndUpdate(req.params.id, req.body,
        (err, updatedBounties)=>{
            if(!err){
                res.send(updatedBounties);
            }  else {
                res.send(err);
            }
        })
} )

// Destroy
app.delete('/:id', (req, res)=>{
    Bounties.findByIdAndRemove(req.params.id, (err, deletedItem)=>{
        if(!err){
            res.send({
                results: 'item deleted successfully'
            })
        } else {
            res.send(err)
        }
    })
})

app.get('/', (req, res) => {
    Bounties.find({}, (err, allBounties) => {
       if (err){
           res.send(err.message)
       } else {
           res.send(allBounties)
       }
    })
  })

mongoose.connection.once('open', ()=> {
    console.log('Everything is Awesome');
})

app.listen(PORT, ()=> {
    console.log('Everything is cool when your part of a team');
})