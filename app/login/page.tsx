import PublicRoute from "../components/protect/PublicRouteLogin";
import LoginComponent from "../components/login/login";

export default function Login() {
  return (
    <PublicRoute>
      <LoginComponent />
    </PublicRoute>
  );
}