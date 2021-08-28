<template>
    <div class=" container">
            <div class="row row justify-content-center align-items-center">
              <div class="col-md-8">
                <form @submit.prevent="addFacilitators">
                    <div class=" row justify-content-center">
                        <div class=" rounded-circle bg-info" style="height:100px; width:100px;">

                        </div>
                    </div>
                    <div class="row mt-10">
                        <div class=" col-md-6">
                            <base-input
                                type="text"
                                label="Name of Facilitator"
                                placeholder="Name"
                                v-model="form.name"
                            >
                            </base-input>
                        </div>
                        <div class=" col-md-6">
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
                        <div class=" col-md-6">
                            <base-input
                                type="text"
                                label="Email"
                                placeholder="Email"
                                v-model="form.phone"
                            >
                            </base-input>
                        </div>
                        <div class=" col-md-6">
                            <label>Select District</label>
                            <br/>
                            <el-select class="select-danger"
                                        style="width : 100%;"
                                        placeholder="Select District"
                                        v-model="form.facility_id">
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
                    name: "",
                    email : "",
                    phone : '',
                    facility_id : null,
                    avatar : ''
                }
            }
        },
        async asyncData({ $axios }) {
            const districts = await $axios.get("admin/fetch/facilities");
            return { districts: districts.data };
        },
        methods : {
            addFacilitators(){
                this.loading = true; 
                this.$axios.$post('admin/create/facilitator',this.form)
                .then(response => {
                    this.$notify({ type:'success', message : 'Facility added successfully' });
                    this.form = {
                        name: "",
                        email : "",
                        phone : '',
                        facility_id : null,
                        avatar : ''
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