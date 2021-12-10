<template>
  <div class=" container">
    <div class="row row justify-content-center align-items-center">
      <div class="col-md-5">
        <div class=" card p-4">
          <form @submit.prevent="createVictim">
            <base-input
              label="Full Name"
              type="text"
              placeholder="Enter full name of victim"
              color="black"
              v-model="form.name"
            >
            </base-input>
            <base-input
              label="Date of Birth"
              type="date"
              placeholder="Date of birth of victim"
              v-model="form.dob"
            >
            </base-input>
            <base-input label="Gender">
              <select class="form-control" id="gender" v-model="form.gender">
                <option value="select" disabled>Select gender</option>
                <option style="color:black;" value="male">Male</option>
                <option style="color:black;" value="female">Female</option>
              </select>
            </base-input>
            <base-input label="District">
              <select
                class="form-control"
                id="districts"
                v-model="form.district_id"
              >
                <option
                  style="color:black;"
                  v-for="district in districts"
                  :key="district.id"
                  :value="district.id"
                  >{{ district.name }}</option
                >
              </select>
            </base-input>
            <base-input
              label="Town"
              type="text"
              placeholder="Enter town of victim"
              v-model="form.town"
            >
            </base-input>
            <base-button
              native-type="submit"
              type="primary"
              class="btn-fill"
              :loading="loading"
            >
              Save changes
            </base-button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    Map: () => import("~/components/Map.vue"),
    Modal: () => import("~/components/Modal.vue"),
  },
  data() {
    return {
      form : {
            name:"",
            district_id:null,
            dob:"",
            town:"",
            gender:"select"
        },
        loading:false,
        districts : []
    };
  },
  async asyncData({ $axios }) {
    const districts = await $axios.get("fetch/districts/resource");
    return { districts: districts.data };
  },
  methods: {
    openMap(lat, long) {
      this.showMaps = true;
    },
     async createVictim(){
        try {
            this.loading =true;
            const response = await this.$axios.post('victims/create',this.form);
            
            if(response && response.data){
                const { data } = response.data;
                this.$emit("updateVictims", data)
                this.$notify({type: 'success', message: 'Victim Created Successfully'});
                this.form = {
                    name:"",
                    district_id:null,
                    dob:"",
                    town:"",
                    gender:"select"
                }
                this.close();
            }
        } catch (error) {
            
        }finally{
            this.loading = false
        }
     }
  },
};
</script>

<style lang="scss" scoped></style>
