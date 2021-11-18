<template>
    <div class=" container">
            <div class="row row justify-content-center align-items-center">
              <div class="col-md-6">
                <div class="card p-4">
                <form @submit.prevent="AddDistrict">
                    <div class="row">
                        <div class=" col-md-6">
                            <base-input
                                type="text"
                                label="Name of District"
                                placeholder="Name"
                                v-model="form.name"
                            >
                        </base-input>
                        </div>
                        <div class=" col-md-6">
                            <label>Select Region</label>
                            <br/>
                            <el-select class="select-danger"
                                        style="width : 100%;"
                                        placeholder="Select Region"
                                        v-model="form.region_id">
                                <el-option v-for="region in regions"
                                        class="select-danger"
                                        :value="region.id"
                                        :label="region.name"
                                        :key="region.id">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                  
                    <div class="row">
                        <div class="col-md-12">
                            <base-input
                                type="text"
                                label="Address of District health of directorate"
                                placeholder="Address of District health of directorate"
                                v-model="form.address_of_district_health_directorate"
                            >
                            </base-input>
                        </div>
                    </div>
                  <base-button native-type="submit" type="primary" class="btn-fill" :loading="loading">
                    Save
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
                regions:[],
                loading : false,
                form : {
                    name: "",
                    address_of_district_health_of_directorate : "",
                    region_id : ""
                }
            }
        },
        async asyncData({ $axios }) {
            const regions = await $axios.get("admin/fetch/regions");
            return { regions: regions.data };
        },
        methods : {
            AddDistrict(){
                this.loading = true; 
                this.$axios.$post('admin/store/district',this.form)
                .then(response => {
                    this.$notify({ type:'success', message : 'Region added successfully' });
                    this.form = {
                        name: "",
                        address_of_district_health_directorate : "",
                        region_id : ""
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