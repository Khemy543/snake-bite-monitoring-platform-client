<template>
    <div style="width:30%;">
        <div class="row">
            <div class="col-md-12">
                <form class="login-form" @submit.prevent="handleLogin">
                    <base-input
                        type="email"
                        label="Email"
                        placeholder="Email"
                        v-model="email"
                    >
                    </base-input>

                    <base-input
                        type="password"
                        label="Password"
                        placeholder="Password"
                        v-model="password"
                    >
                    </base-input>

                    <base-button native-type="submit" type="primary" class="btn-fill" :loading="loading">
                        login
                    </base-button>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    layout: 'starter',
    middleware : ['authRedirect'],
    data(){
        return{
            email : '',
            password : '',
            loading : false
        }
    },
    methods :{
        handleLogin() {
            this.loading = true;
            this.$axios.post('auth/login',{
                email : this.email,
                password :this.password
            })
            .then(response => {
                if(response && response.data){
                    this.$notify({type:'success', message :'Login successfull!'})
                   const { access_token } = response.data;
                    this.$cookies.set("authToken", access_token, {
                    path: "/",
                    maxAge: 604800,
                });

                this.$axios.get('auth/user')
                .then(res => {
                    this.$store.dispatch('setUser', res.data);
                    this.$router.push('/')
                })

                }
            })
            .catch(error => {
                if(error && error.response){
                    const { status } = error.response;
                    console.log(status)
                    if(status == 401){
                        console.log('here')
                        this.$notify({type:'success', message :'Login successfull!'})
                    }
                }
            })
            .finally((_) => this.loading = false)
        }
    }
}
</script>
<style scoped>

</style>