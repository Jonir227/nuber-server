import fallback from './fallback';

export default fallback(err => {
  return {
    ok: false,
    error: err.message,
    token: null
  };
});
