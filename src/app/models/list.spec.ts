import { List } from './list';

describe('List', () => {
  it('should create an instance', () => {
    expect(new List('test', 'uid')).toBeTruthy();
  });
});
