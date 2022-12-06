if(sessionStorage.getItem("admin") !== "admin"){
    window.location.replace("/../frontEnd/index.php");
}
//FUNCTIONS
// /*1*/
function displayNone_displayFlex(elementId) 
{
    var element = document.getElementById(elementId);
    if (element.classList.contains("d-none")) 
    {
        element.classList.remove("d-none");
        element.classList.add("d-flex");
    }
}
// /*2*/
function displayFlex_displayNone(elementId) 
{
    var element = document.getElementById(elementId);
    if (element.classList.contains("d-flex")) 
    {
        element.classList.remove("d-flex");
        element.classList.add("d-none");
    }
}
// /*3*/
function displayNewCategorytDiv() 
{
    document.getElementById('inputNewCategory').value='';
    displayNone_displayFlex("newCategory");
    displayFlex_displayNone("editCategoryDiv");
    displayFlex_displayNone("deleteCategoryDiv");

}

function deleteEntryInUlList(UlList,id)
{
    let parent = document.getElementById(UlList)
    let li = document.getElementById(id);
    li.innerHTML=``
    li.classList.add('d-none');
}
function displayEditDiv(clicked_id,clicked_category) 
{
    createInputBtn("inputEditCategory","inputEditId",clicked_id,clicked_category);
    displayNone_displayFlex("editCategoryDiv");
    displayFlex_displayNone("newCategory");
    displayFlex_displayNone("deleteCategoryDiv");
}

// /*10*/
function createInputBtn(inputId,inputHiddenId,idClicked,categoryClicked)
{
    if (elementClicked === false)
    {
       document.getElementById(inputId).setAttribute('value',categoryClicked);
       document.getElementById(inputHiddenId).setAttribute('value',idClicked);
    }
}


