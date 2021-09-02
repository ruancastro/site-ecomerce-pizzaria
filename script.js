const qs = (el)=> document.querySelector(el);
const qsa = (el)=> document.querySelectorAll(el);


pizzaJson.map( (item,index)=> {  //mapeando JSON que contém cada pizza 
    let pizzaItem = qs('.models .pizza-item').cloneNode(true);  //"clona" a div que modela as pizzas na tela
    //preencher as informações em pizzaItem

    pizzaItem.querySelector('.pizza-item--img img').src = item.img; // seleciona dentro da "pizza item" a classe "pizza-item--img img", dentro dela seleciono 
    //a propriedade img e então acesso src, substituindo-a pelo item do JSON que tem o atributo img
    
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;

    pizzaItem.querySelector('a'),addEventListener('click',(e)=>{  //na tag "a" (so tem uma) ouço o evento click e faço:
        e.preventDefault();  

       qs('.pizzaWindowArea').style.display = 'flex';  // existe a caixinha de compras q só ta com o display "none", eu so troco seu estado com js
    });

   
    

    qs('.pizza-area').append(pizzaItem);
});
