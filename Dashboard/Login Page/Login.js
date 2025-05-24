// Dealing with switching between Login and Registration.

registrationBox = document.getElementById("r-box");
loginBox = document.getElementById("l-box");
LoginLBtn = document.getElementById("login-btn");
LoginRBtn = document.getElementById("register-btn");
RegisterRBtn = document.getElementById("r-register-btn");
RegisterLBtn = document.getElementById("r-login-btn");

function switchToRegister() {
  registrationBox.classList.add("show");
  registrationBox.classList.remove("hide");
  loginBox.classList.add("hide");
  loginBox.classList.remove("show");
}

function switchToLogin() {
  registrationBox.classList.remove("show");
  registrationBox.classList.add("hide");
  loginBox.classList.remove("hide");
  loginBox.classList.add("show");
}


LoginRBtn.addEventListener("click", function (e) {
  switchToRegister(e);
  console.log("Howfar?");
});

RegisterLBtn.addEventListener("click", function (e) {
  switchToLogin(e);
});

/*
function Register() {
  email = document.getElementById("email-new").value;
  password = document.getElementById("password-new").value;
  full_name = document.getElementById("f-name").value;

  if (validate_email(email) == false || validate_password(password) == false) {
    alert("Email or Password is Incorrect");
    return;
  }

  if (validate_field(full_name) == false) {
    alert("Please Fill the Form Correctly!");
    return;
  }

  auth
    .createUserWithEmailAndPassword(email, password)
    .then(function () {
      let user = auth.currentUser;

      let database_ref = database.ref();

      let user_data = {
        email: email,
        full_name: full_name,
        password: password,
        last_Login: Date.now(),
      };

      database_ref.child("users/" + user.uid).set(user_data);

      alert("User Created!");
    })
    .catch(function (error) {
      let error_code = error.code;
      let error_message = error.message;

      alert(error_message);
    });
}

function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/.test(str);
  if (expression.test(email) == true) {
    return true;
  } else {
    return false;
  }
}

function validate_password(password) {
  if (password < 6) {
    return false;
  } else {
    return true;
  }
}

function validate_field(field) {
  if (field == null) {
    return false;
  }
  if (field.length <= 0) {
    return false;
  } else {
    return true;
  }
}


*/
