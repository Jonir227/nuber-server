import User from '../../../entities/User';
import {
  EamilSignInMutationArgs,
  EmailSignInResponse
} from '../../../types/graph';
import { Resolvers } from '../../../types/resolver';
import createJWT from '../../../utils/createJWT';
import proceedWithAuthError from '../../../utils/proceedWithAuthError';

const resolvers: Resolvers = {
  Mutation: {
    EmailSignIn: (_, args: EamilSignInMutationArgs): EmailSignInResponse => {
      const { email, password } = args;
      return proceedWithAuthError(
        async (): Promise<EmailSignInResponse> => {
          const user = await User.findOne({ email });
          if (!user) {
            return {
              ok: false,
              error: `No User found with ${email}`,
              token: null
            };
          }
          const checkPassword = await user.comparePassword(password);
          const token = createJWT(user.id);
          if (checkPassword) {
            return {
              ok: true,
              error: null,
              token
            };
          }
          return {
            ok: false,
            error: 'Wrong Password',
            token: null
          };
        }
      );
    }
  }
};

export default resolvers;
