export const isTokenExpired = (token: string) => {
  const decodeBase64 = (str: string) => {
    return decodeURIComponent(
      atob(str)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
  };

  const payload = token.split(".")[1];
  const decodedPayload = JSON.parse(decodeBase64(payload));
  const exp = decodedPayload.exp;
  const now = Math.floor(Date.now() / 1000);
  return exp < now;
};
