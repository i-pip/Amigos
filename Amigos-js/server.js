const express = require("express");
const passport = require("passport");
const xsenv = require("@sap/xsenv");
const JWTStrategy = require("@sap/xssec").JWTStrategy;
const bodyParser = require("body-parser");
const app = express();

const services = xsenv.getServices({
	uaa: {
		tag: "xsuaa"
	}
});

passport.use(new JWTStrategy(services.uaa));

app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.authenticate("JWT", {
	session: false
}));

app.get("/", function (req, res) {
	res.send("Application User: " + req.user.id);
});

app.get("/users", function (req, res) {
	//authInfo is attached to req body by @sap/xssec via passport and xssec.JWTSecurity
	//more details at https://help.sap.com/viewer/65de2977205c403bbc107264b8eccf4b/Cloud/en-US/4902b6e66cbd42648b5d9eaddc6a363d.html
	res.status(200).send('Hello');
});

app.post("/users", function (req, res) {
	res.status(201).json({
		name: 'John Doe'
	});
});

const port = process.env.PORT || 3000;

app.listen(port, function () {
	console.log("cauldron listening on port " + port);
});