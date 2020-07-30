import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: {
    __schema: {
      types: [
        {
          kind: 'INTERFACE',
          name: 'resourceType',
          possibleTypes: [
            { name: 'Episode' },
            { name: 'Link' },
            { name: 'Page' },
            { name: 'Profile' },
            { name: 'Story' }
          ]
        }
      ]
    }
  }
});

export default fragmentMatcher;
