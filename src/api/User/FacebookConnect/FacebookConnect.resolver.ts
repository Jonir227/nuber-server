import User from '../../../entities/User';
import {
  FacebookConnectMutationArgs,
  FacebookConnectResponse,
} from '../../../types/graph';
import { Resolvers } from '../../../types/resolver';
import createJWT from '../../../utils/createJWT';
import proceedWithAuthError from '../../../utils/proceedWithAuthError';

const resolvers: Resolvers = {
  Query: {
    user: (parent, args, context) => {},
  },
  Mutation: {
    FacebookConnect: (
      _,
      args: FacebookConnectMutationArgs,
    ): FacebookConnectResponse => {
      const { fbId } = args;
      // check user already sign in
      // then sign in User
      const checkUser = proceedWithAuthError(
        async (): Promise<FacebookConnectResponse> => {
          const existingUser = await User.findOne({ fbId });
          if (!existingUser) {
            throw new Error('User Not Exist');
          }
          const token = createJWT(existingUser.id);
          return {
            ok: true,
            error: null,
            token,
          };
        },
      );

      if (checkUser) {
        return checkUser;
      }
      // create User
      return proceedWithAuthError(
        async (): Promise<FacebookConnectResponse> => {
          // do something
          const user = await User.create({
            ...args,
            profilePhoto: `http://graph.facebook.com/${fbId}/picture?type=square`,
          }).save();
          const token = createJWT(user.id);
          return {
            ok: true,
            error: null,
            token,
          };
        },
      );
    },
  },
};

export default resolvers;
