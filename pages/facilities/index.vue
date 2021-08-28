<template>
  <div>
    <div class="d-flex justify-content-between">
      <h4 slot="header" class="card-title">Facilities</h4>
      <base-button
        native-type="button"
        type="primary"
        class="btn-fill"
        @click="addDistrict"
      >
        Add Facility
      </base-button>
    </div>
    <br/>
    <base-table :data="table" thead-classes="text-primary">
      <template slot="columns">
        <th>#</th>
        <th>Name of Facility</th>
        <th>Region</th>
        <th>District</th>
        <th>View on map</th>
        <th class="text-right">Actions</th>
      </template>

      <template slot-scope="{ row, index }">
        <td>{{ index + 1 }}</td>
        <td>{{ row.name }}</td>
        <td>{{ row.district.name }}</td>
        <td>{{ row.district.region.name}}</td>
        <td class=" cursor-pointer underline" @click="openMaps(row.lat, row.long)">View</td>
        <td class="text-right">
          <nuxt-link :to="`/facilitators/${row.id}/add-facilitator`">
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
          <nuxt-link :to="`/regions/${row.id}/edit-regions`">
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
              @click="DeleteRegion(row.id)"
            >
              <i class="tim-icons icon-simple-remove"></i>
            </base-button>
          </el-tooltip>
        </td>
        <!-- <base-pagination :page-count="4" v-model="pagination.current_page"></base-pagination> -->
      </template>
    </base-table>
  </div>
</template>
<script>
import { BaseTable } from "@/components";
export default {
  components: {
    BaseTable,
  },
  async asyncData({ $axios }) {
    const facilities = await $axios.get("admin/fetch/facilities");
    const { data, meta , links } = facilities.data
    return { 
        table: data,
        pagination : {
            last_page : links.last_page,
            current_page : meta.current_page,
            next_page : links.next,
            first_page:links.first,
            total : meta.last_page
        }
     };
  },
  data() {
    return {
      table: [],
      pagination : {
          current_page:1
      }
    };
  },

  methods: {
    addDistrict() {
      this.$router.push("/facilities/add-facility");
    },
    openMaps(lat , long){
      console.log("lat :" , lat, "long : ", long)
    },
    DeleteRegion(id){
        this.$swal({
        title: "Delete Facility",
        text: "This Facility will be deleted",
        icon: "warning",
        showCancelButton: true,
        allowOutsideClick: false,
        confirmButtonText: "Delete",
        showLoaderOnConfirm: true,
        preConfirm: () => {
            let cancelBtn = document.getElementsByClassName("swal2-cancel")[0];
            cancelBtn.style.display = "none";

            return this.$axios.delete(`admin/delete/${id}/facility`)
            .then(response => {
                this.table = this.table.filter(item => item.id !== id);
                this.$notify({
                    type:'success',
                    message : 'Facility deleted successfully'
                })
            })
            .catch(error => {

            })
        }})

    }
  },
};
</script>