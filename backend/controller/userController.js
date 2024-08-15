const UserModel=require('../models/userMosel')
const bcrypt=require("bcrypt")
const jwt = require('jsonwebtoken') 
exports.signup = async (req, res) => {
    console.log(req.body);

    const existingUser = await UserModel.findOne({ email: req.body.email });
    if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new UserModel({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
    });

    user.save()
        .then(doc => {
            console.log(doc);
            doc.password = undefined; // Hide password in response
            const token = jwt.sign({ email: doc.email,userId:doc._id.toString() }, 'supersecretkey', { expiresIn: '1h' })
            console.log('token is '+token);
            
              return res.json({  token:token });
          
        })
        .catch(err => {
            console.log('Error:', err);
            return res.status(500).json({ err: err.message });
        });
};


 exports.login= async (req, res) => {
   try {
       const user = await UserModel.findOne({ email: req.body.email })
       if (!user) {
           return res.status(400).json({error:"user not found"})
       }

       const compare_password = await bcrypt.compare( req.body.password,user.password,)
       if (!compare_password) {
           return res.status(400).json({error:"wrong password"})
     }
//  req.session.userId = user._id;
       user.password = undefined
       const token = jwt.sign({ email: user.email,userId:user._id.toString() }, 'supersecretkey', { expiresIn: '1h' })
         console.log('token is '+token);
          
              return res.json({  token:token });
            //  return res.status(200).json({ message: "Login successful",user:user });
   } catch (error) {
     return res.status(400).json({error:"error occurred"})
       
   }
}






exports.home = async (req, res) => {
   return res.json({userId:req.userId})
   
   
    
};
exports.getUserData = async (req, res) => {

     try {
       const user = await UserModel.findById(req.userId)
       if (!user) {
           return res.status(400).json({error:"user not found"})
       }

       

        
              return res.json({   name: user.name});
            //  return res.status(200).json({ message: "Login successful",user:user });
   } catch (error) {
     return res.status(400).json({error:"error occurred"})
       
    }  
    
};
exports.updateUserData = async (req, res) => {

     try {
       const user = await UserModel.findById(req.userId)
       if (!user) {
           return res.status(400).json({error:"user not found"})
       }
console.log('reques is '+req.body.name);

       user.name=req.body.name
           user.save()
        .then(doc => {
            console.log(doc);
            
    const token = jwt.sign({ email: user.email,userId:user._id.toString() }, 'supersecretkey', { expiresIn: '1h' })
         console.log('token is '+token);
          
             
          
            return res.json({
                 token: token,
                name: user.name
            });
          
        })
        .catch(err => {
            console.log('Error:', err);
            return res.status(500).json({ err: err.message });
        });
         
         

      
            //  return res.status(200).json({ message: "Login successful",user:user });
   } catch (error) {
     return res.status(400).json({error:"error occurred"})
       
    }  
    
};



