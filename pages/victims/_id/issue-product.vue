<template>
  <div>
      <div class=" card p-4 mt-4">  
          <form @submit.prevent="issueProduct">
            <h5 class="modal-title">Issue Product</h5>
            <br/>
                <div class=" row">
                <div class=" col-md-12">
                <base-input label="Select Victim">
                    <select class="form-control" id="victims" v-model="form.victim_id">
                    <option value="" disabled>Selecte Victim</option>
                    <option style="color:black;" v-for="victim in victims" :key="victim.id" :value="victim.id">{{victim.name}}</option>
                    </select>
                </base-input>
                </div>
                </div>

                    <base-input label="Select Products">
                    <select class="form-control" id="product" v-model="form.product_id">
                    <option value="" disabled>Selecte Product</option>
                    <option style="color:black;" v-for="product in products" :key="product.id" :value="product.id">{{product.name}}</option>
                    </select>
                </base-input>

                <base-input
                    type="number"
                    label="Quantity"
                    placeholder="Enter quantity of the product issued out"
                    v-model="form.quantity"
                >
                </base-input>

                <base-input label="Select District">
                    <select class="form-control" id="district" v-model="form.district_id">
                    <option value="" disabled>Selecte District</option>
                    <option style="color:black;" v-for="district in districts" :key="district.id" :value="district.id">{{district.name}}</option>
                    </select>
                </base-input>
                <base-input
                    type="text"
                    label="Town"
                    placeholder="Enter Victims Town"
                    v-model="form.town"
                >
                </base-input>
                <base-input
                    type="date"
                    label="Date Issued"
                    placeholder="Date Issued"
                    v-model="form.date_issued"
                >
                </base-input>

                <base-button native-type="submit" type="primary" class="btn-fill">
                    Issue Product
                </base-button>
            </form>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            form : {},
            victims : [],
            products: [],
            districts : []
        }
    }, 
    async asyncData({ $axios }){
        try {
            const response  = await $axios.get('fetch/victims/resource');

            if(response.data){
                console.log(response.data)
                return {
                    victims : response.data
                }
            }
        } catch (error) {
            
        }
    },
    mounted(){
        const id = this.$route.params.id
        this.form = {
            ...this.form,
            product_id : "",
            district_id : "",
            ...(id === "new" ? { victim_id : "" } : { victim_id : id })
        };

        this.getDistricts();

        this.getProducts();
    },
    methods:{
        async getProducts(){
            try {
                const response = await this.$axios.get('fetch/products/resource');

                if(response && response.data){
                    this.products = response.data
                }
            } catch (error) {
                
            }
        },

        async getDistricts(){
            try {
                const response = await this.$axios.get('fetch/districts/resource');

                if(response && response.data){
                    this.districts = response.data
                }
            } catch (error) {
                
            }
        },
        
        async issueProduct(){
            try {
                const response = await this.$axios.post(`product/${this.form.product_id}/issue/out`, this.form);

                console.log(response)

                if(response && response.data){
                    this.$notify({type:'success', message :'Product issued successfully!'})
                    this.$router.push('/victims')
                }
            } catch (error) {

                if (response.data.message) {
                     this.$notify({type:'error', message : response.data.message});
                } else {
                     this.$notify({type:'error', message :'Error Issuing product'});
                }
                
            }
        }
    }
}
</script>

<style>

</style>