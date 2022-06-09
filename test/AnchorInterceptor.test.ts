import { AnchorInterceptor } from '../src/AnchorInterceptor';

const a = new AnchorInterceptor(
  '',
  [
    'smoothScrollThis',
    'js-smooth-scroll',
  ]
);

test(
  'constructor',
  () => {

    expect(a).toBeInstanceOf(AnchorInterceptor);

  }
);

test(
  'filter urls',
  () => {

    expect(a.getStripURL('https://secure.myvirtualbranch.com/CornerstoneBank/signin.aspx'))
      .toBe('https://secure.myvirtualbranch.com/CornerstoneBank/signin.aspx')

    expect(a.getStripURL('https://secure.myvirtualbranch.com/'))
      .toBe('https://secure.myvirtualbranch.com/')

    expect(a.getStripURL('https://secure.myvirtualbranch.com/#/'))
      .toBe('https://secure.myvirtualbranch.com/')

  }
);