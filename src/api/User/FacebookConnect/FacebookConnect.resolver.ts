import User from '../../../entities/User';
import {
  FacebookConnectMutationArgs,
  FacebookConnectResponse
} from '../../../types/graph';
import { Resolvers } from '../../../types/resolver';

const resolvers: Resolvers = {
  Mutation: {
    FacebookConnect: async (
      _,
      args: FacebookConnectMutationArgs
    ): Promise<FacebookConnectResponse> => {
      const { fbId } = args;
      // check user already sign in
      // then sign in User
      try {
        const existingUser = await User.findOne({ fbId });
        if (existingUser) {
          return {
            ok: true,
            error: null,
            token: 'token'
          };
        }
      } catch (err) {
        return {
          ok: false,
          error: err.message,
          token: null
        };
      }
      // create User
      try {
        // do something
        await User.create({
          ...args,
          profilePhoto: `http://graph.facebook.com/${fbId}/picture?type=square`
        }).save();
        return {
          ok: true,
          error: null,
          token: 'token'
        };
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          token: null
        };
      }
    }
  }
};

export default resolvers;
