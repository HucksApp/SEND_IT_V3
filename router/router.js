const  router = require('express').Router();
const db = require('../config/db/db2');
const bodyParser= require('body-parser');



//middleWare
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });




// END SESSION 
router.get('/logout', (req, res)=>{
    req.session = null;
    res.json({message:"session ended"});
});





// GET USER ORDERS
router.get('/order', (req, res)=>{
    if(req.session.populated ){
        console.log('here')
                const {id}=req.session
            db.query('SELECT * FROM orders WHERE user_email = $1',[id],(err, result)=>{
                if (err){
                    console.log(err)
                };
                res.json(result.rows);
            });
}else{
    res.sendStatus(302);
}

});






//GET USERS
router.get('/account',(req,res)=>{
    if (req.session.populated){
        const {id}= req.session;
        db.query('SELECT * FROM users WHERE email= $1',[id],(err, result)=>{
            if (err){
                console.log(err);
            }
            res.json(result.rows)
        });
    }else{
        res.sendStatus(412)
    }
});





//UPDATE DESTINATION
router.put('/update_destination',jsonParser,(req,res)=>{
    if(req.session.populated){
        const {id}= req.session;
        const {ordId, upDestnAddress }=req.body;
        db.query('UPDATE orders SET destination_address= $1 WHERE user_email = $2  AND order_id = $3',
                        [upDestnAddress,id,parseInt(ordId)],(err ,result)=>{
                            if (err){
                                console.log(err);
                            }
                            res.send('updated destn');
                        })
    }else{
        res.status(412).send('YOU ARE NOT LOGGED IN')
    }
});






//GET ORDER LOCATION
router.get('/map',(req,res)=>{
    if(req.session.populated ){
        const {id}= req.session;
        const ord=req.query.ordCk;
       db.query('SELECT pickup_address, c_location FROM orders WHERE user_email=$1 AND order_id = $2',
                    [id,parseInt(ord)],(err, result)=>{
                        if(err){
                            console.log(err)
                        };
                        res.json(result.rows);
                    })

    }else{
        res.status(412).send('YOU ARE NOT LOGGED IN')
    }

});





// VERIFY ADMIN ***** ADMIN

router.post('/admin',jsonParser,(req, res)=>{
    const {password, email} = req.body;
    db.query('SELECT * FROM admins WHERE email = $1 AND password = $2',
                [email, password],(err, result)=>{
                    if (err){
                        console.log(err);
                    };
                    if (result.rows.length == 0){
                        res.status(302).json({message: 'ADMIN CREDENIALS IS IN VALID',valid:false});
                    }else if (result.rows.length != 0){
                        req.session = {admin: result.rows[0].email}
                            res.status(200).json({message: 'ADMIN SESSION VALID', valid: true})

        



                    }
                    
                })

            }
            );


//GET ALL ORDERS ***** ADMIN

router.get('/admin_orders',(req, res)=>{

 if(req.session.admin ){
 
            db.query('SELECT * FROM orders',(err, result)=>{
                if(err){
                    console.log(err);
                }
                res.json(result.rows);
            });
 }else{

            res.status(403).json({message: "RESTRICTED", valid: false}) 
 }
    

})













//UPDATE LOCATION**** ADMIN
router.put('/update_location',jsonParser,(req,res)=>{
    if (req.session.populated ){
        const {userUpdateId,toUpdateLotn,toUpdateId }= req.body;

        db.query('UPDATE orders SET c_location = $1 WHERE user_email =$2 AND order_id= $3',
                    [toUpdateLotn,userUpdateId,parseInt(toUpdateId) ],(err, result)=>{
                        if (err){
                            console.log(err);
                        }  
                        res.send('updated location');
                    })

    }else{
        res.sendStatus(412)
    }
    
});




//UPDATE STATUS *****ADMIN
router.put('/update_status',jsonParser,(req,res)=>{
    const {toUpdateId, userUpdateId, toUpdateStatus}= req.body;
    if (req.session.populated){
        db.query('UPDATE orders SET status = $1 WHERE user_email =$2 AND order_id = $3',
                            [toUpdateStatus,userUpdateId,toUpdateId],(err, result)=>{
                                if(err){
                                    console.log(err)
                                };
                                res.send('updated order status')
                            });
        
    }else{
        res.sendStatus(405);
    }
    
});


//DELETE ORDER
router.delete('/delete_order/:del',jsonParser,(req,res)=>{
    console.log(req.params.del)
    const del = parseInt(req.params.del);
    const {id}= req.session;
    if(req.session.populated ){
        db.query('DELETE FROM orders WHERE user_email = $1 AND order_id = $2',[id,del],(err, result)=>{
            if (err){
                console.log(err)
            };
            res.send('order deleted');

        });
        
    }else{
        res.status(405).send('YOU ARE NOT LOGGED IN')
    }
});


