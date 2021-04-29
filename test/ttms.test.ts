import { t } from '../src';

describe('ttms', () => {
  it('converts 1 hour 30 minutes to milliseconds', () => {
    expect(t('1 hour and 30 min')).toEqual(5400000);
  });
  it('converts days', () => {
    expect(t('2 days')).toEqual(172800000);
  });
  it('converts weeks', () => {
    expect(t('1 week')).toEqual(604800000);
  });
  it('handles mixed spacing', () => {
    expect(t('1hour, 30minutes and 1 second')).toEqual(5401000);
  });
});
