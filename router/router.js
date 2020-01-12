const  router = require('express').Router();
const db = require('../config/db/db.js');
const bodyParser= require('body-parser');
const fs = require('fs')



//components
const accountComponent = require('./components/accountComp');
const signinComponent = require('./components/signinComp');
const orderComponent = require('./components/orderComp');
const homeComponent = require('./components/homeComp');
const adminComponent = require('./components/adminComp');
const mapComponent =    require('./components/mapComp');




//middleWare
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });


router.get('/logout', (req, res)=>{
    req.session = null;
    res.status(200).redirect('/');
});


router.get('/',(req, res)=>{
    
    res.sendFile(__dirname+'/pages/index.html');
}
);

router.get('/login', (req, res)=>{
   res.sendFile(__dirname+'/pages/user_signin.html');
});

router.get('/signup', (req, res)=>{
    res.sendFile(__dirname+'/pages/user_signup.html');
});

router.get('/order', (req, res)=>{
    if(req.session.populated){
                const {id}=req.session;
            db.query('SELECT * FROM orders WHERE user_email = $1',[id],(err, result)=>{
                if (err){
                    console.log(err)
                };
                res.json(result.rows)
            });
}else{
    res.status(302).redirect('/login')
}

});

router.get('/home',(req, res )=>{
    if(req.session.populated){
        const {id}= req.session;
        db.query('SELECT username FROM users WHERE email= $1',[id],(err,result)=>{
            res.json(result.rows)
        });
    }else{
        res.status(302).redirect('/')
    }
})



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
        res.status(302).redirect('/login')
    }
});


router.post('/admin',urlencodedParser,(req, res)=>{

fs.readFile('../config/keys/.pk/Amin.json','utf-8', (err, data)=>{
if (err){
        console.log(err);
}else{
 const jsonData = JSON.parse(data);
 const adminEmail = jsonData.ADMIN.email.type;
 const adminPassword = jsonData.ADMIN.password.type;
 
 if(req.body.email==adminEmail && req.body.password == adminPassword){
    req.session={id:  adminEmail};

            db.query('SELECT * FROM orders',(err, result)=>{
                if(err){
                    console.log(err);
                }
                res.json(result.rows);
            });
 }else{

            const func = "INVALID ADMIN CREDENCIALS !!!!!!!!!!!" 
            res.send(signinComponent(func));  
 }
    
}
})

})


router.post('/update_destination',jsonParser,(req,res)=>{
    if(req.session.populated){
        db.collection('app-users').doc(req.session.id).get()
        .then((doc)=>{
            if(doc.exists){
            const ordId =(doc.data().orders).map((ord)=>{
                if(ord.id == parseInt(req.body.ordId)){
                    ord.destinationAddress = req.body.upDestnAddress;
                    return ord
                }else{
                    return ord
                }
            });
        db.collection('app-users').doc(req.session.id).update({
                                                        orders: ordId
        });
        
            }
        })
    }else{
        res.status(302).redirect('/login')
    }
});

router.post('/update_location',jsonParser,(req,res)=>{
    if (req.session.populated){
        db.collection('app-users').doc(req.body.userUpdateId).get()
                .then((doc)=>{
                        if(doc.exists){
                           const newList = doc.data().orders.map((order)=>{
                                if(order.id== parseInt(req.body.toUpdateId)){
                                        order.location = req.body.toUpdateLotn;
                                        return order;
                                }else{
                                    return order;
                                }
                            });
                 db.collection('app-users').doc(req.body.userUpdateId).update({orders: newList});
                        }else{
                            res.sendStatus(404);
                        }
                })

    }else{
        res.status(302).redirect('/login')
    }
    
});

router.get('/map',(req,res)=>{
    if(req.session.populated){
        db.collection('app-users').doc(req.session.id).get()
                    .then((doc)=>{
                        if(doc.exists){
                            console.log(req.query.ordCk)
                            const orderLookUP =doc.data().orders.filter(order=>order.id == req.query.ordCk );
                            const pickup=orderLookUP[0].pickupAddress;
                            const presentLoc = orderLookUP[0].location;
                                console.log(pickup,presentLoc )
                        res.send(mapComponent(presentLoc,pickup))
                        }

                    });
        

    }else{
        res.status(302).redirect('/login'); 
    }

});


router.post('/update_status',jsonParser,(req,res)=>{
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
        res.status(302).redirect('/login')
    }
    
});



router.post('/delete_order',jsonParser,(req,res)=>{

    const del = parseInt(req.body.del);
    /*const {id}= req.session;*/
    const id = req.body.email;
    if(req.session.populated || req.body.email){
        db.query('DELETE FROM orders WHERE user_email = $1 AND order_id = $2',[id,del],(err, result)=>{
            if (err){
                console.log(err)
            };
            res.send('order deleted');

        });
        
    }else{
        res.status(302).redirect('/login')
    }
});



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
        res.status(404).redirect('/');
    }

});





router.post('/update_profile',jsonParser,(req,res)=>{
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
        res.status(302).redirect('/login');
    }
  
})




router.post('/old_user',urlencodedParser, (req, res)=>{
    if(req.body.email){
        const {email, password} = req.body;
        db.query('SELECT * FROM users WHERE email = $1 AND user_password = $2',[email,password],(err, result)=>{
            if(err){console.log(err)};
            const {rows} = result;
            if(rows.length != 0){
                req.session={id: rows[0].email};
                res.status(200).json(rows[0]);
            }else if(rows.length == 0){
                res.status(404).json({message: "INVALID CREDENTIALS"})
            }else{
                return
            }   
        })
                }
                else{
                        return
                }
});







router.post('/new_user',urlencodedParser,(req,res)=>{
 const {username, phoneNumber, houseAddress,password,email}  = req.body;  
    db.query('SELECT * FROM users WHERE email=$1',[email],(err,result)=>{
                if(err){console.log(err)};
                 const {rows}= result;
            if (rows.length != 0){
                    res.send('you have an account')
            }else if (rows.length == 0){
                    db.query('SELECT * FROM users WHERE phone_number=$1',[phoneNumber],(err, result)=>{
                        if (err){console.log(err)};
                        const {rows}= result;
                        if (rows.length != 0) {
                            res.send('YOUR PHONE NUMBER IS  REGISTERED TO ANOTHER PROFILE')
                        }   if (rows.length == 0){
                                req.session = {id: email};
                            db.query('INSERT INTO users(email,phone_number,username,user_password,address) VALUES($1,$2,$3,$4,$5)',
                            [email,phoneNumber,username,password,houseAddress],
                                                (err,result)=>{
                                                     if(err){
                                                console.log(err)
                                         }
                                res.send(result.insertId)
                            });
                            
                        }
                    });
            }
    });


})


module.exports= router;