//SIGN IN
document.getElementById('signIn').addEventListener("click", function (e)
{
  e.preventDefault();
  Swal.fire({
    title: 'Login Form',
    html: `<input type="text" id="email" class="swal2-input" placeholder="John.doe@example.com">
    <input type="password" id="password" class="swal2-input" placeholder="Password">`,
    confirmButtonText: 'Sign in',
    focusConfirm: false,
    returnInputValueOnDeny: true,
    inputAutoTrim: true,
    preConfirm: () => {
      const login = Swal.getPopup().querySelector('#email').value
      const password = Swal.getPopup().querySelector('#password').value
      let regEx = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      let regExMail = /^[A-Za-z0-9+_.-]+@(.+)$/;
      
      if (!login ) 
      {
        document.getElementById('email').focus(); 
        Swal.showValidationMessage(`Please enter email`)
        return { login: login, password: password }
      }
      if(regExMail.test(login) == false)
      {
        document.getElementById('email').focus(); 
        Swal.showValidationMessage(`Email must contain: A-Z and/or a-z and 0-9 numbers and characters email may contain only dot(.), dash(-) and underscore(_)`);
        return { login: login, password: password }
      }
      if (!password) 
      {
        document.getElementById('password').focus(); 
        Swal.showValidationMessage(`Please enter password`)
        return { login: login, password: password }
      }
       
      if(password.length < 8) { 
        document.getElementById('password').focus(); 
          Swal.showValidationMessage(`Password length must be atleast 8 characters`); 
          return { login: login, password: password };
      }  
       
      if(password.length > 20) 
      {  
        document.getElementById('password').focus(); 
          Swal.showValidationMessage(`Password length must not exceed 20 characters`);  
          return { login: login, password: password };
      }  
  
      if(regEx.test(password) == false)
      {
        document.getElementById('password').focus(); 
        Swal.showValidationMessage(`Password must contain min 8 letter password, with at least one symbol, upper and lower case letters and a number`);
        return { login: login, password: password }
      }
    },
  }).then((result) => {
    if (result.value) {
      $.ajax({
        url: "../backEnd/signIn.php",
        type: "POST",
        data: {
          email: $('input[placeholder="John.doe@example.com"]').val(),
          pass: $('input[placeholder="Password"]').val(),
        },
        success:function(response)
        {
          let result = JSON.parse(response);
          if (result.success == 1) 
          {
            let obj = [result.id];
            let id = obj[0].id;
            isConfirmed = true;
            Swal.fire({
              title: 'Welcome "'+$('input[placeholder="John.doe@example.com"]').val()+'".',
              showClass: {
                popup: 'animate__animated animate__fadeInDown'
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
              },
              timer: 1500,
            })
              setTimeout(function(){
                sessionStorage.setItem('id',id);
                sessionStorage.setItem('admin','admin');
          
                navbarLogged()
                setTimeout(location.replace('./adminPanelAuthor.php'))
              }, 1525)
          }
          else if(result.success == 0)
          {
            let obj = [result.id];
            let id = obj[0].id;
            isConfirmed = true;
            Swal.fire({
              title: 'Welcome "'+$('input[placeholder="John.doe@example.com"]').val()+'".',
              showClass: {
                popup: 'animate__animated animate__fadeInDown'
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
              },
              timer: 1500,
            })
            setTimeout(function(){
              sessionStorage.setItem('id',id)
              sessionStorage.setItem('user','user')
        
              navbarLogged()
              setTimeout(location.replace('./index.php'))
            }, 1525)
          }
        }
       }) 
    } 
  });
});


//SIGN UP
document.getElementById('signUp').addEventListener("click", function (e)
{
  e.preventDefault();
  Swal.fire({
    title: 'Registration Form',
    html: `<input type="text" id="email" class="swal2-input" placeholder="John.doe@example.com">
    <input type="password" id="password" class="swal2-input" placeholder="Password">`,
    confirmButtonText: 'Sign in',
    focusConfirm: false,
    returnInputValueOnDeny: true,
    inputAutoTrim: true,
    preConfirm: () => {
      const login = Swal.getPopup().querySelector('#email').value
      const password = Swal.getPopup().querySelector('#password').value
      let regEx = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      let regExMail = /^[A-Za-z0-9+_.-]+@(.+)$/;
      
      if (!login ) 
      {
        document.getElementById('email').focus(); 
        Swal.showValidationMessage(`Please enter email`)
        return { login: login, password: password }
      }
      if(regExMail.test(login) == false)
      {
        document.getElementById('email').focus(); 
        Swal.showValidationMessage(`Email must contain: A-Z and/or a-z and 0-9 numbers and characters email may contain only dot(.), dash(-) and underscore(_)`);
        return { login: login, password: password }
      }
      if (!password) 
      {
        document.getElementById('password').focus(); 
        Swal.showValidationMessage(`Please enter password`)
        return { login: login, password: password }
      }
       
      if(password.length < 8) { 
        document.getElementById('password').focus(); 
          Swal.showValidationMessage(`Password length must be atleast 8 characters`); 
          return { login: login, password: password };
      }  
       
      if(password.length > 20) 
      {  
        document.getElementById('password').focus(); 
          Swal.showValidationMessage(`Password length must not exceed 20 characters`);  
          return { login: login, password: password };
      }  
  
      if(regEx.test(password) == false)
      {
        document.getElementById('password').focus(); 
        Swal.showValidationMessage(`Password must contain min 8 letter password, with at least one symbol, upper and lower case letters and a number`);
        return { login: login, password: password }
      }
    },

  }).then((result) => {
    if (result.value) {
      $.ajax({
        url: "../backEnd/signUpAuth.php",
        type: "POST",
        data: {
          role:0,
          email: $('input[placeholder="John.doe@example.com"]').val(),
          pass: $('input[placeholder="Password"]').val(),
        },
        success:function(response)
        {
          let result = JSON.parse(response);
          if (result.success == 1) 
          {
            isConfirmed = true;
            Swal.fire({
              title: 'Welcome, hope you will enjoy. Please log in.',
              showClass: {
                popup: 'animate__animated animate__fadeInDown'
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
              },
              timer: 2500,
            })
            setTimeout(function(){
              setTimeout(location.replace('./index.php'))
            }, 1525)
          }
          else if(result.success == 0)
          {
            isConfirmed = true;
            Swal.fire({
              title: 'Something went wrong "'+$('input[placeholder="John.doe@example.com"]').val()+'". Try again.',
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
});