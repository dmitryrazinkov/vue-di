//todo here we will have real container after integration with one of the exisitng solution
class Container {
  container = {
    dep: "1.2.3"
  };

  get(depName: "dep") {
    return this.container[depName];
  }

  set(depName: "dep", value: string) {
    this.container[depName] = value;
  }
}

const container = new Container();

if ((window as any).Cypress) {
  // we store container in window in order to allow mocking in tests
  (window as any).$container = container;
}

export default container;
