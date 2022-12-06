
if(sessionStorage.getItem("admin") !== "admin"){
    window.location.replace("/../frontEnd/index.php");
}

function displayEditDiv(clicked_id,clicked_category,bioClicked) 
{
    createInputBtn("inputEditAuthor","inputEditId","inputEditBiography",clicked_id,clicked_category,bioClicked);
    displayNone_displayFlex("editCategoryDiv");
    displayFlex_displayNone("newCategory");
    displayFlex_displayNone("deleteCategoryDiv");
} 

function displayDeleteDiv(clicked_id,clicked_category) 
{
    displayNone_displayFlex("deleteCategoryDiv");
    displayFlex_displayNone("newCategory");
    displayFlex_displayNone("editCategoryDiv");
    Swal.fire({
        title: 'Are you sure you want to delete the autor "'+`${clicked_category}`+'" ?',
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
                url:'../backEnd/deleteAuthor.php',
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
                        text:'The category "'+`${clicked_author}`+'" has been deleted.',
                        timer: 2000
                    })
                }
                else
                {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                        // timer: 2000
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
function displayNewAuthortDiv() 
{
    document.getElementById('inputNewAuthor').value='';
    displayNone_displayFlex("newCategory");
    displayFlex_displayNone("editCategoryDiv");
    displayFlex_displayNone("deleteCategoryDiv");

}
/*6*/
function isEmpty(val)
{
    return (val === undefined || val == null || val.length <= 0) ? true : false;
}
/*7*/
function innerHTMLLiElement(Array,value)
{
    for (i=0;i<Array.length;i++) 
    {
        let li = document.createElement("li");
        li.classList.add('text-white', 'text-weight-bold', 'justify-content-between', 'text-left');
        li.setAttribute('id',`${Array[i].id}`)
        li.innerHTML =`
        <span class="col-md-4 text-white text-center mb-0 ml-3 d-inline-flex text-center">                
            <span onclick="displayNewAuthortDiv()" class="mx-1"><i class="fa-solid fa-file-circle-plus fa-lg text-success" data-toggle="tooltip" data-placement="bottom" title="Create new category"></i>
            </span>
            <span id = "${Array[i].id}" onclick="displayEditDiv(${Array[i].id}, '${Array[i].author}','${Array[i].biography}')" class="mx-1" data-toggle="tooltip" data-placement="bottom" title="Edit category"><i class="fa-solid fa-gears fa-lg text-warning"></i>
            </span>
            <span id = "${Array[i].id}" onclick="displayDeleteDiv(${Array[i].id}, '${Array[i].author}')" class="mx-1" data-toggle="tooltip" data-placement="bottom" title="Delete category"><i class="fa-solid fa-recycle fa-lg text-danger"></i>
            </span>
        </span>
        <span class="ml-0 text-capitalize mr-1 pr-2 border-right">${Array[i].author}</span>
        <span class="ml-0 text-capitalize text-right"><small class="text-primary text-left">Biography:</small> ${Array[i].biography}</span>
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
        li.innerHTML =`
        <span class="col-md-4 text-white text-center mb-0 ml-3 d-inline-flex text-center">                
            <span onclick="displayNewAuthortDiv()" class="mx-1"><i class="fa-solid fa-file-circle-plus fa-lg text-success" data-toggle="tooltip" data-placement="bottom" title="Create new category"></i>
            </span>
            <span id = "${Array[i].id}" onclick="displayEditDiv(${Array[i].id}, '${Array[i].author}')" class="mx-1" data-toggle="tooltip" data-placement="bottom" title="Edit category"><i class="fa-solid fa-gears fa-lg text-warning"></i>
            </span>
            <span id = "${Array[i].id}" onclick="displayDeleteDiv(${Array[i].id}, '${Array[i].author}','${Array[i].biography}')" class="mx-1" data-toggle="tooltip" data-placement="bottom" title="Delete category"><i class="fa-solid fa-recycle fa-lg text-danger"></i>
            </span>
        </span>
        <span class="ml-0 text-capitalize">${Array[i].author}</span>
        <span class="ml-0 text-capitalize"><small class="text-primary">Biography:</small> ${Array[i].biography}</span>
        `;
        document.getElementById("the-list").appendChild(li);
    }  
}
        fetch("../backEnd/listAuthors.php")
        .then((result) => result.json())
        .then(function(data){
            innerHTMLLiElement(data)
            return data;
        })
        .then(function(data1)
        {
            list = document.querySelectorAll("#the-list li");
            filter.onkeyup = () => 
            {
                let search = filter.value.toLowerCase();
                for (let i of list) 
                {
                    let item = i.innerHTML.toLowerCase();
                    if (item.indexOf(search) == -1) 
                    { 
                        i.classList.add("hide"); 
                    }
                    else 
                    { 
                        i.classList.remove("hide"); 
                    }
                }
            };
            return data1;
        })
        .then(function(data2)
        {
            btnSubmitNewAuthor.addEventListener('click', (e)=>{
                e.preventDefault();
                let inputNewAuthor = document.getElementById('inputNewAuthor').value.toLowerCase();
                let inputNewAuthorBiography = document.getElementById('inputNewAuthorBiography').value;
                checkInputEmpty('inputNewAuthor');
                checkInputEmpty('inputNewAuthorBiography');
                let objData2 = data2.find(objData2 => objData2.author === inputNewAuthor)
                let val = isEmpty(objData2);
                console.log(val,'val')
                if(val === true)
                { 
                    $.ajax({
                    url:'../backEnd/createNewAuthor.php',
                    method: "POST",
                    data: {author: inputNewAuthor, bio: inputNewAuthorBiography}
                    })
                    .done(function(msg){
                        let responsePhp = JSON.parse(msg);
                        if(responsePhp.success == 1)
                        {
                            let x = [responsePhp.author];
                            innerHTMLLiElement(x);
                            Swal.fire({
                                icon: 'success',
                                title: 'Success ...',
                                text: 'The category "' + inputNewAuthor +'" was added to the  database.'
                            });
                            document.getElementById('inputNewAuthor').value = '';
                            document.getElementById('inputNewAuthorBiography').value = '';
                        }
                        else if(responsePhp.success == 0)
                        {
                            Swal.fire({
                                icon: 'error',
                                title: 'Something went wrong ...',
                                text: 'The author "' + inputNewAuthor +'" was not added!'
                            });
                        }
                        else if(responsePhp.success == 2){
                            Swal.fire({
                                icon: 'error',
                                title: 'This author alredy exits in the database. If it is deleted contact the webdeveloper.',
                                showClass: {
                                  popup: 'animate__animated animate__fadeInDown'
                                },
                                hideClass: {
                                  popup: 'animate__animated animate__fadeOutUp'
                                }
                            })
                            return;
                        }
                    });
                }   
                else
                {
                    Swal.fire({
                        icon: 'error',
                        title: 'This author alredy exits in the database.',
                        showClass: {
                          popup: 'animate__animated animate__fadeInDown'
                        },
                        hideClass: {
                          popup: 'animate__animated animate__fadeOutUp'
                        }
                    })
                    return;
                }
            });
            return data2
        })
        .then(function(data3)
        {
            btnSubmitEditAuthor.addEventListener('click', (e)=>{
                e.preventDefault();
                let inputEditAuthor = document.getElementById('inputEditAuthor').value.toLowerCase();
                let inputEditBiography = document.getElementById('inputEditBiography').value.toLowerCase();
                checkInputEmpty('inputEditAuthor');
                checkInputEmpty('inputEditBiography');
                let inputEditId = document.getElementById('inputEditId').value; 
                let objData3 = data3.find(objData3 => objData3.category === inputEditAuthor)
                let val = isEmpty(objData3); 
                if(val === true)
                {
                    $.ajax({
                    url:'../backEnd/editAuthor.php',
                    method: "POST",
                    data: {author:inputEditAuthor, id:inputEditId, bio:inputEditBiography}
                    })
                    .done(function(msg){
                        msg = msg.trim();
                        data3 = JSON.parse(msg);
                    let responsePhp = data3;
                    if(responsePhp.success == 1)
                    {
                    
                        let y = [responsePhp.author]; 
                        updateLiCategory(y)
                        Swal.fire({
                            icon: 'success',
                            title: 'Success ...',
                            text: 'The author: <span class="text-italic text-bold">"' + inputEditAuthor +'"</span> was updated.',
                            timer: 2000,
                        });
                        document.getElementById('inputEditAuthor').value = '';
                        document.getElementById('inputEditId').value = '';
                        setTimeout(function(){location.reload()}, 2002);
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
                }   
                else
                {
                    Swal.fire({
                        icon: 'error',
                        title: 'This category alredy exits in the database.',
                        showClass: {
                          popup: 'animate__animated animate__fadeInDown'
                        },
                        hideClass: {
                          popup: 'animate__animated animate__fadeOutUp'
                        }
                    })
                    return;
                }
            })
            return data3;
        })

