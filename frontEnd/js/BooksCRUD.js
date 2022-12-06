
if(sessionStorage.getItem("admin") !== "admin"){
    window.location.replace("/../frontEnd/index.php");
}
function search_book() {
    let input = document.getElementById('searchbar').value
    input=input.toLowerCase();
    let x = document.getElementsByClassName('book');
      
    for (i = 0; i < x.length; i++) { 
        if (!x[i].innerHTML.toLowerCase().includes(input)) {
            x[i].style.display="none";
        }
        else {
            x[i].style.display="list-item";                 
        }
    }
}
function loadInputs()
{
    document.getElementById('inputNewBooksTitle').value='';
    document.getElementById('inputNewBookAuthorOption').value='0';
    document.getElementById('inputNewBooksYear').value='';
    document.getElementById('inputNewBooksPages').value='';
    document.getElementById('inputNewBooksImageURL').value='';
    document.getElementById('inputNewBooksCategoryOption').value='0';
}
function displayEditDiv(id,title,author,year,pages,category,cover) 
{
    putValuesInInputBooks('inputEditId',id,"inputEditBooksTitle",title,"inputEditBookAuthorOption",author,"inputEditBooksYear",year,"inputEditBooksPages",pages,"inputEditBooksCategoryOption",category,"inputEditBooksImageURL",cover);
    loadInputs();
    displayNone_displayFlex("editBooksDiv");
    displayFlex_displayNone("newBooks");
    displayFlex_displayNone("deleteBooksDiv");
} 


