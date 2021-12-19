<template>
    <div>
        <div class=" card p-4 mt-4"> 
            <form @submit.prevent="updateVictim">
            <h5 class="modal-title">Edit Victim</h5>
            <br/>
            <base-input label="Full Name"
                        type="text"
                        placeholder="Enter full name of victim"
                        color="black"
                        v-model="form.name">
            </base-input>
            <base-input label="Date of Birth"
                        type="date"
                        placeholder="Date of birth of victim"
                        v-model="form.dob">
            </base-input>
            <base-input label="Gender">
              <select class="form-control" id="gender" v-model="form.gender">
                <option value="" disabled style="color:black;">Select gender</option>
                <option style="color:black;" value="male">Male</option>
                <option style="color:black;" value="female">Female</option>
              </select>
            </base-input>
            <base-input label="District">
              <select class="form-control" id="districts" v-model="form.district.id">
                <option style="color:black;" v-for="district in districts" :key="district.id" :value="district.id">{{district.name}}</option>
              </select>
            </base-input>
            <base-input label="Town"
                        type="text"
                        placeholder="Enter town of victim"
                        v-model="form.town">
            </base-input>
            <base-button native-type="submit" type="primary">Save changes</base-button>
          </form> 
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            form : {},
            districts:[]
        }
    },
    async asyncData({ $axios, route }){
        try {
            const response = await $axios.get(`fetch/${route.params.id}/victim`);
            if(response && response.data){
                return {
                    form : response.data
                }
            }
        } catch (error) {
            
        }
    },
    mounted(){
        this.getDistricts()
    },
    methods: {
        async updateVictim(){
            try {
                this.form = {
                    ...this.form,
                    disctrict_id : this.form.district.id
                }
                const response = await this.$axios.put(`update/${this.$route.params.id}/victim`,this.form);
                
                if(response && response.data){
                    this.$notify({type:'success', message :'Victim edited successfully!'})
                }
            } catch (error) {
                this.$notify({type:'error', message :'Error update victim'})
            }
        },
        async getDistricts(){
            try {
                const response = await this.$axios.get('fetch/districts/resource');

                if(response && response.data){
                    this.districts = response.data;
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>