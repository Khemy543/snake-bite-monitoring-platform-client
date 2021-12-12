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
            if(response){
                this.$cookies.removeAll();
                this.$router.push('/login')
            }
        })
    }
}
</script>