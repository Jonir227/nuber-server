import { GetMyProfileResponse } from '../../../types/graph';
import { Resolvers } from '../../../types/resolver';
import privateResolver from '../../../utils/privateResolver';

const resolvers: Resolvers = {
  Query: {
    GetMyProfile: privateResolver(
      async (parent, args, { req }): Promise<GetMyProfileResponse> => {
        const { user } = req;
        return {
          ok: true,
          error: null,
          user,
        };
      },
    ),
  },
};

export default resolvers;
