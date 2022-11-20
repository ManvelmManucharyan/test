class User {
    name;
    email;
    phoneNumber;
    password;

    constructor(body){
        this.name = body.name;
        this.email = body.email;
        this.phoneNumber = body.phoneNumber;
        this.password = body.password;
    }
}

module.exports = User;