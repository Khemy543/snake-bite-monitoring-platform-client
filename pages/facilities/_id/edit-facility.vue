<template>
    <div class=" container">
            <div class="row row justify-content-center align-items-center">
              <div class="col-md-5">
                <div class=" card p-4">
                <form @submit.prevent="EditFacility">
                    <div class="row">
                        <div class=" col-md-12">
                            <base-input
                                type="text"
                                label="Name of Facility"
                                placeholder="Name"
                                v-model="form.name"
                            >
                        </base-input>
                        </div>
                    </div>
                  
                    <div class="row">
                        <div class=" col-md-12">
                            <label>Select District</label>
                            <br/>
                            <el-select class="select-danger"
                                        style="width : 100%;"
                                        placeholder="Select District"
                                        v-model="form.district_id">
                                <el-option v-for="district in districts"
                                        class="select-danger"
                                        :value="district.id"
                                        :label="district.name"
                                        :key="district.id">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                  <base-button native-type="submit" type="primary" class="btn-fill mt-4" :loading="loading">
                    Edit
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
                districts:[],
                loading : false,
                form : {
                    lat : 23,
                    long : 43,
                    name: "",
                    district_id : ""
                }
            }
        },
        async asyncData({ $axios,route }) {
            try {
                const [districts, response] = await Promise.all([ 
                    $axios.get("admin/fetch/district"),
                    $axios.get(`admin/show/${route.params.id}/facility`)
                ]);
                if(districts && districts.data && response && response.data){
                    return { 
                        districts: districts.data,
                        form : {...response.data, district_id:response.data.district.id }
                    };
                }
                
            } catch (error) {
                console.log(error.response)
            }
        },
        methods : {
            EditFacility(){
                this.loading = true; 
                this.$axios.$post(`admin/update/${this.$route.params.id}/facility`,{...this.form, _method:"PUT"})
                .then(response => {
                    this.$notify({ type:'success', message : 'Facility updated successfully' });
                })
                .catch(error => {
                    this.$notify({ type : 'error', message : 'Error updating facility, Please try again later' })
                })
                .finally((_) => this.loading = false)
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>