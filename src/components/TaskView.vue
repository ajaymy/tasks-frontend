<template>
  <v-container grid-list-md text-xs-center class="pa-0 ma=0">
    <v-layout row wrap>
      <v-flex xs12 md4>
        <v-menu
          v-model="fromDateMenu"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              label="From Date"
              prepend-icon="mdi-calendar"
              readonly
              :value="fromDateDisp"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="fromDateVal"
            no-title
            @input="fromDateMenu = false"
          ></v-date-picker>
        </v-menu>
      </v-flex>
      <v-flex xs12 md4>
        <v-overflow-btn
          v-model="startTimeSelect"
          class="my-2"
          :items="TimeArray"
          label="Start Time"
          item-value="text"
        ></v-overflow-btn>
      </v-flex>

      <v-flex xs12 md4>
        <v-overflow-btn
          v-model="endTimeSelect"
          class="my-2"
          :items="TimeArray"
          label="End Time"
          item-value="text"
        ></v-overflow-btn>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 md6>
        <v-overflow-btn
          v-model="customerSelect"
          class="my-2"
          :items="customerList"
          item-text="clientName"
          item-value="clientName"
          label="SELECT-CUSTOMER"
          color="primary"
          @change="OnCustomerChanged(`${customerSelect}`)"
        ></v-overflow-btn>
      </v-flex>
      <v-flex xs12 md6>
        <v-overflow-btn
          v-model="projectSelect"
          class="my-2"
          :items="projectList"
          item-text="projName"
          item-value="projName"
          label="SELECT-PROJECT"
          color="primary"
          @change="OnProjectChanged(`${projectSelect}`)"
        ></v-overflow-btn>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 md4>
        <v-text-field label="Task" v-model="taskname"></v-text-field>
      </v-flex>
      <v-flex xs12 md4>
        <v-text-field label="Description" v-model="taskdesc"></v-text-field>
      </v-flex>
      <v-flex xs12 md4>
        <v-btn depressed color="primary" @click="populateTask"> ADD </v-btn>
        <v-spacer></v-spacer>
        <v-alert
          type="success"
          :value="showMessage"
          dismissible
          border="top"
          dense
          >Task saved successfully!</v-alert
        >
      </v-flex>
    </v-layout>
    <TaskList />
  </v-container>
</template>
<script>
import format, { add, parseISO } from "date-fns";
import utility from "@/components/utility";
import { bus } from "@/components/EventBus";
import tasks from "@/Model/Tasks";
import { da } from "date-fns/locale";
import { addHours } from "date-fns/esm";
import TaskList from "@/components/TaskList";
export default {
  data() {
    return {
      customerSelect: { custName: "SELECT-CUSTOMER", custID: "0" },
      projectSelect: { custName: "SELECT-PROJECT", projID: "0" },
      selectedCustomer: null,
      selectedProject: null,
      customerList: [],
      projectList: [],
      loading: false,
      fromDateMenu: false,
      fromDateVal: null,
      taskname: null,
      taskdesc: null,
      startTimeSelect: { text: "Start Time" },
      endTimeSelect: { text: "End Time" },
      TimeArray: [
        { text: "0800" },
        { text: "0900" },
        { text: "1000" },
        { text: "1100" },
        { text: "1200" },
        { text: "1300" },
        { text: "1500" },
        { text: "1600" },
        { text: "1700" },
        { text: "1800" },
      ],
      showMessage: false,
      btnLoading: false,
      saveResponse: null,
    };
  },
  components: {
    TaskList: TaskList,
  },
  computed: {
    fromDateDisp() {
      return this.fromDateVal;
    },
    formattedDate() {
      return this.startWordDate
        ? format(this.startWordDate, "Do MMM YYYY")
        : "";
    },
    setMaxDate() {
      return;
    },
  },
  mounted: function () {
    this.getProjectList();
    bus.$on("ProjectLists", (params) => {
      this.projectList = params.projectlist;
      utility.getClientList();
    });
    bus.$on("ClientLists", (params) => {
      this.customerList = params.clientlist;
    });
    bus.$on("TaskSaved", (params) => {
      this.saveResponse = params.response.message;
      this.showMessage = true;
      this.btnLoading = false;
      utility.getTaskList();
    });
  },
  methods: {
    populateTask() {
      // let stime = this.startTimeSelect.toString().slice(0, 2);
      // let etime = this.endTimeSelect.toString().slice(0, 2);
      // let result = parseISO(this.fromDateVal);
      // let startTime = addHours(result, parseInt(stime));
      // let endTime = addHours(result, parseInt(etime));
      let task = new tasks();
      task.taskName = this.taskname;
      task.taskDescription = this.taskdesc;
      task.project = this.selectedProject;
      task.client = this.selectedCustomer;
      task.startDate = parseISO(this.fromDateVal);
      task.startTime = this.startTimeSelect;
      task.endTime = this.endTimeSelect;
      utility.addTaskInfo(task);
    },
    getProjectList() {
      utility.getProjectList();
    },
    OnProjectChanged(project) {
      this.selectedProject = project;
      console.log(this.selectedProject);
    },
    OnCustomerChanged(cust) {
      this.selectedCustomer = cust;
      console.log(this.selectedCustomer);
    },
  },
};
</script>