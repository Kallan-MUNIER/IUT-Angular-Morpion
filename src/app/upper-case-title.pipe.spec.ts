import { UpperCaseTitlePipe } from './upper-case-title.pipe';

describe('UpperCaseTitlePipe', () => {
  it('create an instance', () => {
    const pipe = new UpperCaseTitlePipe();
    expect(pipe).toBeTruthy();
  });
});
