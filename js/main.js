//the sign up page

var signUpName = document.querySelector(".signUpName");
var signUpEmail = document.querySelector(".signUpEmail");
var signUpPassword = document.querySelector(".signUpPassword");

var SignUpButton = document.querySelector(".SignUpButton");

var theValidatorText=document.querySelector(".theValidatorText")

var TheData = [];

if (localStorage.getItem("theSignUpData")!=null)
{
    TheData = JSON.parse(localStorage.getItem("theSignUpData"));
}

//add the user data

function getTheData()
{
    if(validateAll())
    {
        if(checkTheRepeatedEmail()==false)
        {
            person={
                name:signUpName.value,
                email:signUpEmail.value,
                Password:signUpPassword.value
            }
            TheData.push(person);
            localStorage.setItem("theSignUpData",JSON.stringify(TheData));
            clearForm();
        }
    }
    else
    {
        SignUpButton.setAttribute("href","#")
    }
    
}

if (SignUpButton)
{
    SignUpButton.addEventListener("click",getTheData);

    document.addEventListener("keyup",function(e){
        if(e.code=="Enter")
        {
            SignUpButton.click();
        }
    });
}




//clearing the form

function clearForm()
{
    signUpName.value = "";
    signUpEmail.value = "";
    signUpPassword.value = "";
}

//check the repeated email

function checkTheRepeatedEmail()
{
    for (var i=0;i<TheData.length;i++)
    {
        if (TheData[i].email.includes(signUpEmail.value))
        {
            theValidatorText.classList.add("inValid")
            theValidatorText.innerHTML=`email already exists`
            return true;
        }
    }
    theValidatorText.classList.remove("inValid");
    theValidatorText.classList.add("valid");
    theValidatorText.innerHTML=`Sucess`;
    return false;
}

//validation
var nameRegex = /^[a-z]{3,10}$/i
var emailRegex =/^[a-zA-z0-9._%+-]+@[a-zA-z0-9.-]+\.[a-zA-z]{2,}$/
var passwordRegex =/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,32}$/

/*
(?=.*[A-Z]): Positive lookahead to ensure there is at least one uppercase letter (A-Z) in the string.
(?=.*[a-z]): Positive lookahead to ensure there is at least one lowercase letter (a-z) in the string.
(?=.*\d): Positive lookahead to ensure there is at least one digit (0-9) in the string.
(?=.*[\W_]): Positive lookahead to ensure there is at least one special character (non-alphanumeric) in the string.
[A-Za-z\d\W_]{8,}: Match any combination of uppercase letters, lowercase letters, digits, and special characters, with a minimum length of 8 characters and maximum 32.
*/

function validateAll()
{
    if (signUpName.value ==""||signUpEmail.value==""||signUpPassword=="")
    {
        theValidatorText.classList.add("inValid");
        theValidatorText.innerHTML=`All inputs is required`;
        return false;
    }

    if (nameRegex.test(signUpName.value)==false)
    {
        theValidatorText.classList.add("inValid");
        theValidatorText.innerHTML=`The name should be at least 3 characters and maximum 10 characters`;
        return false;
    }
    if(emailRegex.test(signUpEmail.value)==false)
    {
        theValidatorText.classList.add("inValid");
        theValidatorText.innerHTML=`Enter a valid email`;
        return false;
    }
    if (passwordRegex.test(signUpPassword.value)==false)
    {
        theValidatorText.classList.add("inValid");
        theValidatorText.innerHTML=`The password must contain at least one capial letter/small letter/number/special character with min length of 8 and max 32 characters`;
        return false;
    }
    SignUpButton.setAttribute("href","./index.html")
    return true;
}

// the index page

var indexEmail = document.querySelector(".indexEmail");
var indexPassword = document.querySelector(".indexPassword");
var incorrectText = document.querySelector(".incorrectText")

var loginLink = document.querySelector(".loginLink");
var welcomeText = document.querySelector(".welcomeText");
var cartona = `Welcome `;

function validateSignIn()
{
    if (indexEmail.value==""||indexPassword.value=="")
    {
        incorrectText.innerHTML='All inputs is required'
        incorrectText.classList.add("inValid");
    }
    else
    {

        for (var i=0;i<TheData.length;i++)
        {
    
            if ((indexEmail.value).toLowerCase().trim()==(TheData[i].email).toLowerCase().trim() && indexPassword.value==TheData[i].Password)
            {
                    localStorage.setItem("userName",TheData[i].name);
                    loginLink.setAttribute("href","./welcome.html");
                    return;
            }
        }
        incorrectText.innerHTML=`incorrect email or password`;
        incorrectText.classList.add("inValid");
    }

}


if (loginLink)
{
    loginLink.addEventListener("click",validateSignIn); 
    document.addEventListener("keyup",function (e)
    {
        if (e.code=="Enter")
        {
            loginLink.click();
        }       
    })
}

if(welcomeText)
{
    welcomeText.innerHTML=cartona+localStorage.getItem("userName");
}