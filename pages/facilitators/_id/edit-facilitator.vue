<template>
    <div class=" container">
            <div class="row row justify-content-center align-items-center">
              <div class="col-md-5">
                  <div class=" card p-4">
                <form @submit.prevent="updateFacilitator">
                    <div class=" row justify-content-center">
                        <div class=" rounded-circle bg-info" style="height:100px; width:100px;">

                        </div>
                    </div>
                    <div class="row">
                        <div class=" col-md-12">
                            <base-input
                                type="text"
                                label="Name of Facilitator"
                                placeholder="Name"
                                v-model="form.name"
                            >
                            </base-input>
                        </div>
                    </div>

                    <div class="row">
                        <div class=" col-md-12">
                            <base-input
                                type="text"
                                label="Email"
                                placeholder="Email"
                                v-model="form.email"
                            >
                            </base-input>
                        </div>
                    </div>
                        
                  
                    <div class="row">
                        <div class=" col-md-12">
                            <base-input
                                type="text"
                                label="Phone Number"
                                placeholder="Phone Number"
                                v-model="form.phone"
                            >
                            </base-input>
                        </div>
                    </div>
                  <base-button native-type="submit" type="primary" class="btn-fill" :loading="loading">
                    Update
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
                form : {
                    name: "",
                    email : "",
                    phone : '',
                    avatar : '',
                    facility_id:null
                }
            }
        },
        mounted(){
            this.form.facility_id = this.$route.params.id
        },
        async asyncData({ $axios, route }){
            try {
                const response = await $axios.get(`admin/fetch/${route.params.id}/facilitator`)
                
                if(response && response.data){
                    console.log(response.data)
                    return { 
                        form : { ...response.data, facility_id:response.data.facility.id},
                    }
                }
            } catch (error) {
                console.log(error)
            }
        },
        methods : {
            updateFacilitator(){
                this.loading = true; 
                this.$axios.$post(`admin/update/${this.$route.params.id}/facilitator`,{...this.form , facility_id:Number(this.form.facility_id), _method:"PUT"})
                .then(response => {
                    if(response){

                        this.$notify({ type:'success', message : 'Facility updated successfully' });
                    }
                })
                .catch(error => {
                    this.$notify({ type : 'error', message : 'Error adding region, Please try again later' })
                })
                .finally((_) => this.loading = false)
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>