fetch("../backEnd/listBooks.php")
.then((result) => result.json())
.then(function (data) {
    data.forEach(data => {
        let cardsDiv = document.getElementById('cardsDiv');
        let cards = document.createElement('div');
        cards.setAttribute('id',`${data.category}`);
        cards.classList.add('card-1','flex-grow-0','flex-shrink-1','m-2','bg-light','border','rounded','m-2')
        cards.classList.add()
        cards.innerHTML = ` 
            <figure class="mb-0">
            <div class="card_image">
                <img id="img" src="${data.cover}">
            </div>
            </figure>
            <div name="categoryFigcaption"class="mt-md-1 mx-2 justify-content-center">
                <p class = "mb-0 text-center bg-figcaption rounded text-capitalize">${data.category}</p>
            </div>
            <div class="card-body">
                <div id="buttonPlace" class="d-flex justify-content-end">
                <a href="galery.php?${data.id}" id="${data.id}" value="${data.id}" type="button" class="btn btn-outline-danger btn-sm">More..</a>
                </div>
            </div>`;       
        cardsDiv.appendChild(cards);
        
    });
})

fetch("../backEnd/listCategory.php")
.then((result) => result.json())
.then(function (res) {

    let numberCategories = res.length;

    res.forEach(res => {
        let checkDiv = document.getElementById('checkDiv');
        let innerDiv = document.createElement('div');
        innerDiv.classList.add('form-check','form-check-inline')
        innerDiv.setAttribute('id','innerDiv');
        innerDiv.innerHTML = `
        <input class="form-check-input checkBox" type="checkbox" id="${res.category}" value="${res.category}">
        <label class="form-check-label" for="${res.id}">${res.category}</label>`;
        checkDiv.appendChild(innerDiv);
        
 
            let allCards = document.querySelectorAll(".card-1")
            lengthOfUnchecked=0;
            checkboxValue = null;
      
                
            const list = document.querySelectorAll('input[type=checkbox]');
            for (let checkbox of list) {
                document.getElementById(`${res.category}`).addEventListener('click', function(){
                var lengthOfUnchecked = $('input:checkbox:not(:checked)').length;
    
                    if(lengthOfUnchecked == numberCategories){
                        allCards.forEach(element => {
                            element.classList.remove('d-none');
                            element.classList.remove('d-inline-block');
                
                        });
                    }
                
                    if((checkbox.checked == true))
                    {
                        let checkboxValue = checkbox.value;
                        allCards.forEach(element => {
                            element.classList.add('d-none');
                        });
                        for(i=0;i<allCards.length;i++){
                            if(allCards.item(i).id == checkboxValue){
                                allCards.item(i).classList.add('d-inline-block');
                            }
                        }
                    }
                    else if((this.checked == false)){
                        let checkboxValue = this.value;
                        for(i=0;i<allCards.length;i++){
                            if(allCards.item(i).id == checkboxValue && allCards.item(i).classList.contains('d-inline-block')){
                                allCards.item(i).classList.remove('d-inline-block');
                                allCards.item(i).classList.add('d-none');
                            }
                        }
                        
                    }
                     
                })
                
            }
       
    })

    
})

fetch("http://api.quotable.io/random")
.then((result) => result.json())
.then(function (data) 
{
   let quotation = document.getElementById('quotation');
   quotation.innerText = data.content;
   let authorQuotation = document.getElementById('authorQuotation');
   authorQuotation.innerText = data.author;
});
