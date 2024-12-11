const express = require("express")
const app = express()

app.set("view engine", "ejs")
app.use(express.urlencoded({extended: false}))
app.use(express.static("public"))

app.use(function (req, res, next) {
    res.locals.errors = []
    next()
})

app.get("/", (req,res) => {
    res.render("homepage")
})

app.get("/loging", (req, res) => {
    res.render("loging")
})

app.post("/register", (req, res) => {

    const errors = []

    if (typeof req.body.username !== "string") req.body.username = ""
    if (typeof req.body.password !== "string") req.body.password = ""
    
    req.body.username = req.body.username.trim()

    //set user name rules
    // errors is a variavle that error mesages
    if(!req.body.username) errors.push("You must provide a username") //Show user name is complsary
    if(req.body.username && req.body.username.length < 3) errors.push("Username must be more than 3 characters") //Set user name shoud contain more that 3 characters
    if(req.body.username && req.body.username.length > 10) errors.push("Username cannot exceed 10 characters") //Set user name should less than 10 characters
    if(req.body.username && !req.body.username.match(/^[a-zA-Z0-9]+$/)) errors.push("User name can only contain only letters and numbers") //Set the user name characters types. only can be as a caracter a to z and A to Z and 0 to 9 charavters

    if (errors.length) {
        return res.render("homepage", {errors}) //If there is any upper rule is violated, retun to home page and show errors variable values that difined in upper.
    } 
    else {
            //console.log(req.body)
    res.send("Thank You for filling out the form!!")

    }

})

app.listen(3000)