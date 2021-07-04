export default function ({ app, redirect, env, route }) {

    const redirectAuthURL = `/login?redirect_url=${route.path}&expect_token=true`;
  
    const authToken = app.$cookies.get('authToken');
    if (!authToken) {
      return redirect(redirectAuthURL);
    }
  }
