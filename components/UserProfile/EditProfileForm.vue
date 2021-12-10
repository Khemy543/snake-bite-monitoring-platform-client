<template>
  <card>
    <h5 slot="header" class="title">Edit Profile</h5>
    <form @submit.prevent="updateProfile">
      <div class="row">
        <div class="col-md-12">
          <base-input
            type="text"
            label="Name"
            placeholder="Name"
            v-model="user.name"
          >
          </base-input>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <base-input
            type="email"
            label="Email"
            placeholder="Email"
            v-model="user.email"
          >
          </base-input>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <base-input
            type="text"
            label="Phone Number"
            placeholder="Phone Number"
            v-model="user.phone"
          >
          </base-input>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <base-input
            type="text"
            label="Role"
            placeholder="Role"
            v-model="user.role"
            :disabled=true
          >
          </base-input>
        </div>
      </div>

      <base-button native-type="submit" type="primary" class="btn-fill">
        Save
      </base-button>
    </form>
  </card>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      user: {
        name:"",
        phone : "",
        email : '',
        role : ''
      }
    };
  },
  computed : {
    ...mapGetters({
      user_data : 'getUser'
    })
  },
  methods: {
    updateProfile() {
      this.$axios.patch('')
    }
  },
  mounted(){
    this.user = {
      name : this.user_data.name,
      email : this.user_data.email,
      phone : this.user_data.phone,
      role : this.user_data.role
    }
  }
};
</script>
<style></style>
