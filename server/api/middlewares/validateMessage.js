import Validator from 'validatorjs';

export default class validateMessages {
  static validateMessage(request, response, next) {
    const { receiverEmail, subject, message } = request.body;

    const rules = {
      receiverEmail: 'required|email',
      subject: 'required',
      message: 'required',
    };

    const validation = new Validator(request.body, rules);

    if (validation.fails()) {
      return response.status(400).json({
        status: 400,
        error: validation.errors.errors,
      });
    }

    request.body.receiverEmail = receiverEmail;
    request.body.subject = subject;
    request.body.message = message;
    return next();
  }

  static validateParams(request, response, next) {
    const { messageid } = request.params;

    const rules = {
      messageid: 'required|numeric',
    };

    const validation = new Validator(request.params, rules);
    if (validation.fails()) {
      return response.status(400).json({
        status: 400,
        error: 'Message id must be a number',
      });
    }

    request.params.messageid = messageid;
    return next();
  }
}
