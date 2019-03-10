import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

const {
  expect,
} = chai;

chai.use(chaiHttp);

describe('/GET Message route', () => {
  it('should get all received emails for a user', (done) => {
    chai.request(app)
      .get('/api/v1/messages')
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('data');
        expect(response.body.data[0]).to.have.property('subject');
        expect(response.body.data[0]).to.have.property('message');
        expect(response.body.data[0]).to.have.property('status').eql('read' || 'unread');
        done(error);
      });
  });

  it('should get all unread emails for a user', (done) => {
    chai.request(app)
      .get('/api/v1/messages/unread')
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('data');
        expect(response.body.data[0]).to.have.property('subject');
        expect(response.body.data[0]).to.have.property('message');
        expect(response.body.data[0]).to.have.property('status').eql('unread');
        done(error);
      });
  });

  it('should get all emails sent by a user', (done) => {
    chai.request(app)
      .get('/api/v1/messages/sent')
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('data');
        expect(response.body.data[0]).to.have.property('subject');
        expect(response.body.data[0]).to.have.property('message');
        expect(response.body.data[0]).to.have.property('status').eql('sent');
        done(error);
      });
  });

  it('should get a specific users email', (done) => {
    const message = {
      id: 1,
    };
    chai.request(app)
      .get(`/api/v1/messages/${message.id}`)
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('data');
        expect(response.body.data).to.have.property('subject');
        expect(response.body.data).to.have.property('message');
        expect(response.body.data).to.have.property('status');
        done(error);
      });
  });
});

describe('/POST Message route', () => {
  it('should throw an error if the message field is empty', (done) => {
    const message = {
      subject: 'Hello world',
      message: '',
    };
    chai.request(app)
      .post('/api/v1/messages')
      .send(message)
      .end((error, response) => {
        expect(response).to.have.status(406);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('error').eql('Message is required');
        done(error);
      });
  });

  it('should throw an error if the subject field is empty', (done) => {
    const message = {
      subject: '',
      message: 'Lorem Ipsum dolo siti ksjs can we just have a minimum length test',
    };
    chai.request(app)
      .post('/api/v1/messages')
      .send(message)
      .end((error, response) => {
        expect(response).to.have.status(406);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('error').eql('Subject is required');
        done(error);
      });
  });

  it('should create the message if the inputs are valid', (done) => {
    const message = {
      subject: 'Hello world',
      message: 'Senior dev role seems like fun',
    };
    chai.request(app)
      .post('/api/v1/messages')
      .send(message)
      .end((error, response) => {
        expect(response).to.have.status(201);
        expect(response.body).to.be.an('object');
        expect(response.body).to.be.have.property('data');
        expect(response.body.data).to.be.a('array');
        expect(response.body.data[0]).to.have.property('subject');
        expect(response.body.data[0]).to.have.property('message');
        done(error);
      });
  });
});


describe('/DELETE Message route', () => {
  it('should throw an error if the message does not exist', (done) => {
    const message = {
      id: 55,
    };
    chai.request(app)
      .delete(`/api/v1/messages/${message.id}`)
      .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('error').eql('Message with given id not found');
        done(error);
      });
  });

  it('should delete a specific message by its id', (done) => {
    const message = { id: 1 };
    chai.request(app)
      .delete(`/api/v1/messages/${message.id}`)
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('message').eql('Message with the given id has been deleted');
        done(error);
      });
  });
});
