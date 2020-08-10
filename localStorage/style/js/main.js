let oData = {
    shoping : [
        {
            images : "https://i.pcmag.com/imagery/reviews/07GiVwaj9sKexfbtCT8gQ1T-2.fit_scale.size_1028x578.v_1569478350.jpg",
            title : "Mouse Gaming Logitech",
            price : "120000",
            code : "1"
        },
        {
            images : "https://s0.bukalapak.com/img/5471283542/s-400-400/20180326_084325_scaled.jpg",
            title : "Laptop Asus ROG gl553vd",
            price : "13520000",
            code : "2"
        },
        {
            images : "https://blossomzones.com/wp-content/uploads/2018/10/RTX2080TI-STRIX.jpg",
            title : "Asus ROG Strix RTX 2080ti",
            price : "25200000",
            code : "3"
        },
    ]
}

function loadAll(){
    let target = document.getElementById("content");
    let getData = oData['shoping'];
    target.innerHTML = "";
    for(let i = 0; i < getData.length; i++){
        let html = `
        <div class="col-lg-4">
            <div class="box">
                <div class="top" style="background-image:url(${getData[i]['images']})"></div>
                <div class="bottom">
                    <h2>${getData[i]['title']}</h2>
                    <p>Rp.${getData[i]['price']}</p>
                    <button type="button" onclick="addCart(${getData[i]['code']})" class="btn btn-primary">Add to cart <i class="fa fa-shopping-basket"></i></button>
                </div>
            </div>
        </div>
        `;
        target.innerHTML += html;
    }
}

function addCart(id){
    let store = JSON.parse(localStorage.getItem("data"));
    let data = oData['shoping'].find(element => element.code == id);
    if (store == null){
        let item = {
            items : [
                data
            ]
        }
        localStorage.setItem("data", JSON.stringify(item));
    }else{

        store.items.push(data);

        localStorage.setItem("data", JSON.stringify(store));
    }
    
    
    Swal.fire({
        icon: 'success',
        title: 'Yeay !!!',
        text: 'The item has added to Cart',
    });
}

function loadCart(){
    let target = document.getElementById("cart");
    let getData = JSON.parse(localStorage.getItem("data")).items;
    target.innerHTML = "";
    for(let i = 0; i < getData.length; i++){
        let html = `
                        <div class="media">
                            <img src="${getData[i]['images']}" style="width: 200px; height: 150px;">
                            <div class="media-body" style="margin-left: 20px;">
                              <h5 class="mt-0">${getData[i]['title']}</h5>
                              <p>Rp.${getData[i]['price']}</p>
                              <button type="button" onclick="removeCart(${getData[i]['code']})" class="btn btn-primary">Remove from cart <i class="fa fa-times"></i></button>
                            </div>
                        </div>
        `;
        target.innerHTML += html;
    }
}

function removeCart(id){
    let store = JSON.parse(localStorage.getItem("data")).items;
    let i = 0;
    let emp = {
        items : []
    }
    while(i < store.length){
        if(store[i]['code'] != id){
            emp.items.push(store[i]);
        }
        
        i++;
    }
    localStorage.setItem("data", JSON.stringify(emp));
    Swal.fire({
        icon: 'success',
        title: 'Oh no !!!',
        text: 'Items has been deleted',
    });
    
    loadCart();
}

loadAll();