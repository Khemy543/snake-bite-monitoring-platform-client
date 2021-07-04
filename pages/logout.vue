<template>
    <div>
        <p>Logging out ...</p>
    </div>
</template>
<script>
export default {
    layout:'starter',
    mounted(){
        this.$axios.post('auth/logout', null)
        .then(response => {
            if(response.data){
                this.$cookies.removeAll();
                this.$route.push('/login')
            }
        })
    }
}
</script>