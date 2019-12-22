<template>
    <div class="wrapper">
        <h1>Participant</h1>

        <div v-if="!participant" class="table-wrapper">
            <button class="btn btn-sm btn-success" @click="() => doAddOrEdit()">Add</button>
            <table class="table table-bordered">
                <thead>
                <tr>
                    <th>Fullname</th>
                    <th>Phone Number</th>
                    <th>Address</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                <tr v-if="data.length === 0">
                    <td colspan="4">
                        <span v-if="isLoading">Memuat data...</span>
                        <span v-else>No data found</span>
                    </td>
                </tr>
                <tr v-else v-for="(item, index) in data" :key="index">
                    <td>{{item.fullname}}</td>
                    <td>{{item.phoneNumber}}</td>
                    <td>{{item.address}}</td>
                    <td class="button-action" width="20%">
                        <button class="btn btn-sm btn-info" @click="() => doAddOrEdit(item)">Edit</button>
                        <button class="btn btn-sm btn-danger" @click="() => doDelete(item)">Delete</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>

        <form v-else class="form-participant" @submit="doSave">
            <h2 class="form-participant-heading">
                {{participant.id ? "Edit Participant" : "Add New Participant"}}
            </h2>
            <input v-model="participant.fullname" type="text" placeholder="Fullname" autofocus
                   class="form-control" :class="{'is-invalid': hasSubmit && participant.fullname.length === 0}"/>
            <input v-model="participant.phoneNumber" type="text" placeholder="Phone Number"
                   class="form-control" :class="{'is-invalid': hasSubmit && participant.phoneNumber.length === 0}"/>
          <input v-model="participant.username" type="text" placeholder="Username"
                   class="form-control" :class="{'is-invalid': hasSubmit && participant.username.length === 0}"/>
                   <input v-model="participant.address" type="text" placeholder="Address"
                   class="form-control" :class="{'is-invalid': hasSubmit && participant.address.length === 0}"/>
            <div class="btn-submit text-lg-right">
                <button class="btn btn-m btn-dark" type="button" @click="doReset">Cancel</button>
                <button class="btn btn-m btn-primary" type="submit">
                    <template v-if="isLoading">
                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        <span class="sr-only">Loading...</span>
                    </template>
                    <template v-else>
                        <span v-if="participant.id">Update</span>
                        <span v-else>Save</span>
                    </template>
                </button>
            </div>
        </form>
    </div>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import axios from "axios";

  import Participant from "../Entities/Participant";
  import User from "../Entities/User";

  @Component({name: "participant-page"})
  export default class ParticipantPage extends Vue {

    public data: Array<Participant> = [];

    public participant: Participant | null = null;

    public isLoading: boolean = false;

    public hasSubmit: boolean = false;

    public get isValid(): boolean {
      return this.participant != null && this.participant.fullname !== "" && this.participant.phoneNumber !== "" && this.participant.address !== "";
    }

    public mounted() {
      this.doReset();
    }

    public doReset() {
      this.hasSubmit = false;
      this.isLoading = false;

      this.participant = null;

      this.doFind();
    }

    public doFind() {
      this.isLoading = true;

      //@ts-ignore
      const user: User = this.$doCookieOperation("session");

      axios.get("http://192.168.0.152:9000/participants", {
        headers: {"Authorization": user.token}
      }).then((response) => {
        if (response.data.status == "200" && Array.isArray(response.data.data)) {
          this.data = response.data.data;
        }
      }).finally(() => {
        this.isLoading = false;
      });
    }

    public doAddOrEdit(participant?: Participant) {
      this.participant = participant ? participant : new Participant();
    }

    public doDelete(participant: Participant) {
      if (!this.isLoading && participant.id) {
        if (confirm("are you sure to delete this participant (" + participant.fullname + ") ?")) {
          this.isLoading = true;

          //@ts-ignore
          const user: User = this.$doCookieOperation("session");

          this.handleResponse(axios.delete("http://192.168.0.152:9000/participants/" + participant.id, {
            headers: {"Authorization": user.token}
          }));
        }
      }
    }

    public doSave(event: Event): void {
      event.preventDefault();

      this.hasSubmit = true;

      if (!this.isLoading && this.participant != null) {
        if (this.isValid) {
          this.isLoading = true;

          //@ts-ignore
          const user: User = this.$doCookieOperation("session");

          this.handleResponse(axios.request({
            url: "http://192.168.0.152:9000/participants",
            method: this.participant.id ? "PUT" : "POST",
            headers: {"Authorization": user.token},
            data: this.participant,
          }));
        } else {
          this.$notify({
            group: 'default',
            type: 'error',
            title: 'Participant',
            text: 'Please fill all field'
          });
        }
      }
    }

    public handleResponse(promise: Promise<any>) {
      promise.then(() => {
        this.$notify({
          group: 'default',
          type: 'success',
          title: 'Participant',
          text: 'Success!'
        });

        this.doReset();
      }).catch((error) => {
        this.$notify({
          group: 'default',
          type: 'error',
          title: 'Participant',
          text: error.toString()
        });
      });
    }

  }
