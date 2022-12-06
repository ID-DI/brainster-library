
function createButtons(id, list, color, phrase, user) {
  let parentList = document.getElementById(list);
  const btnPending = document.createElement("button");
  btnPending.classList.add(
    "btn",
    "btn-outline-" + color + "",
    "btn-sm",
    "mb-2",
    "justify-content-center"
  );
  btnPending.setAttribute("id", id);
  btnPending.innerHTML;
  btnPending.innerHTML = phrase + ` -> user: ${user}` ;
  parentList.appendChild(btnPending);
}
function deleteButtons(list, idBtn) {
      let parentList = document.getElementById(list);
      let btn = document.getElementById(idBtn);
      btn.classList.add("d-none");
      parentList.appendChild(btn);
    }
let Arr = [];
fetch("../backEnd/listPublicComments.php")
  .then((result) => result.json())
  .then(function (data) {
    for (i = 0; i < data.length; i++) {
      if (data[i].status_comm === 0 && data[i].soft_delete === 0) {
        //PENDING
        //--------------var--------------//
        let commentaryInner = data[i].commentary;
        let idInner = data[i].id;
        let titleInner = data[i].title;
        let userInner = data[i].user;

        //PENDING RESOLVMENT
        createButtons(idInner, "pendingOl", "primary", "Pending", userInner);
        document
          .getElementById(data[i].id)
          .addEventListener("click", function (e) {
            e.preventDefault();
            Swal.fire({
              title: "Book titile: " + titleInner,
              text: commentaryInner,
              icon: "warning",
              footer: "User: " + userInner,
              showCancelButton: true,
              confirmButtonColor: "#33dd44",
              cancelButtonColor: "#d33",
              confirmButtonText: "Approve it.",
              cancelButtonText: "Delete it!",
            }).then((result) => {
              if (result.value) {
                $.ajax({
                  url: "../backEnd/editComments.php",
                  type: "POST",
                  data: {
                    id: idInner,
                    status_comm: 1,
                    soft_delete: 0,
                  },
                }).done(function (msg) {
                  let response = JSON.parse(msg);
                  if (response.success == 1) {
                    isConfirmed = true;
                    Swal.fire({
                      position: "top-end",
                      icon: "success",
                      title: "Approved!",
                      text:
                        'The comment from user: "' +
                        userInner +
                        '" has been approved.',
                      timer: 1500,
                    });
                    let x = [response.p_comment];
                    deleteButtons("pendingOl", idInner);
                    setTimeout(function(){window.location.reload(1);}, 1515);
                    for(i=0;i<=x.length;i++)
                    {
                        createButtons(x[i].id, "approvedOl", "success", "Aprroved",x[i].user);
                    }
                  } else {
                    Swal.fire({
                      position: "top-end",
                      icon: "error",
                      title: "Oops...",
                      text: "Something went wrong!",
                      timer: 1500,
                    });
                  }
                });
              } else if (result.dismiss == "cancel") {
                $.ajax({
                  url: "../backEnd/editComments.php",
                  type: "POST",
                  data: {
                    id: idInner,
                    status_comm: 0,
                    soft_delete: 1,
                  },
                }).done(function (msg) {
                  let response = JSON.parse(msg);
                  if (response.success == 1) {
                    Swal.fire({
                      position: "top-end",
                      icon: "success",
                      title: "Swell",
                      text:
                        'The comment from user: "' +
                        userInner +
                        '" has been deleted.',
                      timer: 1500,
                    });
                    
                    let x = [response.p_comment];
                    deleteButtons("pendingOl", idInner);
                    setTimeout(function(){window.location.reload(1);}, 1515);
                    for(i=0;i<=x.length;i++)
                    {
                        createButtons(x[i].id, "deletedOl", "danger", "Deleted", x[i].user);
                    }
                  } else {
                    Swal.fire({
                      position: "top-end",
                      icon: "error",
                      title: "Oops...",
                      text: "Something went wrong!",
                      timer: 1200,
                    });
                  }
                });
              }
            });
          });

          //APPROVED
      } else if (data[i].status_comm === 1 && data[i].soft_delete === 0) {
        //--------------var--------------//
        let commentaryInner = data[i].commentary;
        let idInner = data[i].id;
        let titleInner = data[i].title;
        let userInner = data[i].user;

        createButtons(idInner, "approvedOl", "success", "Aprroved",userInner);

        document
          .getElementById(data[i].id)
          .addEventListener("click", function (e) {
            e.preventDefault();
            Swal.fire({
              title: "Book titile: " + titleInner,
              text: commentaryInner,
              icon: "warning",
              footer: "User: " + userInner,
              showCancelButton: true,
              confirmButtonColor: "#33dd44",
              cancelButtonColor: "#d33",
              confirmButtonText: "It is OK.",
              cancelButtonText: "Delete it!",
            }).then((result) => {
              if (result.value) {
                Swal.fire({
                  title:
                    "The comment by user " + userInner + " remains approved.",
                  showClass: {
                    popup: "animate__animated animate__fadeInDown",
                  },
                  hideClass: {
                    popup: "animate__animated animate__fadeOutUp",
                  },
                });
              } else if (result.dismiss == "cancel") {
                $.ajax({
                  url: "../backEnd/editComments.php",
                  type: "POST",
                  data: {
                    id: idInner,
                    status_comm: 1,
                    soft_delete: 1,
                  },
                }).done(function (msg) {
                  let response = JSON.parse(msg);
                  console.log(response, "response");
                  if (response.success == 1) {
                    Swal.fire({
                      position: "top-end",
                      icon: "success",
                      title: "Swell",
                      text:
                        'The comment from user: "' +
                        userInner +
                        '" has been deleted.',
                      timer: 1500,
                    });
                    let x = [response.p_comment];
                    deleteButtons("approvedOl", idInner);
                    setTimeout(function(){window.location.reload(1);}, 1515);
                    for(i=0;i<=x.length;i++)
                    {
                        createButtons(x[i].id, "deletedOl", "danger", "Deleted", x[i].user);
                    }
                  } else {
                    Swal.fire({
                      position: "top-end",
                      icon: "error",
                      title: "Oops...",
                      text: "Something went wrong!",
                      timer: 1200,
                    });
                  }
                });
              }
            });
          });
      } else if (data[i].soft_delete === 1) {
        //DELETED
        //--------------var--------------//
        let commentaryInner = data[i].commentary;
        let idInner = data[i].id;
        let titleInner = data[i].title;
        let userInner = data[i].user;

        createButtons(idInner, "deletedOl", "danger", "Deleted",userInner);

        document
          .getElementById(data[i].id)
          .addEventListener("click", function (e) {
            e.preventDefault();
            Swal.fire({
              title: "Book titile: " + titleInner,
              text: commentaryInner,
              icon: "warning",
              footer: "User: " + userInner,
              showCancelButton: true,
              confirmButtonColor: "#33dd44",
              cancelButtonColor: "#d33",
              confirmButtonText: "Approved it.",
              cancelButtonText: "Leave it!",
            }).then((result) => {
              if (result.value) {
                $.ajax({
                  url: "../backEnd/editComments.php",
                  type: "POST",
                  data: {
                    id: idInner,
                    status_comm: 1,
                    soft_delete: 0,
                  },
                }).done(function (msg) {
                  let response = JSON.parse(msg);
                  if (response.success == 1) {
                    isConfirmed = true;
                    Swal.fire({
                      position: "top-end",
                      icon: "success",
                      title: "Approved!",
                      text:
                        'The comment from user: "' +
                        userInner +
                        '" has been approved.',
                      timer: 1500,
                    });
                    let x = [response.p_comment];
                    deleteButtons("deletedOl", idInner);
                    setTimeout(function(){window.location.reload(1);}, 1515);
                    for(i=0;i<=x.length;i++)
                    {
                        createButtons(x[i].id, "approvedOl", "success", "Aprroved", x[i].user);
                    }
                  } else {
                    Swal.fire({
                      position: "top-end",
                      icon: "error",
                      title: "Oops...",
                      text: "Something went wrong!",
                      timer: 1200,
                    });
                  }
                });
              } else if (result.dismiss == "cancel") {
                Swal.fire({
                    title:
                      "The comment by user " + userInner + " remains deleted.",
                    showClass: {
                      popup: "animate__animated animate__fadeInDown",
                    },
                    hideClass: {
                      popup: "animate__animated animate__fadeOutUp",
                    },
                });
              }
            });
          });
      }
    }
    return data;
  });
