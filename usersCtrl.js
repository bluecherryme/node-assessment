var users = require('./userData.json');
var id = 101;

module.exports = {
    getUsers: function(req,res,next){
        if(req.query.age){
            var filterAge = users.filter(user=>{
                return user.age < req.query.age;
            });
            res.status(200).json(filterAge);

        } else if(req.query.lastname){
            var filterName = users.filter(user=>{
                return user.last_name === req.query.lastname;});
            res.status(200).json(filterName);

        } else if(req.query.email){
            var filterEmail = users.filter(user=>{
                return user.email === req.query.email;});
            res.status(200).json(filterEmail);

        } else if(req.query.favorites){
            var filterFav = users.filter(user=>{
                return user.favorites.indexOf(req.query.favorites) > -1;
            });
            res.status(200).json(filterFav);
        }
        
        else{
            res.status(200).json(users);
        }
    },

    getUserByID: function(req,res,next){
        var user = users.filter(user=>{
            return user.id === parseInt(req.params.userId);
        });
        if (user[0]){
            res.status(200).json(user[0]);
        } else{
            res.status(404).json(null);
        }
    },

    getAdmins: function(req,res,next){
        var admins = users.filter(user=>{
            return user.type === 'admin';
        });
        res.status(200).json(admins);
    },

    getNonAdmins: function(req,res,next){
        var nonAdmins = users.filter(user=>{
            return user.type === 'user' || user.type === 'moderator';
        });
        res.status(200).json(nonAdmins);
    },

    getUsersByType: function(req,res,next){
        var usersT = users.filter((user)=>{
            return user.type === req.params.userType;
        });
        res.status(200).json(usersT);
    },

    updateUser: function(req,res,next){
        var index = users.findIndex(el=>{
            return el.id === req.body.id;
        });
        users.splice(index,1,req.body);
        res.status(200).json(users);
    },

    postUser: function(req,res,nest){
        req.body.id = id;
        id++;
        users.push(req.body);
        res.status(200).json(users);
    }

};