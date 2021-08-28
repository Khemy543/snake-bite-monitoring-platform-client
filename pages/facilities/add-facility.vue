<template>
    <div class=" container">
            <div class="row row justify-content-center align-items-center">
              <div class="col-md-5">
                <form @submit.prevent="AddDistrict">
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
                  <base-button native-type="submit" type="primary" class="btn-fill" :loading="loading">
                    Save
                  </base-button>
                </form>
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
        async asyncData({ $axios }) {
            const districts = await $axios.get("admin/fetch/district");
            return { districts: districts.data };
        },
        methods : {
            AddDistrict(){
                this.loading = true; 
                this.$axios.$post('admin/store/facility',this.form)
                .then(response => {
                    this.$notify({ type:'success', message : 'Facility added successfully' });
                    this.form = {
                        lat:23,
                        long:43,
                        name: "",
                        district_id : ""
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