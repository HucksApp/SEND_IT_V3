


module.exports = function  (doc, id){
                const profile =                

                                    `
                                    <!DOCTYPE html>
                                    <html lang="en">
                                    <head>
                                        <meta charset="UTF-8">
                                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                        <meta http-equiv="X-UA-Compatible" content="ie=edge">
                                        <link rel="stylesheet" href="../styles/account.css">
                                        <title>account</title>
                                    </head>
                                    <body>
                                          <nav class="navigation top">
                                                <div class="nav-container">
                                                    <div class="nav"><a href="/home">HOME</a></div>
                                                    <div class="nav"><a href="/order">ORDERS</a> </div>
                                                    <div class="nav"> <a href="/logout">LOGOUT</a> </div>
                                                </div>
                                                <img src="../images/sendlogo.gif" alt="SEND IT" >
                                            </nav>
                                        
                                        <section class="wrapper">
                                            <div class="slate">
                                                <span class="title">User Name</span>
                                                <div class="sec">
                                                    <span class="value user-name">${doc.username}</span>
                                                    <button class="change user-name" title="update user name">I</button>
                                                    <span class="user-name edit-btn" title="open edit for username">?</span>
                                                </div>
                                                
                                            </div>
                                            <input type="text" class="edit" id="user-name">
                                    
                                            <div class="slate">
                                                <span class="title">House Address</span>
                                                <div class="sec">
                                                    <span class="value house-address">${doc.houseAddress}</span>
                                                    <button class="change house-address" title="update user address">I</button>
                                                    <span class="house-address edit-btn" title="open edit for address">?</span>
                                                </div>
                                            </div>
                                            <input type="text" class="edit" id="house-address">
                                    
                                            <div class="slate">
                                                <span class="title">Phone Number</span>
                                                <div class="sec">
                                                     <span class="value phone-number">${doc.phoneNumber}</span>
                                                     <button class="change phone-number" title="update your phone number">I</button>
                                                     <span class="phone-number edit-btn" title="open edit for phone number">?</span>     
                                                </div>
                                                
                                            </div>
                                            <input type="number" class="edit" id="phone-number">
                                    
                                            <div class="slate">
                                                <span class="title">Email</span>
                                                <span class="value ">${id}</span>
                                            </div>
                                    
                                            <div class="slate">
                                                <span class="title">Password</span>
                                                <div class="sec">
                                                        <span class="value password ">${doc.password}</span>
                                                        <button class="change password" title="update your password">I</button>
                                                        <span class="password edit-btn" title="open edit for password">?</span>
                                                </div>
                                            </div>
                                            <input type="password " class= edit" id="password">
                                        </section>
                                    
                                        
                                        <div class="slate-out">
                                             <aside>
                                                <h3 class="order-title">USER</h3>
                                                <p class="order-value">${doc.username}</p>
                                            </aside>
                                            <aside>
                                                <h3 class="order-title">ORDERS</h3>
                                                <p class="order-value">${doc.orders.length}</p>
                                            </aside>
                                            
                                        </div>
                                    
                                        <footer class="footer-message">
                                                <div class="about">
                                                        <p class="about-head head">ABOUT</p>
                                                        <p class="about-info">SendIT is a courier service that helps users deliver parcels to different destinations.</p>
                                                        <p class="about-info"> SendIT provides courier quotes based on weight categories.</p>
                                                </div>
                                                <div class="contact-us">
                                                        <p class="customer-service head">CUSTOMER SERVICES</p>
                                                        <p><a href="/" class="cont">Email Us</a></p>
                                                        <p><a href="/" class="cont">FaceBook</a></p>
                                                        </div>
                                                <div class="copyright">
                                                        <p class="logo-foot" style="color:#00f">SEND IT </p>
                                                        <p class="foot-logo"> copyright &copy; 2019!!!</p>
                                                </div>
                                         </footer>    
                                         <script src="../handlers/account.js"></script> 
                                    </body>
                                    </html>

                                `;
        return profile;
};
