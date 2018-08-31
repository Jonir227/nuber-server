import User from '../../../entities/User';
import {
  EmailSignInMutationArgs,
  EmailSignInResponse
} from '../../../types/graph';
import { Resolvers } from '../../../types/resolver';
import createJWT from '../../../utils/createJWT';

const resolvers: Resolvers = {
  Mutation: {
    EmailSignIn: async (
      _,
      args: EmailSignInMutationArgs
    ): Promise<EmailSignInResponse> => {
      const { email, password } = args;
      try {
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
      } catch (err) {
        return {
          ok: false,
          error: err.message,
          token: null
        };
      }
    }
  }
};

export default resolvers;
