export default function ({ app, redirect,store , $toast }) {
    const authenticated = app.$cookies.get('authToken');
    if (authenticated) {
        ///$toast.open({ message: 'Page not found', type: 'error', duration : 5000 })
        return redirect('/dashboard');
    }
}
