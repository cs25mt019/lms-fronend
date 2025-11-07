function StudentLogout() {
  localStorage.removeItem("studentLoginStatus");
  localStorage.removeItem("student");
  window.location.href = "/user-login";
}
export default StudentLogout;