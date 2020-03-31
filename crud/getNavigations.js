export default function getNavigations({ metaData }) {
  let navigations = metaData
    .filter(d => !d.navigations)
    .map(s => ({ navigation: s.objectName, objectName: s.objectName }));

  metaData
    .filter(d => d.navigations)
    .map(function(m) {
      m.navigations.map(function(navigation) {
        navigations.push({
          navigation,
          objectName: m.objectName
        });
      });
    });

  return navigations;
};
