import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);

const { expect } = chai;

describe('Handle requests on other endpoints', () => {
  it('should throw an error if endpoint is invalid', (done) => {
    chai.request(app)
      .get('/api/v1/xyz/abc')
      .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body).to.have.property('error').eql('Endpoint not found');
        done(error);
      });
  });

  it('should return a welcome message on the home route', (done) => {
    chai.request(app)
      .get('/')
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.have.property('message').eql('Welcome to EPIC Mail');
        done(error);
      });
  });
});
