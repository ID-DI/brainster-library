fetch("http://api.quotable.io/random")
.then((result) => result.json())
.then(function (data) 
{
   let quotation = document.getElementById('quotation');
   quotation.innerText = data.content;
   let authorQuotation = document.getElementById('authorQuotation');
   authorQuotation.innerText = data.author;
});

let bookId = location.search.split('?')[1];

fetch("../backEnd/listBooks.php")
.then((result) => result.json())
.then(function (data) 
{
  for(i=0; i <data.length; i++)
  {
    if(data[i].id == bookId)
    {
        let image = document.getElementById('imgPrint');
        let infoPrint = document.getElementById('infoPrint');
        image.innerHTML = `
            <img src="${data[i].cover}" alt="cover" class="img-print ml-auto rounded">
        `;
        infoPrint.innerHTML = `<h3 id="titlePrint" class="font-weight-bolder font-italic">Titile: "${data[i].title}"</h3>
        <h5 id="authorPrint" class="font-weight-bold text-capitalize">Author: ${data[i].author}.</h5>
        <h6 id="bioPrint" class="font-weight-bold">Biography: ${data[i].biography}.</h6>
        <p id="yearPrint" class="font-weight-normal ">Year of first publication: ${data[i].year_publication}.</p>
        <p id="pagesPrint" class="font-weight-normal">Number of pages: ${data[i].pages}.</p>
        <p id="categoryPrint" class="font-weight-normal text-capitalize">Category: ${data[i].category}.</p>
        `;
    
    }
  }
  let book = data.bookId;
});

let idSession = sessionStorage.getItem('id');
let userSession = sessionStorage.getItem('user');

$.ajax({
  url: "../backEnd/listCommentsLogedUser.php",
  type: "POST",
  data: {
    id: idSession,
  },
  success:function(response)
  {
    let result = JSON.parse(response);
    if (result.success == 1) 
    {
      let x = [result.id]

      $.ajax({
        url: "../backEnd/listCommentBook.php",
        type: "POST",
        data: {
          book: bookId,
        },
        success:function(response)
        {
          let result = JSON.parse(response);
          if (result.success == 1) 
          {
            let data = [result.comments];
            for(i=0; i<data.length; i++)
            {
              let dataIn = data[i];
              console.log(dataIn,'dataIn')
              // if()
              for(i=0; i <dataIn.length; i++)
              {
                  let commentSection = document.getElementById('commentSection');
                  let div = document.createElement('div');
                  div.setAttribute('id','commentPrintDiv')
                  div.classList.add('d-flex','flex-column','border','rounded','my-2','mx-2','p-1');
                  if (idSession == dataIn[i].user_id && userSession == 'user' && dataIn[i].soft_delete == 0)
                  {
                    div.innerHTML = `
                    <div id="${dataIn[i].id}" class="d-flex flex-column">
                    <p class="text-center font-bold my-1" contenteditable="true">" ${dataIn[i].commentary} "</p>
                    <span class='d-block text-right font-italic mb-1 mt-0'>-${dataIn[i].user}</span>
                    <button id="deletePublicComment" onclick="deletePublicComment(${dataIn[i].id},${dataIn[i].user_id})" type="button" class="btn btn-danger btn-sm">Delete</button>
                    </div>
                    `;
                    commentSection.appendChild(div);
                  }
                  else if((idSession != dataIn[i].user_id && dataIn[i].status_comm == 1) || (userSession != 'user' && dataIn[i].status_comm == 1))
                  {
                    let leaveComment = document.getElementById('leaveComment');
                    leaveComment.removeAttribute('class');
                    div.innerHTML = `
                    <p class="text-center font-bold my-1">" ${dataIn[i].commentary} "</p>
                    <span class='text-right font-italic mb-1 mt-0'>-${dataIn[i].user}</span>
                `;
                  commentSection.appendChild(div);
                  }
              }
            }
          }
        }
      }) 
    }
  }
})


  document.getElementById('submitComment').addEventListener("click", function (e)
  { 
    if(sessionStorage.getItem("user") === "user")
    {  
    e.preventDefault();
    Swal.fire({
      title: 'Write a comment',
      html: `<input type="text" id="inputComment" class="swal2-input" placeholder="Enter a comment..">`,
      confirmButtonText: 'Submit',
      focusConfirm: false,
      returnInputValueOnDeny: true,
      inputAutoTrim: true,
      preConfirm: () => {
        const input = Swal.getPopup().querySelector('#inputComment').value
        let regExMInput = /[a-zA-Z]+/g;
        
        if (!input ) 
        {
          document.getElementById('inputComment').focus(); 
          Swal.showValidationMessage(`Please write a comment`)
          return { input: input }
        }
        if(regExMInput.test(input) == false)
        {
          document.getElementById('inputComment').focus(); 
          Swal.showValidationMessage(`The comment can contain: A-Z and/or a-z letters`);
          return { input: input }
        }

        if(input.length < 8) { 
          document.getElementById('inputComment').focus(); 
            Swal.showValidationMessage(`The comment length must be at least 8 characters`); 
            return { input: input };
        }    
      },
    }).then((result) => {
      if (result.value) {
        $.ajax({
          url: "../backEnd/listCommentsIfExist.php",
          type: "POST",
          data: {
            input: $('input[placeholder="Enter a comment.."]').val(),
            book_id: bookId,
            user_id: idSession,
          },
          success:function(response)
          {
            let result = JSON.parse(response);
            if (result.success == 2) 
            {
              isConfirmed = true;
              Swal.fire({
                title: 'You comment has been submited for aproval.',
                showClass: {
                  popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
                },
                timer: 1500,
              })
              leaveComment.innerHTML='';
              document.getElementById('leaveComment').innerHTML=`
              <p class="mb-0">Your comment has beening validated by admin. If you want to delete/see it, press the "Here" button.</p>
              <button class="btn btn-outline-danger btn-sm" onclick="location.reload()">Here</button>
              `;
            }
            else if(result.success == 3)
            {
              leaveComment.innerHTML='';
              isConfirmed = true;
              Swal.fire({
                title: 'You have alredy posted comment for this book.',
                showClass: {
                  popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
                },
                timer: 1500,
              })
            }
          }
        }) 
      } 
    })
   }
    else
    {
    Swal.fire({
          title: 'You have to log in oreder to leave a comment.',
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        
        })
    }
  });


  function deletePublicComment(id,comment_user_id) 
  {  
    $.ajax({
      url: "../backEnd/deleteSubmitedNotApprovedComm.php",
      type: "POST",
      data: {
        id: id,
        user_id: comment_user_id,
        
      },
      success:function(response)
      {
        let result = JSON.parse(response);
        if (result.success == 1) 
        {
          document.getElementById(id).innerHTML='';
          Swal.fire({
            title: 'You have deleted your comment.',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          
          })
        }
      }
    })
  }