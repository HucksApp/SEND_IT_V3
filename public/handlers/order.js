
const formOne = document.querySelector('form.create-order');
const formTwo = document.querySelector('form.edit-destination');
const btnOne = document.getElementById('btn-1');
const btnTwo = document.getElementById('btn-2');
const deletebtns= document.getElementsByClassName('delete');
const idCount = document.querySelectorAll('.table-data p.id');


[...deletebtns].forEach((deletebtn)=>{
    deletebtn.addEventListener('click',(e)=>{

    const del = {del: e.target.classList.value.replace(/delete /g, '')}



        fetch('/delete_order',{
                        method:"POST",
                        headers:{
                            "Content-Type":"application/json"
                        },
                        body:JSON.stringify(del)
        }).then((response)=>{
            console.log(response)
        });
    e.target.parentNode.parentNode.removeChild(e.target.parentNode);
    
    })
});






btnOne.addEventListener('click',(e)=>{
    console.log('here')
if(formOne.classList.contains('show')){
    formOne.classList.remove('show')

}else{
    formOne.classList.add('show')
}

});


btnTwo.addEventListener('click',(e)=>{
    if(formTwo.classList.contains('show')){
        formTwo.classList.remove('show')
    
    }else{
        formTwo.classList.add('show')
    }
    
    });


/*

if (idCount){
    [...idCount].forEach((idC)=>{
        idC.addEventListener('click',(e)=>{
            fetch('/map',{
                method:"POST",
                headers:{
                        "Content-Type":"application/json"
                },
                body:JSON.stringify({va: e.target.textContent})
            }).then((result)=>{
                console.log(result);
            })
        });
    });
};

*/


    formOne.addEventListener('submit',(e)=>{
        e.preventDefault();
        let id 
        if([...idCount][idCount.length -1]!= undefined){
            let idLast = [...idCount][idCount.length -1].textContent;
            id = parseInt(idLast)+1;

        }else{
            id=1;
        };

        
        const date = Date.now();
        const dateObj= new Date(date) 
        const day = dateObj.getDate();
        const month = dateObj.getMonth();
        const year = dateObj.getFullYear();
        const dateString = `${day}/${month}/${year}`

        const receiverName = formOne.receiver_name.value;
        const destinationAddress = formOne.destination_address.value;
        const pickupAddress = formOne.pickup_address.value;
        const receiverPhoneNumber = formOne.receiver_phone_number.value;
        
            const data ={
                        receiverName,
                        destinationAddress,
                        pickupAddress,
                        receiverPhoneNumber,
                        date,
                    
            };
            console.log(data)
             
            fetch('/new_order',{
                            method:"POST",
                            headers:{
                                "Accept":"application/json, */*",
                                "Content-Type":"application/json"
                            },
                            body:JSON.stringify(data)
            }).then((res)=>{
                    console.log(res)
            });
            formOne.receiver_name.value="";  
            formOne.destination_address.value="";
            formOne.pickup_address.value=""; 
            formOne.receiver_phone_number.value=""; 
            



     createOrder (id,receiverName,destinationAddress,pickupAddress,receiverPhoneNumber,dateString)

    });


    formTwo.addEventListener('submit',(e)=>{
        e.preventDefault();
        const upDestnAddress= formTwo.destination_address.value;
        const ordId= formTwo.id.value;
        fetch('/update_destination',{
                        method:"POST",
                        headers:{
                            "Content-Type":"application/json"
                        },
                        body:JSON.stringify({upDestnAddress, ordId})
        }).then((result)=>{
            console.log(result)
        });

        [...idCount].forEach((idCt)=>{
            if(idCt.textContent==ordId){
               idCt.parentNode.children[2].textContent=upDestnAddress; 
               formTwo.destination_address.value="";
               formTwo.id.value="";
            }
        })
    })



    function createOrder (id,name,destination,pickup,mobile,wrtDate){
        const div = document.createElement('div');
        div.setAttribute('class','table-data');

        const idParagraph = document.createElement('p');
        idParagraph.setAttribute('class','id')
        idParagraph.textContent=id;
        div.appendChild(idParagraph);

        const recieverNameParagraph = document.createElement('p');
        recieverNameParagraph.setAttribute('class','receiver-name')
        recieverNameParagraph.textContent=name;
        div.appendChild(recieverNameParagraph);

        const destinationParagraph = document.createElement('p');
        destinationParagraph.setAttribute('class','destination-address')
        destinationParagraph.textContent=destination;
        div.appendChild(destinationParagraph);

        const pickupParagraph = document.createElement('p');
        pickupParagraph.setAttribute('class','pick-up-address')
        pickupParagraph.textContent=pickup;
        div.appendChild(pickupParagraph);

        const receiverPhoneNumberParagraph = document.createElement('p');
        receiverPhoneNumberParagraph.setAttribute('class','receiver-phone-number')
        receiverPhoneNumberParagraph.textContent=mobile;
        div.appendChild(receiverPhoneNumberParagraph);

        const dateParagraph = document.createElement('p');
        dateParagraph.setAttribute('class','date')
        dateParagraph.textContent=wrtDate;
        div.appendChild(dateParagraph);

        const locationParagraph = document.createElement('p');
        locationParagraph.setAttribute('class','current-location')
        locationParagraph.textContent='Storage';
        div.appendChild(locationParagraph);

        const statusParagraph = document.createElement('p');
        statusParagraph.setAttribute('class','delivery-status')
        statusParagraph.textContent='intransit';
        div.appendChild(statusParagraph);

        const deleteParagraph = document.createElement('p');
        deleteParagraph.setAttribute('class','delete')
        deleteParagraph.classList.add(id.toString())
        deleteParagraph.textContent="x";
        div.appendChild(deleteParagraph);

        const orderList = document.querySelector('div.rap');
        orderList.appendChild(div);
        
    }
