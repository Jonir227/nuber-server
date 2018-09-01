const privateResolver = resolverFunction => async (
  parent,
  args,
  context,
  info,
) => {
  if (!context.req.user) {
    throw new Error('No JWT');
  }
  return await resolverFunction(parent, args, context, info);
};

export default privateResolver;