// ADD NEW ORDER
router.post('/new_order',jsonParser,(req,res)=>{
    if(req.session.populated ){  
        const { receiverName,
                destinationAddress,
                pickupAddress, 
                receiverPhoneNumber,
       } = req.body;

       const {id}= req.session;
db.query('SELECT MAX(order_id) FROM orders WHERE user_email=$1',[id],(err, result)=>{

        let order_id_Nt;
    if (err){
        console.log(err)
    };
    if (result.rows[0].max != null){
    let {max}= result.rows[0];
        order_id_Nt = max + 1;
     
    }else if(result.rows[0].max == null){
        order_id_Nt = 1;
    };

db.query('INSERT INTO orders(user_email, order_id, receiver_name,destination_address,pickup_address,receiver_phone_no) VALUES($1,$2,$3,$4,$5,$6)',
            [id,order_id_Nt,receiverName,destinationAddress,pickupAddress,receiverPhoneNumber],
            (err, results)=>{
                    if (err){
                        console.log(err);
                    };
                   
                    db.query('SELECT order_counts FROM users WHERE email = $1',[id],(err, result)=>{
                        if (err){
                            console.log(err);
                        };
                        const  new_count = result.rows[0].order_counts + 1;

                         db.query('UPDATE users SET order_counts = $2 WHERE email = $1',[id,new_count],(err,result)=>{

                            if (err){
                                console.log('errrrrr'+ err);
                            };

                            res.send('order entry added ')
    
                        });
                        
                    });
                  
                
            }
);

    
});



    }else{
        res.status(406)
    }

});




//UPDATE USER INFORMATION

router.put('/update_profile',jsonParser,(req,res)=>{
    if(req.session.populated){
        const {keyToValue, newVal} = req.body;
        const {id}= req.session ;
        if(keyToValue =='user-name'){
        db.query('UPDATE users SET username = $1 WHERE email = $2 ',[newVal,id],(err, result)=>{
            if (err){console.log(err)}
            res.send('modified')
        });
        }else if(keyToValue =='house-address'){
            db.query('UPDATE users SET address = $1 WHERE email = $2 ',[newVal,id],(err, result)=>{
                if (err){console.log(err)}
                res.send('modified')
            });
        }else if(keyToValue =='phone-number'){
            db.query('UPDATE users SET phone_number = $1 WHERE email = $2 ',[newVal,id],(err, result)=>{
                if (err){console.log(err)}
                res.send('modified')
            });
        }else if(keyToValue =='password'){
            db.query('UPDATE users SET user_password = $1 WHERE email = $2 ',[newVal,id],(err, result)=>{
                if (err){console.log(err)}
                res.send('modified')
            });
        }  
    }else{
        res.sendStatus(406)
    }
  
})



//VERIFY USER

router.post('/old_user',jsonParser, (req, res)=>{
    console.log('JUST HERE')
    if(req.body.email){
        const {email, password} = req.body;
        db.query('SELECT * FROM users WHERE email = $1 AND user_password = $2',[email,password],(err, result)=>{
            if(err){console.log(err)};
            const {rows} = result;
            if(rows.length != 0){
                req.session={id: rows[0].email};
                    message="SESSION CREATED"
                res.status(200).json({message, valid:true})
            }else if(rows.length == 0){
                    message="INVALID CREDENTIALS !!!"
                res.status(404).json({message, valid: false})
            }   
        })
                }
                else{
                        return
                }
});




//ADD NEW USER

router.post('/new_user',jsonParser,(req,res)=>{
 const {username, phoneNumber, houseAddress,password,email}  = req.body;  
    db.query('SELECT * FROM users WHERE email=$1',[email],(err,result)=>{
                if(err){console.log(err)};
                 const {rows}= result;
            if (rows.length != 0){
                            message ="YOU HAVE AN ACCOUNT ALREADY!!!";
                    res.status(302).json({message, valid:false})
            }else if (rows.length == 0){
                    db.query('SELECT * FROM users WHERE phone_number=$1',[phoneNumber],(err, result)=>{
                        if (err){console.log(err)};
                        const {rows}= result;
                        if (rows.length != 0) {
                                message ='YOUR PHONE NUMBER IS  REGISTERED TO ANOTHER PROFILE!!!'
                            res.status(302).json({message, valid:false})
                        }   if (rows.length == 0){
                                req.session = {id: email};
                            db.query('INSERT INTO users(email,phone_number,username,user_password,address) VALUES($1,$2,$3,$4,$5)',
                            [email,phoneNumber,username,password,houseAddress],
                                                (err,result)=>{
                                                     if(err){
                                                console.log(err)
                                         }
                                         message="ORDER ADDED"
                                res.status(200).json({message, valid:true})
                            });
                            
                        }
                    });
            }
    });


})


module.exports= router;