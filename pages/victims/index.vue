<template>
  <div>
    <div class="d-flex justify-content-between">
      <h4 slot="header" class="card-title">Victims</h4>
      <base-button
        native-type="button"
        type="primary"
        class="btn-fill"
        @click="addVictim"
      >
        Add Victim
      </base-button>
    </div>
    <div class=" card p-4 mt-4">  
    <base-table :data="table" thead-classes="text-primary">
      <template slot="columns">
        <th>#</th>
        <th>Name of Victim</th>
        <th>Gender</th>
        <th>Age</th>
        <th>District</th>
        <th>Town</th>
        <th class="text-right">Actions</th>
      </template>

      <template slot-scope="{ row, index }">
        <td>{{ index + 1 }}</td>
        <td>{{ row.name }}</td>
        <td>{{ row.gender}}</td>
        <td>{{ row.age}}</td>
        <td>{{row.district.name}}</td>
        <td>{{row.town}}</td>
        <td class="text-right">
          <nuxt-link :to="`/facilities/${row.id}/add-facilitator`">
          <el-tooltip
              content="Add Facilitator"
              effect="light"
              :open-delay="300"
              placement="top"
          >
              <base-button
              type="info"
              icon
              size="sm"
              class="btn-link"
              >
              <i class="tim-icons icon-simple-add"></i>
              </base-button>
          </el-tooltip>
          </nuxt-link>
          <el-tooltip
            content="Edit"
            effect="light"
            :open-delay="300"
            placement="top"
          >
          <nuxt-link :to="`/facilities/${row.id}/edit-Victim`">
            <base-button
              type="success"
              icon
              size="sm"
              class="btn-link"
            >
              <i class="tim-icons icon-pencil"></i>
            </base-button>
          </nuxt-link>
          </el-tooltip>
          <el-tooltip
            content="Delete"
            effect="light"
            :open-delay="300"
            placement="top"
          >
            <base-button
              type="danger"
              icon
              size="sm"
              class="btn-link"
              @click="DeleteVictim(row.id)"
            >
              <i class="tim-icons icon-simple-remove"></i>
            </base-button>
          </el-tooltip>
        </td>
      </template>
    </base-table>
    <div>
      <base-pagination 
        :pageCount="pagination.last_page" 
        :perPage="pagination.per_page" 
        :total="pagination.total">
      </base-pagination>
    </div>
    </div>
  </div>
</template>
<script>
import { BaseTable } from "@/components";
export default {
  components: {
    BaseTable,
  },
  async asyncData({ $axios }) {
    const facilities = await $axios.get("/fetch/victims");
    const { data, meta , links } = facilities.data
    console.log(meta)
    return { 
        table: data,
        pagination : {
            per_page: meta.per_page,
            last_page : links.last_page,
            current_page : meta.current_page,
            next_page : links.next,
            first_page:links.first,
            last_page : meta.last_page,
            total : meta.total
        }
     };
  },
  data() {
    return {
      table: [],
      pagination : {}
    };
  },

  methods: {
    addVictim(){
      this.$router.push('victims/add-victim')
    },
   
    DeleteVictim(id){
        this.$swal({
        title: "Delete Victim",
        text: "This Victim will be deleted",
        icon: "warning",
        showCancelButton: true,
        allowOutsideClick: false,
        confirmButtonText: "Delete",
        showLoaderOnConfirm: true,
        preConfirm: () => {
            let cancelBtn = document.getElementsByClassName("swal2-cancel")[0];
            cancelBtn.style.display = "none";

            return this.$axios.delete(`/delete/${id}/victim`)
            .then(response => {
                this.table = this.table.filter(item => item.id !== id);
                this.$notify({
                    type:'success',
                    message : 'Victim deleted successfully'
                })
            })
            .catch(error => {

            })
        }})

    }
  },
};
</script>