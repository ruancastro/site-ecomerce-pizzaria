let cart = [];
let modalQt = 1;
let modalKey = 0;


const qs = (el)=> document.querySelector(el);
const qsa = (el)=> document.querySelectorAll(el);

// Listagem das pizzas
pizzaJson.map( (item,index)=> {  //mapeando JSON que contém cada pizza 
    let pizzaItem = qs('.models .pizza-item').cloneNode(true);  //"clona" a div que modela as pizzas na tela
    //preencher as informações em pizzaItem

    pizzaItem.setAttribute('data-key',index); // em pizza Item (div) eu setei o id que veio do JSON

    pizzaItem.querySelector('.pizza-item--img img').src = item.img; // seleciona dentro da "pizza item" a classe "pizza-item--img img", dentro dela seleciono 
    //a propriedade img e então acesso src, substituindo-a pelo item do JSON que tem o atributo img
    
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;

    pizzaItem.querySelector('a'),addEventListener('click',(e)=>{  //na tag "a" (so tem uma) ouço o evento click e faço:
        e.preventDefault();  
        
        let key = e.target.closest('.pizza-item').getAttribute('data-key'); // pegando o id da pizza quando clico nela
        // console.log(pizzaJson[key]);
        
        modalQt = 1;
        modalKey = key;

    
        qs('.pizzaBig img ').src = pizzaJson[key].img;
        qs('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        qs('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        qs('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;
        qs('.pizzaInfo--size.selected').classList.remove('selected');


        qsa('.pizzaInfo--size').forEach((size,sizeIndex)=> {
            if(sizeIndex == 2){
                size.classList.add('selected');  //sempre que eu abrir para escolher uma pizza sempre estará selecionada a grande
            }  
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];

        });

        qs('.pizzaInfo--qt').innerHTML = modalQt;

       qs('.pizzaWindowArea').style.opacity = 0;
       qs('.pizzaWindowArea').style.display = 'flex';  // existe a caixinha de compras q só ta com o display "none", eu 
       //so troco seu estado com js

       setTimeout(()=> {
           qs('.pizzaWindowArea').style.opacity = 1;  // setando o display da caixinha com opacidade 1  dps de 200ms
       },200);
    });

   
    

    qs('.pizza-area').append(pizzaItem);
});

// Eventos do modal

function closeModal() {  // função para fechar o modal
    qs('.pizzaWindowArea').style.opacity = 0;
    setTimeout(()=>{
        qs('.pizzaWindowArea').style.display = 'none';
    },500);

}

qsa('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item)=>{  //fazendo o botão cancelar (ou voltar no mobile) fechar o modal
    item.addEventListener('click',closeModal);
});

qs('.pizzaInfo--qtmais').addEventListener('click',()=>{  //habilitando o botão "+" do modal
    modalQt++;
    qs('.pizzaInfo--qt').innerHTML = modalQt;
});

qs('.pizzaInfo--qtmenos').addEventListener('click',()=>{ //habilitando o botão "-" do modal
    if(modalQt>1){
        modalQt--
        qs('.pizzaInfo--qt').innerHTML = modalQt;
    }  

});



qsa('.pizzaInfo--size').forEach((size,sizeIndex)=>{  // mudança do tamanho selecionado
    size.addEventListener('click',(e)=>{
        qs('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected'); 
    });
});

qs('.pizzaInfo--addButton').addEventListener('click',()=>{
    let size = parseInt(qs('.pizzaInfo--size.selected').getAttribute('data-key'));
    /*  // qual a pizza? 
    console.log('pizza:'+modalKey);
    // qual o tamanho selecionado?
    let size = qs('.pizzaInfo--size.selected').getAttribute('data-key');
    // quantas pizzas? 
    console.log('quantidade: '+modalQt); */
    
    let identifier = pizzaJson[modalKey].id+'@'+size;
    
    let key = cart.findIndex((item)=>{
        return item.identifier == identifier
    });

    if(key> -1){
        cart[key].qt += modalQt;
    } else {
        cart.push({
            identifier,
            id:pizzaJson[modalKey].id,   // qual a pizza? 
            size,                        // qual o tamanho selecionado?
            qt:modalQt                   // quantas pizzas? 
        });
    
    }


    updateCart();
    closeModal();
}); 

function updateCart(){
    if(cart.length>0){
        qs('aside').classList.add('show');
        qs('.cart').innerHTML ='';


        let subtotal = 0;
        let desconto = 0;
        let total = 0; 

        for(let i in cart){
            let pizzaItem = pizzaJson.find((item)=>{  // pegando no pizzaJson todo o objeto que 
                                                    // tem o id igual o id da pizza que adicionamos no carrinho
                return item.id == cart[i].id                      
            });

            subtotal += pizzaItem.price * cart[i].qt;

            let cartItem = qs('.models .cart--item').cloneNode(true);  //clonando a classe cart item 

            let pizzaSizeName;  

            switch(cart[i].size) {  //verificando qual o tamanho da pizza e substituindo 0, 1 e 2 por P M ou G
                case 0:
                    pizzaSizeName = 'P';
                    break;

                case 1:
                    pizzaSizeName = 'M';
                    break;

                case 2:
                    pizzaSizeName = 'G';
                    break;
            }
            let pizzaName = `${pizzaItem.name} - ${pizzaSizeName}`

            cartItem.querySelector('img').src = pizzaItem.img; //adicionando img no carrinho 
            cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName; //adicionando o nome da pizza no carrinho
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt; //adicionando a quantidade de pizzas de determinado tipo no carrinho
            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click',()=>{ //ativando o botão - do carrinho
                if(cart[i].qt > 1){  
                    cart[i].qt--;
                } else {
                    cart.splice(i,1);
                }
                
                updateCart();
            });
            cartItem.querySelector('.cart--item-qtmais').addEventListener('click',()=>{  //ativando o botão + do carrinho
                cart[i].qt++;
                updateCart();
            });

            qs('.cart').append(cartItem); 
        }


        desconto = subtotal*0.1 ;
        total = subtotal - desconto;
        // mostrando o total, desconto e subtotal no carrinho
        qs('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`; 
        qs('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`;
        qs('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`;
    } else{
        qs('aside').classList.remove('show');
    }
}