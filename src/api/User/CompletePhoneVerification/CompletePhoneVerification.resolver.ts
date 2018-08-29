import User from '../../../entities/User';
import Verification from '../../../entities/Verification';
import {
  CompletePhoneVerificationMutationArgs,
  CompletePhoneVerificationResponse
} from '../../../types/graph';
import { Resolvers } from '../../../types/resolver';
import createJWT from '../../../utils/createJWT';
import proceedWithAuthError from '../../../utils/proceedWithAuthError';

const resolvers: Resolvers = {
  Mutation: {
    CompletePhoneVerification: async (
      _,
      args: CompletePhoneVerificationMutationArgs
    ): Promise<CompletePhoneVerificationResponse> => {
      const { phoneNumber, key } = args;
      try {
        const verification = await Verification.findOne({
          payload: phoneNumber,
          key
        });
        if (!verification) {
          return {
            ok: false,
            error: `you've entered false key`,
            token: null
          };
        }
        verification.verified = true;
        verification.save();
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          token: null
        };
      }

      return proceedWithAuthError(
        async (): Promise<CompletePhoneVerificationResponse> => {
          const user = await User.findOne({ phoneNumber });
          if (user) {
            user.verifiedPhoneNumber = true;
            user.save();
            const token = createJWT(user.id);
            return {
              ok: true,
              error: null,
              token
            };
          }
          return {
            ok: true,
            error: null,
            token: null
          };
        }
      );
    }
  }
};

export default resolvers;
