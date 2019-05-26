export const isAuth = () => {
  return sessionStorage['token'] ? true : false;
}