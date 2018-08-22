import { KindnessProdPage } from './app.po';

describe('kindness-prod App', function() {
  let page: KindnessProdPage;

  beforeEach(() => {
    page = new KindnessProdPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
