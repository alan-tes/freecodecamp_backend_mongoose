const mongoose = require('mongoose');

require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
 name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
  })

let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
    var janeFonda = new Person({name: "Jane Fonda", age: 84, favoriteFoods: ["eggs", "fish", "fresh fruit"]});

  janeFonda.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
};

const createManyPeople = (arrayOfPeople, done) => {

  Person.create(arrayOfPeople)
  .then(users => {
    console.log(users);
    done(null, arrayOfPeople)
}).catch(err => console.log(err));
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err, user) => {
if(err) {
  err => console.log(err)
} else {
    console.log(user);
    done(null, user)
}
  })
};

const findOneByFood = (food, done) => {
   Person.findOne({favoriteFoods: food}, (err, favoriteFoodss) => {
if(err) {
  err => console.log(err)
} else {
    console.log(favoriteFoodss);
    done(null, favoriteFoodss)
}
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, user) => {
if(err) {
  err => console.log(err)
} else {
    console.log(user);
    done(null, user)
}
  })
};

const findEditThenSave = (personId, done) => {
   Person.findById(personId, (err, user) => {
     if(err) {
       err => console.log(err)
      } else {
  const foodToAdd = "hamburger";
  user.favoriteFoods.push(foodToAdd) 
  user.save((err, updatedPerson) => {
      if(err) return console.log(err);
      done(null, updatedPerson)
    })
}
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet} ,{new: true},  (err, updatedDoc) => {
      if(err) return console.log(err);
      done(null, updatedDoc)
    })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId,  (err, removedDoc) => {
      if(err) return console.log(err);
      done(null, removedDoc)
    })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
 Person.remove({name: nameToRemove},  (err, removedItems) => {
      if(err) return console.log(err);
      done(null, removedItems)
    })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
