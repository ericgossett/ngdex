import { NgdexPage } from './app.po';

describe('ngdex App', () => {
  let page: NgdexPage;

  beforeEach(() => {
    page = new NgdexPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
