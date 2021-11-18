export default function ({ store, redirect, app, $axios }) {
    const user = store.getters['getUser'];

    if (!user) {
       return $axios.get('admin')
       .then(response => {
            store.dispatch('setUser', response.data);
       })
        .catch(error => {
            if(error.response){
                const { status } = error.response;
                if(status === 401){
                    app.$cookies.removeAll();
                    return redirect('/login');
                }
            }
        });
    }

}
