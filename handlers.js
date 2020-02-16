const Knex = require("knex");
const knexOptions = require("./knexfile");
const knex = Knex(knexOptions);
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//users handlers
function getUser(req,res){
    knex
    .select()
    .table('users')
    .then((data)=>{
        res.json(data)
    })
}

function getSingleUser(req,res){
    knex
    .select()
    .table('users')
    .where({ username: req.params.username })
    .then((data)=>{
        res.json(data)
        console.log(data);
    })
}

function addUser(req,res){
    var allow = true;
    if(req.body.username.length < 5){
        res.end("Username must be at least 5 characters long ")
        allow = false;
    }
    if(req.body.password.length < 5){
        res.end("Password must be at least 5 characters long ")
        allow = false;
    }
    if(allow){
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);
        var values = {
            username: req.body.username,
            fullname: req.body.fullname,
            email: req.body.email,
            address: req.body.address,
            password: hashedPassword
        };
        knex
        .select("username")
        .from("users")
        .where("username", req.body.username)
        .then(userNameList => {
            if (userNameList.length === 0) {
                knex('users')
                .insert(values)
                .then(
                    ()=>{
                        res.end("User registered!")
                    }
                )
            }else{
                res.end("The username you chose is already reserved. Try another!")
            }
        })
        .catch(err=>{
            res.end('error')
        })
        
    }
    
}

// create a auth handler
function authUser(request, response) {
    const username = request.body.username;
    const passwordFromJSON = request.body.password;
  
    knex
      .table('users')
      .first('password')
      .where('username', username)
      .then(data => {
        if (!data) {
          response.json({
            status: 'fail',
            message: 'User not found.'
          })
        } else {
          const password = data.password;
          const isMatch = bcrypt.compareSync(passwordFromJSON, password);
          if (isMatch) {
            // password matched
            response.json({
              status: 'success',
              accessToken: jwt.sign({
                username: username
              }, 'secret_key')
            })
          } else {
            response.json({
              status: 'fail',
              message: 'Invalid login details'
            })
          }
        }
        
      })
      .catch(error => {
        response.json({
          status: 'fail',
          message: error
        })
      })
  }

function addHospital(req,res){
    var values= {
        name : req.body.name,
        address : req.body.address,
        rating : req.body.rating,
        phone : req.body.phone,
        diseases:req.body.disease,
        doctors:req.body.doctor,
        nears : req.body.nears
    };
    knex('hospital')
    .insert(values)
    .then(
        ()=>{
            res.end("Hospital added!")
        }
    )
    .catch(err=>{
        res.end('error')
    })
}
function deleteHospital(req,res){
    knex('hospital')
    .delete()
    .where('id',req.params.id)
    .then(
        ()=>{
            res.end("Hospital has been deleted")
        }
    )
    .catch(er=>{
        res.end('error')
    })   
}
function updateHospital(req,res){
    knex('hospital')
    .where({ id: req.params.id })
    .update( req.body.colName , req.body.colValue)
    .then(
        ()=>{
            res.end("Hospital has been updated")
        }
    )
    .catch(er=>{
        res.end('error')
    })  
}

function getAuthuser(req,res){
    if( !req.body.token ) res.json({success:false,status:"Unauthenticated access."})
    else{
        const payload = jwt.verify(req.body.token, 'secret_key');
        knex
        .select()
        .table('users')
        .where('username',payload.username)
        .then((data)=>{
            res.json({
                success:true,
                status : "user data response",
                data : data[0]
            })
        })
    }
}

function getHospitalByName(req,res){
    knex
    .select()
    .table('hospital')
    .where('name','like',req.params.hospitalName+"%")
    .then((data)=>{
        res.json(data)
    })
}


function getHospitalByLocation(req,res){
    knex
    .select()
    .table('hospital')
    .where('address','like',req.params.location+"%")
    .then((data)=>{
        res.json(data)
    })
}


function getHospitalByDiseaseName(req,res){
    knex
    .select()
    .table('hospital')
    .where('diseases','like',req.params.diseaseName+"%")
    .then((data)=>{
        res.json(data)
    })
}


function getNears(req,res){
    knex
    .select('nears')
    .table('hospital')
    .where('name',req.params.hospitalName.toLowerCase())
    .then((data)=>{
        const nears = data[0].nears
        res.json({"hospitals" : nears})
    })
}

function getHospitalById(req,res){
    knex
    .select()
    .table('hospital')
    .where({id: req.params.id})
    .then((data)=>{
        res.json(data)
    })
}

function getSingleHospitalByName(req,res){
    knex
    .select()
    .table('hospital')
    .where({name: req.query.name})
    .then((data)=>{
        res.json(data)
    })
}
//view hospital handler

function getView_hospital(req,res){
    knex
    .select()
    .table('view_hospital')
    .then((data)=>{
        res.json(data)
    })
}

function addView_hospital(req,res){
    var values = {
        hospitalId: req.body.hospitalId,
        viewCount: req.body.viewCount     
    };
    knex
    .select('viewCount')
    .table('view_hospital')
    .where({hospitalId : req.body.hospitalId })
    .then((data)=>{
        if(data.length > 0 ){
            knex('view_hospital')
            .where({hospitalId:req.body.hospitalId})
            .update({'viewCount' : knex.raw('viewCount + 1')})
            .then(
                ()=>{
                    res.end("View hospital updated")
                }
            )
        }else{
            knex('view_hospital')
            .insert(values)
            .then(
                ()=>{
                    res.end("View hospital added")
                }
            )
        }
    })

    
}

// recommendation
function getMostViewedHospital(req,res){

    knex
    .table('hospital')
    .join('view_hospital', 'hospital.id', '=', 'view_hospital.hospitalId')
    .select('hospital.id','hospital.name','hospital.address','hospital.rating','view_hospital.viewCount')
    .orderBy('view_hospital.viewCount',"desc")
    .limit(6)
    .then((data)=>{
        res.json(data)
    })

}

module.exports = {
    getUser : getUser,
    getSingleUser : getSingleUser,
    authUser : authUser,
    addUser : addUser,
    getHospitalByName : getHospitalByName,
    getHospitalByLocation : getHospitalByLocation,
    getHospitalByDiseaseName : getHospitalByDiseaseName,
    getNears : getNears,
    getView_hospital : getView_hospital,
    addView_hospital : addView_hospital,
    getHospitalById : getHospitalById,
    getSingleHospitalByName : getSingleHospitalByName,
    getMostViewedHospital : getMostViewedHospital,
    getAuthuser : getAuthuser,
    addHospital : addHospital,
    deleteHospital : deleteHospital,
    updateHospital : updateHospital
};