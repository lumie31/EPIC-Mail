import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

const {
  expect,
} = chai;

chai.use(chaiHttp);

describe('/POST Signup route', () => {
  it('should not create a user with no firstname', (done) => {
    const user = {
      lastName: 'Doe',
      email: 'johndoe@gmail.com',
      password: '12345',
      confirmPassword: '12345',
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((error, response) => {
        expect(response).to.have.status(422);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('error').eql('Please enter your firstname');
        done(error);
      });
  });

  it('should not create a user with invalid firstname', (done) => {
    const user = {
      firstName: 'D',
      lastName: 'Doe',
      email: 'johndoe@gmail.com',
      password: '12345',
      confirmPassword: '12345',
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((error, response) => {
        expect(response).to.have.status(422);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('error').eql('First name must be between 3 and 30 characters');
        done(error);
      });
  });

  it('should not create a user with no lastname', (done) => {
    const user = {
      firstName: 'John',
      email: 'johndoe@gmail.com',
      password: '12345',
      confirmPassword: '12345',
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((error, response) => {
        expect(response).to.have.status(422);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('error').eql('Please enter your lastname');
        done(error);
      });
  });

  it('should not create a user with invalid lastname', (done) => {
    const user = {
      firstName: 'John',
      lastName: 'D',
      email: 'johndoe@gmail.com',
      password: '12345',
      confirmPassword: '12345',
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((error, response) => {
        expect(response).to.have.status(422);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('error').eql('Last name must be between 3 and 30 characters');
        done(error);
      });
  });

  it('should not create a user with no email', (done) => {
    const user = {
      firstName: 'John',
      lastName: 'Doe',
      password: '12345',
      confirmPassword: '12345',
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((error, response) => {
        expect(response).to.have.status(422);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('error').eql('Please enter your email');
        done(error);
      });
  });

  it('should not create a user with invalid email', (done) => {
    const user = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe123',
      password: '12345',
      confirmPassword: '12345',
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((error, response) => {
        expect(response).to.have.status(422);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('error').eql('Please enter a valid email');
        done(error);
      });
  });

  it('should create user with valid input details', (done) => {
    const user = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe1@gmail.com',
      password: '123456a',
      confirmPassword: '123456a',
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((error, response) => {
        expect(response).to.have.status(201);
        expect(response.body).to.be.an('object');
        expect(response.body.data).to.be.an('array');
        expect(response.body.data[0]).to.have.property('token');
        done(error);
      });
  });

  it('should not create a user with invalid password', (done) => {
    const user = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe1@gmail.com',
      password: '123',
      confirmPassword: '123',
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((error, response) => {
        expect(response).to.have.status(422);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('error').eql('Password must be a minimum of 6 alphanumeric characters');
        done(error);
      });
  });

  it('should not create a user with no password', (done) => {
    const user = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe1@gmail.com',
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((error, response) => {
        expect(response).to.have.status(422);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('error').eql('Please enter your password');
        done(error);
      });
  });

  it('should throw an error if passwords do not match', (done) => {
    const user = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe1@gmail.com',
      password: '12345',
      confirmPassword: '123',
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('error').eql('Passwords do not match');
        done(error);
      });
  });
});

describe('/POST Login route', () => {
  it('should throw an error if email field is empty', (done) => {
    const loginDetails = {
      email: '',
      password: '12345',
    };
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(loginDetails)
      .end((error, response) => {
        expect(response).to.have.status(422);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('error').eql('Email is required');
        done(error);
      });
  });

  it('should not login a user with invalid email', (done) => {
    const loginDetails = {
      email: 'mike',
      password: '12345',
    };
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(loginDetails)
      .end((error, response) => {
        expect(response).to.have.status(422);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('error').eql('Please enter a valid email');
        done(error);
      });
  });

  it('should throw an error if password field is empty', (done) => {
    const loginDetails = {
      email: 'johndoe@gmail.com',
      password: '',
    };
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(loginDetails)
      .end((error, response) => {
        expect(response).to.have.status(422);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('error').eql('Password is required');
        done(error);
      });
  });

  it('should login a user with valid email', (done) => {
    const loginDetails = {
      email: 'maryjane@gmail.com',
      password: '12345',
    };
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(loginDetails)
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('data');
        expect(response.body.data[0]).to.have.property('token');
        done(error);
      });
  });

  it('should throw an error if user does not exist', (done) => {
    const loginDetails = {
      email: 'xyz@mail.com',
      password: '12345',
    };
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(loginDetails)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('error');
        expect(response.body).to.have.property('error').eql('Email or Password is Incorrect');
        done(error);
      });
  });
});
