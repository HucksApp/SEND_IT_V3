
module.exports= function ( docs,ordersArray ){   
    
   let colors = ['#e0a148','#e04887','#4887e0','#48d3e0','#48e0a1','#5548e0','#32dc96','#87e048'] 
    docs.forEach((doc) => {
        let i = 0;

doc.data().orders.forEach((order)=>{
let colorString = colors[i]
    const ordOut = `
    
    <div class="table-data" style="background-color:${colorString}">
        <h3>${doc.id}</h3>
        <p class="id">${order.id}</p>
        <p class="destination-address">${order.destinationAddress}</p>
        <p class="pick-up-address">${order.pickupAddress}</p>
        <p class="curent-location ${order.id} ${doc.id}">${order.location}</p>
        <p class="delivery-status ${order.id} ${doc.id}">${order.status}</p>
    </div>   
    
    
    ` 
   i++;
    if (colors.length == i+1){
        i = 0
    };
ordersArray.push(ordOut);

})



    });
    
    const adminS   =      `


    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="../styles/admin.css">
    <title>Document</title>
</head>
<body>
    <div class="admin-details">
            <div class="admin">ADMIN</div>
        <div class="username">Jakehunt</div>
        <div class="email">jakehunt@gmail.com</div>
        <button><a href="/logout">LOGOUT</a></button>
    </div>

    <section class="orders-list">
            <div class="rap">
            <header class="table-head">
                <h3><span style="color:#00f"> KEYS: </span> user</h3>
                <p class="id"> Order ID</p>
                <p class="destination-address">DESTINATION</p>
                <p class="pick-up-address">PICKUP LOCATION</p>
                <p class="curent-location">CURENT LOCATION</p>
                <p class="delivery-status">DELIVERY STATUS</p>
    
            </header>
            ${ordersArray.toString().replace(/,/g,' ')}
        </div>
        <div class="button">
            <button class="update-location">LOCATION</button>
            <button class="status">STATUS</button>
        </div>
            <form action="/update_location"  method="post" class="loc">
                <label for="user_id" class="location loc-1">USER</label>
                <input type="text" class="userId" name="user_id" id="userId">

                <label for="location" class="location loc-1">New Location</label>
                <input type="text" class="location" name="location" id="location">

                <label for="order-id" class="order-id loc-1">Order Id</label>
                <input type="number" class="id" name="id" id="order-id">
                <button  class='sub_destn'>UPDATE</button>
            </form>
            <form action="/update_status"  method="post" class="sta">

                <label for="user_id" class="location loc-1">USER</label>
                <input type="text" class="userId" name="user_id" id="userId" >

                <label for="order-id-f2" class="id loc-1"> Order Id</label>
                <input type="number" class="id" id="order-id-f2" name="id">

                <label for="status" class="select ">New Order Status</label>
                <select name="status"  id="status">
                    <option value="Intransit">Intransit</option>
                    <option value="Delivered">Delivered</option>
                </select>
                <button  class="sub_status">UPDATE</button>
            </form>
           
        </section>
        <script src="../handlers/admin.js"></script>
</body>
</html>

`;
return adminS ;
}