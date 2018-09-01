import User from '../../../entities/User';
import Verification from '../../../entities/Verification';
import {
  EmailSignUpMutationArgs,
  EmailSignUpResponse,
} from '../../../types/graph';
import { Resolvers } from '../../../types/resolver';
import createJWT from '../../../utils/createJWT';
import proceedWithAuthError from '../../../utils/proceedWithAuthError';
import { sendVerificationEmail } from '../../../utils/sendEmail';

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
              token: null,
            };
          }
          const phoneVerification = Verification.findOne({
            payload: args.phoneNumber,
            verified: true,
          });
          if (!phoneVerification) {
            return {
              ok: false,
              error: 'You Did not Verified Phone Number',
              token: null,
            };
          }
          const newUser = await User.create({ ...args }).save();
          if (newUser.email) {
            const emailVerification = await Verification.create({
              payload: newUser.email,
              target: 'EMAIL',
            });
            await sendVerificationEmail(
              newUser.fullName,
              emailVerification.key,
            );
          }

          const token = createJWT(newUser.id);
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
