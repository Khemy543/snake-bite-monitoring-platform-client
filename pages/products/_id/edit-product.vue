<template>
    <div>
            <div class="row">
              <div class="col-md-12">
                  <div class=" card p-4">
                <form @submit.prevent="updateProducts">
                        <base-input
                            type="text"
                            label="Name of Product"
                            placeholder="Enter Name of Product"
                            v-model="form.name"
                        >
                        </base-input>

                        <base-input
                            type="text"
                            label="Brand"
                            placeholder="Enter Product Brand"
                            v-model="form.brand"
                        >
                        </base-input>
                        <base-input
                            type="number"
                            label="Quantity"
                            placeholder="Quantity"
                            v-model="form.quantity"
                        >
                        </base-input>
                        <base-input
                            type="text"
                            label="Source"
                            placeholder="Enter Product Source"
                            v-model="form.source"
                        >
                        </base-input>
                        <base-input
                            type="date"
                            label="Expiry Date"
                            placeholder="Expiry Date"
                            v-model="form.expiry_date"
                        >
                        </base-input>
                        <base-input label="Description" >
                          <textarea class="form-control" id="description" rows="3" v-model="form.description"></textarea>
                        </base-input>

                        <base-button native-type="submit" type="primary" class="btn-fill">
                            Update Product
                        </base-button>
                    </form>
              </div>
            </div>
            </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                loading : false,
                form : {}
            }
        },
        methods : {
            EditRegion(){
                this.loading = true; 
                this.$axios.patch(`admin/update/${this.$route.params.id}/regions`,this.form)
                .then(response => {
                    this.$notify({ type:'success', message : 'Region updated successfully' });
                })
                .catch(error => {
                    this.$notify({ type : 'error', message : 'Error updating region, Please try again later' })
                })
                .finally((_) => this.loading = false)
            }
        },
        async asyncData({ $axios, route }){
            try {
                const response = await $axios.get(`get/${route.params.id}/details`);
                
                if(response && response.data){
                    //console.log(response.data)
                    return { form : response.data }
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>