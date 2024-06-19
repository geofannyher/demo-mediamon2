export const saveSession = (token: string) => {
  localStorage.setItem("idMediamon2", token);
};

export const getSession = () => {
  return localStorage.getItem("idMediamon2");
};

export const clearSession = () => {
  localStorage.removeItem("idMediamon2");
  localStorage.removeItem("role");
};
