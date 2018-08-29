import User from '../../../entities/User';
import {
  EmailSignUpMutationArgs,
  EmailSignUpResponse
} from '../../../types/graph';
import { Resolvers } from '../../../types/resolver';
import createJWT from '../../../utils/createJWT';
import proceedWithAuthError from '../../../utils/proceedWithAuthError';

const resolvers: Resolvers = {
  Mutation: {
    EmailSignUp: (_, args: EmailSignUpMutationArgs): EmailSignUpResponse => {
      const { email } = args;
      return proceedWithAuthError(
        async (): Promise<EmailSignUpResponse> => {
          const existingUser = await User.findOne({ email });
          if (existingUser) {
            return {
              ok: false,
              error: 'You sould log in Instead',
              token: null
            };
          }
          const newUser = await User.create({ ...args }).save();
          const token = createJWT(newUser.id);
          return {
            ok: true,
            error: null,
            token
          };
        }
      );
    }
  }
};

export default resolvers;
