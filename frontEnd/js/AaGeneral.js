// //VARIABLES

let elementClicked = false;
let filter = document.getElementById("searchCategory"); 

const categoryDiv = document.getElementById("categoryDiv");
const clearInputBtn = document.getElementById("clearInputBtn");

//FORM newCategory
const formNewCategory  = document.getElementById('formNewCategory');
const btnSubmitNewCategory = document.getElementById('btnNewCategory');
const btnSubmitEditCategory = document.getElementById('btnSubmitEditCategory');


//FORM newAuthor
const formNewAuthor  = document.getElementById('formNewAuthor');
const btnSubmitNewAuthor = document.getElementById('btnNewAuthor');
const btnSubmitEditAuthor = document.getElementById('btnSubmitEditAuthor');

//FORM newBooks
const formNewBooks  = document.getElementById('formNewBooks');
const btnNewBooks = document.getElementById('btnNewBooks');
const btnSubmitEditBooks = document.getElementById('btnSubmitEditBooks');

//FUNCTIONS

/*1*/
function displayNone_displayFlex(elementId) 
{
    var element = document.getElementById(elementId);
    if (element.classList.contains("d-none")) 
    {
        element.classList.remove("d-none");
        element.classList.add("d-flex");
    }
}
/*2*/
function displayFlex_displayNone(elementId) 
{
    var element = document.getElementById(elementId);
    if (element.classList.contains("d-flex")) 
    {
        element.classList.remove("d-flex");
        element.classList.add("d-none");
    }
}
/*3*/
function deleteEntryInUlList(UlList,id)
{
    let parent = document.getElementById(UlList)
    let li = document.getElementById(id);
    li.innerHTML=``
    li.classList.add('d-none');
}
/*10*/
function createInputBtn(inputId,inputHiddenId,inputEditBiography,idClicked,categoryClicked,bioClicked)
{
    if (elementClicked === false)
    {
       document.getElementById(inputId).setAttribute('value',categoryClicked);
       document.getElementById(inputHiddenId).setAttribute('value',idClicked);
       document.getElementById(inputEditBiography).setAttribute('value',bioClicked);
    }    
}
function putValuesInInputBooks(inputId,id,inputTitle,title,inputAuthor,author,inputYear,year,inputPages,pages,inputCategory,category,inputCover,cover)
{
    if (elementClicked === false)
    {
       document.getElementById(inputId).setAttribute('value',id);
       document.getElementById(inputTitle).setAttribute('value',title);
       document.getElementById(inputAuthor).setAttribute('value',author);
       document.getElementById(inputYear).setAttribute('value',year);
       document.getElementById(inputPages).setAttribute('value',pages);
       document.getElementById(inputCategory).setAttribute('value',category);
       document.getElementById(inputCover).setAttribute('value',cover);
    }    
}
function checkInputEmpty(inputId)
{
    val = document.getElementById(inputId).value;
    if( (val === undefined || val == null || val.length <= 0))
    {
        Swal.fire({
            icon: 'error',
            title: 'Can not submit empty input!',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
        })
    }
    return false;
}
function checkInputEmptyOptions(inputId)
{
    val = document.getElementById(inputId).value;
    if( (val === undefined || val == null || val.length <= 0 || val == 0))
    {
        Swal.fire({
            icon: 'error',
            title: 'Can not submit empty input!',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
        })
    }
    return false;
}

function stringRepalce(inputValue)
{
    inputValue = string.replace(/['"]/g, '');
    return inputValue;
}

function isEmpty(val,input)
{
    if ((val === undefined || val == null || val.length <= 0) == false)
    {
        Swal.fire({
            icon: 'error',
            title: 'This entry "'+`${input}`+'" already exits in the database.',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
        })
        return false;
    }
    else
    {
        return true;
    }
  
}
function isEmpty(val)
{
    return (val === undefined || val == null || val.length <= 0) ? true : false;
}

function checkInputEmpty(inputId)
{
    val = document.getElementById(inputId).value;
    if( (val === undefined || val == null || val.length <= 0))
    {
        Swal.fire({
            icon: 'error',
            title: 'Can not submit empty input!',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
        })
    }
    return false;
}


function navbarNotLogged()
{
    let navDiv = document.getElementById('navDiv');
    navDiv.innerHTML = `
        <button id="signIn" name="signIn" class="btn btn-outline-warning my-sm-1 mx-sm-1" type="button">Sign in</button>
        <button id="signUp" name="signUp" class="btn btn-outline-success my-sm-1 mx-sm-1" type="button">Sign up</button>
    `;
}

function navbarLogged()
{
    let navDiv = document.getElementById('navDiv');
    navDiv.innerHTML = '';
    navDiv.innerHTML = `
    <button id="logOut" name="logOut" onclick=" whenLogOut()" class="btn btn-outline-danger my-sm-1 mx-sm-1" type="button">Log out</button>
`;
}

function whenLogOut()
{

    let bntIn = document.getElementById('signIn');
    let bntUp = document.getElementById('signUp');
    let btnOut = document.getElementById('logOut');

        sessionStorage.clear();
        location.replace('../backEnd/logoutAuth.php');

        bntIn.classList.remove('d-none');
        bntUp.classList.remove('d-none');
        btnOut.classList.add('d-inline-block')
        bntIn.classList.add('d-inline-block');
        bntUp.classList.add('d-inline-block');
        btnOut.classList.add('d-inline-block');
}
if ((sessionStorage.getItem("user") === "user")||(sessionStorage.getItem("admin") === "admin"))
{
    navbarLogged();

}
else
{
    navbarNotLogged();
}

//LEFT PANEL
function openNavLeft() {
    document.getElementById("myNav").style.height = "100%";
  }
  
  function closeNavLeft() {
    document.getElementById("myNav").style.height = "0%";
  }
  //RIGHT PANEL
  function openNavRight() {
    document.getElementById("commentMainDiv").style.height = "100%";
  }
  
  function closeNavRight() {
    document.getElementById("commentMainDiv").style.height = "0%";
  }
  