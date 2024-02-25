import { Get, JsonController } from 'routing-controllers';

@JsonController('/')
class Controller {
  @Get()
  async get() {
    return { message: 'Hello world!' };
  }
}

export default Controller;
