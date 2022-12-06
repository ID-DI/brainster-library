
  $.ajax({
      url: "../backEnd/listPersonalComment.php",
      type: "POST",
      data: {
        id: idSession,
        idBook: bookId,
      },
      success:function(response)
      {
        let result = JSON.parse(response);
        let data = result.personalComment;

        if(Array.isArray(data) == true)
        {
          for(i=0;i<data.length;i++)
          {
            let perosnalCommDiv = document.getElementById('perosnalCommDiv');
            let div = document.createElement('div');
            
            div.setAttribute('id','commentPersonalPrintDiv')
            div.classList.add('d-flex','flex-column','border','rounded','my-2','mx-2','p-1');

              div.innerHTML = `
              <p id="${data[i].commentary}" class="text-center text-white font-bold my-1">"${data[i].commentary}"</p>
              <div id = "${data[i].id}" class="d-flex flex-row justify-content-end">
                <span id = "${data[i].id}" class="mx-1" data-toggle="tooltip" onclick="editPersonalComment(${data[i].id},'${data[i].user_id}','${data[i].commentary}')" data-placement="bottom" title="Edit comment"><i class="fa-solid fa-gears fa-lg text-warning"></i>
                </span>
                <span id = "${data[i].id}" class="mx-1" onclick="deletePersonalComment(${data[i].id},'${data[i].user_id},${data[i].commentary}')" data-toggle="tooltip" data-placement="bottom" title="Delete comment"><i class="fa-solid fa-recycle fa-lg text-danger"></i>
                </span>
              </div>
              `;
              perosnalCommDiv.appendChild(div);
          }
        }
        else
        {
          let perosnalCommDiv = document.getElementById('perosnalCommDiv');
          let div = document.createElement('div');
          div.setAttribute('id','commentPersonalPrintDiv')
          div.classList.add('d-flex','flex-column','border','rounded','my-2','mx-2','p-1');

          div.innerHTML = `
          <p id="${data.commentary}" class="text-center text-white font-bold my-1">"${data.commentary}"</p>
          <div id = "${data.id}" class="d-flex flex-row justify-content-end">
            <span id = "${data.id}" class="mx-1" data-toggle="tooltip" onclick="editPersonalComment(${data.id},'${data.user_id}','${data.commentary}')" data-placement="bottom" title="Edit comment"><i class="fa-solid fa-gears fa-lg text-warning"></i>
            </span>
            <span id = "${data.id}" class="mx-1" onclick="deletePersonalComment(${data.id},'${data.user_id},${data.commentary}')" data-toggle="tooltip" data-placement="bottom" title="Delete comment"><i class="fa-solid fa-recycle fa-lg text-danger"></i>
            </span>
          </div>
          `;
          perosnalCommDiv.appendChild(div);;
        } 
      }
    })

    document.getElementById('submitNewPersonalComment').addEventListener("click", function (e)
    {   
      if(sessionStorage.getItem("user") === "user"){ 
      e.preventDefault();
      Swal.fire({
        title: 'Personal comment',
        html: `<input type="text" id="inputComment" class="swal2-input" placeholder="Enter a personal comment..">`,
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
            url: "../backEnd/createNewPersonalComment.php",
            type: "POST",
            data: {
              input: $('input[placeholder="Enter a personal comment.."]').val(),
              book_id: bookId,
              user_id: idSession,
            },
            success:function(response)
            {
              let result = JSON.parse(response);
              if (result.success == 1) 
              {
                document.getElementById('commentSection').innerHTML='';

                let data = result.personalComment;
                let perosnalCommDiv = document.getElementById('perosnalCommDiv');
                let div = document.createElement('div');
                div.setAttribute('id','commentPersonalPrintDiv')
                div.classList.add('d-flex','flex-column','border','rounded','my-2','mx-2','p-1');
      
                div.innerHTML = `
                <p id="${data.commentary}" class="text-center text-white font-bold my-1">"${data.commentary}"</p>
                <div id = "${data.id}" class="d-flex flex-row justify-content-end">
                  <span id = "${data.id}" class="mx-1" data-toggle="tooltip" onclick="editPersonalComment(${data.id},'${data.user_id}','${data.commentary}')" data-placement="bottom" title="Edit comment"><i class="fa-solid fa-gears fa-lg text-warning"></i>
                  </span>
                  <span id = "${data.id}" class="mx-1" onclick="deletePersonalComment(${data.id},'${data.user_id},${data.commentary}')" data-toggle="tooltip" data-placement="bottom" title="Delete comment"><i class="fa-solid fa-recycle fa-lg text-danger"></i>
                  </span>
                </div>
                `;
                perosnalCommDiv.appendChild(div);
              }
              else if(result.success == 0)
              {
                leaveComment.innerHTML='';
                isConfirmed = true;
                Swal.fire({
                  title: 'Somethnig went wrong, try again.',
                  showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                  },
                  hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                  },
                  timer: 1500,
                })
              }
              else if(result.success == 2)
              {
                leaveComment.innerHTML='';
                isConfirmed = true;
                Swal.fire({
                  title: 'You cannot post empty comment.',
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
      });
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
    function editPersonalComment(comment_id,user_id,commentary_id) 
  {  
      Swal.fire({
        title: 'Personal comment',
        html: `<input type="text" id="inputComment" class="swal2-input" value="${commentary_id}" placeholder="Enter a personal comment..">`,
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
            url: "../backEnd/editPersonalComment.php",
            type: "POST",
            data: {
              input: $('input[placeholder="Enter a personal comment.."]').val(),
              id: comment_id,
              user_id: user_id,
            },
            success:function(response)
            {
              let result = JSON.parse(response);
              if (result.success == 1) 
              {

                let data = result.p_comment;
                let perosnalCommDiv = document.getElementById('perosnalCommDiv');
                let commentPersonalPrintDiv = document.getElementById('commentPersonalPrintDiv');
                commentPersonalPrintDiv.innerHTML=`
                <p id = "${data.commentary}" class="text-center text-white font-bold my-1"></p>`;
                perosnalCommDiv.appendChild(commentPersonalPrintDiv);
                
                commentPersonalPrintDiv.innerHTML = `
                <p id = "${data.commentary}" class="text-center text-white font-bold my-1">"${data.commentary}"</p>
                <div id = "${data.id}" class="d-flex flex-row justify-content-end">
                  <span id = "${data.id}" class="mx-1" data-toggle="tooltip" onclick="editPersonalComment(${data.id},'${data.user_id}','${data.commentary}')" data-placement="bottom" title="Edit comment"><i class="fa-solid fa-gears fa-lg text-warning"></i></span>
                  <span id = "${data.id}" class="mx-1" onclick="deletePersonalComment(${data.id},'${data.user_id},${data.commentary}')" data-toggle="tooltip" data-placement="bottom" title="Delete comment"><i class="fa-solid fa-recycle fa-lg text-danger"></i></span>
                </div>
                `;
                perosnalCommDiv.appendChild(commentPersonalPrintDiv);
              }
              else if(result.success == 0)
              {
                leaveComment.innerHTML='';
                isConfirmed = true;
                Swal.fire({
                  title: 'Somethnig went wrong, try again.',
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
      }); 
  }
  function deletePersonalComment(id,user_id,commentary) 
  {  
    let perosnalCommDiv = document.getElementById('perosnalCommDiv');
    let commentPersonalPrintDiv = document.getElementById('commentPersonalPrintDiv');
    $.ajax({
      url: "../backEnd/deletePersonalComment.php",
      type: "POST",
      data: {
        id: id,
        user_id: user_id
      },
      success:function(response)
      {
        let result = JSON.parse(response);
        if (result.success == 1) 
        {
          commentPersonalPrintDiv.innerHTML='';
          document.getElementById(id).innerHTML='';
          document.getElementById(commentary).innerHTML='';
          document.getElementById('commentPersonalPrintDiv').classList.remove('border');
          perosnalCommDiv.appendChild(commentPersonalPrintDiv);

          // location.reload();
        }
      }
    })
  }

function innerHTML()
{
  commentPersonalPrintDiv.innerHTML = `
                <p id = "${data.commentary}" class="text-center text-white font-bold my-1">"${data.commentary}"</p>
                <div id = "${data.id}" class="d-flex flex-row justify-content-end">
                  <span id = "${data.id}" class="mx-1" data-toggle="tooltip" onclick="editPersonalComment(${data.id},'${data.user_id}','${data.commentary}')" data-placement="bottom" title="Edit comment"><i class="fa-solid fa-gears fa-lg text-warning"></i></span>
                  <span id = "${data.id}" class="mx-1" onclick="deletePersonalComment(${data.id},'${data.user_id},${data.commentary}')" data-toggle="tooltip" data-placement="bottom" title="Delete comment"><i class="fa-solid fa-recycle fa-lg text-danger"></i></span>
                </div>
                `;
}