function displayNewBooksDiv() 
{
    loadInputs();
    displayNone_displayFlex("newBooks");
    displayFlex_displayNone("editBooksDiv");
    displayFlex_displayNone("deleteBooksDiv");

}
/*6*/
function counterLi(array)
{
    let numberLi = document.getElementById(array).getElementsByTagName("li").length();
    return numberLi;
}
/*7*/
function innerHTMLLiElement(Array)
{
    for (i=0;i<Array.length;i++) 
    {
        let li = document.createElement("li");
        li.classList.add('text-white', 'text-weight-bold','d-flex', 'justify-content-md-start', 'text-left');
        li.setAttribute('id',`${Array[i].id}`)
        li.innerHTML =`
        <table id="myTable" class="col-md-12 table-dark justify-content-md-start my-1">
            <tr class="col-md-12 ml-0 text-capitalize text-center list-unstyled">
                <td class = "book mx-0 text-left">
                    <span id="counter" class="mr-2 ml-0">${i+1}</span> 
                    <span class="d-inline-block"><small class="text-italic text-primary">Title:</small><small >${Array[i].title}.</small></span>
                    <span class="d-inline-block"><small class="text-italic text-primary">Authors: </small><small>${Array[i].author}.</small></span>
                    <span class="d-inline-block"><small class="text-italic text-primary">Year: </small><small>${Array[i].year_publication}.</small></span>
                    <span class="d-inline-block"><small class="text-italic text-primary">Pages: </small><small>${Array[i].pages}.</small></span>
                    <span class="d-inline-block"><small class="text-italic text-primary">Category: </small><small>${Array[i].category}.</small></span>
                    <span class="d-inline-block"><small class="text-italic text-primary">Cover: </small><small><a href="${Array[i].cover}" target="_blank">Link</a>.</small></span>
                    <span class="col-md-2 text-white my-0 mr-1 px-0">  
                        <span onclick="displayNewBooksDiv()" class="ml-1"><i class="fa-solid fa-file-circle-plus fa-xs text-success" data-toggle="tooltip" data-placement="bottom" title="Create new book"></i>
                        </span>
                        <span id = "${Array[i].id}" onclick="displayEditDiv(${Array[i].id},'${Array[i].title}','${Array[i].author}','${Array[i].year_publication}','${Array[i].pages}','${Array[i].category}','${Array[i].cover}')" class="mx-1" data-toggle="tooltip" data-placement="bottom" title="Edit book"><i class="fa-solid fa-gears fa-xs text-warning"></i>
                        </span>
                        <span id = "${Array[i].id}" onclick="displayDeleteDiv(${Array[i].id}, '${Array[i].title}')" class="mx-1" data-toggle="tooltip" data-placement="bottom" title="Delete book"><i class="fa-solid fa-recycle fa-xs text-danger"></i>
                        </span>
                    </span>
                </td>
            </tr>
        </table>
        `;
        document.getElementById("the-list").appendChild(li);
    }
}
/*8*/
function updateLiCategory(Array)
{
    for (i=0;i<Array.length;i++) 
    {
        let li = document.getElementById(`${Array[i].id}`);
        li.innerHTML = '';
        li.innerHTML =`
        <span class="col-md-3 text-white my-1 mx-0 px-0 d-inline-flex border-bottom">  
            <span id="counter" class="mr-5">${i+1}</span>      
            <span onclick="displayNewBooksDiv()" class="ml-1"><i class="fa-solid fa-file-circle-plus fa-lg text-success" data-toggle="tooltip" data-placement="bottom" title="Create new book"></i>
            </span>
            <span id = "${Array[i].id}" onclick="displayEditDiv(${Array[i].id},'${Array[i].title}','${Array[i].author}','${Array[i].year_publication}','${Array[i].pages}','${Array[i].category}','${Array[i].cover}')" class="mx-1" data-toggle="tooltip" data-placement="bottom" title="Edit book"><i class="fa-solid fa-gears fa-lg text-warning"></i>
            </span>
            <span id = "${Array[i].id}" onclick="displayDeleteDiv(${Array[i].id}, '${Array[i].title}')" class="mx-1" data-toggle="tooltip" data-placement="bottom" title="Delete book"><i class="fa-solid fa-recycle fa-lg text-danger"></i>
            </span>
        </span>
        <table class="table-dark justify-content-md-start my-1">
            <tbody class="col-md-12">
                <tr class=" ml-0 text-capitalize text-center d-flex list-unstyled border-bottom">
                    <td class = "mr-2 text-center">${Array[i].title}</td>
                    <td class = "mr-2 text-center"><small>Author:</small> <em class="small">${Array[i].author}</em></td>
                    <td class = "mr-2 text-center"><small>Year:</small> <em class="small">${Array[i].year_publication}</em></td>
                    <td class = "mr-2 text-center"><small>Pages:</small> <em class="small">${Array[i].pages}</em></td>
                    <td class = "mr-2 text-center"><small>Category:</small> <em class="small">${Array[i].category}</em></td>
                    <td class = "mr-2 text-center"><small>Cover:</small> <em class="small"><a href="${Array[i].cover}" target="_blank">Link</a></em></td>
                </tr>
            <tbody>
        </table>
        `;
        document.getElementById("the-list").appendChild(li);
    }  
}
        fetch("../backEnd/listBooks.php")
        .then((result) => result.json())
        .then(function(data){
            console.log(data,'data')
            innerHTMLLiElement(data)
            return data;
        })
        .then(function(data1)
        {
            return data1;
        })
        .then(function(data2)
        {
            btnNewBooks.addEventListener('click', (e)=>{
                e.preventDefault();
                //------------varjabli so mali---------------------//
                let inputNewBooksTitle = document.getElementById('inputNewBooksTitle').value.toLowerCase();
                let inputNewBooksAuthor = document.getElementById('inputNewBooksAuthor').value.toLowerCase();
                let inputNewBooksYear = document.getElementById('inputNewBooksYear').value.toLowerCase();
                let inputNewBooksPages = document.getElementById('inputNewBooksPages').value.toLowerCase();
                let inputNewBooksImageURL = document.getElementById('inputNewBooksImageURL').value;
                let inputNewBooksCategory = document.getElementById('inputNewBooksCategory').value.toLowerCase();
                //------------funkciii za site-------------//
                checkInputEmpty('inputNewBooksTitle');
                checkInputEmptyOptions('inputNewBooksAuthor');
                checkInputEmpty('inputNewBooksYear');
                checkInputEmpty('inputNewBooksPages');
                checkInputEmpty('inputNewBooksImageURL');
                checkInputEmptyOptions('inputNewBooksCategory');
                //------proverki samo za kucani inputi i ovaa funkcija osven za title i URL,za drugite ne se koristi deka poveke knigi moze da bidat izdadeni vo ista godina, da imat isti pisatel i kategorija pa mozno e i br.na strani--//
                let objData2 = data2.find(objData2 => objData2.title === inputNewBooksTitle)//title
                let val = isEmpty(objData2,inputNewBooksTitle);

                let objData3 = data2.find(objData3 => objData3.image === inputNewBooksImageURL)//image
                let val2 = isEmpty(objData3,inputNewBooksImageURL);

                if(val === true && val2 == true)
                { 
                    $.ajax({
                    url:'../backEnd/createNewBooks.php',
                    method: "POST",
                    data: {
                        title:inputNewBooksTitle,
                        author:inputNewBooksAuthor,
                        year_publication:inputNewBooksYear,
                        pages:inputNewBooksPages,
                        category:inputNewBooksCategory,
                        cover:inputNewBooksImageURL,
                    }
                    })
                    .done(function(msg){
                        let responsePhp = JSON.parse(msg);
                        console.log(responsePhp,'responsePhp')
                        if(responsePhp.success == 1)
                        {
                            let x = [responsePhp.newBooks];
                            innerHTMLLiElement(x);
                            Swal.fire({
                                icon: 'success',
                                title: 'Success ...',
                                text: 'A new book with the title "' + inputNewBooksTitle+'" was added to the database.',
                                timer: 2000,
                            });
                            document.getElementById('inputNewBooksTitle').value='';
                            document.getElementById('inputNewBookAuthorOption').value='0';
                            document.getElementById('inputNewBooksYear').value='';
                            document.getElementById('inputNewBooksPages').value='';
                            document.getElementById('inputNewBooksImageURL').value='';
                            document.getElementById('inputNewBooksCategoryOption').value='0';
                       
                            setTimeout(function(){location.reload()}, 2022);
                        }
                        else if(responsePhp.success == 0)
                        {
                            Swal.fire({
                                icon: 'error',
                                title: 'Something went wrong ...',
                                text: 'The book with title"' + inputNewBooksTitle +'" was not added!'
                            });
                            document.getElementById('inputNewBooksTitle').value=inputNewBooksTitle;
                            document.getElementById('inputNewBookAuthorOption').value=inputNewBooksAuthor;
                            document.getElementById('inputNewBooksYear').value=inputNewBooksYear;
                            document.getElementById('inputNewBooksPages').value=inputNewBooksPages;
                            document.getElementById('inputNewBooksImageURL').value=inputNewBooksImageURL;
                            document.getElementById('inputNewBooksCategoryOption').value=inputNewBooksCategory;
                        }
                        else if(responsePhp.success == 2)
                        {
                            Swal.fire({
                                icon: 'error',
                                title: 'Overwriting!',
                                text: 'The book with title"' + inputNewBooksTitle +'" it is in the database. If it is deleted contact the webdeveloper!'
                            });
                        }
                    });
                } 
            });
            return data2
        })
        .then(function(data3)
        {
            btnSubmitEditBooks.addEventListener('click', (e)=>{
                e.preventDefault();
                 //------------varjabli so mali---------------------//
                var select1 = document.getElementById('inputEditBooksAuthor');
                let inputEditBookAuthorOption = select1.options[select1.selectedIndex].value;


                var select2 = document.getElementById('inputEditBooksCategory');
                let inputEditBooksCategoryOption = select2.options[select2.selectedIndex].value;
                console.log(inputEditBooksCategoryOption,'inputEditBooksCategoryOption')

               let inputEditBooksTitle = document.getElementById('inputEditBooksTitle').value.toLowerCase();
               let inputEditId = document.getElementById('inputEditId').value;

               let inputEditBooksYear = document.getElementById('inputEditBooksYear').value.toLowerCase();
               let inputEditBooksPages = document.getElementById('inputEditBooksPages').value.toLowerCase();
               let inputEditBooksImageURL = document.getElementById('inputEditBooksImageURL').value;
               //------------funkciii za site-------------//
               checkInputEmpty('inputEditBooksTitle');
               checkInputEmptyOptions('inputEditBookAuthorOption');
               checkInputEmpty('inputEditBooksYear');
               checkInputEmpty('inputEditBooksPages');
               checkInputEmpty('inputEditBooksImageURL');
               checkInputEmptyOptions('inputEditBooksCategoryOption');
    
                    $.ajax({ 
                    url:'../backEnd/editBooks.php',
                    method: "POST",
                    data: {
                        editTitle:inputEditBooksTitle,
                        editId:inputEditId,
                        editAuthor:inputEditBookAuthorOption,
                        editYear_publication:inputEditBooksYear,
                        editPages:inputEditBooksPages,
                        editCategory:inputEditBooksCategoryOption,
                        editCover:inputEditBooksImageURL
                    }
                    })
                    .done(function(msg){
                        msg = msg.trim();
                        data3 = JSON.parse(msg);
                    let responsePhp = data3;
                    if(responsePhp.success == 1)
                    {
                    
                        let y = [responsePhp.bookUpdated]; //???
                        console.log(y,'y');
                        updateLiCategory(y)
                        Swal.fire({
                            icon: 'success',
                            title: 'Success ...',
                            text: 'The book with title "' +responsePhp.bookUpdated.title+'" and author "'+responsePhp.bookUpdated.author+'" was updated.',
                            timer: 2000,
                        });
                        loadInputs();
                        setTimeout(function(){location.reload()}, 2022);
                    }
                    else
                    {
                        Swal.fire({
                            icon: 'error',
                            title: 'Something went wrong ...',
                            text: 'The category "' + inputEditCategory +'" was not updated!'
                        });
                    }
                });
                
            })
            return data3;
        })

function displayDeleteDiv(clicked_id,clicked_title) 
{
    displayNone_displayFlex("deleteBooksDiv");
    displayFlex_displayNone("newBooks");
    displayFlex_displayNone("editBooksDiv");
    Swal.fire({
        title: 'Are you sure you want to delete the book "'+`${clicked_title}`+'" ?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
        if(result.value)
        {
            return $.ajax({
                url:'../backEnd/deleteBooks.php',
                type: "POST",
                data: {id:clicked_id,soft_delete:1},
            })
            .done(function(msg){
                let response = JSON.parse(msg)
                console.log(response,'response');
                if(response.success == 1)
                {
                    deleteEntryInUlList("the-list",clicked_id)
                    isConfirmed = true;
                    Swal.fire({
                        position: 'top-end',
                        icon:'success',
                        title:'Deleted!',
                        text:'The book with title "'+`${clicked_title}`+'" has been deleted.',
                        timer: 2000 
                    })
                    setTimeout(function(){location.reload()}, 2022);
                }
                else
                {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                        timer: 2000
                        })
                }
            })
        }
        else if(result.dismiss == 'cancel')
        {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Swell',
                text: 'The category was saved in the last minute.',
                timer: 1500
            })
        }

    })

}
