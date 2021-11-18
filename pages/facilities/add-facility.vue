<template>
    <div class=" container">
            <div class="row row justify-content-center align-items-center">
              <div class="col-md-5">
                  <div class=" card p-4">
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
                    <br />
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
                    <br/>
                    <div class="row">
                        <div class=" col-md-12">
                            <base-input
                                type="text"
                                label="Location"
                                placeholder="Location"
                                v-model="form.location"
                            >
                        </base-input>
                        <div class=" text-right text-underline pointer" @click="openMap">Pick on Map</div>
                        </div>
                    </div>
                    <br/>
                  <base-button native-type="submit" type="primary" class="btn-fill" :loading="loading">
                    Save
                  </base-button>
                </form>
              </div>
            </div>

            <modal :show.sync="showMaps">
                <template slot="header">
                    <div>
                        Choose Location on Map
                    </div>
                </template>
                <div style="width:100%; height:300px;">
                    <Map />
                </div>
                <template slot="footer">
                    <div></div>
                    <base-button type="primary">Save</base-button>
                </template>
            </modal>
            </div>
    </div>
</template>

<script>
    export default {
        components : {
            Map : () => import('~/components/Map.vue'),
            Modal : () => import('~/components/Modal.vue')
        },
        data(){
            return{
                districts:[],
                loading : false,
                form : {
                    lat : 23,
                    long : 43,
                    name: "",
                    district_id : ""
                },
                showMaps : false
            }
        },
        async asyncData({ $axios }) {
            const districts = await $axios.get("admin/fetch/district");
            return { districts: districts.data };
        },
        methods : {
             openMap(lat , long){
                this.showMaps = true;
            },
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