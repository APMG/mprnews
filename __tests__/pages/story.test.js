import Story from '../../pages/story/[...slug]';

const mockResponse = () => {
  const res = {
    status: jest.fn().mockReturnThis(),
    writeHead: jest.fn((url) => `Redirected to ${url}`),
    statusCode: jest.fn(() => 200),
    memberDriveData: 'such data'
  };
  return res;
};

// initApollo will return a function that returns a client
jest.mock('../../lib/init-apollo', () => () => {
  const storyData = {
    data: {
      story: {
        canonicalSlug: 'canonicalUrl'
      }
    }
  };

  const client = {
    query: jest.fn(() => Promise.resolve(storyData))
  };
  return client;
});

describe('Story.getInitialProps', () => {
  it('redirects when story url is non canonical', async () => {
    const req = {};
    const res = mockResponse();
    const query = {
      slug: ['Non-CanonicalUrl'],
      previewToken: 'wow!'
    };
    await Story.getInitialProps({ query, req, res });
    expect(res.writeHead).toHaveBeenCalledWith(301, {
      Location: '/preview/story/canonicalUrl?token=wow!'
    });
  });

  xit('Does not redirects when story url is canonical', async () => {
    const req = {};
    const res = mockResponse();
    const query = {
      slug: ['canonicalUrl'],
      previewToken: 'wow!'
    };
    const { data, errorCode, memberDriveData } = await Story.getInitialProps({
      query,
      req,
      res
    });

    expect(res.writeHead).not.toHaveBeenCalled();
    expect(data).toEqual({
      story: {
        canonicalSlug: 'canonicalUrl'
      }
    });
    expect(errorCode).toBeFalsy();
    expect(memberDriveData).toEqual('such data');
  });
});
