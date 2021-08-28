<template>
    <div>
        <Maps />
    </div>
</template>
<script>
export default {
    components : {
        Maps : () => import('~/components/Map.vue')
    }
}
</script>
<style scoped>

</style>