/*5*/
function displayDeleteDiv(clicked_id,clicked_category) 
{
    displayNone_displayFlex("deleteCategoryDiv");
    displayFlex_displayNone("newCategory");
    displayFlex_displayNone("editCategoryDiv");
    Swal.fire({
        title: 'Are you sure you want to delete "'+`${clicked_category}`+'" category ?',
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
                url:'../backEnd/deleteCategory.php',
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
                        text:'The category "'+`${clicked_category}`+'" has been deleted.',
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
/*6*/

/*7*/
function innerHTMLLiElement(Array)
{
    for (i=0;i<Array.length;i++) 
    {
        let li = document.createElement("li");
        li.classList.add('text-white', 'text-weight-bold', 'justify-content-between', 'text-left');
        li.setAttribute('id',`${Array[i].id}`)
        li.innerHTML =`
        <span class="col-md-4 text-white text-center mb-0 ml-3 d-inline-flex text-center">                
            <span onclick="displayNewCategorytDiv()" class="mx-1"><i class="fa-solid fa-file-circle-plus fa-lg text-success" data-toggle="tooltip" data-placement="bottom" title="Create new category"></i>
            </span>
            <span id = "${Array[i].id}" onclick="displayEditDiv(${Array[i].id}, '${Array[i].category}')" class="mx-1" data-toggle="tooltip" data-placement="bottom" title="Edit category"><i class="fa-solid fa-gears fa-lg text-warning"></i>
            </span>
            <span id = "${Array[i].id}" onclick="displayDeleteDiv(${Array[i].id}, '${Array[i].category}')" class="mx-1" data-toggle="tooltip" data-placement="bottom" title="Delete category"><i class="fa-solid fa-recycle fa-lg text-danger"></i>
            </span>
        </span>
        <span class="ml-0 text-capitalize">${Array[i].category}</span>
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
        <span class="col-md-4 text-white text-center mb-0 ml-3 d-inline-flex text-center">                
            <span onclick="displayNewCategorytDiv()" class="mx-1"><i class="fa-solid fa-file-circle-plus fa-lg text-success" data-toggle="tooltip" data-placement="bottom" title="Create new category"></i>
            </span>
            <span id = "${Array[i].id}" onclick="displayEditDiv(${Array[i].id}, '${Array[i].category}')" class="mx-1" data-toggle="tooltip" data-placement="bottom" title="Edit category"><i class="fa-solid fa-gears fa-lg text-warning"></i>
            </span>
            <span id = "${Array[i].id}" onclick="displayDeleteDiv(${Array[i].id}, '${Array[i].category}')" class="mx-1" data-toggle="tooltip" data-placement="bottom" title="Delete category"><i class="fa-solid fa-recycle fa-lg text-danger"></i>
            </span>
        </span>
        <span class="ml-0 text-capitalize">${Array[i].category}</span>
        `;
        document.getElementById("the-list").appendChild(li);

    }  
}

//HANDLE
/*A*/

        fetch("../backEnd/listCategory.php")
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
            btnSubmitNewCategory.addEventListener('click', (e)=>{
                e.preventDefault();
                let inputNewCategory = document.getElementById('inputNewCategory').value.toLowerCase(); 
                checkInputEmpty('inputNewCategory');
                let objData2 = data2.find(objData2 => objData2.category === inputNewCategory)
                let val = isEmpty(objData2);
                console.log(val,'val')
                console.log(objData2,'objData2')
                // return
                if(val === true)
                { 
                    $.ajax({
                    url:'../backEnd/createNewCategory.php',
                    method: "POST",
                    data: {category: inputNewCategory}
                    })
                    .done(function(msg){
                        let responsePhp = JSON.parse(msg);
                        if(responsePhp.success == 1)
                        {
                            let x = [responsePhp.newCategory];
                            innerHTMLLiElement(x);
                            Swal.fire({
                                icon: 'success',
                                title: 'Success ...',
                                text: 'The category "' + inputNewCategory +'" was added to the  database.'
                            });
                            document.getElementById('inputNewCategory').value = '';
                        }
                        else if(responsePhp.success == 0)
                        {
                            Swal.fire({
                                icon: 'error',
                                title: 'Something went wrong ...',
                                text: 'The category "' + inputNewCategory +'" was not added!'
                            });
                        }
                        else if(responsePhp.success == 2)
                        {
                            Swal.fire({
                                icon: 'error',
                                title: 'Overwritnig!',
                                text: 'The category "' + inputNewCategory +'" it is in the  database. If it is deleted contact the webdeveloper!'
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
            });
            return data2
        })
        .then(function(data3)
        {
            btnSubmitEditCategory.addEventListener('click', (e)=>{
                e.preventDefault();
                let inputEditCategory = document.getElementById('inputEditCategory').value.toLowerCase();
                inputEditCategory = inputEditCategory.trim();
                checkInputEmpty('inputEditCategory');
 
                let inputEditId = document.getElementById('inputEditId').value; 
                let objData3 = data3.find(objData2 => objData2.category === inputEditCategory)

                let val = isEmpty(objData3);  

                if(val === true)
                {
                    $.ajax({
                    url:'../backEnd/editCategory.php',
                    method: "POST",
                    data: {category:inputEditCategory, id:inputEditId}
                    })
                    .done(function(msg){
                        msg = msg.trim();
                        data3 = JSON.parse(msg);
                   
                    let responsePhp = data3;
                    if(responsePhp.success == 1)
                    {
                        let y = [responsePhp.updatedCategory];
                        updateLiCategory(y)

                        Swal.fire({
                            icon: 'success',
                            title: 'Success ...',
                            text: 'The category "' + inputEditCategory +'" was updated.',
                            timer: 2000,
                        });
                        setTimeout(function(){location.reload()}, 2002);
                        document.getElementById('inputEditCategory').value = '';
                        document.getElementById('inputEditId').value = '';
                    }
                    else
                    {
                        Swal.fire({
                            icon: 'error',
                            title: 'Something went wrong ...',
                            text: 'The category "' + inputEditCategory +'" was not updated!'
                        });
                        return;
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

