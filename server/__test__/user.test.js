import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

const {
  expect,
} = chai;

chai.use(chaiHttp);

describe('Testing the User Signup Controller', () => {
  it('should not create a user with no firstname', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        lastName: 'Doe',
        email: 'johndoe@gmail.com',
        password: '12345',
        confirmPassword: '12345',
      })
      .end((error, response) => {
        expect(response).to.have.status(422);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('error').eql('Please enter your firstname');
        done();
      });
  });

  it('should not create a user with no lastname', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'John',
        email: 'johndoe@gmail.com',
        password: '12345',
        confirmPassword: '12345',
      })
      .end((error, response) => {
        expect(response).to.status(422);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('error').eql('Please enter your lastname');
        done();
      });
  });

  it('should not create a user with no email', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        password: '12345',
        confirmPassword: '12345',
      })
      .end((error, response) => {
        expect(response).to.status(422);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('error').eql('Please enter your email');
        done();
      });
  });

  it('should not create a user with invalid email', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe123',
        password: '12345',
        confirmPassword: '12345',
      })
      .end((error, response) => {
        expect(response).to.status(422);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('error').eql('Please enter a valid email');
        done();
      });
  });

  it('should create user with valid input details', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe1@gmail.com',
        password: '123456a',
        confirmPassword: '123456a',
      })
      .end((error, response) => {
        expect(response).to.status(201);
        expect(response.body).to.be.an('object');
        expect(response.body.data).to.be.an('array');
        done();
      });
  });

  it('should not create a user with invalid password', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe1@gmail.com',
        password: '123',
        confirmPassword: '123',
      })
      .end((error, response) => {
        expect(response).to.status(422);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('error').eql('Password must be a minimum of 6 alphanumeric characters');
        done();
      });
  });
});
