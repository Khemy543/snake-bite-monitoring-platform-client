let defaultHeaders = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

export default function ({ app, $axios, store, redirect , error, $notify}) {

    $axios.onRequest(({ headers }) => {
        const token = app.$cookies.get('authToken');
        if (token) {
            defaultHeaders = { ...defaultHeaders, Authorization: `Bearer ${token}` }
            headers.common = { ...headers.common, ...defaultHeaders }
        }
    });

    $axios.onError(errordata => {
        const { status, data } = errordata.response;
        if (errordata.response) {
            switch (status) {
                case 401:
                    app.$cookies.remove('authToken');
                    return redirect('/login');
                case 404:
                    return;
                case 403:
                    const message = (data.message && data.message != '') ? data.message : 'This action not allowed at the moment!';
                    $notify.open({type: 'danger', message : message  });
                case 500:
                    return error({ statusCode : 500, message : 'Something happend at our side!' })
            }

        } else {

            const message = 'This action not allowed at the moment!';
            $notify.open({type: 'danger', message : message  });
        }
    })
}
