// Check:
// - DO NOT include a version segment in the base_url or path

module.exports = targetVal => {
  if (targetVal === null || typeof targetVal !== 'object') {
    return;
  }

  const oas2 = targetVal['swagger'];

  if (oas2) {
    const basePath = targetVal['basePath'] || '';
    const version = getVersion(basePath);
    if (version) {
      return [
        {
          message: `Version segment "${version}" in basePath violates Azure versioning policy`,
          path: ['basePath']
        }
      ];
    }
  }

  // We did not find a major version in basePath, so now check the paths

  const paths = targetVal['paths'];
  if (paths && typeof paths === 'object') {
    const errors = [];
    for (const path of Object.keys(paths)) {
      const version = getVersion(path);
      console.log(path);
      if (version) {
        errors.push({
          message: `Version segment "${version}" in path violates Azure versioning policy`,
          path: ['paths', path ]
        });
      }
    }
    return errors;
  }
};

// Return the first segment of a path that matches the pattern 'v\d+' or 'v\d+.\d+
function getVersion(path) {
  const url = new URL(path, 'https://foo.bar');
  const segments = url.pathname.split('/');
  return segments.find(segment => segment.match(/v[0-9]+(.[0-9]+)?/));
}