</script>

<style scoped lang="scss">
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    list-style: none;
    text-decoration: none;
    font-family: "Montserrat", sans-serif;
}

.wrapper {
    display: flex;
    position: relative;
background-color: #edf1f8;
}

.wrapper .sidebar {
    width: 260px;
    height: 100%;
    background-color: white;
    padding: 30px 0px;
    position: fixed;
}

.wrapper .sidebar .brand {
    color: #d4d3cf;
    display: block;
    margin-left: 1.2em;
    margin-right: 0.9em;
    margin-bottom: 4em;
}

.wrapper .sidebar img {
    height: 30px;
}

.wrapper .sidebar ul li {
    padding: 20px;
}

.wrapper .sidebar ul li.active a {
    color: crimson
}

.wrapper .sidebar ul li a {
    color: #01111c;
    display: block;
}

.wrapper .sidebar ul li a .fas {
    width: 25px;
}

.wrapper .sidebar ul li:hover {
    background-color: crimson;

}

.wrapper .sidebar ul li.active:hover a {
    color: white;
}

.wrapper .sidebar ul li:hover a {
    color: white;
}

.wrapper .main_content {
    width: 100%;
    margin-left: 260px;
}

.wrapper .main_content .container {
    color: #01111c;
    line-height: 25px;
    margin: 60px;
}

.wrapper .main_content .container div {
    margin-bottom: 20px;
}

/* Table Style */
.container .semua {
    background-color: white;
    border-radius: 7px;
    position: relative;
    padding-bottom: 30px;
}

.container .semua .header-table {
    background-color: #ebecec;
    height: 80px;
    border-top-left-radius: 7px;
    border-top-right-radius: 7px;
}

.container .title {
    float: left;
    height: inherit;
    padding: 21px;
}

.container .button {
    float: right;
    height: inherit;
    width: 50%;
    padding: 21px;
    list-style: none;
    display: flex;
    flex-direction: row;
}

.header-table .button input {
    height: 40px;
    margin-bottom: 20px;
    border: 1px solid grey;
    width: 80%;
    border-radius: 5px;
    padding-left: 1rem;
    transition: box-shadow 0.5s ease;
    margin-right: 15px;
}

.header-table .button input::placeholder {
    font-family: "Montserrat", sans-serif;
    font-size: 14px;
    color: lightslategrey;
    font-weight: bold;
}

.header-table .button button {
    border-radius: 5px;
    height: 40px;
    width: 40%;
    padding: auto;
    color: white;
    background-color: crimson;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    transition: box-shadow 0.5s ease;
}

.header-table .button button:hover {
    background-color: rgb(190, 22, 56);
    box-shadow: 0px 0px 10px grey;
}

.content-table tbody button.error {
    background-color: red;
    border: none;
    color: white;
    font-size: 16px;
    padding: 4px;
    border-radius: 7px;
    text-decoration: none;
    cursor: pointer;
}

.content-table tbody button.error:hover {
    background-color: rgb(226, 12, 12);
    box-shadow: 0px 0px 10px grey;
    color: white;
}

.container .title h2 {
    margin: 9px;
    color: #01111c;
}

.content-table {
    border-collapse: collapse;
    font-size: 0.9em;
    /* border: 1px solid black; */
    min-width: 400px;
    overflow: hidden;
    margin: 10px 0;
}

.content-table thead tr {
    text-align: left;
}

.content-table thead tr th {
    font-weight: normal;
}

.content-table th,
.content-table td {
    padding: 12px 35px;
}

.content-table td {
    font-weight: bold;
}

</style>