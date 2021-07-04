export default async function ({ store, redirect, app, $axios }) {
    const user = store.getters['getUser'];

    if (!user) {
        const userData = await $axios.get('admin')
        .catch(error => {
            if(error.response){
                const { status } = error.response;
                if(status === 401){
                    app.$cookies.removeAll();
                    return redirect('/login');
                }
            }
        });

        store.dispatch('setUser', userData.data);


            /* .then(response => {

                store.dispatch('setUser', response.data);
                console.log(response.data)
                return;
            })
            .catch(error => {
                console.log(error)
                if(error.response){
                    const { status } = error.response;
                    if(status === 401){
                        app.$cookies.removeAll();
                        return redirect('/login');
                    }
                }
            }); */
    }

}
