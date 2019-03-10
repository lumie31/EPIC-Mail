import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import { users, loginDetails } from './testData';

const {
  expect,
} = chai;

chai.use(chaiHttp);

describe('/POST Signup route', () => {
  it('should not create a user with no firstname', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(users[0])
      .end((error, response) => {
        expect(response).to.have.status(422);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('error').eql('Please enter your firstname');
        done(error);
      });
  });

  it('should not create a user with invalid firstname', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(users[1])
      .end((error, response) => {
        expect(response).to.have.status(422);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('error').eql('First name must be between 3 and 30 characters');
        done(error);
      });
  });

  it('should not create a user with no lastname', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(users[2])
      .end((error, response) => {
        expect(response).to.have.status(422);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('error').eql('Please enter your lastname');
        done(error);
      });
  });

  it('should not create a user with invalid lastname', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(users[3])
      .end((error, response) => {
        expect(response).to.have.status(422);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('error').eql('Last name must be between 3 and 30 characters');
        done(error);
      });
  });

  it('should not create a user with no email', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(users[4])
      .end((error, response) => {
        expect(response).to.have.status(422);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('error').eql('Please enter your email');
        done(error);
      });
  });

  it('should not create a user with invalid email', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(users[5])
      .end((error, response) => {
        expect(response).to.have.status(422);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('error').eql('Please enter a valid email');
        done(error);
      });
  });

  it('should create user with valid input details', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(users[6])
      .end((error, response) => {
        expect(response).to.have.status(201);
        expect(response.body).to.be.an('object');
        expect(response.body.data).to.be.an('array');
        expect(response.body.data[0]).to.have.property('token');
        done(error);
      });
  });

  it('should not create a user with invalid password', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(users[7])
      .end((error, response) => {
        expect(response).to.have.status(422);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('error').eql('Password must be a minimum of 6 alphanumeric characters');
        done(error);
      });
  });

  it('should not create a user with no password', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(users[8])
      .end((error, response) => {
        expect(response).to.have.status(422);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('error').eql('Please enter your password');
        done(error);
      });
  });

  it('should throw an error if passwords do not match', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(users[9])
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('error').eql('Passwords do not match');
        done(error);
      });
  });


  it('should throw an error if user already exists', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(users[6])
      .end((error, response) => {
        expect(response).to.have.status(409);
        expect(response.body).to.have.property('error').eql('User already exists');
        done(error);
      });
  });
});

describe('/POST Login route', () => {
  it('should throw an error if email field is empty', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(loginDetails[0])
      .end((error, response) => {
        expect(response).to.have.status(422);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('error').eql('Email is required');
        done(error);
      });
  });

  it('should not login a user with invalid email', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(loginDetails[1])
      .end((error, response) => {
        expect(response).to.have.status(422);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('error').eql('Please enter a valid email');
        done(error);
      });
  });

  it('should throw an error if password field is empty', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(loginDetails[2])
      .end((error, response) => {
        expect(response).to.have.status(422);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('error').eql('Password is required');
        done(error);
      });
  });

  it('should login a user with valid email', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(loginDetails[3])
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('data');
        expect(response.body.data[0]).to.have.property('token');
        done(error);
      });
  });

  it('should throw an error if user does not exist', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(loginDetails[4])
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('error');
        expect(response.body).to.have.property('error').eql('Email or Password is Incorrect');
        done(error);
      });
  });
});
