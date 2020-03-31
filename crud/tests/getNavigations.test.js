import getNavigations from '../getNavigations';

const metaData = [
  { objectName: 'person', navigations: ['employee', 'familyMember'] },
  { objectName: 'application' },
  { objectName: 'invitation' }
];
describe('getNavigations', () => {
  it('start', () => {
    const navs = getNavigations({ metaData });

    expect(navs).toStrictEqual([
      { navigation: 'application', objectName: 'application' },
      { navigation: 'invitation', objectName: 'invitation' },
      { navigation: 'employee', objectName: 'person' },
      { navigation: 'familyMember', objectName: 'person' }
    ]);
  });
});
