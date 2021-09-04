let modalQt = 1;

const qs = (el)=> document.querySelector(el);
const qsa = (el)=> document.querySelectorAll(el);


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
